<template>
  <div class="session_messages">
    <div class="had_msg">
      <div @click="$emit('set-active')" class="category_title">{{sessionName}}</div>
      <div class="msg_content">
        <div class="bubble_layer" v-for="(item, index) of messages" :key="item.msgId">
          <div class="time_line">
            <span class="line"></span>
            <span class="time">{{item.createTime}}</span>
            <span class="line"></span>
          </div>
          <dl :class="['msg_bubble', {myself: index % 2}]">
            <dt>
              <img :src="sessionIcon" width="38" height="38" />
            </dt>
            <dd>
              <span class="arrow"></span>
              <pre>{{item.msgContent}}</pre>
            </dd>
          </dl>
        </div>
      </div>
      <div class="session_form">
        <form @submit.prevent="sendMsg">
          <div class="emoji_content dn">
            <i class="arrow"></i>
          </div>
          <div class="enter_entry">
            <i class="icons icon-emoji"></i>
            <input v-model="msg" @keyup.enter="sendMsg" class="text_area" placeholder="输入文本信息">
            <input type="submit" value="发送" class="submit" />
          </div>
        </form>
      </div>
    </div>
    <!-- <div class="no_msg">聊天能拉近感情，快，让我们亲热亲热</div> -->
  </div>
</template>

<script>
import { getStringByImage } from "../chat/emoji/emoji";
import axios from "axios";

function getSessionData(vm, attr) {
  let activeIndex = vm.$props.activeIndex;
  let res;
  if (activeIndex > -1) {
    res = vm.$props.sessionList[activeIndex][attr];
  }
  return res || "";
}

export default {
  name: 'sessionMessages',
  props: ['dialog', 'activeIndex', 'sessionList', 'messages'],
  data() {
    return {
      msg: '',
    };
  },
  computed: {
    sessionName(){
      return getSessionData(this, 'sessionName');
    },
    sessionIcon(){
      return getSessionData(this, 'sessionIcon');
    },
    sessionId(){
      return getSessionData(this, 'sessionId');
    },
  },
  methods: {
    sendMsg() {
      let _this = this;
      let msg = this.msg.replace(/^(&nbsp;\s?)+|(&nbsp;\s?)+$/gm, '').trim();
      if (msg === '') {
        return false;
      }
      msg = getStringByImage(msg);
      axios
        .get('/chatMain/sendMsg.json', {
          params: {
            sessionId: _this.sessionId,
            msgType: 0,
            senderId: _this.sessionId.split('-')[0],
            msgContent: msg,
            createTime: new Date()
          }
        })
        .then(function({ data }) {
          _this.msg = '';
          console.log(data);
          // _this.$props.dialog.emit('message', data.content, function() {
          //   console.log('SEND OK!');
          // });
        });
    }
  }
};
</script>

<!-- 添加'scoped'属性后样式仅对本组件可用  -->
<style lang="less" scoped>
.category_title {
  height: 1.25rem;
  line-height: 1.25rem;
  border-bottom: 1px solid #dce0e0;
  font-size: 22px;
  font-weight: bold;
  text-align: center;
}
.session_messages,
.had_msg,
.no_msg {
  height: 100%;
}
.session_messages {
  position: relative;
  .no_msg {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 100%;
    font-size: 16px;
    line-height: 30px;
    text-align: center;
  }
  .category_title {
    position: relative;
    &:before {
      content: "<";
      font-size: 0.63rem;
      position: absolute;
      left: 0.38rem;
      top: 0;
      color: #3dca99;
    }
  }
  .time_line {
    text-align: center;
    padding-top: 22px;
    span {
      display: inline-block;
      vertical-align: middle;
    }
  }
  .line {
    height: 1px;
    width: 20px;
    background-color: #dce0e0;
    margin: 0 6px;
  }
  .time {
    font-size: 12px;
    color: #999;
  }
}
.msg_content {
  height: calc(100% - 2.5rem);
  padding: 0 0.4rem;
  overflow-y: scroll;
}
.msg_bubble {
  zoom: 1;
  padding-top: 22px;
  &:before,
  &:after {
    content: "";
    display: table;
  }
  &:after {
    clear: both;
  }
  dt,
  dd {
    float: left;
  }
  dt {
    position: relative;
    width: 12%;
    padding-top: 12%;
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
    }
  }
  dd {
    position: relative;
    max-width: calc(88% - 16px);
    background-color: #e9eeef;
    margin: 0 0 0 16px;
    padding: 10px 16px;
    box-sizing: border-box;
    border-radius: 6px;
    line-height: 22px;
  }
}
.myself {
  dt,
  dd {
    float: right;
  }
  dd {
    background-color: #3dca99;
    color: #fff;
    margin: 0 16px 0 0;
  }
  .arrow {
    left: auto;
    right: -5px;
    background-image: url(../../../../assets/img/arrow2.png);
  }
}
.arrow {
  display: block;
  position: absolute;
  left: -5px;
  top: 7px;
  width: 5px;
  height: 11px;
  background: url(../../../../assets/img/arrow.png) no-repeat;
}
.session_form {
  position: relative;
  height: 1.25rem;
  box-sizing: border-box;
  border-top: 1px solid #dce0e0;
  text-align: center;
  background-color: #fff;
  white-space: nowrap;
  form {
    display: inline-block;
  }
  .icons {
    font-size: 24px;
    vertical-align: middle;
    cursor: pointer;
    &:hover {
      color: #3dca99;
    }
  }
}
.emoji_content {
  position: absolute;
  left: 0;
  bottom: 1.25rem;
  border: 1px solid #dce0e0;
  background-color: #fff;
  padding: 0.13rem;
  text-align: left;
  border-radius: 3px;
  white-space: normal;
  .arrow {
    display: block;
    position: absolute;
    left: 10px;
    bottom: -7px;
    width: 16px;
    height: 7px;
    background: url(../../../../assets/img/down-tips.png) no-repeat;
    transform: rotate(180deg);
  }
  .emoji {
    display: inline-block;
    width: 24px;
    height: 24px;
    padding: 2px;
    cursor: pointer;
    &:hover {
      background-color: #eee;
    }
  }
}
.enter_entry {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: calc(1.25rem - 1px);
  input[type="submit"] {
    width: 20%;
    height: 1rem;
    border-radius: 0.31rem;
    background-clip: padding-box;
    border: none;
    background-color: #3dca99;
    color: #fff;
    font-size: 0.38rem;
  }
}
.text_area {
  resize: none;
  vertical-align: middle;
  box-sizing: border-box;
  height: 1rem;
  padding: 0.2rem 0.3rem;
  line-height: 0.6rem;
  width: 60%;
  border: 1px solid #dce0e0;
  font-size: 12px;
  text-align: left;
  overflow: hidden;
  img {
    width: 18px;
    vertical-align: middle;
  }
}
.bubble_layer:nth-last-of-type(1) {
  padding-bottom: 0.4rem;
}
@media screen and (min-width: 400px) {
  .text_area {
    font-size: 14px;
  }
}
</style>
