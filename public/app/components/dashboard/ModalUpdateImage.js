import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const FormHandlers = require('../../services/form_handlers');
const FormValidations = require('../../services/form_validations');
const DataActions = require('../../data/actions');
const ImageSizePicker = require('../../services/image_size_picker');

class ModalUpdateImage extends Component {
  constructor() {
    super();

    this.state = {
      title: '',
      alt: '',
      url: '',
      orig_name: '',
      index_page: false,
      success: false
    }

    this.imgSizes;
    this.setRedirectWithMessage = FormHandlers.setRedirectWithMessage.bind(null, this, '/dashboard/images', this.state.submitError);
  }

  loadImage() {
    fetch(`/api/v1/images/${this.props.imageId}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          title: data.title ? data.title : '',
          alt: data.alt ? data.alt : '',
          url: data.url,
          orig_name: data.orig_name,
          index_page: data.index_page ? data.index_page : false
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.imageId !== this.props.imageId) {
      this.loadImage();
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if(nextState !== this.state) {
      this.imgSizes = ImageSizePicker.imgSize(nextState.orig_name);
    }
  }

  submitForm(event) {
    event.preventDefault();
    FormValidations.trimData(this.state, this);
    this.forceUpdate(function() {
      DataActions.sendRequest(
        'PUT',
        this.state,
        `/api/v1/images/${this.props.imageId}`,
        this.setRedirectWithMessage
      );
    });
  }

  render() {
    let { title, alt, url, index_page, orig_name } = this.state;
    let isSVG = /(.svg)$/g.test(orig_name);
    return(
      <div className="modal fade" id="addImages"tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">

            <div className="modal-header d-flex justify-content-start">
              <h5 className="modal-title p-2">
                Update Image
              </h5>

              <button
                type="button"
                className="close ml-auto p-2"
                data-dismiss="modal"
                aria-label="Close">
                  <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body container-fluid">
              <form id="update-image">

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Image: </label>
                    <div className="col-sm-10">
                      <img
                        src={this.imgSizes && !isSVG ? this.imgSizes.thumb300 : url}
                        alt={alt}
                        width="25%" />
                    </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">URL: </label>
                  <div className="col-sm-10">
                    <div className="form-control border-0 pl-0">{url}</div>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Title: </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      value={title}
                      onChange={(e) => FormHandlers.handleOnChange(e, this)}
                      onFocus={(e) => FormHandlers.preventSpaceKey(e)} />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Alt Tag: </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      name="alt"
                      className="form-control"
                      value={alt}
                      onChange={(e) => FormHandlers.handleOnChange(e, this)}
                      onFocus={(e) => FormHandlers.preventSpaceKey(e)} />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Home page: </label>
                  <div className="col-sm-10">
                    <input
                      type="checkbox"
                      name="index_page"
                      className="form-control mt-3"
                      checked={index_page}
                      onChange={(e) => FormHandlers.checkboxChange(e, this)} />
                  </div>
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal">
                  Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={(e) => this.submitForm(e)}>
                  Update
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

module.exports = ModalUpdateImage;