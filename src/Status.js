import React from 'react'
import { observer } from 'mobx-react'
import moment from 'moment'

class Status extends React.Component {
  render() {
    const { members, status, round } = this.props
    const playerCount = members.length || status.players
    const end = round.end || status.end
    const lastPrice = round.lastPrice || status.lastPrice

    const dateFormatted = moment(end).format('hh:mm A')

    let priceClasses = 'title animated'
    priceClasses += round.ended ? ' hinge' : ' zoomInDown'

    return (
      <nav className="level">
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Players</p>
            <p className="title animated zoomInDown">{playerCount}</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Last Price</p>
            <p className={priceClasses}>${lastPrice}</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Current Round Ends</p>
            {!round.ended && (
              <p className="title animated zoomInDown">{dateFormatted}</p>
            )}
            {round.ended && (
              <p className="title animated flipInY">Round Ended</p>
            )}
          </div>
        </div>
      </nav>
    )
  }
}

export default observer(Status)
