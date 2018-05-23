import React from 'react'
import { inject, observer } from 'mobx-react'

import Flash from './Flash'
import HowToPlay from './HowToPlay'
import Board from './Board'
import PlayButton from './PlayButton'
import TimeRemaining from './TimeRemaining'
import Status from './Status'

@inject('user', 'game')
@observer
export default class Content extends React.Component {
  makeGuess = () => {
    this.props.game.showGuess = true
  }

  hideFlash = () => {
    this.props.game.setFlash(null, false)
  }

  hideHowTo = () => {
    this.props.user.showHowTo = false
  }

  join = () => {
    this.props.user.showLogin = true
  }

  render() {
    const { game, user } = this.props

    return (
      <section className="container">
        <Flash {...game.flash} hide={this.hideFlash} />
        <div className="columns">
          <div className="column is-3">
            <TimeRemaining {...game.round} />
            <br />
            <PlayButton
              loggedIn={user.loggedIn}
              guess={game.guess}
              join={this.join}
              makeGuess={this.makeGuess}
            />
          </div>
          <div className="column is-9">
            <div className="box content">
              {user.showHowTo && <HowToPlay hide={this.hideHowTo} />}
              <Status
                members={game.members}
                status={game.status}
                round={game.round}
              />
              <Board
                members={game.members}
                user={user.user}
                last={game.round.lastPrice}
              />
            </div>
          </div>
        </div>
      </section>
    )
  }
}
