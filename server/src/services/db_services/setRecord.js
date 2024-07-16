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

// * Readline interface:
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// * Fuction which finds image in assets and ends adding new project record.
const findImage = async (imageName, project) => {

    if (!imageName) {
        logWithColor('Nazwa grafiki nie może być pusta', 'yellow');
        rl.question('Podaj nazwę grafiki: ', async (newImageName) => {
            findImage(newImageName, project);
        });
        return;
    }

    const imagePath = path.join(__dirname, `../../assets/${imageName}.png`);

    try {
        const imageBuffer = await fs.readFile(imagePath);
        project.photo = imageBuffer;
        if(project.photo !== null) {
            await projectsCollection.insertOne(project);
            logWithColor('Projekt został dodany pomyślnie ✅', 'green');
            console.log();
            logWithColor('=================================================', 'bgWhite');
            rl.close();
            process.exit(0);
        } else {
            logWithColor('Nie znaleziono pliku o podanej nazwie', 'yellow');
            rl.question('Podaj nazwę grafiki: ', async (newImageName) => {
                findImage(newImageName, project);
            });
        }
    } catch (error) {
        logWithColor('Nie znaleziono pliku o podanej nazwie', 'yellow');
        rl.question('Podaj nazwę grafiki (bez rozszerzenia): ', async (newImageName) => {
            findImage(newImageName, project);
        });
    }
};

// * Function for adding new project record.
const addProject = async () => {

    let project = {
        _id: new ObjectId(), 
        name: null,
        description: null,
        technologies: null,
        github: null,
        public: null,
        photo: null,
        last_commit: null,
    };

    logWithColor('================== NOWY REKORD ==================', 'bgWhite');
    console.log();

    rl.question('↪ Nazwa projektu: ', (name) => {
        project.name = name;
        rl.question('↪ Opis: ', (description) => {
            project.description = description;
            rl.question('↪ Wykorzystane technologie (np. js python -> oddzielone spacją): ', (technologies) => {
                project.technologies = technologies.split(' ');
                rl.question('↪ Link do repozytorium na Githubie: ', (github) => {
                    project.github = github;
                    rl.question('↪ Status (true/false): ', (status) => {
                        if(parseBoolean(status) !== true && parseBoolean(status) !== false) {
                            logWithColor('Status musi mieć wartość logiczną.', 'red');
                            process.exit(0);
                        } else {
                            project.status = parseBoolean(status);
                        }
                        rl.question('↪ Czy projekt jest publiczny (true/false): ', (public) => {
                            if(parseBoolean(public) !== true && parseBoolean(public) !== false) {
                                logWithColor('Status musi mieć wartość logiczną.', 'red');
                                process.exit(0);
                            } else {
                                project.public = parseBoolean(public);
                            }
                            rl.question('↪ Podaj nazwę grafiki: ', async (imageName) => {
                                findImage(imageName, project);
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

        addProject();
    } catch (e) {
        logWithColor(`Error connecting to MongoDB: ${e}`, 'red');
    } 
}

main().catch(console.error);
