import axios from 'axios';

const BASE_URL = "https://api.bitbucket.org/2.0/repositories/";

function buildUrl(workspace, repoSlug, action) {
    switch (action.type) {
        case "pullRequest":
        return `${BASE_URL}${workspace}/${repoSlug}/pullrequests`;
        case "commentDiff":
        return `${BASE_URL}${workspace}/${repoSlug}/commits/?exclude=master`;
        default:
        return `${BASE_URL}${workspace}/${repoSlug}/`;
    }
};

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

const createPullRequest = async (branch, title) => {
    const token = process.env.TOKEN;    
    const workspace = process.env.WORKSPACE;
    const repository = process.env.REPOSITORY;
    const release = process.env.RELEASE;

    if (!token) {
		throw new Error('Token is not specified');
	}    
    if (!workspace) {
		throw new Error('Workspace is not specified');
	}
    if (!repository) {
		throw new Error('Repository is not specified');
	}
    if (!release) {
		throw new Error('Release is not specified');
	}

    const url = buildUrl(workspace, repository, { type: "pullRequest" })
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    const destinationBranch = `release//${release}`

    const bodyData = `{
        "title": "[${branch}] ${title}",
        "description": "${title}",
        "source": {
          "branch": {
            "name": "${branch}"
          }
        },
        "destination": {
          "branch": {
            "name": "${destinationBranch}"
          }
        },
        "close_source_branch": false
    }`
        
    try {
        const { data } = await axios.post(url, bodyData, config);
        return data;
    } catch (e) {
        console.log(e.response.data);
		return null;
	}
}

const getPullRequests = async () => {
    const token = process.env.TOKEN;
    const workspace = process.env.WORKSPACE;
    const repository = process.env.REPOSITORY;

    if (!token) {
		throw new Error('Token is not specified');
	}

    if (!workspace) {
		throw new Error('Workspace is not specified');
	}

    if (!repository) {
		throw new Error('Repository is not specified');
	}

    const brances = createBrancesOfRelease();

    const url = buildUrl(workspace, repository, { type: "pullRequest" })
    const config = {
        headers: { 
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
        }        
    };    
	
	const { data } = await axios.get(url, config);    
	return data;
};

export { createPullRequest, getPullRequests };