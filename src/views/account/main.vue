<template>
  <div class="profile">
    <form
      id="uploadFile"
      target="uploadIframe"
      action="/account/uploadPicture.json"
      method="POST"
      enctype="multipart/form-data"
    >
      <label class="head_pic">
        <img id="portraitImage" :src="headIcon" alt="头像" width="96" height="96" />
        <input
          @change="handleUpdatePic($event.target)"
          type="file"
          name="headIcon"
        />
      </label>
    </form>
    <validation-observer v-slot="{ handleSubmit }">
      <form id="profileForm" @submit.prevent="handleSubmit(submit)">
        <input type="hidden" name="headIcon" :value="headIcon" />
        <label class="row_full">
          <validation-provider rules="required|min:3|max:5" v-slot="{ errors }">
            <input v-model="nickName" type="text" name="用户名" />
            <span class="error">{{ errors[0] }}</span>
          </validation-provider>
        </label>
        <label class="row_full">
            <input type="submit" value="保存" />
        </label>
      </form>
    </validation-observer>
    <iframe
      @load="getUpdatedPic($event.target)"
      name="uploadIframe"
      frameborder="0"
      style="display: none;"
    ></iframe>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from 'vuex';

export default {
  name: "profile",
  data() {
    return {
      nickName: "",
      headIcon: "",
    };
  },
  computed: {
    ...mapState(['userInfo']),
  },
  methods: {
    getUpdatedPic(target) {
      let resultWrapper = target.contentWindow.document.querySelectorAll(
        "pre"
      )[0];
      if (!resultWrapper) {
        return;
      }
      let res = JSON.parse(resultWrapper.text);
      if (res.status === 1) {
        this.headIcon = res.result.picture;
      } else {
        alert(res.message);
      }
    },
    handleUpdatePic(target) {
      if (target.files.length) {
        document.querySelector("#uploadFile").submit();
      }
    },
    submit() {
      axios
        .post("/account/uploadProfile.json", {
          
        })
        .then(function(data) {
          if (data.status === 1) {
            alert("保存成功");
          } else {
            alert(data.message);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      let {nickName, headIcon} = vm.userInfo;
      vm.nickName = nickName;
      vm.headIcon = headIcon;
    })
  }
};
</script>

<!-- 添加'scoped'属性后样式仅对本组件可用  -->
<style scoped>
#uploadFile {
  margin-bottom: 20px;
}
form {
  width: 8.75rem;
  margin: 0 auto;
}
.head_pic {
  margin: 0 auto;
  position: relative;
  display: block;
  width: 96px;
  height: 96px;
}
.head_pic img {
  position: absolute;
  left: 0;
  top: 0;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  border: 1px solid #eee;
}
.head_pic [type="file"] {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  width: 96px;
  height: 96px;
  opacity: 0.01;
}
input[type="text"],
input[type="password"] {
  width: 100%;
  height: 40px;
  padding: 5px;
  border-color: #e1e1e1;
  text-align: left;
}
input + input {
  margin-top: 20px;
}
input[type="submit"] {
  width: 50%;
  height: 40px;
  background-color: #00b38a;
  border: 1px solid #00b38a;
  color: #fff;
  font-size: 24px;
}
</style>
