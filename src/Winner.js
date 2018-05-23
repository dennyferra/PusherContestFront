import React from 'react'
import { inject, observer } from 'mobx-react'

@inject('game')
@observer
class Winner extends React.Component {
  render() {
    const { winner } = this.props.game
    const active = winner != null ? 'is-active' : ''

    return (
      <div className={`modal ${active} animated fadeIn`}>
        <div className="modal-background" />
        <div className="modal-card animated bounceInUp">
          <header className="modal-card-head">
            <p className="modal-card-title">Round Ended!</p>
          </header>
          <section className="modal-card-body">
            <div className="card">
              <div className="card-content">
                {winner &&
                  winner.name && (
                    <React.Fragment>
                      <p className="title" style={{ color: 'red' }}>
                        {winner.name}
                      </p>
                      <p className="subtitle">Winner Winner Chicken Dinner!</p>
                      <nav className="level">
                        <div className="level-item has-text-centered">
                          <div>
                            <p className="heading">Latest Price</p>
                            <p className="title">${winner.nextPrice}</p>
                          </div>
                        </div>
                        <div className="level-item has-text-centered">
                          <div>
                            <p className="heading">{winner.name}'s Guess</p>
                            <p className="title">${winner.guess}</p>
                          </div>
                        </div>
                        <div className="level-item has-text-centered">
                          <div>
                            <p className="heading">Difference</p>
                            <p className="title">{winner.diff}</p>
                          </div>
                        </div>
                      </nav>
                    </React.Fragment>
                  )}

                {winner &&
                  winner.name == null && (
                    <React.Fragment>
                      <p className="title">Nobody Wins :-(</p>
                      <p className="subtitle">
                        Join the next round and submit a guess!
                      </p>
                    </React.Fragment>
                  )}
              </div>
            </div>
          </section>
          <footer className="modal-card-foot">
            Waiting for next round to start...
          </footer>
        </div>
      </div>
    )
  }
}

export default Winner
