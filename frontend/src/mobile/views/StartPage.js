import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';

import LandingPage from '../landing-page'

export default props => {
  return (
    <LandingPage {...props}></LandingPage>
  );
}
