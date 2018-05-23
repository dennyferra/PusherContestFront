import {
  observable,
  action,
  computed,
  decorate,
  reaction,
  runInAction
} from 'mobx'
import UserStore from './User'
import Game from './Game'
import Connection from './Connection'

class Root {
  constructor() {
    this.connection = new Connection(this)
    this.user = new UserStore(this)
    this.game = new Game(this)

    this.connection.init()
  }
}

export default new Root()
