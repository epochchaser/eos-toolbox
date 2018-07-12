import { observable, action, computed } from "mobx"
import EosAgent from "../EosAgent"

export class AccountStore {
    
    @observable isLogin = false;
    @observable balance = 0.0;
    account;

    constructor() {
    }

    @action loadAccountInfo = () => {
        this.isLoading = true;
    }

    @action login = async () => {
        let account = await EosAgent.loginWithScatter();
        
        console.log(account);

        if (account) {
            this.account = account;
            this.isLogin = true;
        }
    }

    @action logout = async () => {
        let result = await EosAgent.loginWithScatter();

        this.isLogin = false;
        this.account = null;
    }
}

export default new AccountStore()
