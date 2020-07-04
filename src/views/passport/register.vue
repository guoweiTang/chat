<template>
  <div class="login">
    <h1>注册</h1>
    <validation-observer ref="form" v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(submit)" method="POST">
        <label class="row_full">
          <validation-provider rules="required|minmax:2,6" v-slot="{ errors }">
            <input v-model="formData.user" type="text" name="用户名" placeholder="请输入用户名" />
            <span class="error">{{ errors[0] }}</span>
          </validation-provider>
        </label>
        <label class="row_full">
          <validation-provider rules="required|min:6" v-slot="{ errors }" vid="密码">
            <input v-model="formData.password" type="password" name="密码" placeholder="请输入密码" />
            <span class="error">{{ errors[0] }}</span>
          </validation-provider>
        </label>
        <label class="row_full">
          <validation-provider rules="required|min:6|confirmed:密码" v-slot="{ errors }">
            <input v-model="formData.repassword" type="password" name="确认密码" placeholder="请确认密码" />
            <span class="error">{{ errors[0] }}</span>
          </validation-provider>
        </label>
        <p v-if="errMsg" class="error">{{errorMsg}}</p>
        <label class="row_full">
          <input type="submit" value="注册" />
        </label>
        <p class="quick_link">
          已有账号，
          <router-link :to="{ name: 'login' }">立即注册</router-link>
        </p>
      </form>
    </validation-observer>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "login",
  data() {
    return {
      formData: {
        user: "",
        password: "",
        repassword: ""
      },
      errMsg: ""
    };
  },
  methods: {
    submit() {
      let _this = this;
      _this.$refs.form.validate().then(success => {
        if (!success) {
          return;
        }
        axios
          .post("/auth/register.json", {
            ..._this.formData
          })
          .then(function({ data }) {
            if (data.status === 1) {
              _this.errMsg = "";
              location.href = data.result.url;
            } else {
              _this.errMsg = data.message;
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      });
    }
  }
};
</script>

<!-- 添加'scoped'属性后样式仅对本组件可用  -->
<style lang="less" src="./main.less"></style>
<style scoped>
</style>
