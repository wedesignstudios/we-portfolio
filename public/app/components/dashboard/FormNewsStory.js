import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Link,
  withRouter
} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

const DataActions = require('../../data/actions');
const FormHandlers = require('../../services/form_handlers');
const FormValidations = require('../../services/form_validations');
const FormHandlersValidations = require('../../services/form_handlers_validations');
const NewsCategoriesCheckboxes = require('./NewsCategoriesCheckboxes');
const GetImagesNewsStory = require('./GetImagesNewsStory');

class FormNewsStory extends React.Component {
  constructor() {
    super();

    this.state = {
      title: '',
      date: '',
      description: '',
      initial_image_id: '',
      image_id: '',
      initial_image_url: '',
      image_url: '',
      news_categories_ids: [],
      news_categories_ids_attached: [],
      news_categories_ids_detach: [],
      news_categories_ids_checked: [],
      titleErr: false,
      dateErr: false,
      descriptionErr: false,
      imageErr: false,
      categoriesErr: false,
      imageSelectOpen: false,
      submitError: ''
    }

    this.initialState = this.state;

    this.requiredFields = ['title', 'date', 'description', 'image_id', 'news_categories_ids_checked'];
    this.requiredFieldsBlank = true;
    this.getComponentData = this.getComponentData.bind(this);
    this.getImageData = this.getImageData.bind(this);
    this.setRedirectWithMessage = FormHandlers.setRedirectWithMessage.bind(null, this, '/dashboard/news-stories', this.state.submitError);
    this.setSubmitErrorMessage = FormHandlers.setSubmitErrorMessage.bind(null, this);
  }

  getComponentData(data, inputName) {
    this.setState({
      [inputName]: data.toAttach,
      [inputName + '_attached']: data.attached,
      [inputName + '_detach']: data.detach,
      [inputName + '_checked']: data.checked
    })
  }

  getImageData(data, closeImageSelect) {
    this.setState({
      image_id: data.id,
      image_url: data.url
    });
    if(closeImageSelect === false) {
      this.setState({
        imageSelectOpen: closeImageSelect
      })
    };
  }

  componentWillUpdate(nextProps, nextState) {
    this.requiredFieldsBlank = FormValidations.areAnyRequiredFieldsBlank(this.requiredFields, nextState);

    return true;
  }

  componentDidMount() {
    if(this.props.newsStoryId) {
      fetch(`/api/news-stories/${this.props.newsStoryId}`)
        .then((res) => res.json())
        .then((data) => {
          this.setState({
            title: data.title,
            date: data.date,
            description: data.description,
            image_id: data.image.id ? data.image.id : '',
            initial_image_id: data.image.id ? data.image.id : ''
          });
          if(data.news_categories) {
            this.setAttachedAndChecked(data.news_categories, 'news_categories');
          };
          if(data.image) {
            fetch(`/api/images/${data.image.id}`)
              .then(res => res.json())
              .then(data =>
                this.setState({
                  image_url: data.url,
                  initial_image_url: data.url
                })
              )
          };
        })
    }
  }

  setAttachedAndChecked(dataModel, dataModelName) {
    let checked = [];
    let ids = dataModel.map(model => {
      checked.push(model.id);
      return model.id;
    });

    this.setState({
      [dataModelName + '_ids_attached']: ids,
      [dataModelName + '_ids_checked']: checked
    });
  }

  deleteNewsStory() {
    DataActions.sendRequest(
      'DELETE',
      {title: this.state.title},
      `/api/news-stories/${this.props.newsStoryId}/delete`,
      this.setRedirectWithMessage,
      this.setSubmitErrorMessage
    );
  }

  openImageSelect(event) {
    event.preventDefault();
    this.setState({
      imageSelectOpen: true
    })
  }

  submitForm(event) {
    event.preventDefault();
    FormValidations.trimData(this.state, this);

    this.forceUpdate(function() {
     if(this.props.sendRequestType === 'POST') {
       DataActions.sendRequest(
         this.props.sendRequestType,
         this.state,
         '/api/news-stories',
         this.setRedirectWithMessage,
         this.setSubmitErrorMessage
       );
     } else {
        let newUrl = this.state.image_url;

        DataActions.sendRequest(
          this.props.sendRequestType,
          this.state,
          `/api/news-stories/${this.props.newsStoryId}`,
          FormHandlers.successMessage(this)
        );
        FormHandlers.updateAttached(this, ['news_categories']);
        FormHandlers.resetDetached(this, ['news_categories']);
        FormHandlers.resetToAttachIds(this, ['news_categories']);
        this.setState({
          initial_image_url: newUrl,
          imageSelectOpen: false
        });
      }
    });
  }

