import React from 'react'
import { observer } from 'mobx-react'

import BoardGuess from './BoardGuess'

@observer
class Board extends React.Component {
  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Nickname</th>
            <th>Guess</th>
            <th>Direction</th>
          </tr>
        </thead>
        <tbody>
          {this.props.members.length <= 0 && (
            <tr>
              <td
                colSpan="3"
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: '#777',
                  backgroundColor: 'rgba(0,0,0,0.05)',
                  padding: '40px'
                }}>
                Join the game to see live players!
              </td>
            </tr>
          )}
          {this.props.members.map(member => (
            <BoardGuess
              key={member.id}
              member={member}
              last={this.props.last}
            />
          ))}
        </tbody>
      </table>
    )
  }
}

export default Board
