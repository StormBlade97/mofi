import React from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import StartPage from './views/StartPage';
import SelectionPage from './views/SelectionPage';
import ResultPage from './views/ResultPage';

export default () => (
  <Router>
    <div>
      <Route exact path="/" component={StartPage}/>
      <Route path="/selection" component={SelectionPage}/>
      <Route path="/result" component={ResultPage}/>
    </div>
  </Router>
)
