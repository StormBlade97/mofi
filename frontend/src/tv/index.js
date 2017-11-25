import React from 'react'
import {
  Route,
} from 'react-router-dom'

import MainPage from './MainPage';

export default ({match}) => (
  <div>
    <Route exact path={`${match.url}`} component={MainPage}/>
  </div>
)
