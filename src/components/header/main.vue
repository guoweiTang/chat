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
