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
    posterUrl="http://cdn-static.denofgeek.com/sites/denofgeek/files/9/72//the-martian-main.jpg"
    award="15 oscard and 1 Garfew"
    actors={
      [
        {
            src: "https://i.imgflip.com/10trrf.jpg",
        },
        {
            src: "https://images2.houstonpress.com/imager/u/original/6494387/t_swift_meme.jpg",
        },
        {
            src: "https://pics.onsizzle.com/im-just-here-to-check-all-the-balls-katy-perrys-514233.png",
        },
        {
            src: "http://i0.kym-cdn.com/entries/icons/original/000/014/782/Bad-Makeup-Britney-Spears.jpg",
        },
        {
            src: "https://i.imgflip.com/10trrf.jpg",
        },
        {
            src: "https://images2.houstonpress.com/imager/u/original/6494387/t_swift_meme.jpg",
        },
        {
            src: "https://pics.onsizzle.com/im-just-here-to-check-all-the-balls-katy-perrys-514233.png",
        },
        {
            src: "http://i0.kym-cdn.com/entries/icons/original/000/014/782/Bad-Makeup-Britney-Spears.jpg",
        }
        ]
      }
      backstage={[
                                    {
                                        src: "https://cdn.movieweb.com/img.news.tops/NE7MECzxlvEWbb_2_b/Thor-Ragnarok-Easter-Eggs-Beta-Ray-Bill-Man.jpg",
                                    },
                                    {
                                        src: "http://cdn.darkhorizons.com/wp-content/uploads/2017/09/thor-ragnarok-aiming-for-100m-opening.jpg",
                                    },
                                    {
                                        src: "http://legionofleia.com/wp-content/uploads/dkyef2vvoaagq6l.jpg",
                                    },
                                    {
                                        src: "https://ewedit.files.wordpress.com/2017/10/tm-04029_r.jpg?w=2000",
                                    }
                                ]}
  />
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
    <Route path={`${match.url}/c/:code`} component={LandingPage}/>
    <Route exact path={`${match.url}/mood-filter`} component={FilterPage}></Route>
    <Route path={`${match.url}/selection`} component={SelectionPageSwing}/>
    <Route path={`${match.url}/result`} component={ResultPage}/>
    {/* Demo route for component. Not for production*/}
    <Route path={`${match.url}/card`} component={Card}/>
  </div>
)
