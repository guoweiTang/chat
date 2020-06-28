import mutations from './mutations';
import * as actions from './actions';
import * as getters from './getters';


export default {
    namespaced: true,
    state: {
        liveCount: 0,
        canvasWidth: 120,
    },
    actions,
    mutations,
    getters
};
