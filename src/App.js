import React, { Component } from 'react'
import './App.css'
import Main from './pages/Main'
import Verify from './pages/Verify'
import Login from './pages/Login'
export default class App extends Component {
  render() {
    return (
      <div>
      <BrowserRouter>
      <Switch>
      <Route exact path="/">
<Login/>
        </Route>
        <Route exact path="/verify">
<Verify/>
        </Route>
        
        <Route exact path="/main">
<Main/>
        </Route>
      </Switch>
      </BrowserRouter>
      </div>
    )
  }
}
