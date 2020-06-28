<template>
  <footer class="page_footer">
    <p>
      &copy;2020 果味糖
      <a href="http://www.miitbeian.gov.cn/" target="_blank">京ICP备17067717号-1</a>
    </p>
  </footer>
</template>

<script>
export default {
  name: "appFooter"
};
</script>
<style lang="less" scoped>
.page_footer{
  margin-top: .31rem;
  text-align: center;
  color: #999;
  font-size: 10px;
}
.page_footer a{
  font-size: 10px;
  color: #999;
}
@media screen and (min-width: 400px) {
  .page_footer {
    font-size: 14px;
    a {
      font-size: 14px;
    }
  }
}
</style>>
