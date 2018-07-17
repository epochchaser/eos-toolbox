import { decorate, observable, action } from 'mobx'
import EosAgent from '../EosAgent'

export class ExplorerStore {
  isLoading = false

  search = async query => {}
}

decorate(ExplorerStore, {
  isLoading: observable,
  search: action
})

export default new ExplorerStore()
