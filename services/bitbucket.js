import * as dotenv from 'dotenv'
dotenv.config()
import axios from 'axios';

const BASE_API_URL = "https://api.bitbucket.org/2.0/repositories/";
const BASE_URL = "https://bitbucket.org/";

const token = process.env.TOKEN;    
const workspace = process.env.WORKSPACE;
const repository = process.env.REPOSITORY;

function config() {  
  return {
    headers: { 
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }        
  }
}

function buildApiUrl(workspace, repoSlug, action) {  
  switch (action.type) {
    case "pullRequest":
      return `${BASE_API_URL}${workspace}/${repoSlug}/pullrequests`;
    case "commentDiff":
      return `${BASE_API_URL}${workspace}/${repoSlug}/commits/?exclude=master`;
    default:
      return `${BASE_API_URL}${workspace}/${repoSlug}/`;
  }
}

function buildUrl(workspace, repoSlug, action) {
  switch (action.type) {
    case "pullRequest":
      return `${BASE_URL}${workspace}/${repoSlug}/pull-requests`;      
    default:
      return `${BASE_URL}${workspace}/${repoSlug}/`;
  }
}

const getBranch = async (branch) => {  
  const url = `${BASE_API_URL}${workspace}/${repository}/refs/branches/${branch}`
  
  try {
    const { data } = await axios.get(url, config());
    return data;
  } catch (e) {
    return null;
  }	
}

const createBranch = async (branch, developBranch) => {  
  const workspace = process.env.WORKSPACE;
  const repository = process.env.REPOSITORY;

  const url = `${BASE_API_URL}${workspace}/${repository}/refs/branches`  
  const bodyData = `{
    "name": "${branch}",
    "target": {      
      "hash": "${developBranch}"
    }
  }`
  
  try {    
    const { data } = await axios.post(url, bodyData, config());
    return data
  } catch (e) {
    console.log(e.response.data)
    return null;
  }    
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

  const url = buildApiUrl(workspace, repository, { type: "pullRequest" })
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
    
    const url = buildApiUrl(workspace, repository, { type: "pullRequest" })
    const config = {
        headers: { 
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
        }        
    };    
	
	const { data } = await axios.get(url, config);
	return data;
}

const getPullRequestUrl = (id) => {
  const workspace = process.env.WORKSPACE
  const repository = process.env.REPOSITORY
  
  if (!workspace) {
    throw new Error('Workspace is not specified')
  }
  if (!repository) {
    throw new Error('Repository is not specified')
  }

  const url = buildUrl(workspace, repository, { type: "pullRequest" })
  return `${url}/${id}`
}

export { 
  getBranch,
  createBranch,
  getPullRequestUrl,
  createPullRequest,
  getPullRequests
};