import React from 'react'
import {
  Route,
} from 'react-router-dom'

import LandingPage from './landing-page';
import SelectionPageSwing from './swing/SelectionPageSwing';
import ResultPage from './views/ResultPage';

export default ({match}) => (
  <div>
    <Route exact path={`${match.url}`} component={LandingPage}/>
    <Route path={`${match.url}/selection`} component={SelectionPageSwing}/>
    <Route path={`${match.url}/result`} component={ResultPage}/>
  </div>
)
