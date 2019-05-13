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

  onMouseMove = ({nativeEvent}) => {
    const {isPainting, mousePos} = this.state;
    if(isPainting) {
      const {offsetX, offsetY} = nativeEvent;
      const offSetData = { offsetX, offsetY };
      this.draw(mousePos, offSetData);
    }
  }

  componentDidMount() {
    // Here we set up the properties of the canvas element.
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
        onTouchStart={this.onMouseDown}
        onTouchEnd={this.endPaintEvent}
        onTouchMove={this.onMouseMove}
      />
    );
  }
}

export default Canvas;