import { validateEnv } from './helpers/validator.js';
import { getPullRequests } from './services/bitbucket.js';
const getListPR = async () => {
    //pullrequests?q=source.branch.name="fix10"&destination.branch.name="master"&fields=%2Bowner.created_on
    //pullrequests?fields=values.id,values.state&q=source.branch.name="fix10"
    //pullrequests?fields=values.id,values.state,values.title,values.description,values.destination.branch.name&q=source.branch.name="fix10"
    //pullrequests?q=state="MERGED"
    const pr = await getPullRequests();
    //console.log(pr);
    //pr.values.forEach(element => {
    //	//console.log(element.source)
    //});
};
if (validateEnv()) {
    getListPR();
}
