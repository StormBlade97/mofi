import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Swing from './ReactSwing';

import './SelectionPageSwing.scss';

import {toJS} from 'mobx';
import {observer} from 'mobx-react';

import MovieStore from './MovieStore';

import styled, { keyframes } from 'styled-components';
import { bounce, fadeOut, bounceOut, flipInX, flipOutX } from 'react-animations';

import Card from '../card';

const bounceAnimation = keyframes`${flipInX}`;

const BouncyDiv = styled.div`
  animation: 0.5s ${bounceAnimation};
`;

//const MainCardDiv = styled.div;
//`
  //animation: 0.5s ${keyframes`${flipOutX}`};
//`;


@observer
class App extends Component {
    constructor(props, context) {
      super(props, context);

      // An instance of the Stack
      this.state = {
        stack: null,
        showDetail: false,
      };
      this.swingConfig = {
        allowedDirections: [Swing.DIRECTION.LEFT, Swing.DIRECTION.RIGHT, Swing.DIRECTION.UP, Swing.DIRECTION.DOWN],
        throwOutConfidence: (xOffset, yOffset, element) => {
          const xConfidence = Math.min(Math.abs(xOffset) / element.offsetWidth, 1);
          const yConfidence = Math.min(Math.abs(yOffset) / element.offsetHeight, 1);

          const confidence = Math.max(xConfidence, yConfidence);
          if (confidence > 0.4)
            return 1;

          return confidence;
        }
      }
    }
    rightSwipe = () => {
      this.swipeCard(Swing.DIRECTION.RIGHT);
    }
    leftSwipe = () => {
      this.swipeCard(Swing.DIRECTION.LEFT);
    }
    topSwipe = () => {
      this.swipeCard(Swing.DIRECTION.UP);
    }
    addNew = () => {
      MovieStore.addMovie();
    }
    throwout = (e) => {
      const movie = MovieStore.movies[0];
      // Add sleep here for better animations?
      if (e.throwDirection !== Swing.DIRECTION.UP && e.throwDirection !== Swing.DIRECTION.DOWN) {
        MovieStore.removeTopMovie();
        MovieStore.addRating(toJS(movie), e.throwDirection);
      } else {
        MovieStore.movies[0].inDetail = !MovieStore.movies[0].inDetail
        const target = this.refs.stack.refs[MovieStore.movies[0].id];
        const el = ReactDOM.findDOMNode(target);
        const card = this.state.stack.getCard(el);
        if (e.throwDirection === Swing.DIRECTION.DOWN) {
          card.throwIn(0, -500);
        } else {
          card.throwIn(0, 500);
        }
      }
    }
    swipeCard(direction) {
      // reset detail
      MovieStore.movies[0].inDetail = false;
      // Swing Component Childrens refs
      const target = this.refs.stack.refs[MovieStore.movies[0].id];

      const el = ReactDOM.findDOMNode(target);
      const card = this.state.stack.getCard(el);

      card.throwOut(100, 200, direction);
    }
    toggleDetails = () => {
      console.log("show details");
      MovieStore.movies[0].inDetail = !MovieStore.movies[0].inDetail
    }
    render() {
        return (
            <div>
                <div id="viewport">
                    <Swing
                        className="stack"
                        tagName="div"
                        setStack={(stack)=> this.setState({stack:stack})}
                        ref="stack"
                        config={this.swingConfig}
                        throwout={this.throwout}
                        onClick={this.toggleDetails}
                    >
                      { MovieStore.moviesReversed.map(m =>
                        <div className="card" key={m.id}>
                          {m.inDetail ?
                            <BouncyDiv className="card-details">
                                <img alt="Poster" src={m.details.poster_url} />
                                <Card
                                  title={ MovieStore.movies[0].details.title}
                                  subtitle={ MovieStore.movies[0].details.tagline}
                                  duration={MovieStore.movies[0].details.runtime}
                                  rating={MovieStore.movies[0].details.vote_average / 2}
                                  />
                            </BouncyDiv>
                          :
                            <div>
                              <img alt="Poster" src={m.details.poster_url} />
                          </div>
                          }
                        </div>
                      )}
                    </Swing>
                </div>
                { false &&
                <div>
                    <button type="button" onClick={this.leftSwipe}>
                      left
                    </button>
                    <button type="button" onClick={this.rightSwipe}>
                      right
                    </button>
                    <button type="button" onClick={this.topSwipe}>
                      top
                    </button>
                    <button type="button" onClick={this.addNew}>
                      add new
                    </button>
                </div>
              }
            </div>
        )
    }
}
export default App;
