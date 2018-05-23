import React from 'react'
import { observer } from 'mobx-react'
import FA from 'react-fontawesome'

@observer
class BoardGuess extends React.Component {
  render() {
    const { member, last } = this.props
    const guessed = member.guess != null
    const direction = !guessed
      ? ['is-dark', 'question', 'None']
      : member.direction === 1
        ? ['is-success', 'arrow-up', 'Higher']
        : member.direction === -1
          ? ['is-danger', 'arrow-down', 'Lower']
          : ['is-warning', 'arrow-right', 'Same']

    return (
      <tr className="animated bounceIn">
        <td>
          <span className="is-size-7 has-text-weight-semibold">
            {member.info.name}
          </span>
        </td>
        <td>
          {guessed && <span className="tag is-primary is-small">Ready</span>}
          {!guessed && <span className="tag is-dark is-small">No Guess</span>}
        </td>
        <td>
          <span className={`tag ${direction[0]} is-small`}>
            <FA name={direction[1]} /> &nbsp; {direction[2]}
          </span>
        </td>
      </tr>
    )
  }
}

export default BoardGuess
