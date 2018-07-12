import { observable, action, computed } from "mobx"
import EosAgent from "../EosAgent"

export class AccountStore {
    
    @observable isLoading = false;
    @observable balance = 0.0;
    @observable account;

    constructor() {
    }

    @action loadAccountInfo = () => {
        this.isLoading = true;
    }

    @action login = async () => {
        let account = await EosAgent.loginWithScatter();
        
        this.account = account;
        console.log(account);
    }
}

export default new AccountStore()
