import React from 'react'
import { inject, observer } from 'mobx-react'

class Flash extends React.Component {
  render() {
    const style = this.props.error ? 'is-danger' : 'is-primary'
    if (!this.props.message) return null

    return (
      <div
        className={`notification ${style} animated tada`}
        style={{
          position: 'absolute',
          marginTop: '-80px',
          marginLeft: '0px',
          width: '100%'
        }}>
        <button className="delete" onClick={this.props.hide} />
        {this.props.message}
      </div>
    )
  }
}

export default observer(Flash)
