import * as types from './mutation-types';
import store from '../store';

/**
 * 记录 moduleName, 用于卸载 store 中的子 module
 */
export const recordModuleName = ({ commit, state }, name) => {
    if (state.moduleName) { // 卸载上一个路由对应的 module store
        store.unregisterModule(state.moduleName);
    }

    commit(types.RECORD_CURRENT_MODULE_NAME, {
        name
    });
};
