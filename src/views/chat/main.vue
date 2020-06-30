<template>
  <div id="imessage">
    <div class="people_container">
      <div class="category_title">会话</div>
      <div class="people_list">
        <div class="no_msg">
          还没有会话哦，去
          <a href="/peopleList">结交朋友</a>
          <span>吧！</span>
        </div>
        <div class="had_msg dn"></div>
      </div>
    </div>
    <div class="msg_container dn">
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
  </div>
</template>

<script>
export default {
  name: "chatMain",
  data() {
    return {
      formData: {
        userList: []
      }
    };
  },
  methods: {
    submit() {}
  }
};
</script>

<!-- 添加'scoped'属性后样式仅对本组件可用  -->
<style lang="less" src="./main.less"></style>
<style scoped>
</style>
