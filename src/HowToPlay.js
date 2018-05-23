import React from 'react'

export default props => (
  <article className="post">
    <div className="media">
      <div className="media-content">
        <div>
          <article className="message is-primary">
            <div className="message-body">
              <h4>How to Play</h4>
              Each round is <strong>2 minutes</strong> long. At any time during
              the round you can make <strong>1 guess</strong> of what you think
              the price of Ethereum will be. When the round is up the price of
              Ethereum is checked. The person with the closest guess wins the
              round.
            </div>
          </article>
        </div>
      </div>
      <div className="media-right">
        <button className="delete" onClick={props.hide} />
      </div>
    </div>
  </article>
)
