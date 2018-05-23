import { observable, action, computed, decorate, reaction } from 'mobx'
import parseResponse from './parseResponse'

class User {
  user = {}
  showLogin = false
  showHowTo = true
  loginError = null
  loginBusy = false

  constructor(rootStore) {
    this.rootStore = rootStore

    reaction(
      () => this.showLogin,
      showLogin => {
        if (!showLogin) this.loginError = null
      }
    )
  }

  get loggedIn() {
    return this.user && this.user.id
  }

  join(nickname) {
    this.loginBusy = true
    this.loginError = null
    if (this.loggedIn) return

    if (nickname.length <= 2 || nickname.length > 20) {
      this.loginError = 'Nickname must be between 3 and 20 characters in length'
      this.loginBusy = false
      return
    }

    // Make sure we're connected to the game channel
    const { connection, game } = this.rootStore
    if (connection.game !== 'connected') {
      this.showLogin = false
      this.loginBusy = false
      game.setFlash(
        'Not connected to game channel, please refresh the page and try again',
        true
      )
      return
    }

    const endpoint = `play?nickname=${encodeURIComponent(nickname)}`
    fetch(`https://etherguess.herokuapp.com/${endpoint}`, {
      method: 'GET',
      mode: 'cors'
    })
      .then(parseResponse)
      .then(
        action(result => {
          const { ok, json } = result
          if (!ok) {
            this.loginError = (json && json.error) || 'Unknown error'
          } else {
            this.user = json
            this.showLogin = false
          }

          this.loginBusy = false
        })
      )
      .catch(
        action(error => {
          console.error(error)
          this.loginBusy = false
        })
      )
  }
}

decorate(User, {
  user: observable,
  showLogin: observable,
  showHowTo: observable,
  loginBusy: observable,
  loginError: observable,
  loggedIn: computed,
  join: action
})

export default User
