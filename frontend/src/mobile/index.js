import React, {Component} from 'react'
import {
  Route,
} from 'react-router-dom'
import './index.css'
import styled from 'styled-components'

import LandingPage from './landing-page';
import SelectionPageSwing from './swing/SelectionPageSwing';
import {initMovieStore} from './swing/MovieStore';
import {initUserStore} from './UserStore';
import ResultPage from './views/ResultPage';
import FilterPage from './filterview';
import Logo from '../elisa_logo.png'
import { AnimatedSwitch } from 'react-router-transition';

const ElisaImg = styled.img`
  height: 5vh;
  object-fit: contain;
  width: 100vw;
  margin: 2rem 0;
`

export default class IndexView extends Component {
  constructor() {
    super();
    initMovieStore();
    initUserStore();
  }
  render() {
    const match = this.props.match;
    return (
      <div>
        <ElisaImg alt="Elisa" src={Logo} />
    <AnimatedSwitch
      atEnter={{ opacity: 0 }}
      atLeave={{ opacity: 0 }}
      atActive={{ opacity: 1 }}
      className="switch-wrapper"
    >
        <Route exact path={`${match.url}`} component={LandingPage}/>
        <Route path={`${match.url}/c/:code`} component={LandingPage}/>
        <Route exact path={`${match.url}/mood-filter`} component={FilterPage}></Route>
        <Route path={`${match.url}/selection`} component={SelectionPageSwing}/>
        <Route path={`${match.url}/result`} component={ResultPage}/>
   </AnimatedSwitch>
      </div>
    )
  }
}
