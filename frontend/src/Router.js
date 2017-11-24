import React from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import StartPage from './views/StartPage';
import SelectionPageSwing from './swing/SelectionPageSwing';
import ResultPage from './views/ResultPage';

export default () => (
  <Router>
    <div>
      <Route exact path="/" component={StartPage}/>
      <Route path="/selection" component={SelectionPageSwing}/>
      <Route path="/result" component={ResultPage}/>
    </div>
  </Router>
)
