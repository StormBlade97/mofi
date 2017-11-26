import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Swing from './ReactSwing';
import Shadow from 'atomic-components/Shadow';
import './SelectionPageSwing.scss';

import {toJS} from 'mobx';
import {observer} from 'mobx-react';

import MovieStore from './MovieStore';

import styled, { keyframes } from 'styled-components';
import { bounce, fadeOut, bounceOut, flipInX, flipOutX } from 'react-animations';

import Card from '../card';

// const bounceAnimation = keyframes`${flipInX}`;

const BouncyDiv = styled.div`
  animation: fadeInUp 0.3s ease;
  background: transparent;
  width: 100vw;
`;

//const MainCardDiv = styled.div;
//`
  //animation: 0.5s ${keyframes`${flipOutX}`};
//`;

const ImageCard = styled.div`
  background-image: url(${props => props.src});
  width: 80vw;
  height: 80vh;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  border-radius: 6px;
`
const ThrowableCard = styled(Shadow)`
  position: absolute;
  margin: auto;
  display: flex;
  ${ props => props.detailed && " box-shadow: none; z-index: 100; " };
`

const Shim = props => <div style={{ backgroundColor: "rgba(0, 0, 0, 0.6)", width: "100%", height: "100%", zIndex: 10, position: "fixed", left: 0, top: 0, animation: "fadeIn 0.3s ease, slideOutUp 0.5 ease" }} />

@observer
class App extends Component {
    constructor(props, context) {
      super(props, context);

      // An instance of the Stack
      this.state = {
        stack: null,
        showDetail: false,
        showEntireCard: false,
        dragging: false
      };
      this.swingConfig = {
        allowedDirections: [Swing.DIRECTION.LEFT, Swing.DIRECTION.RIGHT, Swing.DIRECTION.UP, Swing.DIRECTION.DOWN],
        throwOutConfidence: (xOffset, yOffset, element) => {
          const xConfidence = Math.min(Math.abs(xOffset) / element.offsetWidth, 1);
          const yConfidence = Math.min(Math.abs(yOffset) / element.offsetHeight, 1);

          const confidence = Math.max(xConfidence, yConfidence);
          if (confidence > 0.3)
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
        MovieStore.addRating(toJS(movie), e.throwDirection);
        MovieStore.removeTopMovie();
        this.setState({ showDetail: false });
      } else {
        this.onCardClick();
        const target = this.refs.stack.refs[MovieStore.movies[0].id];
        const el = ReactDOM.findDOMNode(target);
        if (!el) return;
        const card = this.state.stack.getCard(el);
        if (!card) return;
        if (e.throwDirection === Swing.DIRECTION.DOWN) {
          card.throwIn(0, -500);
        } else {
          card.throwIn(0, 500);
        }
      }
    }
    swipeCard(direction) {
      // reset detail
      this.setState({ showDetail: false, showEntireCard: false })
      // Swing Component Childrens refs
      const target = this.refs.stack.refs[MovieStore.movies[0].id];

      const el = ReactDOM.findDOMNode(target);
      const card = this.state.stack.getCard(el);

      card.throwOut(500, 500, direction);
    }
    onCardClick = () => {
      const target = this.refs.stack.refs[MovieStore.movies[0].id];
      const el = ReactDOM.findDOMNode(target);
      let card = this.state.stack.getCard(el);
      if (this.state.showDetail === false) {
        this.setState({ showDetail: !this.state.showDetail })
        return;
      } else if (this.state.showEntireCard === false) {
        card.throwIn(0, 0);
        setTimeout(() => {
          card.destroy();
        }, 500);
        this.setState({ showEntireCard: true })
        return;
      } else {
        this.setState({ showDetail: !this.state.showDetail, showEntireCard: false})
        card = this.state.stack.createCard(el);
        // TODO: add card to react swing card list
      }
    }
    render() {
        let stackClassName = "stack";
        if (this.state.showDetail) {
          stackClassName += " in-detail";
        }
        return (
          <div onClick={this.onCardClick}>
              { this.state.showEntireCard ?
                    <Card
                            style={{ fontSize: 14, animation: "slideInUp 0.3s ease" }}
                            title={ MovieStore.movies[0].details.title}
                            subtitle={ MovieStore.movies[0].details.tagline}
                            summary={ MovieStore.movies[0].details.overview}
                            duration={MovieStore.movies[0].details.runtime}
                            releaseDate={MovieStore.movies[0].details.release_date}
                            productionCompanies={MovieStore.movies[0].details.production_companies}
                            budget={(MovieStore.movies[0].details.budget / 1000000).toFixed(1)}
                            rating={MovieStore.movies[0].details.vote_average / 2}
                            posterUrl={MovieStore.movies[0].details.poster_url}
                            expanded={true}
                            actors={[]}
                    />

              :
               (this.state.showDetail && ReactDOM.createPortal(<Shim></Shim>, document.querySelector("body"))) }
                <div id="viewport" style={{"display": this.state.showEntireCard ? "none" : "block"}}>
                    <Swing
                        className={stackClassName}
                        tagName="div"
                        setStack={(stack)=> this.setState({stack:stack})}
                        ref="stack"
                        config={this.swingConfig}
                        throwout={this.throwout}

                    >
                      { MovieStore.moviesReversed.map(m =>
                          <ThrowableCard detailed={this.state.showDetail} key={m.id} elevation={5}>
                            {
                              this.state.showDetail ?
                              (<BouncyDiv className="card-details">
                                  <Card
                                    key={m.id}
                                    style={{ fontSize: 14 }}
                                    title={ MovieStore.movies[0].details.title}
                                    subtitle={ MovieStore.movies[0].details.tagline}
                                    duration={MovieStore.movies[0].details.runtime}
                                    rating={MovieStore.movies[0].details.vote_average / 2}
                                    posterUrl={m.details.poster_url}
                                    expanded={this.state.showEntireCard}
                                    releaseDate={MovieStore.movies[0].details.release_date}
                                    actors={[]}
                                    />
                              </BouncyDiv>)
                            :
                            (<ImageCard src={m.details.poster_url} />)
                            }
                          </ThrowableCard>)
                      }
                    </Swing>
                </div>
            </div>
        )
    }
}
export default App;
