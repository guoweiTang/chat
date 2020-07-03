<template>
  <div id="imessage">
    <session-people
      v-show="activeIndex < 0"
      :activeIndex="activeIndex"
      :sessionList="sessionList"
      @check-session="checkSession"
     />
    <session-messages
      v-show="activeIndex >= 0"
      :activeIndex="activeIndex"
      :sessionList="sessionList"
      :messages="messages"
      @set-active="setActive"
     />
  </div>
</template>

<script>
import axios from 'axios';
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
      // 活跃会话
      activeIndex: -1,
      // 已建立会话列表
      sessionList: [],
      // 所有当前页面已浏览过的消息列表Map{sessionId: []}
      messagesMap: {},
      messages: [],
    };
  },
  computed: {
    sessionMap() {
      let map = new Map();
      this.sessionList.forEach(function(item, index) {
        map.set(item.sessionId, index);
      })
      return map;
    }
  },
  methods: {
    checkSession(index, sessionId) {
      let _this = this;
      this.setActive(index);
      let messages = this.getMessageBySessionId(sessionId);
      console.log(messages)
      if (messages) {
        this.messages = messages;
        // messages.forEach(function(msg) {
        //   this.messages.push(msg);
        // })
      } else {
        this.getMessages(sessionId).then(function(res) {
          _this.messages = res;
          // console.log(res);
          // res.forEach(function(msg) {
          //   this.messages.push(msg);
          // })
        })
      }
    },
    setActive(index = -1) {
      this.activeIndex = index;
    },
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
      delete this.messagesMap[id];
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
    getSessionList(page = 1) {
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
    // 分页获取会话列表
    getMessages(sessionId) {
      let promise = new Promise(function(resolve, reject) {
        axios.get('/chatMain/getMessages.json', {
          sessionId,
        })
        .then(function({ data:{status, result, message} }) {
          if (status === 1) {
            resolve(result.content);
          } else {
            reject(message);
          }
        })
      })
      return promise;
    },
  },
  /**
   * 在渲染该组件的对应路由被 confirm 前调用
   */
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 开发代码
      vm.getSessionList();

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
