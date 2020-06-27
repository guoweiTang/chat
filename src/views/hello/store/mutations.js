import * as types from './mutation-types';

export default {
    /* hello world */
    [types.ADD] (state, { val }) {
        state.liveCount += val;
    }
}
