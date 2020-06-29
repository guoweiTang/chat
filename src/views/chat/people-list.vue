<template>
  <div class="people_list">
    <h1>所有用户（{{formData.userList.length}}人）</h1>
    <ul class="login_userlist" v-for="(item, index) in formData.userList" :key="item.id">
      <li>
        <i>
          <img :src="item.picture" width="40" height="40" />
        </i>
        <template v-if="index === 0">
          <span>{{item.name}}（本人）</span>
          <a href="/chatMain.html" class="owner">进入会话</a>
        </template>
        <template v-else>
          <span>{{item.name}}</span>
          <a :href="'/peopleList/createSession/' + item.id">发起会话</a>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "peopleList",
  data() {
    return {
      formData: {
        userList: []
      }
    };
  },
  methods: {
    submit() {}
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 查询用户列表
      axios
        .get('/getOnlineUsers.json')
        .then(function({data}) {
          if (data.status === 1) {
            for (const user of data.result.users) {
              vm.formData.userList.push(user);
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    })
  },
};
</script>

<!-- 添加'scoped'属性后样式仅对本组件可用  -->
<style scoped>
h1{
	text-align: center;
}
.login_userlist li img{
	border-radius: 50%;
	margin-right: 10px;
}
.login_userlist li{
	line-height: 40px;
	overflow: inherit;
	padding: 5px;
	margin-top: 20px;
	border-bottom: 1px solid #eee;
}
.login_userlist li:after{
	content: '';
	display: block;
}
.login_userlist li i,
.login_userlist li span,
.login_userlist li a{
	display: inline-block;
	vertical-align: middle;
}
.login_userlist li a{
	margin-top: 5px;
	line-height: 30px;
	height: 30px;
	padding: 0 10px;
	background-color: #00b38a;
	float: right;
	border-radius: 3px;
	color: #fff;
}
.login_userlist li a.owner{
	background-color: #0081b3;
}
.login_userlist li a:hover{
	color: #fff;
	background-color: #00a57f;
}
.login_userlist li a.owner:hover{
	background-color: #0069b3;
}
</style>
