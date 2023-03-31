import * as dotenv from 'dotenv'
dotenv.config()
import { getPullRequests } from './services/bitbucket.js';

//const brances = [
//    { branc: 'fix9', comment: 'fix9', description: 'test9' },
//    { branc: 'fix10', comment: 'fix10', description: 'test10' }
//];
//
//console.log('Test');
//brances.forEach(element => {
//    console.log(element)
//});

const getListPR = async () => {			
	const pr = await getPullRequests();	
    //console.log(pr);

    pr.values.forEach(element => {
        //console.log(element.source)
    });
}

getListPR();