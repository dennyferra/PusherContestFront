import { observable, action, decorate, reaction, runInAction } from 'mobx'

class Connection {
  presence = 'none'
  game = 'none'
  channels = {
    presence: null,
    game: null
  }

  constructor(rootStore) {
    this.rootStore = rootStore
    this.pusher = null
  }

  init() {
    // Enable pusher logging - don't include this in production
    //Pusher.logToConsole = true

    this.pusher = new Pusher('9672a48d7e1a6b750ae3', {
      cluster: 'us2',
      encrypted: true,
      authEndpoint: 'https://etherguess.herokuapp.com/pusher/auth',
      auth: {
        headers: {}
      }
    })

    this.connectGame()

    const { user } = this.rootStore

    reaction(
      () => user.loggedIn,
      isLoggedIn => {
        if (isLoggedIn) {
          this.pusher.config.auth.headers['X-UserId'] = user.user.id
          this.connect()
        } else {
          this.disconnect()
        }
      }
    )
  }

  connectGame() {
    this.channels.game = this.pusher.subscribe('game')
    this.channels.game.bind(
      'pusher:subscription_error',
      action(data => {
        this.game = 'none'
        this.setFlash('Game channel error, please refresh your browser', true)
        console.log('game.subscription_error', data)
      })
    )
    this.channels.game.bind(
      'pusher:subscription_succeeded',
      action(() => (this.game = 'connected'))
    )
  }

  connect() {
    if (this.rootStore.user.loggedIn) {
      this.channels.presence = this.pusher.subscribe('presence-game')

      this.channels.presence.bind(
        'pusher:subscription_error',
        action(data => {
          this.presence = 'none'
          this.setFlash('Could not subscribe to presence channel', true)
          console.log('presence.subscription_error', data)
        })
      )

      this.channels.presence.bind(
        'pusher:subscription_succeeded',
        action(members => {
          this.rootStore.game.members.clear()
          members.each(m => {
            this.rootStore.game.addMember(m)
          })
          this.presence = 'connected'
        })
      )

      this.channels.presence.bind(
        'pusher:member_added',
        action(member => this.rootStore.game.addMember(member))
      )

      this.channels.presence.bind(
        'pusher:member_removed',
        action(member => this.rootStore.game.removeMember(member))
      )
    }
  }

  disconnect() {
    if (this.pusher) {
      this.pusher.unsubscribe('presence-game')
      this.pusher.unsubscribe('game')
      this.pusher.config.auth.headers['X-UserId'] = ''
      this.rootStore.game.members.clear()
    }

    this.presence = 'none'
    this.channels.presence = null
  }
}

decorate(Connection, {
  presence: observable,
  game: observable,
  connect: action,
  disconnect: action
})

export default Connection
