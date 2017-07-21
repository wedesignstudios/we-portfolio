import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const FormHandlers = require('../../services/form_handlers');
const FormValidations = require('../../services/form_validations');
const DataActions = require('../../data/actions');

class ModalUpdateImage extends Component {
  constructor() {
    super();

    this.state = {
      title: '',
      alt: '',
      url: '',
      projects: [],
      projectName: '',
      project_id: '',
      project_id_detach: '',
      index_page: false,
      success: false
    }
  }

  loadImage() {
    fetch(`/api/images/${this.props.imageId}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          title: data.title ? data.title : '',
          alt: data.alt ? data.alt : '',
          url: data.url,
          project_id: data.project_id ? data.project_id : '',
          index_page: data.index_page ? data.index_page : false
        });
        if(data.project) {
          this.setState({
            projectName: data.project.name
          })
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  componentDidUpdate(prevProps) {
    if(prevProps.imageId !== this.props.imageId) {
      this.loadImage();
    }
  }

  render() {
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
                        src={this.state.url}
                        alt={this.state.alt}
                        width="25%" />
                    </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">URL: </label>
                  <div className="col-sm-10">
                    <div className="form-control border-0 pl-0">{this.state.url}</div>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label">Title: </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      value={this.state.title}
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
                      value={this.state.alt}
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
                      checked={this.state.index_page}
                      onChange={(e) => FormHandlers.checkboxChange(e, this)} />
                  </div>
                </div>

              </form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal">
                  OK
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

module.exports = ModalUpdateImage;