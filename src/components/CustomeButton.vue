<template>
<div>
  <el-button type="danger" size="small" @click="renderDialog">{{options.Name}}</el-button>
  <el-dialog :title="options.Name" :visible.sync="dialogVisible" :before-close="handleClose">
    <el-form :model="updatePass" :rules="rules" ref="updatePass">
      <el-form-item>
        <el-input :disabled="true" :value="dialogData.Account">
          <template slot="prepend">账户：</template>
        </el-input>
      </el-form-item>
      <el-form-item prop="newPass">
        <el-input type="password" placeholder="请输入新密码" v-model="updatePass.newPass" auto-complete="off">
          <template slot="prepend">修改密码</template>
        </el-input>
      </el-form-item>
      <el-form-item prop="confirmPass">
        <el-input type="password" placeholder="请再次输入新密码" v-model="updatePass.confirmPass" auto-complete="off">
          <template slot="prepend">确定密码</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('updatePass')">确定</el-button>
        <el-button @click="resetForm('updatePass')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</div>
</template>

<script>
import {
  post
} from '@/config/fetch';
import {
  mapGetters
} from 'vuex';
import {
  getByKey,
  getUrlSearch
} from '@/config/common';
export default {
  name: 'customeButton',
  props: ['options', 'scope'],
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.updatePass.confirmPass !== '') {
          this.$refs.updatePass.validateField('confirmPass');
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.updatePass.newPass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      dialogVisible: false,
      dialogData: {},
      updatePass: {
        newPass: '',
        confirmPass: ''
      },
      rules: {
        newPass: [{
          validator: validatePass,
          trigger: 'blur'
        }],
        confirmPass: [{
          validator: validatePass2,
          trigger: 'blur'
        }],
      }

    }
  },
  computed: {
    ...mapGetters(['apiUrlAdmin'])
  },
  created() {

  },
  methods: {
    renderDialog() {
      this.dialogVisible = true;
      let config = this.options.DataValue.split(",");
      let path = config[0].split("&");
      let operatePath = path[0];

      if (operatePath == "null") {
        this.$notify({
          type: 'error',
          title: "Info",
          message: "未设置!",
          showClose: false
        })
        return;
      }
      let submit = getByKey(this.scope.row, config[1]);
      let urlSearch = getUrlSearch(this.scope.row, config[1]);
      let operateCode = this.options.Code;
      let userId = this.scope.row[config[1]];
      let titleName = this.options.Name;
      if (operatePath == "null") {
        this.$notify({
          type: 'error',
          title: "Info",
          message: "未设置!",
          showClose: false
        })
        return;
      }
      switch (operateCode) {
        case "CourseTrySee":
          window.open(operatePath + urlSearch);
          return;
        case "Print":
          let search = "";
          if (path.length > 1) {
            search = path[1];
          }
          post(this.apiUrlAdmin + operatePath, submit)
            .then(res => {
              if (res.Type == 0) {
                this.$notify({
                  type: 'error',
                  title: "Info",
                  message: res.Message,
                  showClose: false
                })
              } else {
                let fun = function() {
                  if (res.PrintUser.length > 0) {
                    let a = {
                      "PrintUser": res.PrintUser
                    };
                    localStorage.setItem("CredentialPrint", JSON.stringify(a));
                    window.open("/Content/Modules/Z_PrintCredentialTraining.html");
                  } else {
                    this.$notify({
                      type: 'error',
                      title: "Info",
                      message: "没有符合打印的用户！",
                      showClose: false
                    })
                  }
                };
                if (res.UnPrintUser.length > 0) {
                  let u = objectTool.join(res.UnPrintUser, "UserName", ",");
                  if (confirm("所选的用户中：" + u + "没有通过考核，是否继续？")) {
                    fun();
                  }
                } else {
                  fun();
                }
              }
            })
            .catch(e => {
              this.$notify({
                type: 'error',
                title: "Info",
                message: "连接失败!",
                showClose: false
              })

            })
          return false;
        case "UpPwd":
          post(this.apiUrlAdmin + operatePath, {
            userId: userId
          }).then(res => {
            if (res.Type && res.Type == 0) {
              this.$notify({
                type: 'error',
                title: "Info",
                message: res.Message,
                showClose: false
              })
            } else {
              this.dialogData = res;
            }
          });
          break;
        default:
          break;
      }
    },
    handleClose() {
      this.dialogVisible = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          post(this.apiUrlAdmin + '/User/UserPwdUpdate', {
            userId: this.dialogData.Id,
            old: this.dialogData.Password,
            pwd: this.updatePass.newPass
          }).then(res => {
            this.$notify({
              type: 'success',
              title: "Info",
              message: res.Message,
              showClose: false
            })
            if (res.Type == 1) {
              this.dialogVisible = false;
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
}
</script>

<style>

</style>
