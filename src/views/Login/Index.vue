<template>
  <div class="login-page">
    <div class="login-form">
      <ul class="tab">
        <li
          :class="{ active: tab.name === activeTab }"
          v-for="tab in tabs"
          :key="tab.id"
          @click="toggleTab(tab)"
        >
          {{ tab.text }}
        </li>
      </ul>
      <el-form
        :model="form"
        ref="form"
        status-icon
        :rules="rules"
        class="form-body"
        size="medium"
      >
        <el-form-item prop="email" class="form-item">
          <label>邮箱</label>
          <el-input
            type="text"
            v-model="form.email"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" class="form-item">
          <label>密码</label>
          <el-input
            type="password"
            v-model="form.password"
            auto-complete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="rePassword"
          class="form-item"
          v-if="tabs[1].name === activeTab"
        >
          <label>重复密码</label>
          <el-input
            type="password"
            v-model="form.rePassword"
            auto-complete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item prop="authCode" class="form-item">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="16">
              <el-input
                v-model="form.authCode"
                auto-complete="off"
                maxlength="6"
                minlength="6"
              ></el-input>
            </el-col>
            <el-col :span="8">
              <el-button
                type="success"
                class="btn-block"
                @click="getCode"
                :disabled="sendCode > 0"
                >{{ sendCode ? `等待${sendCode}秒` : "发送验证码" }}</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item class="form-actions">
          <el-button type="danger" @click="submit" :disabled="!submitable">
            {{ activeTab === "login" ? "登陆" : "注册" }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import validation from "../../utils/validation.rule";
import { authCode, register } from "../../api/login";
import { ElForm } from "element-ui/types/form";
class Tab {
  constructor(name: string, text: string) {
    this.name = name;
    this.text = text;
  }
  name: string;
  text: string;
}

@Component
export default class Login extends Vue {
  public $refs!: {
    form: ElForm;
  };

  private activeTab = "login";
  private submitable = false;
  private requiring = false;
  private sendCode = 0;
  private tabs: Tab[] = [new Tab("login", "登陆"), new Tab("signup", "注册")];
  private form = {
    email: "",
    password: "",
    rePassword: "",
    authCode: ""
  };
  private rules: object = {
    email: [
      { validator: validation.email, trigger: "blur" },
      { required: true, message: "请输入邮箱", trigger: "blur" }
    ],
    password: [
      {
        validator: (
          rule: unknown,
          value: string | undefined,
          callback: Function
        ) => {
          const reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/g;
          if (!value) callback();
          else if (!reg.test(value)) {
            callback(new Error("密码为6-20位的数字和字母"));
          } else callback();
        },
        trigger: "blur"
      },
      { required: true, message: "请输入密码", trigger: "blur" }
    ],
    rePassword: [
      { required: true, message: "请再次输入密码", trigger: "blur" },
      {
        validator: (
          rule: unknown,
          value: string | undefined,
          callback: Function
        ) => {
          if (!value) callback();
          else if (this.tabs[1].name !== this.activeTab) callback();
          else if (this.form.password == value) callback();
          else callback(new Error("两次输入密码不一致"));
        },
        message: "两次输入密码不一致",
        trigger: "blur"
      }
    ],
    authCode: [
      {
        validator: (
          rule: unknown,
          value: string | undefined,
          callback: Function
        ) => {
          const reg = /^[0-9a-zA-Z]{6}$/g;
          if (!value || !reg.test(value)) callback(new Error("请输入验证码"));
          else callback();
        },
        trigger: "blur"
      },
      { required: true, message: "请输入验证码", trigger: "blur" }
    ]
  };

  toggleTab(tab: Tab) {
    this.activeTab = tab.name;
    this.$refs.form.resetFields();
    this.submitable = false;
    this.sendCode = 0;
  }

  getCode() {
    const fields = ["email", "password"];
    if (this.activeTab === "signup") fields.push("rePassword");
    const _method = this.activeTab === "login" ? "login" : "register";
    let _promise = Promise.resolve(),
      _success = true;
    this.$refs.form.validateField(fields, error => {
      if (error) {
        _promise = _promise.then(this.$root.$nextTick).then(() => {
          this.$root.$message.error(error);
        });
        _success = false;
        return;
      }
    });
    if (!_success) return;
    authCode(this.form.email, _method)
      .then(response => {
        this.submitable = true;
        this.sendCode = 120;
        this.$message.success(response.data.message);
        this.countDownSend();
      })
      .catch(error => {
        this.submitable = false;
        this.$message.error(error.message);
      });
  }
  countDownSend() {
    this.sendCode--;
    if (this.sendCode > 0) setTimeout(this.countDownSend, 1000);
  }
  submit() {
    this.$refs.form.validate(valid => {
      if (valid) {
        if (this.activeTab === "signup")
          register(this.form.email, this.form.password, this.form.authCode)
            .then(response => {
              this.submitable = true;
              this.$message.success(response.data.message);
            })
            .catch(error => {
              this.submitable = true;
              this.$message.error(error.message);
            });
        else
          this.$store
            .dispatch("app/login", this.form)
            .then(response => {
              this.$message.success(response.data.message);
              this.$router.push({
                name: "dashboard"
              });
            })
            .catch(error => {
              this.$message.error(error.message);
            });
      } else {
        console.log("error submit");
        return false;
      }
    });
  }
}
</script>
<style lang="scss" scoped>
$backgroud: #344a5f;
.login-page {
  background-color: $backgroud;
  height: 100vh;
  .login-form {
    width: 330px;
    margin: auto;
    .tab {
      text-align: center;
      li {
        display: inline-block;
        width: 88px;
        height: 36px;
        line-height: 36px;
        font-size: 14px;
        border-radius: 2px;
        color: #fff;
        cursor: pointer;
        &.active {
          background-color: darken($color: $backgroud, $amount: 10%);
        }
        &:hover:not(.active) {
          background-color: darken($color: $backgroud, $amount: 8%);
        }
      }
    }
    .form-body {
      margin-top: 29px;
      .btn-block {
        display: block;
        width: 100%;
      }
      .form-item {
        margin-bottom: 13px;
        label {
          display: block;
          font-size: 14px;
          color: #fff;
          margin-bottom: 3px;
        }
      }
      .form-actions {
        margin-top: 19px;
        button {
          @extend .btn-block;
        }
      }
    }
  }
}
</style>
