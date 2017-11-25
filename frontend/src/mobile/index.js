import React from 'react'
import {
  Route,
} from 'react-router-dom'
import './index.css'
import styled from 'styled-components'

import LandingPage from './landing-page';
import SelectionPageSwing from './swing/SelectionPageSwing';
import ResultPage from './views/ResultPage';
import FilterPage from './filterview';
import CardStock from './card';
import Logo from '../elisa_logo.png'

const Card = props => (
  <CardStock
    title="Hello kitty"
    duration="2h30m"
    director="the GUY"
    summary="I love cat. Meow meow meow meow"
    stars="Chris Hemsword"
    subtitle="Suspense, action, comedy"
    rating={5}
  ></CardStock>
)

const ElisaImg = styled.img`
  height: 5vh;
  object-fit: contain;
  width: 100vw;
  margin: 2rem 0;
`

export default ({match}) => (
  <div>
    <ElisaImg alt="Elisa" src={Logo} />
    <Route exact path={`${match.url}`} component={LandingPage}/>
    <Route exact path={`${match.url}/mood-filter`} component={FilterPage}></Route>
    <Route path={`${match.url}/selection`} component={SelectionPageSwing}/>
    <Route path={`${match.url}/result`} component={ResultPage}/>
    {/* Demo route for component. Not for production*/}
    <Route path={`${match.url}/card`} component={Card}/>
  </div>
)
