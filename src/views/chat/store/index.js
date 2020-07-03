import mutations from './mutations';
import * as actions from './actions';
import * as getters from './getters';


export default {
    namespaced: true,
    state: {
        // 活跃会话
        activeIndex: -1,
        // 已建立会话列表
        sessionList: [],
        // 所有当前页面已浏览过的消息列表Map{sessionId: []}
        messagesMap: {}
    },
    actions,
    mutations,
    getters
};
