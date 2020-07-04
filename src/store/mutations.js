import * as types from './mutation-types';

export default {
    /* 记录 moduleName, 用于卸载 store 中的子 module */
    [types.RECORD_MODULE_NAME] (state, { name }) {
        state.moduleName = name;
    },
    /* 更新登录信息 */
    [types.LOGIN_INFO] (state, data) {
        for (let item of Object.entries(data)) {
            state.userInfo[item[0]] = item[1];
        }
    }
}
