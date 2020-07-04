<template>
  <div class="session_people">
    <div class="category_title">会话</div>
    <div class="people_list">
      <div v-if="sessionList.length > 0" class="had_msg">
        <dl
          v-for="(item, index) of sessionList"
          :key="item.sessionId"
          :class="['dialog', {active: activeIndex === index}]"
          :data-session-id="item.sessionId"
          @click="$emit('check-session', index, item.sessionId)"
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

export default {
  name: "sessionPeople",
  props:['activeIndex', 'sessionList'],
  data() {
    return {};
  },
  computed: {

  },
  methods: {
    
  },
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
.category_title {
  height: 1.25rem;
  line-height: 1.25rem;
  border-bottom: 1px solid #dce0e0;
  font-size: 22px;
  font-weight: bold;
  text-align: center;
}
.people_list {
  height: calc(100% - 1.25rem);
  overflow-y: scroll;
  .no_msg {
    margin: 40px 0;
    text-align: center;
    a {
      color: #00b38a;
    }
  }
}
.session_people {
  dl {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px dashed #dce0e0;
    padding: 0.25rem;
    cursor: default;
    &:hover,
    &.active {
      background-color: #e9eeef;
      .delete-icon {
        display: block;
      }
    }
  }
  dt {
    width: 1rem;
    height: 1rem;
    position: relative;
  }
  img {
    width: 100%;
    height: 100%;
  }
  dd {
    width: 7rem;
  }
  .unread_count {
    position: absolute;
    right: -11px;
    top: -11px;
    box-sizing: border-box;
    padding: 0 4px;
    min-width: 22px;
    height: 22px;
    border: 2px solid #fff;
    border-radius: 11px;
    color: #fff;
    background-color: #ff5842;
    text-align: center;
    line-height: 18px;
    font-size: 12px;
    font-family: Arial;
  }
  .more:after {
    content: "+";
    position: relative;
    top: -2px;
  }
  .delete-icon {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: none;
    position: absolute;
    z-index: 1;
    right: 10px;
    top: 8px;
    text-align: center;
    background-color: #f00;
    color: #fff;
    line-height: 20px;
    font-size: 12px;
  }
  .time {
    width: 124px;
    position: absolute;
    right: 16px;
    top: 0;
    color: #999;
    font-size: 12px;
    text-align: right;
  }
  h4 {
    width: calc(100% - 140px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    font-size: 14px;
    font-weight: bold;
    line-height: 20px;
    margin: 0;
  }
  .msg {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    color: #777777;
    line-height: 26px;
  }
  // 表情图片
  .emoji {
    width: 18px;
    vertical-align: middle;
    margin: 0 2px;
  }
}
</style>
