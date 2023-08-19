import * as dotenv from 'dotenv'
dotenv.config()
import axios from 'axios';
import { getToken } from '../config/bitbucket.js'

const BASE_API_URL: string = "https://api.bitbucket.org/2.0/repositories/";
const BASE_URL : string = "https://bitbucket.org/";

const workspace = process.env['WORKSPACE'];
const repository = process.env['REPOSITORY'];

function config() {
  const token = getToken();

  return {
    headers: { 
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }        
  }
}

const getBranch = async (branch: string | undefined) => {  
  const url = `${BASE_API_URL}${workspace}/${repository}/refs/branches/${branch}`
  
  try {
    const { data } = await axios.get(url, config());
    return data;
  } catch (e) {
    return null;
  }	
}

const createBranch = async (branch: string, developBranch: string | undefined) => {
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
  } catch (e: any) {
    console.log(e.response.data)
    return null;
  }
}

const createPullRequest = async (branch: string, title: string, destination: string) => {  
  const url = `${BASE_API_URL}${workspace}/${repository}/pullrequests`
  
  const bodyData = `{
    "title": "${title}",
    "description": "${title}",
    "source": {
      "branch": {
        "name": "${branch}"
      }
    },
    "destination": {
      "branch": {
        "name": "${destination}"
      }
    },
    "close_source_branch": false
  }`
      
  try {
    const { data } = await axios.post(url, bodyData, config());
    return data;
  } catch (e: any) {
    console.log(e.response.data);
    return null;
	}
}

const getPullRequests = async () => {
  const url = `${BASE_API_URL}${workspace}/${repository}/pullrequests`
  	
	const { data } = await axios.get(url, config());
	return data;
}

const getPullRequestByBranch = async (branch: string | undefined, destination: string | undefined, state: string = "OPEN") => {
  const params = `source.branch.name="${branch}"+AND+destination.branch.name="${destination}"+AND+state="${state}"`
  const url = `${BASE_API_URL}${workspace}/${repository}/pullrequests?q=${params}`
  	
	const { data } = await axios.get(url, config());
	return data;
}

const updatePullRequestDestination = async (id: string, destination: string) => {
  const url = `${BASE_API_URL}${workspace}/${repository}/pullrequests/${id}`

  const bodyData = `{
    "destination": {
      "branch": {
        "name":"${destination}"
      }
    }      
  }`
  
  try {    
    const { data } = await axios.put(url, bodyData, config());
    return data
  } catch (e: any) {
    console.log(e.response.data)
    return null;
  }
}

const getPullRequestUrl = (id: string) => {    
  const url = `${BASE_URL}${workspace}/${repository}/pull-requests`
  return `${url}/${id}`
}

export { 
  getBranch,
  createBranch,
  getPullRequestUrl,
  createPullRequest,
  getPullRequests,
  getPullRequestByBranch,
  updatePullRequestDestination
};