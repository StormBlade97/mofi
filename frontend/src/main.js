import React from 'react';

import Mobile from './mobile'
import TV from './tv'

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

export default () => (
  <Router>
    <div>
      <Route exact path="/" component={Mobile}/>
      <Route path="/app" component={Mobile}/>
      <Route path="/tv" component={TV}/>
    </div>
  </Router>
)
