import Eos from 'eosjs';
import * as Values from './constants/Values';

class EosAgent {
    constructor() {
        this._initialized = false;
        this.identity = null;
        this.accountName = null;

        document.addEventListener('scatterLoaded', scatterExtension => {
            console.log('scatterloaded');
            this.scatter = window.scatter;

            if (this.scatter) {
                this._initialized = true;
                //window.scatter = null;
            }
        });
    }

    loginWithScatter = async () => {
        if(!this.scatter) {
            return;
        }

        let id = await this.scatter.getIdentity(Values.requiredFields);
        
        if (id) {
            this.scatter.useIdentity(id);
            console.log('Possible identity', this.scatter.identity);
            const accountName = this.scatter.identity.accounts.find(acc => acc.blockchain === Values.NETWORK.blockchain);

            this.accountName = accountName;
            this.identity = id;
            
            return this.accountName;
        }

        return '';
    }
}

export default new EosAgent();
