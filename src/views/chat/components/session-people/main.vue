<template>
  <div class="session_people">
    <div class="category_title">会话</div>
    <div class="people_list">
      <div v-if="sessionList.length > 0" class="had_msg">
        <dl
          v-for="item of sessionList"
          :key="item.sessionId"
          class="dialog"
          :data-session-id="item.sessionId"
        >
          <dt>
            <img width="38" height="38" :src="item.sessionIcon" />
            <i class="unread_count dn">{{item.unreadCount}}</i>
          </dt>
          <dd>
            <span
              class="time"
            >{{(new Date(item.lastMsg ? item.lastMsg.createTime : item.createTime))|formatDate}}</span>
            <h4>{{item.sessionName}}</h4>
            <p class="msg" v-if="item.lastMsg">{{item.lastMsg.msgContent}}</p>
            <i class="delete-icon" alt="删除">X</i>
          </dd>
        </dl>
      </div>
      <div v-else class="no_msg">
        还没有会话哦，去
        <a href="/peopleList">结交朋友</a>
        <span>吧！</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

const moduleScope = "/chat";
export default {
  name: "sessionPeople",
  data() {
    return {};
  },
  computed: {
    ...mapState(moduleScope, ["activeIndex", "sessionList"]),
    ...mapGetters(moduleScope, ["sessionMap"])
  },
  methods: {},
  filters: {
    formatDate: function(date) {
      var firstText = "";
      var lastText = [
        add0(date.getHours()),
        add0(date.getMinutes()),
        add0(date.getSeconds())
      ].join(":");
      var now = new Date();
      now.setHours(0, 0, 0, 0);
      var _date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      if (now.getTime() == _date.getTime()) {
        return lastText;
      } else if (now.getTime() == _date.getTime() + 1000 * 60 * 60 * 24) {
        firstText = "1天前";
      } else {
        firstText = [
          date.getFullYear(),
          date.getMonth() + 1,
          date.getDate()
        ].join("/");
      }
      return [firstText, lastText].join(" ");
    }
  }
};
function add0(num) {
  return num < 10 ? "0" + num : num;
}
</script>

<!-- 添加'scoped'属性后样式仅对本组件可用  -->
<style lang="less" scoped>
</style>
