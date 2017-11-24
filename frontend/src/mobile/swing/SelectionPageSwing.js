import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Swing, { Stack, Card, Direction } from './ReactSwing';

import './SelectionPageSwing.scss';

import {observer} from 'mobx-react';

import MovieStore from './MovieStore';

@observer
class App extends Component {
    constructor(props, context) {
      super(props, context);

      // An instance of the Stack
      this.state = {
          stack: null
      };
      this.swingConfig = {
        allowedDirections: [Swing.DIRECTION.LEFT, Swing.DIRECTION.RIGHT]
      }
    }
    rightSwipe = () => {
      console.log('Swing.DIRECTION', Swing.DIRECTION);
      this.swipeCard(Swing.DIRECTION.RIGHT);
    }
    leftSwipe = () => {
      console.log('Swing.DIRECTION', Swing.DIRECTION);
      //this.swipeCard(Swing.DIRECTION.LEFT);
      console.log("foo")
      MovieStore.movies.push({
        title: "Foo222",
        src: "https://thenypost.files.wordpress.com/2014/11/movietheater131050-525x350.jpg?quality=90&strip=all&w=664&h=441&crop=1"
      });
    }
    throwout = (e) => {
      MovieStore.movies.unshift();
      console.log(this.state.stack)
      if (e.throwDirection === Swing.DIRECTION.LEFT) {
        console.log("left", e)
      } else if (e.throwDirection === Swing.DIRECTION.RIGHT) {
        console.log("right", e)
      }
      MovieStore.addRating();
    }
    swipeCard(direction) {
        // Swing Component Childrens refs
        const target = this.refs.stack.refs.card2;

        // get Target Dom Element
        const el = ReactDOM.findDOMNode(target);

        // stack.getCard
        const card = this.state.stack.getCard(el);

        // throwOut method call
        card.throwOut(100, 200, direction);
    }
    render() {
        return (
            <div>
                <div id="viewport">
                    {/*
                        Swing Element
                    */}
                    <Swing
                        className="stack"
                        tagName="div"
                        setStack={(stack)=> this.setState({stack:stack})}
                        ref="stack"
                        config={this.swingConfig}
                        throwout={this.throwout}
                    >
                      { MovieStore.movies.map(m =>
                        <div className="card" key={m.src}>
                          <img src={m.src} />
                          <div>{m.title} </div>
                        </div>
                      )}
                    </Swing>
                </div>
                <div className="control">
                    <button type="button" onClick={this.leftSwipe}>
                      left
                    </button>
                    <button type="button" onClick={this.rightSwipe}>
                      right
                    </button>
                </div>
            </div>
        )
    }
}
export default App;
