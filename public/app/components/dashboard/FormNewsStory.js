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
const ModalAddImages = require('./ModalAddImages');
const NewsCategoriesCheckboxes = require('./NewsCategoriesCheckboxes');
const GetImagesNewsStory = require('./GetImagesNewsStory');

class FormNewsStory extends React.Component {
  constructor() {
    super();

    this.state = {
      title: '',
      initialTitle: '',
      date: '',
      description: '',
      image_id: '',
      image_url: '',
      news_categories_ids: [],
      news_categories_ids_attached: [],
      news_categories_ids_detach: [],
      news_categories_ids_selected: [],
      titleErr: false,
      dateErr: false,
      descriptionErr: false,
      imageErr: false,
      categoriesErr: false,
      imageSelectOpen: false,
      submitError: '',
      clearModalErrs: false
    }

    this.initialState = this.state;

    this.requiredFields = ['title', 'date', 'description', 'image_id', 'news_categories_ids_selected'];
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
      [inputName + '_selected']: data.selected
    })
  }

  getImageData(data) {
    this.setState({
      image_id: data.id,
      image_url: data.url
    });
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
            initialTitle: data.title,
            date: moment(data.date),
            description: data.description,
            image_id: data.image.id ? data.image.id : '',
            image_url: data.image.url ? data.image.url : ''
          });
          if(data.news_categories) {
            this.setAttachedAndSelected(data.news_categories, 'news_categories');
          };
        })
    }
  }

  setAttachedAndSelected(dataModel, dataModelName) {
    let selected = [];
    let ids = dataModel.map(model => {
      selected.push(model.id);
      return model.id;
    });

    this.setState({
      [dataModelName + '_ids_attached']: ids,
      [dataModelName + '_ids_selected']: selected
    });
  }

  openImageModal(event) {
    event.preventDefault();
    $(ReactDOM.findDOMNode(this.refs.modal)).modal();
    this.setState({clearModalErrs: true});
  }

  deleteNewsStory() {
    DataActions.sendRequest(
      'DELETE',
      {title: this.state.initialTitle},
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
        DataActions.sendRequest(
          this.props.sendRequestType,
          this.state,
          `/api/news-stories/${this.props.newsStoryId}`,
          this.setRedirectWithMessage,
          this.setSubmitErrorMessage
        );
      }
    });
  }

  render() {
    return(
      <div className="row justify-content-center">
        <div className="col-6">
          <Link to='/dashboard/news-stories' className="btn btn-primary mb-3">All News Stories</Link>
          <h1>
            <span className="badge badge-default p-3">
              {this.props.sendRequestType === 'POST' ? 'Create A News Story' : `Update News Story: ${this.state.initialTitle}`}
            </span>
          </h1>

          {this.props.sendRequestType === 'PUT' ?
            <div className="d-flex justify-content-end pr-3">
              <button
                className="btn btn-danger mb-3"
                onClick={(e) => this.deleteNewsStory(e)}>
                  Delete {this.state.initialTitle}
                </button>
              </div> :
          null}

          <p><em>All fields required.</em></p>

          <div className="submit-message-error">
            {this.state.submitError ?
              <div className="alert alert-danger">
                {this.state.submitError}
              </div> :
              null}
          </div>

          <div className="errors row">
            <div className="col-sm-10">
              {this.state.titleErr ?
                <div
                  id="news-story-title-validation-error"
                  className="alert alert-danger">
                    Title can not be blank. Please enter a story title.
                </div> :
              null}
              {this.state.dateErr ?
                <div
                  id="news-story-date-validation-error"
                  className="alert alert-danger">
                    Date can not be blank. Please enter a story published date.
                </div> :
              null}
              {this.state.descriptionErr ?
                <div
                  id="news-story-description-validation-error"
                  className="alert alert-danger">
                    Description can not be blank. Please enter a story description.
                </div> :
              null}
              {this.state.imageErr ?
                <div
                  id="news-story-image-validation-error"
                  className="alert alert-danger">
                    An image must be selected. Please select an image.
                </div> :
              null}
              {this.state.categoriesErr ?
                <div
                  id="news-story-categories-validation-error"
                  className="alert alert-danger">
                    At least one category must be selected. Please select an category.
                </div> :
              null}
            </div>
          </div>

          <div className="container-fluid">
            <form id="create-news-story">
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Story Title: </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      name="title"
                      className={this.state.titleErr ? 'err form-control' : 'form-control'}
                      value={this.state.title}
                      onChange={(e) => FormHandlers.handleOnChange(e, this)}
                      onFocus={(e) => FormHandlers.preventSpaceKey(e)}
                      onBlur={(e) => FormValidations.checkField(e, this)} />
                  </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Date Published: </label>
                <div className="col-sm-10">
                  <DatePicker
                      selected={this.state.date}
                      value={this.state.date}
                      name="date"
                      className={this.state.dateErr ? 'err form-control' : 'form-control'}
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
              </div>

              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Description: </label>
                <div className="col-sm-10">
                  <textarea
                      type="textfield"
                      name="description"
                      className={this.state.descriptionErr ? 'err form-control' : 'form-control'}
                      value={this.state.description}
                      onChange={(e) => FormHandlers.handleOnChange(e, this)}
                      onFocus={(e) => FormHandlers.preventSpaceKey(e)}
                      onBlur={(e) => FormValidations.checkField(e, this)} />
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Image: </label>
                <div className="col-sm-10">
                  {this.state.image_id ?
                    <div className="row">
                      <div className="col-sm-12">
                        <img
                          id={this.state.image_id}
                          src={this.state.image_url}
                          className="mb-3 mr-3"
                          height="100" />
                      </div>
                    </div> :
                  null}
                    <button
                      className="btn btn-secondary"
                      onClick={(e) => this.openImageModal(e)} >
                        {this.state.image_id ?
                          'Change Image' : 'Add Image'
                        }
                    </button>
                </div>
              </div>

              <ModalAddImages
                ref="modal"
                parentForm="newsStory"
                sendImageData={this.getImageData}
                newsStoryId={this.props.newsStoryId}
                clearModalErrs={this.state.clearModalErrs} />

                <NewsCategoriesCheckboxes
                  name="categories"
                  value={this.state.news_categories_ids}
                  sendNewsCategoriesData={this.getComponentData}
                  preSelected={this.state.news_categories_ids_selected}
                  attached={this.state.news_categories_ids_attached}
                  toAttach={this.state.news_categories_ids}
                  detach={this.state.news_categories_ids_detach} />

              <div className="form-group row">
                <div className="col-sm-12 d-flex justify-content-end">
                  <Link to='/dashboard/news-stories' className="btn btn-secondary mr-3">Cancel</Link><br />
                  <button
                    className="btn btn-primary"
                    disabled={this.requiredFieldsBlank}
                    onClick={(e) => this.submitForm(e)}>
                      {this.props.sendRequestType === 'PUT' ?
                        `Update ${this.state.initialTitle}`:
                        'Create New Story'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

module.exports = withRouter(FormNewsStory);