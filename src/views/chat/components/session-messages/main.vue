<template>
  <div class="session_messages">
    <div class="had_msg">
      <div @click="$emit('set-active')" class="category_title">{{sessionName}}</div>
      <div class="msg_content">
        <div class="bubble_layer" v-for="item of messages" :key="item.msgId">
          <div class="time_line">
            <span class="line"></span>
            <span class="time">{{item.createTime}}</span>
            <span class="line"></span>
          </div>
          <dl :class="['msg_bubble', {myself: item.senderId === item.sessionId.split('-')[0]}]">
            <dt>
              <img width="38" height="38" />
            </dt>
            <dd>
              <span class="arrow"></span>
              <pre>{{item.msgContent}}</pre>
            </dd>
          </dl>
        </div>
      </div>
      <div class="session_form">
        <form novalidate>
          <div class="emoji_content dn">
            <i class="arrow"></i>
          </div>
          <div class="enter_entry">
            <i class="icons icon-emoji"></i>
            <div class="text_area" placeholder="输入文本信息" contenteditable></div>
            <input type="submit" value="发送" class="submit" />
          </div>
        </form>
      </div>
    </div>
    <!-- <div class="no_msg">聊天能拉近感情，快，让我们亲热亲热</div> -->
  </div>
</template>

<script>
export default {
  name: "sessionMessages",
  props: ["activeIndex", "sesionList", "messages"],
  data() {
    return {};
  },
  computed: {
    sessionName() {
      // let activeIndex = this.activeIndex;
      // let res;
      // if (activeIndex > -1) {
      //   console.log(this.sesionList[activeIndex])
      //   res = this.sesionList[activeIndex].sessionName
      // }
      return 0 || '';
    },
    
    // ...mapState(moduleScope, ['liveCount', 'canvasWidth'])
  },
  methods: {}
};
</script>

<!-- 添加'scoped'属性后样式仅对本组件可用  -->
<style lang="less" scoped></style>
