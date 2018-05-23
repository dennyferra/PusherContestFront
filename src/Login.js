import React from 'react'
import { inject, observer } from 'mobx-react'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.nicknameInput = null
  }

  hide = () => {
    this.props.user.showLogin = false
  }

  join = () => {
    const nickname = this.nicknameInput.value
    this.props.user.join(nickname)
  }

  setNicknameInputRef = element => {
    this.nicknameInput = element
  }

  render() {
    const { loginBusy, loginError, showLogin } = this.props.user
    const active = showLogin ? 'is-active' : ''

    return (
      <div className={`modal ${active}`}>
        <div className="modal-background" />
        <div className="modal-card animated bounceInUp">
          <header className="modal-card-head">
            <p className="modal-card-title" />
            <button className="delete" aria-label="close" onClick={this.hide} />
          </header>
          <section className="modal-card-body">
            {loginError && (
              <article className="message is-danger animated fadeIn">
                <div className="message-body">{loginError}</div>
              </article>
            )}
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Nickname</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <p className="control is-expanded has-icons-left">
                    <input
                      type="text"
                      className="input"
                      placeholder="Nickname"
                      maxLength="20"
                      ref={this.setNicknameInputRef}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-user" />
                    </span>
                  </p>
                  <p className="help">3-20 Characters</p>
                </div>
              </div>
            </div>
          </section>
          <footer className="modal-card-foot">
            {!loginBusy && (
              <button className="button is-success" onClick={this.join}>
                Join
              </button>
            )}
            {loginBusy && (
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

export default inject('user')(observer(Login))
