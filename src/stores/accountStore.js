import { observable, action, computed } from 'mobx';
import EosAgent from '../EosAgent';

export class AccountStore {
    
    @observable isLoading = false;
    @observable balance = 0.0;

    constructor() {
        this.eosAgent = new EosAgent();
    }

    @action loadAccountInfo() {
        this.isLoading = true;
        
        
    }
}

export default new AccountStore();