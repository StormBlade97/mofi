import React from 'react'
import {
  Route,
} from 'react-router-dom'
import './index.css'

import LandingPage from './landing-page';
import SelectionPageSwing from './swing/SelectionPageSwing';
import ResultPage from './views/ResultPage';
import FilterPage from './views/FilterPage';

export default ({match}) => (
  <div>
    <Route exact path={`${match.url}`} component={LandingPage}/>
    <Route exact path={`${match.url}/mood-filter`} component={FilterPage}></Route>
    <Route path={`${match.url}/selection`} component={SelectionPageSwing}/>
    <Route path={`${match.url}/result`} component={ResultPage}/>
  </div>
)
