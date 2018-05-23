import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'mobx-react'
import 'whatwg-fetch'

import stores from './stores'
import Footer from './Footer'
import Content from './Content'
import Login from './Login'
import Guess from './Guess'
import Winner from './Winner'

const App = () => (
  <Provider {...stores}>
    <React.Fragment>
      <Login />
      <Guess />
      <Winner />
      <Content />
      <Footer />
    </React.Fragment>
  </Provider>
)

render(<App />, document.getElementById('root'))
