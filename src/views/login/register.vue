<template>
  <div class="login-container">
    <el-form ref="registerForm" :model="registerForm" :rules="registerRules" class="login-form" autocomplete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">注册账号</h3>
        <h5 style="color: red;text-align: center;">{{caution}}</h5>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          v-model="registerForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"/>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="lock" />
        </span>
        <el-input
          ref="password"
          v-model="registerForm.password"
          placeholder="密码"
          name="password"
          type="password"
          tabindex="2"
          autocomplete="on"
          @keyup.native="checkCapslock"
          @keyup.enter.native="handleLogin"/>
      </el-form-item>
      <el-form-item prop="checkPassword">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          ref="checkPassword"
          v-model="registerForm.checkPassword"
          placeholder="再次密码"
          name="checkPassword"
          type="password"
          tabindex="3"
          autocomplete="on"/>
      </el-form-item>
      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="email">
          <span class="svg-container">
            <svg-icon icon-class="email" />
          </span>
          <el-input
            ref="email"
            type="email"
            v-model="registerForm.email"
            placeholder="邮箱"
            tabindex="4"
            @blur="capsTooltip = false"
            name="email"/>
          <el-button class="show-pwd" style="background-color: none;" @click="sendMail" :loading="codeLoading" type="text">获取验证码</el-button>
        </el-form-item>
      </el-tooltip>

      <el-form-item prop="captcha">
        <span class="svg-container">
          <svg-icon icon-class="edit" />
        </span>
        <el-input
          ref="captcha"
          v-model="registerForm.captcha"
          placeholder="验证码"
          name="captcha"/>
      </el-form-item>

      <el-button v-if="buttonToggle === '1'" :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleRegister">注册</el-button>
      <el-button v-if="buttonToggle === '2'" :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="goToLogin">转到登入页</el-button>
      <el-button v-if="buttonToggle === '3'" :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="goToLogin">找回密码</el-button>
    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
// import { getRouter } from '@/api/navList'

export default {
  name: 'Reginster',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入用户名'))
      } else {
        this.$ajax.get('sys/user/verifyUserName?userName=' + this.registerForm.username).then((res) => {
          if (res.code === 200) {
            callback()
          } else {
            callback(new Error(res.msg))
          }
        }, (error) => {
          this.$message.error(error);
        }) 
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('请输入至少六位密码'))
      } else {
        callback()
      }
    };
    var validateCheckPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    const validateCode = (rule, value, callback) => {
      if (value != '' && value.length != 6) {
        callback(new Error('请输入六位验证码'))
      } else {
        callback()
      }
    };
    return {
      registerForm: {
        username: '',
        password: '',
        checkPassword: '',
        email: '',
        captcha: ''
      },
      registerRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        checkPassword: [{ required: true, trigger: 'blur', validator: validateCheckPassword }],
        captcha: [{ required: true, trigger: 'blur', validator: validateCode }]
      },
      capsTooltip: false,
      loading: false,
      codeLoading: false,
      buttonToggle: '1',
      redirect: undefined,
      caution: '',
      otherQuery: {}
    }
  },

  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
        }
      },
      immediate: true
    }
  },
  methods: {
    // 验证密码
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },

    // 跳转 登入页面
    goToLogin(){
      this.$router.push({ path: '/login'})
    },

    // 验证 用户名
    verifyUserName(){
      this.$ajax.get('sys/user/verifyUserName?userName=' + this.registerForm.username).then((res) => {
        if (res.code === 201) {
          return res.msg;
        }
      })
    },

    // 发送 验证码
    sendMail(){
      if (this.registerForm.email != '') {
        this.codeLoading = true
        this.$ajax.post('sys/index/sendMail', {
          to: this.registerForm.email
        }).then((res) => {
          this.$message({
            message: res.msg,
            type: res.code === 200 ? 'success' : 'error'
          });
          this.buttonToggle = (res.code === 201 ? '3' : '1');
        })
        this.codeLoading = false
      }
    },

    // 登入 提交事件
    handleRegister() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$ajax.post('sys/login/register',this.registerForm).then((res) => {
            this.$message({
              message: res.msg,
              type: res.code === 200 ? 'success' : 'error'
            });
            this.buttonToggle = res.code === 200 ? '2' : '1';
            this.loading = false
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .el-button.is-loading:before {
    background-color:transparent;
  }
  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
