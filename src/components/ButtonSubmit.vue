<template>
  <el-button size="small" type="danger" @click="handleClick">
    {{options.Name}}
  </el-button>
</template>

<script>
  import { post } from '@/config/fetch';
  import { mapGetters } from 'vuex';
  import { addAntiForgeryToken } from '@/config/common'

  export default {
    name: 'buttonSubmit',
    props:['scope','options', 'tabOptions'],
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
        let operatePath = this.options.DataValue;
        if (operatePath == "null") {
          alert("未设置！");
          return;
        }
        if (!confirm(this.options.Name + "吗？")) {
          return;
        }
        post(this.apiUrlAdmin + operatePath, addAntiForgeryToken({id: this.scope.row.Id}, $('#tab_'+this.tabOptions.Code)))
          .then(data => {
            if (data.Type.toString() === "1") {
              this.$store.dispatch('setAlertOption',{show:true, type:'success', title:data.Message});
              this.$store.dispatch('setReload',true);
            } else {
              this.$store.dispatch('setAlertOption',{show:true, type:'success', title:data.Message});
            }
          }).catch(() => {
          this.$store.dispatch('setAlertOption',{show:true, type:'danger', title:"出错啦！"});
        });
      }
    },
  }
</script>

<style>

</style>
