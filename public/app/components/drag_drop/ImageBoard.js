import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'react/lib/update';
import { ItemTypes } from './ItemTypes';
import { DragDropContext, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ImageCard from '../drag_drop/ImageCard';

const _flow = require('lodash/flow');
const _groupBy = require('lodash/groupBy');
const _map = require('lodash/map');

const cardTarget = {
  drop() {    
  },
};

function collectTarget(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

class ImageBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
      imageSortOrder: []
    }

    this.findImageCard = this.findImageCard.bind(this);
    this.moveImageCard = this.moveImageCard.bind(this);
    this.setSortOrder = this.setSortOrder.bind(this);
  }

  moveImageCard(id, atIndex) {
    const { image, index } = this.findImageCard(id);

    this.setState(update(this.state, {
      images: {
        $splice: [
          [index, 1],
          [atIndex, 0, image],
        ],
      },
    }));
  }

  componentDidMount() {
    this.setInitialState();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps !== this.props) {
      this.setState({images: nextProps.images});
    }
  }

  setInitialState() {
    let { images } = this.props;

    this.setState({
      images: images
    });
  }

  findImageCard(id) {
    const { images } = this.state;
    const image = images.filter(img => img.id === id)[0];

    return {
      image,
      index: images.indexOf(image),
    };
  }

  groupImagesById(imagesArr) {
    return _groupBy(imagesArr, 'id');
  }

  sortImageCards(sortArr, groups) {
    return _map(sortArr, function (i) {
      return groups[i].shift();
    });
  }

  setSortOrder() {
    let order = this.state.images.map(image => {return image.id});

    this.setState({
      imageSortOrder: order
    })
    this.props.updateSortOrder(order);
  }

  render() {
    const { connectDropTarget } = this.props;
    const { images } = this.state;

    return connectDropTarget(
      <div>
        {images.map(image => {
          return <ImageCard
              key={image.id}
              id={image.id}
              url={image.url}
              className="mb-3 mr-3"
              height="100"
              findImageCard={this.findImageCard}
              moveImageCard={this.moveImageCard}
              setSortOrder={this.setSortOrder} />
        })
      }
      </div>
    )
  }

}

module.exports = _flow([DropTarget(ItemTypes.CARD, cardTarget, collectTarget), DragDropContext(HTML5Backend)])(ImageBoard);