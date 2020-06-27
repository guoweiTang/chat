<template>
  <header class="page_header">
    <div class="login_register">
      <a href="/account/profile.html">ice</a>
      <a href="/auth/logout">退出</a>
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
          <a href="/peopleList">用户列表</a>
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
<style scoped>
.page_header{
    margin-bottom: .31rem;
    padding-bottom: .44rem;
}
nav ul{
    width: 9.38rem;
    margin: 0 auto;
}
nav li{
    float: left;
    margin-left: .16rem;
    font-size: .44rem;
    font-weight: bold;
}
nav li:first-child{
    margin-left: 0;
}
nav a{
  color: #f1f1f1;
}
.login_register{
    line-height: .44rem;
    text-align: right;
    padding-right: .63rem;
}
.login_register a{
    margin: 0 .16rem;
    color: #f1f1f1;
    font-size: .31rem;
}
</style>
