import * as types from './mutation-types';

/**
 * hello world
 */
export const add = ({ commit }, val) => {
    commit(types.ADD, {
        val
    });
}
