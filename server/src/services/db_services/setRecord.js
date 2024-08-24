// * Imports:
const { MongoClient, ObjectId } = require('mongodb');
const fs = require('fs').promises; 
const path = require('path');
const readline = require('readline');
const parseBoolean = require('../../utils/parseBoolean');
const logWithColor = require('../../utils/logWithColor');
require('dotenv').config({ path: '../../.env' });

// * Global variables:
const mongoUri = process.env.MONGODB_URI;
const dbname = process.env.DB_NAME;
const client = new MongoClient(mongoUri);
let projectsCollection;
let photosCollection;
let servicesCollection;

// * Readline interface:
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// * Fuction which finds image in assets and ends adding new project record.
const findImage = async (imageName, item, collection) => {

    if (!imageName) {
        logWithColor('Nazwa grafiki nie może być pusta', 'yellow');
        rl.question('Podaj nazwę grafiki: ', async (newImageName) => {
            findImage(newImageName, item);
        });
        return;
    }

    const imagePath = path.join(__dirname, `../../assets/${imageName}.png`);

    try {
        const imageBuffer = await fs.readFile(imagePath);
        item.photo = imageBuffer;
        if(item.photo !== null) {
            await collection.insertOne(item);
            logWithColor('Projekt został dodany pomyślnie ✅', 'green');
            console.log();
            logWithColor('=================================================', 'bgWhite');
            rl.close();
            process.exit(0);
        } else {
            logWithColor('Nie znaleziono pliku o podanej nazwie', 'yellow');
            rl.question('Podaj nazwę grafiki: ', async (newImageName) => {
                findImage(newImageName, item);
            });
        }
    } catch (error) {
        logWithColor('Nie znaleziono pliku o podanej nazwie', 'yellow');
        rl.question('Podaj nazwę grafiki (bez rozszerzenia): ', async (newImageName) => {
            findImage(newImageName, item);
        });
    }
};

const addService = async () => {

    let service = {
        _id: new ObjectId(),
        name_pl: null,
        name_en: null,
        description_pl: null,
        description_en: null,
        graphic_source: null,
        link: null,
        photo: null,
    };

    logWithColor('================== NOWY REKORD ==================', 'bgWhite');
    console.log();

    rl.question('↪ Nazwa usługi (PL): ', (name_pl) => {
        service.name_pl = name_pl;
        rl.question('↪ Nazwa usługi (EN): ', (name_en) => {
            service.name_en = name_en;
            rl.question('↪ Opis usługi (PL): ', (description_pl) => {
                service.description_pl = description_pl;
                rl.question('↪ Opis usługi (EN): ', (description_en) => {
                    service.description_en = description_en;
                    rl.question('↪ Link do usługi: ', async (link) => {
                        service.link = link;
                        rl.question('↪ Podaj nazwę źródła grafiki: ', (graphic_source) => {
                            service.graphic_source = graphic_source;
                            rl.question('↪ Podaj nazwę grafiki (bez rozszerzenia): ', async (imageName) => {
                                findImage(imageName, service, servicesCollection);
                            });
                        });
                    });
                });
            });
        });
    });

    rl.on('close', async () => {
        process.exit(0);
    });
}

// * Function for adding new project record.
const addProject = async () => {

    let project = {
        _id: new ObjectId(), 
        name_pl: null,
        name_en: null,
        description_pl: null,
        description_en: null,
        technologies: null,
        github: null,
        public: null,
        graphic_source: null,
        photo: null,
        last_commit: null,
    };

    logWithColor('================== NOWY REKORD ==================', 'bgWhite');
    console.log();

    rl.question('↪ Nazwa projektu (PL): ', (name_pl) => {
        project.name_pl = name_pl;
        rl.question('↪ Nazwa projektu (EN): ', (name_en) => {
            project.name_en = name_en;
            rl.question('↪ Opis (PL): ', (description_pl) => {
                project.description_pl = description_pl;
                rl.question('↪ Opis (EN): ', (description_en) => {
                    project.description_en = description_en;
                    rl.question('↪ Wykorzystane technologie (np. js python -> oddzielone spacją): ', (technologies) => {
                        project.technologies = technologies.split(' ');
                        rl.question('↪ Link do repozytorium na Githubie: ', (github) => {
                            project.github = github;
                            rl.question('↪ Status (true/false): ', (status) => {
                                if (parseBoolean(status) !== true && parseBoolean(status) !== false) {
                                    logWithColor('Status musi mieć wartość logiczną.', 'red');
                                    process.exit(0);
                                } else {
                                    project.status = parseBoolean(status);
                                }
                                rl.question('↪ Czy projekt jest publiczny (true/false): ', (public) => {
                                    if (parseBoolean(public) !== true && parseBoolean(public) !== false) {
                                        logWithColor('Status musi mieć wartość logiczną.', 'red');
                                        process.exit(0);
                                    } else {
                                        project.public = parseBoolean(public);
                                    }
                                    rl.question('↪ Podaj nazwę źródła grafiki: ', (graphic_source) => {
                                        project.graphic_source = graphic_source;
                                        rl.question('↪ Podaj nazwę grafiki: ', async (imageName) => {
                                            
                                            await findImage(imageName, project, projectsCollection);

                                            await projectsCollection.insertOne(project);
                                            logWithColor('Projekt został pomyślnie dodany.', 'green');
                                            rl.close();
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    rl.on('close', async () => {
        process.exit(0);
    });
}

// * Function for adding new photo record.
const addPhoto = async () => {

}

// * Main function:
const main = async () => {
    try {

        await client.connect();
        projectsCollection = client.db(dbname).collection('projects');  
        photosCollection = client.db(dbname).collection('photos'); 
        servicesCollection = client.db(dbname).collection('services');

        rl.question('Co chcesz dodać? (projekt/usługa/zdjęcie): ', async (answer) => {
            switch(answer) {
                case 'projekt':
                    addProject();
                    break;
                case 'usługa':
                    addService();
                    break;
                case 'zdjęcie':
                    addPhoto();
                    break;
                default:
                    logWithColor('Nieznana komenda', 'red');
                    process.exit(0);
            }
        });

    } catch (e) {
        logWithColor(`Error connecting to MongoDB: ${e}`, 'red');
    } 
}

main().catch(console.error);
