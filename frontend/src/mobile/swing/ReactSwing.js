// https://raw.githubusercontent.com/ssanjun/react-swing/master/src/swing.js

/**
 * @project react-swing
 * Created by ssanjun on 2016. 7. 12..
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Stack, Card, Direction } from 'swing';


class Swing extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    setStack: PropTypes.func.isRequired,
    tagName: PropTypes.string,
    config: PropTypes.object,
    throwout: PropTypes.func,
    throwoutend: PropTypes.func,
    throwoutleft: PropTypes.func,
    throwoutright: PropTypes.func,
    throwin: PropTypes.func,
    throwinend: PropTypes.func,
    dragstart: PropTypes.func,
    dragmove: PropTypes.func,
    dragend: PropTypes.func
  };

  static defaultProps = {
      tagName: 'div'
  };

  // TODO: remove unused events
  static EVENTS = ['throwout','throwoutend', 'throwoutleft', 'throwoutright', 'throwin', 'throwinend', 'dragstart', 'dragmove', 'dragend'];
  static DIRECTION = Direction;

  constructor(props, context) {
    super(props, context);

    const stack = Stack(props.config);
    this.state = {
      stack: stack,
    };
    this.cardList = [];
  }

  syncEvents(obj, card) {
    Swing.EVENTS.forEach((event) => {
      if (obj.props[event]) {
        card.on(event, obj.props[event]);
      }
    });
  }

  syncStack() {
    this.setState({
      stack: this.state.stack
    });
    this.props.setStack(this.state.stack);
  }

  updateCards(resultFun) {
    React.Children.forEach(this.props.children, (child, key) => {
      const ref = child.ref || child.key;
      const element = ReactDOM.findDOMNode(this.refs[`${ref}`]);
      const card = this.state.stack.createCard(element);
      this.cardList.unshift(card);

      // As we don't set events on the cards itself, no need to sync them
      if(!resultFun(child)) {
        this.syncEvents(child, card);
      }
    });
  }

  componentDidMount() {
    this.syncEvents(this, this.state.stack);
    this.updateCards(() => false);
    this.syncStack();
  }

  componentDidUpdate(prevProps, prevState){
    const prevIds = prevProps.children.map(c => c.key);
    //const newIds = this.props.children.map(c => c.key);

    const newChilds = this.props.children.filter(c => prevIds.indexOf(c.key) < 0);
    //const removedChilds = prevProps.children.filter(c => newIds.indexOf(c.key) < 0);

    if (newChilds.length > 0) {
      this.cardList.forEach(c => c.destroy());
      this.cardList = [];
      this.updateCards(child => {
        prevProps.children.find((c) => {
          return c.key === child.key
        });
      });
    }

    // TODO: remove event listener from removed childs
    //removedChilds.forEach(child => {
      //console.log("Removed", child.key);
    //});

    // TOOD: pretty sure this isn't needed
    //if (newChilds.length > 0) {
      //this.syncEvents(this, this.state.stack);
      //this.syncStack();
    //}
  }

  componentWillUnmount() {
    this.cardList.forEach(c => c.destroy());
  }

  render() {
    const { children, setStack, tagName, config, ...otherProps } = this.props;
    const Tag = tagName;

    const tagProps = Object.keys(otherProps).reduce((result, key, index) => {
      if (Swing.EVENTS.indexOf(key) === -1) {
        result[key] = otherProps[key];
      }
      return result;
    }, {});

    return (
      <Tag {...tagProps}>
        {React.Children.map(children, (child, key) => {
          const ref = child.ref || child.key;
          const childProps = Object.keys(child.props).reduce((result, key, index) => {
            if (Swing.EVENTS.indexOf(key) === -1) {
              result[key] = child.props[key];
            }
            return result;
          }, {});
          childProps.ref = ref;
          return React.createElement(child.type, childProps);
        })}
      </Tag>
    );
  }
}

export default Swing;
export { Stack, Card };
