import React, { Component } from 'react';
import ReactDOM from 'react-dom';

function Arc(ctx, x, y, radius, lineWidth, color) {
  this.x = x;
  this.y = y;  
  this.radius = radius;
  this.lineWidth = lineWidth;
  this.color = color;
  this.currentAngle = 0;
  this.startAngle = (2*Math.PI);
  this.endAngle = (1.6*Math.PI);

  this.draw = function() {
    ctx.beginPath();
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, this.startAngle + this.currentAngle, this.endAngle + this.currentAngle, false);
    ctx.stroke();
  }

  this.update = function() {
    this.currentAngle += 0.08;
  }
}

class Spinner extends Component {
  constructor() {
    super();

    this.ctx;
    this.reqAnimFrame;
  }

  componentDidMount() {
    this.ctx = this.refs.canvas.getContext('2d');
    this.refs.canvas.width = (this.props.radius*2) + 20;
    this.refs.canvas.height = (this.props.radius*2) + 20;
    var arc = this.createArc();
    this.animate(this.ctx, arc);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.reqAnimFrame);
  }

  createArc() {
    return new Arc(this.ctx, this.refs.canvas.width/2, this.refs.canvas.height/2, this.props.radius, this.props.lineWidth, this.props.color);
  }

  animate(ctx, arc) {
    this.reqAnimFrame = requestAnimationFrame(() => this.animate(ctx, arc));
    ctx.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
    arc.update();
    arc.draw();
  }

  render() {
    return (
      <div className="spinner-container d-inline-flex justify-content-center">
        <canvas ref="canvas"></canvas>
      </div>
    );
  }
}

module.exports = Spinner;