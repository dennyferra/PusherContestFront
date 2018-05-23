import React from 'react'
import { observer } from 'mobx-react'
import { bounceInLeft, bounceOutLeft } from 'react-animations'

export default observer(props => {
  if (props.loggedIn && props.guess === null) {
    return (
      <a
        className={
          'button is-primary is-block is-alt is-large animated bounceInLeft'
        }
        onClick={props.makeGuess}>
        Make a Guess
      </a>
    )
  } else if (!props.loggedIn) {
    return (
      <a
        key="testing123"
        className="button is-success is-block is-alt is-large"
        onClick={props.join}
        href="#">
        Join Game!
      </a>
    )
  } else if (props.loggedIn && props.guess !== null) {
    return (
      <div className="columns animated flipInY">
        <div className="column is-12 has-text-centered">
          <h2>You Guessed</h2>
          <h1 className="title is-3">{props.guess}</h1>
        </div>
      </div>
    )
  }
})
