<template>
  <header class="page_header">
    <div class="login_register">
      <a href="/auth/login.html">登录</a>
      <a href="/auth/register.html">注册</a>
    </div>
    <nav>
      <ul class="clearfix">
        <li>
          <a href="/">首页</a>
        </li>
        <li>
          <a href="/account/profile.html">我的</a>
        </li>
        <li>
          <a href="/peopleList.html">用户列表</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "appHeader"
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
