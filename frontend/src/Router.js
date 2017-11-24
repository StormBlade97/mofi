import React from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import StartPage from './views/StartPage';
import SelectionPage from './views/SelectionPage';
import ResultPage from './views/ResultPage';
import PhoneLandingPage from './phone/landing-page';

export default () => (
  <Router>
    <div>
      <Route exact path="/" component={StartPage}/>
      <Route path="/selection" component={SelectionPage}/>
      <Route path="/result" component={ResultPage}/>
      <Route path="/match-mood" component={PhoneLandingPage}/>
    </div>
  </Router>
)
