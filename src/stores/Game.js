import { observable, action, decorate, reaction } from 'mobx'
import moment from 'moment'
import parseResponse from './parseResponse'

// TODO: server side presence, client side game update, round end handling

class Game {
  status = {
    players: 0
  }
  members = []
  user = {}
  round = {
    lastPrice: 0.0,
    end: null,
    ended: false,
    secondsRemaining: 0,
    totalSeconds: 35,
    fromNow: null,
    percent: 0
  }
  guess = null
  flash = {
    message: null,
    error: false
  }
  showGuess = false
  guessBusy = false
  guessError = null
  winner = null

  constructor(rootStore) {
    this.rootStore = rootStore

    this.sync()

    reaction(
      () => rootStore.connection.game,
      gameChannel => {
        const { game } = this.rootStore.connection.channels

        if (gameChannel === 'connected') {
          game.bind(
            'status',
            action(data => {
              if (data.round) {
                this.round.lastPrice = data.round.lastPrice
                this.round.end = new Date(data.round.end)
                this.startRoundTimer()
              }

              if (data.action === 'round-end') {
                this.round.ended = true
              } else if (data.action === 'round-winner') {
                this.winner = {
                  name: data.name,
                  guess: data.guess,
                  diff: data.diff,
                  nextPrice: data.nextPrice
                }
              } else if (data.action === 'round-start') {
                this.winner = null
                this.reset()
              } else if (data.action === 'guess') {
                const m = this.members.find(f => {
                  return (
                    f.info.name.toLowerCase() ===
                    data.data.nickname.toLowerCase()
                  )
                })
                if (m != null) {
                  m.guess = data.data.guess
                  m.direction = data.data.direction
                }
              }
              //this.status.players = data.players
            })
          )
        } else {
          if (game) game.unbind('status')
        }
      }
    )

    reaction(
      () => this.round.secondsRemaining,
      remaining => {
        if (remaining > 0) {
          setTimeout(
            action(() => {
              this.round.secondsRemaining--
              this.round.fromNow = moment(this.round.end).fromNow()
              this.round.percent =
                (this.round.totalSeconds - this.round.secondsRemaining) *
                100 /
                this.round.totalSeconds
              if (this.round.secondsRemaining <= 0) this.round.ended = true
            }),
            1000
          )
        }
      }
    )
  }

  startRoundTimer() {
    const end = moment(this.round.end)
    this.round.ended = false
    const remaining = moment.duration(end.diff(Date.now())).asSeconds() - 4 // Why 4? the world may never know, I dont have time to figure it out
    this.round.totalSeconds = remaining
    this.round.secondsRemaining = remaining
  }

  sync() {
    fetch(`https://etherguess.herokuapp.com/game`, {
      method: 'GET',
      mode: 'cors'
    })
      .then(parseResponse)
      .then(
        action(result => {
          const { ok, json } = result
          if (!ok) {
            this.setFlash('Could not synchronize with server', true)
          } else {
            // TODO: Don't need no stinkin' status!
            this.status = {
              ...this.status,
              ...json
            }

            this.round.end = new Date(json.end)
            this.startRoundTimer()
          }
        })
      )
  }

  setGuess(guess) {
    this.guessBusy = true
    this.guessError = null

    if (this.guess !== null) {
      this.setFlash('You have already set your guess for this round!', true)
      this.showGuess = false
      this.guessBusy = false
      return
    }

    fetch('https://etherguess.herokuapp.com/guess', {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        guess,
        user: this.rootStore.user.user
      })
    })
      .then(parseResponse)
      .then(
        action(result => {
          const { ok, json } = result
          console.log('GUESS RESPONSE', ok, json)
        })
      )

    this.guess = guess
    this.showGuess = false
    this.guessBusy = false
  }

  setFlash(message, error) {
    this.flash.message = message
    this.flash.error = error
  }

  reset() {
    this.guess = null
    this.members.forEach(m => {
      m.guess = null
      m.direction = null
    })
  }

  addMember(member) {
    if (!this.members.some(s => s.id === member.id)) {
      this.members.push({ ...member, guess: null, direction: null })
    }
  }

  removeMember(member) {
    const m = this.members.find(f => f.id === member.id)
    if (m) this.members.remove(m)
  }
}

decorate(Game, {
  flash: observable,
  round: observable,
  guess: observable,
  members: observable,
  status: observable,
  showGuess: observable,
  guessBusy: observable,
  guessError: observable,
  winner: observable,
  setFlash: action,
  setGuess: action,
  reset: action,
  addMember: action,
  removeMember: action
})

export default Game
