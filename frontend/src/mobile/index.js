import React from 'react'
import {
  Route,
} from 'react-router-dom'

import StartPage from './views/StartPage';
import SelectionPageSwing from './swing/SelectionPageSwing';
import ResultPage from './views/ResultPage';

export default ({match}) => (
  <div>
    Mobile
    <Route exact path={`${match.url}`} component={StartPage}/>
    <Route path={`${match.url}/selection`} component={SelectionPageSwing}/>
    <Route path={`${match.url}/result`} component={ResultPage}/>
  </div>
)
