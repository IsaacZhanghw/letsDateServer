<template>
  <div class="login" v-loading="loading">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">后台管理系统</span>
      </div>
      <el-form :model="loginUser" :rules="rules" ref="loginForm" class="loginForm" label-width="70px">
        <el-form-item label="微信号" prop="weichatid">
          <el-input v-model="loginUser.weichatid" placeholder="请输入微信号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginUser.password" placeholder="输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登 录</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";

export default {
  name: "login",
  data() {
    return {
      loading: false,
      loginUser: {
        weichatid: "",
        password: ""
      },
      rules: {
        weichatid: [
          { required: true, message: "微信号不能为空", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          this.$axios.post("/api/date/login", this.loginUser).then(res => {
            if (res.data.errcode) {
              this.loading = false;
              this.$message.error(res.data.errmsg);
              return;
            }
            // 登录成功
            const { token } = res.data;
            // localStorage.setItem("eleToken", token);
            sessionStorage.setItem("eleToken", token);

            // 解析token
            const decode = jwt_decode(token);
            // 存储数据
            this.$store.dispatch("setIsAutnenticated", !this.isEmpty(decode));
            this.$store.dispatch("setUser", decode);
            this.loading = false;
            // 页面跳转
            this.$router.push("/index");
          });
        }
      });
    },
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
};
</script>

<style scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/login.gif) repeat center center;
  background-size: 340px 340px;
}
.form_container {
  width: 370px;
  height: 210px;
  border-radius: 5px;
  text-align: center;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #f9b62d;
}
.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a {
  color: #409eff;
}
</style>


