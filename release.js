import * as dotenv from 'dotenv'
dotenv.config()
import { createPullRequest } from './services/bitbucket.js';

const createBrancesOfRelease = () => {
    const data = [];

    ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'].forEach((item) => {
        let branch = process.env[`BRANCH_${item}`];
        let title  = process.env[`BRANCH_TITLE_${item}`];

        if (branch) {
            data.push({branch: branch, title: title});
        }
    })

    return data;
}

const createPullRequests = async () => {
    const brances = createBrancesOfRelease();

    brances.forEach(async element => {
        const pullRequest = await createPullRequest(element.branch, element.title);
        if (pullRequest) {
            console.log(pullRequest.id)
        }        
    });	
}

createPullRequests();