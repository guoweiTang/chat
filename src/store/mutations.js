import * as types from './mutation-types';

export default {
    /* 记录 moduleName, 用于卸载 store 中的子 module */
    [types.RECORD_CURRENT_MODULE_NAME] (state, { name }) {
        state.moduleName = name;
    }
}
