import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Link,
  withRouter
} from 'react-router-dom';

const DataActions = require('../data/actions');
const FormHandlers = require('../services/form_handlers');
const FormValidations = require('../services/form_validations');
const FormHandlersValidations = require('../services/form_handlers_validations');

class FormNewsStory extends React.Component {
  constructor() {
    super();

    this.state = {
    }

  }

  render() {
    return(
      <div>
        <Link to='/dashboard/news-stories'>All News Stories</Link><br />
        FormNewsStory component!
      </div>
    );
  }
};

module.exports = withRouter(FormNewsStory);