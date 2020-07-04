<template>
  <header class="page_header">
    <div class="login_register">
      <template v-if="isLogin">
      <router-link :to="{ name: 'profile' }">{{userInfo.nickName}}</router-link>
      <a href="/auth/logout">退出</a>
      </template>
      <template v-else>
      <router-link :to="{ name: 'login' }">登录</router-link>
      <router-link :to="{ name: 'register' }">注册</router-link>
      </template>
    </div>
    <nav>
      <ul class="clearfix">
        <li>
          <router-link :to="{ name: 'index' }">首页</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'profile' }">我的</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'peopleList' }">用户列表</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
  name: "appHeader",
  computed: {
    ...mapState(['userInfo']),
    ...mapGetters(['isLogin']),
  }
};
</script>
<style lang="less" scoped>
.page_header {
  margin-bottom: 0.31rem;
  padding-bottom: 0.44rem;
  background: url(./img/bg.png) repeat-x;
  background-size: 0.03rem 1.25rem;
}
nav {
  ul {
    width: 9.38rem;
    margin: 0 auto;
  }
  li {
    float: left;
    margin-left: 0.16rem;
    font-size: 14px;
    font-weight: bold;
    &:first-child {
      margin-left: 0;
    }
  }
  a {
    color: #f1f1f1;
  }
}
.login_register {
  line-height: 0.44rem;
  text-align: right;
  padding-right: 0.63rem;
  a {
    margin: 0 0.16rem;
    color: #f1f1f1;
    font-size: 12px;
  }
}
@media screen and (min-width: 400px) {
  .login_register {
    a {
      font-size: 14px;
    }
  }
  nav {
    li {
      font-size: 18px;
    }
  }
}
</style>
