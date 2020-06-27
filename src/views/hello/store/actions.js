import * as types from './mutation-types';

/**
 * hello world
 */
export const sayHello = ({ commit, state }, msg) => {
    commit(types.SAY_HELLO, {
        msg
    });
}
