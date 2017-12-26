import React, { Component } from 'react';
import { connect } from 'react-redux';
import StackBlur from 'stackblur-canvas';
import { compose, lifecycle, withProps } from 'recompose';

import styled from 'react-emotion';

import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../core'
import { setCanvas, setContext, setPosterSrc } from '../ducky/app';
import dummy from '../static/camphub-poster-maker.jpg';
// import dummy from '../static/dummy-02.png';

let Maker = ({ className }) => (
  <div className={ className }>
    <canvas id="Maker" width={CANVAS_WIDTH + 'px'} height={ CANVAS_HEIGHT + 'px' } style={{ width: '100%' }}></canvas>
  </div>
);


const injectProps = props => ({
  drawing: () => {
    const { poster, context, canvas } = props;
    const ratio = [CANVAS_WIDTH / poster.width, CANVAS_HEIGHT / poster.height];

    function isLandspace() {
      return poster.width > poster.height;
    }

    function drawBackground() {

      if (isLandspace()) {
        const width = poster.width * ratio[0];
        const height = poster.height * ratio[0];

        const posX = (CANVAS_WIDTH - width) / 2;

        // ARGS (Image, X, Y, W, H)
        context.drawImage(poster, posX, 0, poster.width * ratio[0], poster.height * ratio[0]);
        StackBlur.canvasRGB(canvas, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, 50);
      } else {
        const width = poster.width * ratio[0];
        const height = poster.height * ratio[0];

        const posY = (CANVAS_HEIGHT - height) / 2;

        // ARGS (Image, X, Y, W, H)
        context.drawImage(poster, 0, posY, poster.width * ratio[0], poster.height * ratio[0]);
        StackBlur.canvasRGB(canvas, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, 50);
      }
    }

    function drawPoster() {
      const width = poster.width * ratio[1];
      const height = poster.height * ratio[1];

      const posX = (CANVAS_WIDTH / 2) - (width / 2)
      const posY = (CANVAS_HEIGHT / 2) - (height / 2);
      if (isLandspace()) {

        // ARGS (Image, X, Y, W, H)
        context.drawImage(poster, posX, posY, poster.width * ratio[1], poster.height * ratio[1]);
      } else {
        // ARGS (Image, X, Y, W, H)
        context.drawImage(poster, posX, posY, poster.width * ratio[1], poster.height * ratio[1]);
      }
    }


    drawBackground();
    drawPoster();
  },
  initializeMaker: () => {
    const canvas = document.getElementById('Maker');
    props.setCanvas(canvas);
    props.setContext(canvas.getContext('2d'));
    props.setPoster(props.poster, dummy);
  },
})


const mapStateToProps = state => ({
  canvas: state.app.canvas,
  context: state.app.context,
  poster: state.app.poster,
  canvasWidth: state.app.canvas.w,
  canvasHeight: state.app.canvas.h,
})

let enhance = compose(
  connect(mapStateToProps, { setCanvas, setContext, setPoster: setPosterSrc }),
  withProps(injectProps),
  lifecycle({
    componentDidMount() {
      // when window loaded
      window.onload = () => {
        // initialize maker
        this.props.initializeMaker();

        this.props.poster.onload = () => {
          this.props.drawing();
        }
      }
    },
  })
)(Maker);

export default enhance;
