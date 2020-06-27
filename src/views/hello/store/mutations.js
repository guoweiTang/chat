import * as types from './mutation-types';
import * as consts from '../constants';

export default {
    /* hello world */
    [types.SAY_HELLO] (state, { msg }) {
        state.msg = msg;
    }
}
