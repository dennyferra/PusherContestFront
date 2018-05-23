import React from 'react'
import { observer } from 'mobx-react'

class TimeRemaining extends React.Component {
  render() {
    if (this.props.end) {
      const style = this.props.secondsRemaining <= 10 ? 'is-danger' : 'is-info'

      return (
        <div className="box has-text-centered">
          <span>
            Round ends<br />
            {this.props.fromNow}
          </span>
          <progress
            className={`progress ${style}`}
            value={this.props.percent}
            max="100">
            {this.props.percent}%
          </progress>
        </div>
      )
    }

    return null
  }
}

export default observer(TimeRemaining)
