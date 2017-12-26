import {call, put, select, takeEvery} from 'redux-saga/effects';

import {
  createAction,
  createReducer,
  Creator,
  remove,
  change,
  sum,
  flatten
} from './helper';

import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../core'


const MAKER = createAction('MAKER');

export const SET_CANVAS = MAKER('SET_CANVAS');
export const SET_CONTEXT = MAKER('SET_CONTEXT');

export const SET_POSTER = MAKER('SET_POSTER');

export const setContext = Creator(SET_CONTEXT);
export const setCanvas = Creator(SET_CANVAS);
export const setPoster = Creator(SET_POSTER);

export const setPosterSrc = (poster, path) => {
  const newPoster = poster;
  newPoster.src = path;
  return setPoster(newPoster);
}

export function* appWatcherSaga(a) {
}

const initial = {
  canvas: document.createElement('CANVAS'),
  context: document.createElement('CANVAS').getContext('2d'),
  poster: new Image(),

  canvas: {
    w: 1200,
    h: 630,
  }
}

export default createReducer(initial, state => ({
  [SET_CONTEXT]: context => ({
    ...state,
    context,
  }),
  [SET_CANVAS]: canvas => ({
    ...state,
    canvas,
  }),
  [SET_POSTER]: poster => ({
    ...state,
    poster,
  })
}))
