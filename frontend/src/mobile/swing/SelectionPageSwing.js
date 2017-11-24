import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Swing, { Stack, Card, Direction } from './ReactSwing';

import './SelectionPageSwing.scss';

const movies = [
  {
    title: "Foo",
    src: "http://authors.appadvice.com/wp-content/appadvice-v2-media/2015/08/Popcorn-Movies_fc3538c493404ecf8c7071a2641b3626.jpg"
  },
  {
    title: "Foo2",
    src: "http://www.destinflorida.com/wp-content/uploads/2015/01/santa-rosa-mall-theater.jpeg"
  },
  {
    title: "Foo3",
    src: "https://www.welovesolo.com/wp-content/uploads/vector/07/Film-and-movie-4.jpg"
  },
];

export default class App extends Component {
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
      this.swipeCard(Swing.DIRECTION.LEFT);
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
                        throwout={(e)=>console.log('throwout',e)}
                    >
                      { movies.map(m =>
                        <div className="card">
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
