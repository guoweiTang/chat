<template>
  <div class="login">
    <h1>登录</h1>
    <validation-observer v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(submit)" method="POST">
      <label class="row_full">
        <validation-provider rules="required|minmax:3,5" v-slot="{ errors }">
          <input v-model="formData.user" type="text" name="用户名" placeholder="请输入用户名" />
          <span class="error">{{ errors[0] }}</span>
        </validation-provider>
      </label>
      <label class="row_full">
        <validation-provider rules="required|min:6" v-slot="{ errors }">
          <input v-model="formData.password" type="password" name="密码" placeholder="请输入密码" />
          <span class="error">{{ errors[0] }}</span>
        </validation-provider>
      </label>
      <p v-if="errMsg" class="error">{{errorMsg}}</p>
      <label class="row_full"><input type="submit" value="登录" /></label>
      <p class="quick_link">
        还没账号，
        <router-link :to="{ name: 'register' }">立即注册</router-link>
      </p>
    </form>
    </validation-observer>
  </div>
</template>

<script>
import axios from "axios";
import { extend } from 'vee-validate';
import { mapActions } from 'vuex';
// 注册自定义校验规则
extend('minmax', {
  validate(value, args) {
    const length = value.length;

    return length >= args.min && length <= args.max;
  },
  params: ['min', 'max'],
  message: '{_field_}必须至少{min}个字符并且最多{max}个字符',
});

export default {
  name: "login",
  data() {
    return {
      value:'',
      formData: {
        user: "",
        password: ""
      },
      errMsg: ""
    };
  },
  computed: {
    // ...mapGetters(['isLogin'])
  },
  methods: {
    ...mapActions(['setLoginInfo']),
    submit() {
      let  _this= this;
      axios
        .post('/auth/login.json', {
          ..._this.formData
        })
        .then(function({data}) {
          if (data.status === 1) {
            _this.errMsg = '';
            _this.setLoginInfo(data.result.userInfo);

            let redirect = _this.$route.query.redirect;
            _this.$router.push('/peopleList.html');
            _this.$router.push(redirect || {
              name: 'index'
            });
          } else {
            _this.errMsg = data.message;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<!-- 添加'scoped'属性后样式仅对本组件可用  -->
<style lang="less" src="./main.less"></style>
