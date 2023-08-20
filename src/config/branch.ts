import * as dotenv from 'dotenv'
dotenv.config()

const countBranches: number = 20;

type Branch = {
  branch: string;  
};

const getBranch = (suffix: string): Branch | null => {
    const branch: string | undefined = process.env[`BRANCH_${suffix}`]

    if (branch) {
        return {branch: branch}
    }

    return null;
}

const createBranchesArray = (): Array<Branch> => {
    const data: Array<Branch> = [];

    for (let i: number = 1; i <= countBranches; i++) {
        const suffix: string = String(i).padStart(2, '0');
        const branch = getBranch(suffix);

        if (branch) {
            data.push(branch);
        }
    }    

    return data;
}

export { Branch, createBranchesArray }