  render() {
    return(
      <div>
        <Link to='/dashboard/news-stories'>All News Stories</Link><br />
        <h3>{this.props.sendRequestType === 'POST' ? 'Create A News Story' : `Update News Story: ${this.state.title}`}</h3>
        <p><em>All fields required.</em></p>
        <div className="submit-message-success">
          {this.state.submitSuccess ? <div id="news-story-added-success" style={{color: 'green'}}><p>{this.props.sendRequestType === 'POST' ? 'New Story successfully added.' : 'Story successfully updated.'}</p></div> : null}
        </div>
        <div className="submit-message-error" style={{color: 'red'}}><p>{this.state.submitError}</p></div>
        {this.props.sendRequestType === 'PUT' ?
          <button onClick={(e) => this.deleteNewsStory(e)}>Delete {this.state.title}</button> :
        null}
        <form id="create-news-story">
          <div>
            <label>Story Title: </label>
            <input
              type="text"
              name="title"
              className={this.state.titleErr ? 'err' : null}
              value={this.state.title}
              onChange={(e) => FormHandlers.handleOnChange(e, this)}
              onFocus={(e) => FormHandlers.preventSpaceKey(e)}
              onBlur={(e) => FormValidations.checkField(e, this)} />
          </div>

          <div>
            <label>Date Published: </label>
            <DatePicker
                selected={this.state.date}
                value={this.state.date}
                name="date"
                className={this.state.dateErr ? 'err' : null}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                placeholderText="Click to select a date"
                popoverAttachment="top right"
                popoverTargetAttachment="top center"
                popoverTargetOffset="38px 250px"
                onChange={(e) => FormHandlersValidations.handleDateOnChange(e, this)}
                onFocus={(e) => FormHandlers.preventAllButShiftAndTab(e)}
                onBlur={(e) => FormValidations.checkField(e, this)} />
          </div>

          <div>
            <label>Description: </label>
            <input
                type="textfield"
                name="description"
                className={this.state.descriptionErr ? 'err' : null}
                value={this.state.description}
                onChange={(e) => FormHandlers.handleOnChange(e, this)}
                onFocus={(e) => FormHandlers.preventSpaceKey(e)}
                onBlur={(e) => FormValidations.checkField(e, this)} />
          </div>

          <div>
            {this.state.initial_image_id ?
              <div>
                <img
                  src={this.state.initial_image_url} height="150" /><br />
                <button onClick={(e) => this.openImageSelect(e)}>Change Current Image</button>
              </div> :
              <div>
                <label>Select An Image: </label>
                <GetImagesNewsStory
                  sendImageData={this.getImageData}
                  canCancel={false} />
              </div>}

            {this.state.imageSelectOpen ?
              <GetImagesNewsStory
                name="image"
                value={this.state.image_id}
                initialImageId={this.state.initial_image_id}
                sendImageData={this.getImageData}
                canCancel={true} /> :
             null}
          </div>

          <div>
            <NewsCategoriesCheckboxes
              name="categories"
              value={this.state.news_categories_ids}
              sendNewsCategoriesData={this.getComponentData}
              preChecked={this.state.news_categories_ids_checked}
              attached={this.state.news_categories_ids_attached}
              toAttach={this.state.news_categories_ids}
              detach={this.state.news_categories_ids_detach} />
          </div>

          <div>
            <button disabled={this.requiredFieldsBlank} onClick={(e) => this.submitForm(e)}>Submit</button>
          </div>
        </form>
        <div className="errors">
          {this.state.titleErr ? <div id="news-story-title-validation-error" style={{color: 'red'}}>Title can not be blank. Please enter a story title.</div> : null}
          {this.state.dateErr ? <div id="news-story-date-validation-error" style={{color: 'red'}}>Date can not be blank. Please enter a story published date.</div> : null}
          {this.state.descriptionErr ? <div id="news-story-description-validation-error" style={{color: 'red'}}>Description can not be blank. Please enter a story description.</div> : null}
          {this.state.imageErr ? <div id="news-story-image-validation-error" style={{color: 'red'}}>An image must be selected. Please select an image.</div> : null}
          {this.state.categoriesErr ? <div id="news-story-categories-validation-error" style={{color: 'red'}}>At least one category must be selected. Please select an category.</div> : null}
        </div>
      </div>
    );
  }
};

module.exports = withRouter(FormNewsStory);