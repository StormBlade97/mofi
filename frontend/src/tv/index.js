import React from 'react'
import {
  Route,
} from 'react-router-dom'

import StartPage from './StartPage';

export default ({match}) => (
  <div>
    TV
    <Route exact path={`${match.url}`} component={StartPage}/>
  </div>
)
