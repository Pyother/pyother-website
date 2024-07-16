// * Imports:
const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

// * Global variables:
const githubToken = process.env.GITHUB_TOKEN;

const repoCheck = async (repoUrl) => {

    const [owner, repo] = repoUrl.replace('https://github.com/', '').split('/');
    const url = `https://api.github.com/repos/${owner}/${repo}/commits`;
    
    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `token ${githubToken}`
            }
        });
        const commits = response.data

        if (commits && commits.length > 0) {
            return commits[0].commit.author.date;
        } else {
            console.error('No commits found');
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

module.exports = repoCheck;