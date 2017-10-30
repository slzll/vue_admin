<template>
  <el-button size="small"
             type="primary"
             @click="handleClick">
    {{options.Name}}
  </el-button>
</template>

<script>
  import { post } from '@/config/fetch';
  import { mapGetters } from 'vuex';
  import { getByKey, getUrlSearch, addAntiForgeryToken } from '@/config/common';

  export default {
    name: 'submitParam',
    props:['scope','options','tabOptions'],
    data () {
      return {}
    },
    computed: {
      ...mapGetters(['apiUrlAdmin'])
    },
    created () {

    },
    methods: {
      handleClick(){
        let config = this.options.DataValue.split(",");
        let path = config[0].split("&");
        let operatePath = path[0];
        if (operatePath === "null") {
          alert("未设置！");
          return;
        }
        if (!confirm(this.options.Name + "吗？")) {
          return;
        }
        let submit = getByKey(this.scope.row,config[1]);
        console.log(submit);
        post(this.apiUrlAdmin + operatePath,addAntiForgeryToken(submit, $('#tab_'+this.tabOptions.Code))).then(data => {
          if (data.Type.toString() === "1") {
            this.$store.dispatch('setAlertOption',{show:true, type:'success', title:data.Message});
            this.$store.dispatch('setReload',true);
//            the.table.reload();
          } else {
            this.$store.dispatch('setAlertOption',{show:true, type:'danger', title:data.Message});
          }
        }).catch(() => {
          this.$store.dispatch('setAlertOption',{show:true, type:'danger', title:"出错了！"});
        });
      }
    },
  }
</script>

<style>

</style>
