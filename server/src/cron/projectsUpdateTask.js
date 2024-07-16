// * Imports:
const cron = require('node-cron');

// * Services:
const getRecords = require('../services/db_services/getRecords');
const updateRecords = require('../services/db_services/updateRecords');
const repoCheck = require('../services/webscrapping/repoCheck');

const projectsUpdateTask = cron.schedule('* * * * *', async () => {

    const projects = await getRecords('projects');
    const newRecordsPromises = projects.map(async (project) => {
        const last_commit = await repoCheck(project.github);
        if (last_commit === null) {
            return project;
        } else {
            return { ...project, last_commit };
        }
    });

    const newRecords = await Promise.all(newRecordsPromises);

    try {
        await updateRecords('projects', newRecords);
        console.log('Projects updated');
    } catch (error) {
        console.error('Error updating projects:', error);
    }

});

module.exports = projectsUpdateTask;