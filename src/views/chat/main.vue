<template>
  <div id="imessage">
    <session-people />
    <session-messages />
  </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapGetters } from 'vuex';
import rootStore from '../../store';
import moduleStore from './store';
const moduleScope = '/chat';
import sessionPeople from './components/session-people/main.vue';
import sessionMessages from './components/session-messages/main.vue';
import Chat from './components/chat/api';
const dialog = new Chat();

export default {
  name: "chatMain",
  components: {
    sessionPeople,
    sessionMessages,
  },
  data() {
    return {
      
    };
  },
  computed: {
    ...mapState(moduleScope, ['activeIndex', 'sessionList', 'messagesMap']),
    ...mapGetters(moduleScope, ['sessionMap']),
  },
  methods: {
    getMessageBySessionId(id) {
      return this.messagesMap[id];
    },
    getIndexBySessionId(id) {
      return this.sessionMap.get(id);
    },
    // 删除会话
    delSessionById(id) {
      let sessionIndex = this.getIndexBySessionId(id);
      let activeIndex = this.activeIndex;
      this.sessionList.splice(sessionIndex, 1);
      //更新活跃会话位置
      if (activeIndex > -1 && activeIndex > sessionIndex) {
        this.activeIndex --;
      } else if (activeIndex === sessionIndex) {
        this.activeIndex = -1;
      }
      this.messagesMap.delete(id);
      return sessionIndex;
    },
    // 添加信息
    addMsgToSessionList({ content }) {
      let { sessionId } = content;
      let index = this.getIndexBySessionId(sessionId);
      let activeIndex = this.activeIndex;
      let sourceSession = this.sessionList[index];

      if (index === undefined) {
        axios.get('/chatMain/getSessionList.json', {
          sessionId,
        })
        .then(function({data}){
          this.sessionList.unshift(data);
        })
      } else {
        sourceSession.lastMsg = content;
        // 更新活跃会话和未读值
        if (activeIndex === index) {
          this.activeIndex = 0;
          sourceSession.unreadCount = 0;
        } else {
          if (activeIndex > -1 && activeIndex < index) {
            this.activeIndex ++;
          }
          sourceSession.unreadCount++;
        }

        // 调整会话至顶部
        if (index !== 0) {
          this.sessionList.splice(index, 1);
          this.sessionList.unshift(sourceSession);
        }
      }
      
    },
    // 分页获取会话列表
    addSessionList(page = 1) {
      let _this = this;
      axios.get('/chatMain/getSessionList.json', {
        page,
      })
      .then(function({ data:{status, result} }) {
        if (status === 1) {
          result.content.forEach(function(item) {
            _this.sessionList.push(item);
          })
        }
      })
    },
  },
  /**
   * 在渲染该组件的对应路由被 confirm 前调用
   * ！！！无需修改！！！
   * ！！！无需修改！！！
   * ！！！无需修改！！！
   */
  beforeRouteEnter(to, from, next) {
    // 载入路由对应的 module store 对象
    rootStore.registerModule(moduleScope, moduleStore);
    next(vm => {
      vm.$store.dispatch('recordModuleName', moduleScope);

      // 开发代码
      vm.addSessionList();

      // dialog.connect({
      //   reconnectionAttempts: 5,
      //   query: {
      //       name: 'ice',
      //       picture: 'http://www.guoweitang.net/pig.jpg',
      //       id: '001'
      //   }
      // });
      //绑定事件
      dialog.on('connect', function() {
          console.log('connected');
      });
      dialog.on('disconnect', function() {
          console.log('disconnect');
      });
      dialog.on('reconnect', function() {
          console.log('reconnect');
      });
      dialog.on('message', function(msg) {
          console.log('原始消息如下↓');
          console.log(msg);
      });
    });
  },
};
</script>

<!-- 添加'scoped'属性后样式仅对本组件可用  -->
<style lang="less" src="./main.less"></style>
<style scoped>
</style>
