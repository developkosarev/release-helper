import { validateEnv } from './helpers/validator.js'
import { getPullRequests } from './services/bitbucket.js'

const getListPR = async () => {			
	const pr = await getPullRequests();	
    //console.log(pr);

    pr.values.forEach(element => {
        //console.log(element.source)
    });
}

if (validateEnv()) {
    getListPR();
}