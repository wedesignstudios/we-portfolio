import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const FormHandlers = require('../../services/form_handlers');
const FormValidations = require('../../services/form_validations');
const DataActions = require('../../data/actions');

class ModalUpdateImage extends Component {
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

            <div className="modal-body">
              Modal Body
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