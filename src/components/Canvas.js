import React, { Component } from 'react';

class Canvas extends Component {
  state = {
    isPainting: false,
    mousePos: {
      offsetX: 0, offsetY: 0,
    },
  }

  hue = 0;
  lineWidth = this.props.lineWidth;

  onMouseDown = ({nativeEvent}) => {
    const {offsetX, offsetY} = nativeEvent;
    this.setState({
      isPainting: true,
      mousePos: {offsetX, offsetY},
    })
  }

  onTouchStart = (event) => {
    const rect = this.canvas.getBoundingClientRect();
    const {pageX, pageY} = event.touches[0];
    this.setState({
      isPainting: true,
      mousePos: {
        offsetX: pageX-rect.left, 
        offsetY: pageY-rect.top,
      },
    })
  }

  onMouseMove = ({nativeEvent}) => {
    const {isPainting, mousePos} = this.state;
    if(isPainting) {
      const {offsetX, offsetY} = nativeEvent;
      const offSetData = { offsetX, offsetY };
      this.draw(mousePos, offSetData);
    }
  }
  onTouchMove = (event) => {
    const {isPainting, mousePos} = this.state;
    const rect = this.canvas.getBoundingClientRect();

    if(isPainting) {
      const {pageX, pageY} = event.touches[0];
      const offSetData = { 
        offsetX: pageX-rect.left, 
        offsetY: pageY-rect.top 
      };
      this.draw(mousePos, offSetData);
    }
  }

  componentDidMount() {
    this.canvas.width = 300;
    this.canvas.height = 300;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
  }

  endPaintEvent = ({nativeEvent}) => {
    const {offsetX, offsetY} = nativeEvent;
    const {isPainting} = this.state;
    if (isPainting) {
      this.setState({
        isPainting: false,
        mousePos: {
          offsetX, offsetY
        }
      })
    }
  }
  endTouchEvent = (event) => {
    const {pageX, pageY} = event.changedTouches[0];
    const {isPainting} = this.state;
    if (isPainting) {
      this.setState({
        isPainting: false,
        mousePos: {
          offsetX: pageX, 
          offsetY: pageY
        },
      })
    }
  }

  draw = (mousePos, currPos) => {
    const { offsetX, offsetY } = currPos;
    const { offsetX: x, offsetY: y } = mousePos;
    const {strokeStyle} = this.props;
    !this.props.strokeStyle ?
      this.ctx.strokeStyle = this.getColor() :
      this.ctx.strokeStyle = strokeStyle;
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(offsetX, offsetY);
    this.ctx.stroke();
    this.setState({
      mousePos: {offsetX, offsetY},
    })
  }

  getColor() {
    this.hue++;
    if ( this.hue === 360 ) {
      this.hue = 0;
    }
    return `hsl(${this.hue}, 100%, 30%)`;
  }


  render() {
    return (
      <canvas
        ref={(ref) => (this.canvas = ref)}
        style={{ background: 'black' }}
        onMouseDown={this.onMouseDown}
        onMouseLeave={this.endPaintEvent}
        onMouseUp={this.endPaintEvent}
        onMouseMove={this.onMouseMove}
        onTouchStart={this.onTouchStart}
        onTouchEnd={this.endTouchEvent}
        onTouchMove={this.onTouchMove}
      />
    );
  }
}

export default Canvas;