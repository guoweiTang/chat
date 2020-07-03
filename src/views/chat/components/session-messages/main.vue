<template>
  <div class="session_messages dn">
      <div class="no_msg">聊天能拉近感情，快，让我们亲热亲热</div>
      <div class="had_msg dn">
        <div class="category_title">
          <a></a>
        </div>
        <div class="msg_content">
          <div class="main_content"></div>
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
    </div>
</template>

<script>
export default {
  name: "sessionMessages",
  data() {
    return {};
  },
  computed: {
    // ...mapState(moduleScope, ['liveCount', 'canvasWidth'])
  },
  methods: {}
};
</script>

<!-- 添加'scoped'属性后样式仅对本组件可用  -->
<style lang="less" scoped></style>
