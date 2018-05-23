import React from 'react'

export default () => (
  <footer className="footer">
    <div className="container">
      <div className="content has-text-centered">
        <div className="columns is-mobile is-centered">
          <div className="field is-grouped is-grouped-multiline">
            <div className="control">
              <div className="tags has-addons">
                <a
                  className="tag is-link"
                  href="https://github.com/dansup/bulma-templates"
                >
                  Bulma Templates
                </a>
                <span className="tag is-light">Daniel Supernault</span>
              </div>
            </div>
            <div className="control">
              <div className="tags has-addons">
                <a className="tag is-link">The source code is licensed</a>
                <span className="tag is-light">
                  MIT &nbsp;<i className="fa fa-github" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
)
