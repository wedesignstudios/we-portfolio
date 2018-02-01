import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Link,
  withRouter
} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

const classNames = require('classnames');
const _groupBy = require('lodash/groupBy');
const _map = require('lodash/map');
const _isEmpty = require('lodash/isEmpty');
const ClientCheckboxes = require('./ClientCheckboxes');
const CollaboratorCheckboxes = require('./CollaboratorCheckboxes');
const UsersCheckboxes = require('./UsersCheckboxes');
const ImageBoard = require('../drag_drop/ImageBoard');
const ModalAddImages = require('./ModalAddImages');
const ProjectCategoriesCheckboxes = require('./ProjectCategoriesCheckboxes');
const DataActions = require('../../data/actions');
const FormHandlers = require('../../services/form_handlers');
const FormValidations = require('../../services/form_validations');
const FormHandlersValidations = require('../../services/form_handlers_validations');

class FormProject extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      initialName: '',
      date: '',
      description: '',
      visible: false,
      images_all: [],
      images_ids: [],
      images_ids_to_attach: [],
      images_ids_attached: [],
      images_ids_attached_data: [],
      images_ids_detach: [],
      image_sort_order: [],
      feature_image: [],
      clients_ids: [],
      clients_ids_attached: [],
      clients_ids_detach: [],
      clients_ids_selected: [],
      collaborators_ids: [],
      collaborators_ids_attached: [],
      collaborators_ids_detach: [],
      collaborators_ids_selected: [],
      project_categories_ids: [],
      project_categories_ids_attached: [],
      project_categories_ids_detach: [],
      project_categories_ids_selected: [],
      users_ids: [],
      users_ids_attached: [],
      users_ids_detach: [],
      users_ids_selected: [],
      nameErr: false,
      dateErr: false,
      descriptionErr: false,
      submitError: '',
      clearModalErrs: false
    }

    this.initialState = this.state;

    this.requiredFields = ['name', 'date', 'description', 'feature_image', 'images_all'];
    this.requiredFieldsBlank = true;
    this.getComponentData = this.getComponentData.bind(this);
    this.getFeatureImgData = this.getFeatureImgData.bind(this);
    this.updateSortOrder = this.updateSortOrder.bind(this);
    this.addOrRemoveToAttachedFromSortArr = this.addOrRemoveToAttachedFromSortArr.bind(this);
    this.setRedirectWithMessage = FormHandlers.setRedirectWithMessage.bind(null, this, '/dashboard/projects', this.state.submitError);
    this.setSubmitErrorMessage = FormHandlers.setSubmitErrorMessage.bind(null, this);
  }

  componentDidMount() {    
    if(this.props.projectId) {
      fetch(`/api/v1/projects/${this.props.projectId}`)
        .then((res) => res.json())
        .then((data) => {
          this.setState({
            name: data.name,
            initialName: data.name,
            date: moment(data.date),
            description: data.description,
            visible: data.visible,
            feature_image: {id: data.feature_image.image.id, url: data.feature_image.image.url}
          });
        if(data.clients) {
          this.setAttachedAndSelected(data.clients, 'clients');
        };
        if(data.collaborators) {
          this.setAttachedAndSelected(data.collaborators, 'collaborators');
        };
        if(data.project_categories) {
          this.setAttachedAndSelected(data.project_categories, 'project_categories');
        };
        if(data.users) {
          this.setAttachedAndSelected(data.users, 'users');
        };
        if(data.images) {
          this.setAttachedAndSelected(data.images, 'images');
          this.setAttachedData(data.images, 'images');
          if(data.project_images_sort_order.images_order) {
            this.setState({image_sort_order: data.project_images_sort_order.images_order});
          } else {
            this.setState({image_sort_order: this.getSortOrder(data.images)});
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    this.requiredFieldsBlank = FormValidations.areAnyRequiredFieldsBlank(this.requiredFields, nextState);

    if(nextState.name.length > 30) {
      nextState.name = this.state.name;
    }

    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.allProjectImages().length !== this.state.images_all.length) {
      this.setState({images_all: this.allProjectImages()});
    };
    FormValidations.clearErrsIfNoneBeforeOnBlur(this, ['nameErr', 'dateErr', 'descriptionErr']);
    this.sortedProjectImages(this.allProjectImages(), this.state.image_sort_order);
  }

  setAttachedAndSelected(dataModel, dataModelName) {
    let selected = [];
    let ids = dataModel.map(model => {
      selected.push(model.id);
      return model.id;
    });

    if(dataModelName === 'images') {
      this.setState({
        [dataModelName + '_ids_attached']: ids
      })
    } else {
      this.setState({
        [dataModelName + '_ids_attached']: ids,
        [dataModelName + '_ids_selected']: selected
      });
    }
  }

  setAttachedData(dataModel, dataModelName) {
    this.setState({
      [dataModelName + '_ids_attached_data']: dataModel
    });
  }

  getComponentData(data, inputName) {
    if(inputName === 'images_ids') {
      this.setState({
        [inputName + '_to_attach']: data.toAttachImgUrls
      })
    }

    this.setState({
      [inputName]: data.toAttach,
      [inputName + '_attached']: data.attached,
      [inputName + '_detach']: data.detach,
      [inputName + '_selected']: data.selected
    });
  }

  getFeatureImgData(data) {
    this.setState({feature_image: data});
  }

  openFeatureImageModal(event) {
    event.preventDefault();
    $(ReactDOM.findDOMNode(this.refs.featureModal)).modal();
    this.setState({clearModalErrs: true});
  }

  openImageModal(event) {
    event.preventDefault();
    $(ReactDOM.findDOMNode(this.refs.modal)).modal();
    this.setState({clearModalErrs: true});
  }

  deleteProject() {
    DataActions.sendRequest(
      'DELETE',
      {name: this.state.initialName},
      `/api/v1/projects/${this.props.projectId}/delete`,
      this.setRedirectWithMessage,
      this.setSubmitErrorMessage
    );
  }

  allProjectImages() {
    let { images_ids_to_attach, images_ids_attached_data, images_ids_detach } = this.state;
    let images = images_ids_attached_data.filter(img => {
      return !images_ids_detach.includes(img.id);
    });
    let allImages = images.concat(images_ids_to_attach);

    return allImages;
  }

  getSortOrder(allImages) {
    return allImages.map(img => img.id);
  }

  updateSortOrder(updatedSortOrder) {
    this.setState({image_sort_order: updatedSortOrder});
  }

  addOrRemoveToAttachedFromSortArr(event) {
    let { image_sort_order } = this.state;
    let target = event.target;
    let id = parseInt(target.id);

    if(!image_sort_order.includes(id)) {
      image_sort_order.push(id);
    } else {
      let index = image_sort_order.indexOf(id);
      image_sort_order.splice(index, 1);
    }

    this.setState({image_sort_order: image_sort_order});
  }

  groupImagesById(imagesArr) {
    return _groupBy(imagesArr, 'id');
  }

  sortedProjectImages(imagesArr, sortArr) {
    let group = this.groupImagesById(imagesArr);

    return _map(sortArr, function (i) {
      return group[i].shift();
    });
  }

  toggleVisible() {
    this.setState({visible: !this.state.visible});
  }

  submitForm(event) {
    event.preventDefault();
    FormValidations.trimData(this.state, this);
    this.forceUpdate(function() {
      if(this.props.sendRequestType === 'POST') {
        DataActions.sendRequest(
          this.props.sendRequestType,
          this.state,
          '/api/v1/projects',
          this.setRedirectWithMessage,
          this.setSubmitErrorMessage
        );
      } else {
        DataActions.sendRequest(
          this.props.sendRequestType,
          this.state,
          `/api/v1/projects/${this.props.projectId}`,
          this.setRedirectWithMessage,
          this.setSubmitErrorMessage
        );
      }
    })
  }

  render() {
    const { image_sort_order, visible } = this.state;
    const wordCounterClass = classNames(
      'input-group-addon',
      'input-group-addon',
      'background-white',
      'word-counter',
      {'text-danger': this.state.name.length >= 25}
    );
    const visibleBtnIconClass = classNames(
      'fa',
      {'fa-eye': visible == true},
      {'fa-eye-slash text-danger': visible == false || visible == null}
    );

    const visibleBtnClass = classNames(
      'btn btn-secondary mb-3',
      {'btn-visible': visible == true}
    );
    return (
      <div className="row m-0 justify-content-center">
        <div className="col-sm-6">

          <div className="container-fluid">
            <div className="row">
              <h2 className="font-weight-bold">
                {this.props.sendRequestType === 'POST' ?
                  'Add A New Project' :
                  `Update: ${this.state.initialName}`}
              </h2>
              <Link to='/dashboard/projects' className="btn btn-primary ml-auto">All Projects</Link>
            </div>
            <div className="row">
              <hr className="col" />
            </div>

            <div className="row mb-3">
              {this.props.sendRequestType === 'PUT' ?
                <div>
                  <button
                    className="btn btn-danger mb-3"
                    onClick={(e) => this.deleteProject(e)}>
                      Delete {this.state.initialName}
                  </button>
                </div> :
              null}

              <div className="ml-auto">
                <button
                  className={visibleBtnClass}
                  onClick={(e) => this.toggleVisible(e)}>
                  <i className={visibleBtnIconClass} aria-hidden="true"></i>
                </button>
              </div>
            </div>

            <div className="col submit-message-error">
              {this.state.submitError ?
                `<div className="alert alert-danger">
                  ${this.state.submitError}
                </div>` :
                null}
            </div>

            <div className="errors row">
              <div className="col">
                {this.state.nameErr ?
                  <div
                    id="project-name-validation-error"
                    className="alert alert-danger"
                    role="alert">
                      Name can not be blank. Please enter a project name.
                  </div> :
                null}
                {this.state.dateErr ?
                  <div
                    id="project-date-validation-error"
                    className="alert alert-danger"
                    role="alert">
                      Date can not be blank. Please enter a project completed date.
                  </div> :
                null}
                {this.state.descriptionErr ?
                  <div id="project-description-validation-error"
                  className="alert alert-danger"
                  role="alert">
                    Description can not be blank. Please enter a project description.
                  </div> :
                null}
              </div>
            </div>

            <form id="create-project">
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Project Name:
                </label>
                <div className="col-sm-10">
                  <div className="input-group">
                    <input
                        type="text"
                        name="name"
                        className={this.state.nameErr ? 'err form-control word-count' : 'form-control word-count'}
                        value={this.state.name}
                        onChange={(e) => FormHandlers.handleOnChange(e, this)}
                        onFocus={(e) => FormHandlers.preventSpaceKey(e)}
                        onBlur={(e) => {FormValidations.checkField(e, this);}} />
                      <span className={wordCounterClass}>{this.state.name.length}/30</span>
                      {this.state.name ?
                        <span className="input-group-addon text-success background-white border-0"><i className="fa fa-check-circle" aria-hidden="true"></i></span> :
                        <span className="input-group-addon text-danger background-white border-0">Required</span>
                      }
                  </div>
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Date Completed: </label>
                <div className="col-sm-10">
                  <div className="input-group">
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
                    {this.state.date ?
                      <span className="input-group-addon text-success background-white border-0"><i className="fa fa-check-circle" aria-hidden="true"></i></span> :
                      <span className="input-group-addon text-danger background-white border-0">Required</span>
                    }
                  </div>
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Description: </label>
                <div className="col-sm-10">
                  <div className="input-group">
                    <textarea
                        type="textfield"
                        name="description"
                        className={this.state.descriptionErr ? 'err form-control' : 'form-control'}
                        value={this.state.description}
                        onChange={(e) => FormHandlers.handleOnChange(e, this)}
                        onFocus={(e) => FormHandlers.preventSpaceKey(e)}
                        onBlur={(e) => FormValidations.checkField(e, this)} />
                    {this.state.description ?
                      <span className="input-group-addon text-success background-white border-0"><i className="fa fa-check-circle" aria-hidden="true"></i></span> :
                      <span className="input-group-addon text-danger background-white border-0">Required</span>
                    }
                  </div>
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Feature Image: </label>
                <div className="col-sm-10">
                  {this.state.feature_image.id ?
                    <div className="row">
                      <div className="col-sm-12">
                        <img
                          id={this.state.feature_image.id}
                          src={this.state.feature_image.url}
                          className="mb-3 mr-3"
                          height="100" />
                      </div>
                    </div> :
                  null}
                    <button
                      className="btn btn-secondary"
                      onClick={(e) => this.openFeatureImageModal(e)} >
                        {this.state.feature_image.id ? 'Change Image' : 'Add Image'}
                    </button>
                    {this.state.feature_image.id ? 
                      <span className="text-success background-white ml-3"><i className="fa fa-check-circle" aria-hidden="true"></i></span> :
                      <span className="text-danger background-white ml-3">Required</span>
                    }
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Image(s): </label>
                <div className="col-sm-10">
                    <div className="row">
                      <div className="col-sm-12">
                        <ImageBoard
                          images={this.sortedProjectImages(this.allProjectImages(), this.state.image_sort_order)}
                          updateSortOrder={this.updateSortOrder} />
                      </div>
                    </div>
                    <button
                      className="btn btn-secondary"
                      onClick={(e) => this.openImageModal(e)} >
                        Add/Remove Image(s)
                    </button>
                    {this.state.images_all.length > 0 ?
                      <span className="text-success background-white ml-3"><i className="fa fa-check-circle" aria-hidden="true"></i></span> :
                      <span className="text-danger background-white ml-3">Required</span>
                    }
                </div>
              </div>

              <ModalAddImages
                ref="featureModal"
                parentForm="project-feature"
                sendImageData={this.getFeatureImgData}
                projectId={this.props.projectId}
                attached={this.state.images_ids_attached}
                feature_image={this.state.feature_image}
                clearModalErrs={this.state.clearModalErrs} />

              <ModalAddImages
                ref="modal"
                parentForm="project"
                sendImageData={this.getComponentData}
                attached={this.state.images_ids_attached}
                detach={this.state.images_ids_detach}
                toAttach={this.state.images_ids}
                toAttachImgUrls={this.state.images_ids_to_attach}
                clearModalErrs={this.state.clearModalErrs}
                addOrRemoveToAttachedFromSortArr = {this.addOrRemoveToAttachedFromSortArr} />

              <ClientCheckboxes
                preSelected={this.state.clients_ids_selected}
                sendClientData={this.getComponentData}
                attached={this.state.clients_ids_attached}
                toAttach={this.state.clients_ids}
                detach={this.state.clients_ids_detach} />

              <CollaboratorCheckboxes
                preSelected={this.state.collaborators_ids_selected}
                sendCollaboratorData={this.getComponentData}
                attached={this.state.collaborators_ids_attached}
                toAttach={this.state.collaborators_ids}
                detach={this.state.collaborators_ids_detach} />

              <ProjectCategoriesCheckboxes
                preSelected={this.state.project_categories_ids_selected}
                sendProjectCategoriesData={this.getComponentData}
                attached={this.state.project_categories_ids_attached}
                toAttach={this.state.project_categories_ids}
                detach={this.state.project_categories_ids_detach} />

              <UsersCheckboxes
                preSelected={this.state.users_ids_selected}
                sendUsersData={this.getComponentData}
                attached={this.state.users_ids_attached}
                toAttach={this.state.users_ids}
                detach={this.state.users_ids_detach} />

              <div className="form-group row">
                <div className="col-sm-12 d-flex justify-content-end">
                  <Link to='/dashboard/projects' className="btn btn-secondary mr-3">Cancel</Link><br />
                  <button
                    className="btn btn-primary"
                    disabled={this.requiredFieldsBlank}
                    onClick={(e) => this.submitForm(e)}>
                      {this.props.sendRequestType === 'PUT' ?
                        `Update ${this.state.initialName}`:
                        'Create New Project'}
                  </button>
                </div>
              </div>
            </form>

          </div>
        </div>
      </div>
    );
  }
}

module.exports = withRouter(FormProject);