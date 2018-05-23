import React from 'react'
import { inject, observer } from 'mobx-react'

class Guess extends React.Component {
  constructor(props) {
    super(props)
    this.guessInput = null
  }

  hide = () => {
    this.props.game.showGuess = false
  }

  guess = () => {
    const userGuess = this.guessInput.value
    this.props.game.setGuess(userGuess)
  }

  setGuessInputRef = element => {
    this.guessInput = element
  }

  render() {
    const { guessBusy, guessError, showGuess } = this.props.game
    const active = showGuess ? 'is-active' : ''

    return (
      <div className={`modal ${active}`}>
        <div className="modal-background" />
        <div className="modal-card animated bounceInUp">
          <header className="modal-card-head">
            <p className="modal-card-title" />
            <button className="delete" aria-label="close" onClick={this.hide} />
          </header>
          <section className="modal-card-body">
            {guessError && (
              <article className="message is-danger animated fadeIn">
                <div className="message-body">{guessError}</div>
              </article>
            )}
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Guess</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <p className="control is-expanded has-icons-left">
                    <input
                      type="number"
                      className="input"
                      placeholder="1000.00"
                      min="0.01"
                      step="0.01"
                      maxLength="20"
                      ref={this.setGuessInputRef}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-dollar-sign" />
                    </span>
                  </p>
                  <p className="help">3-20 Characters</p>
                </div>
              </div>
            </div>
          </section>
          <footer className="modal-card-foot">
            {!guessBusy && (
              <button className="button is-success" onClick={this.guess}>
                Submit
              </button>
            )}
            {guessBusy && (
              <button className="button is-success is-loading">Loading</button>
            )}
            <button className="button" onClick={this.hide}>
              Cancel
            </button>
          </footer>
        </div>
      </div>
    )
  }
}

export default inject('user', 'game')(observer(Guess))
