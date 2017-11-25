import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Swing from './ReactSwing';

import './SelectionPageSwing.scss';

import {toJS} from 'mobx';
import {observer} from 'mobx-react';

import MovieStore from './MovieStore';

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
        allowedDirections: [Swing.DIRECTION.LEFT, Swing.DIRECTION.RIGHT, Swing.DIRECTION.UP],
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
      MovieStore.removeTopMovie();
      MovieStore.addRating(toJS(movie), e.throwDirection);
    }
    swipeCard(direction) {
      // Swing Component Childrens refs
      const cardRefs = Object.keys(this.refs.stack.refs);
      cardRefs.sort();
      const target = this.refs.stack.refs[cardRefs[cardRefs.length - 1]];

      const el = ReactDOM.findDOMNode(target);
      const card = this.state.stack.getCard(el);

      card.throwOut(100, 200, direction);
    }
    openDetails = () => {
      console.log("show details");
      this.setState({showDetails: true});
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
                        onClick={this.openDetails}
                    >
                      { MovieStore.moviesReversed.map(m =>
                        <div className="card" key={m.id}>
                          <img alt="Poster" src={m.details.poster_url} />
                          <div>{m.details.title} </div>
                        </div>
                      )}
                    </Swing>
                </div>
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
              { this.state.showDetails ?
                <div className="card-details">
                  <h4>
                    Details
                  </h4>
                  <br />
                  { MovieStore.movies[0].details.title}
                  <br />
                  { MovieStore.movies[0].details.overview}
                </div>
              : null }
            </div>
        )
    }
}
export default App;
