import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ItemTypes } from './ItemTypes';
import { DragSource, DropTarget } from 'react-dnd';

const ImageSizePicker = require('../../services/image_size_picker');
const _flow = require('lodash/flow');

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      origIndex: props.findImageCard(props.id).index
    };
  },

  endDrag(props, monitor) {
    const didDrop = monitor.didDrop();

    if(didDrop) {
      props.setSortOrder();
    }
  }
};

const cardTarget = {
  canDrop() {
    return false;
  },

  hover(props, monitor) {
    const { id: draggedId } = monitor.getItem();
    const { id: overId } = props;

    if(draggedId !== overId) {
      const { index: overIndex } = props.findImageCard(overId);
      props.moveImageCard(draggedId, overIndex);
    }
  }
};

function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

function collectTarget(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

class ImageCard extends Component {
  render() {
    const { connectDragSource, isDragging, connectDropTarget } = this.props;
    const { id, imgOrigName, url } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    return connectDragSource(connectDropTarget(
      <div className="image-card" style={{ opacity }}>
        <img
          id={id}
          src={url}
          width="100" />
      </div>
    ))
  }
}

module.exports = _flow([DropTarget(ItemTypes.CARD, cardTarget, collectTarget), DragSource(ItemTypes.CARD, cardSource, collectSource)])(ImageCard);