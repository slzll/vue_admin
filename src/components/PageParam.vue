<template>
<div>
  <el-button size="small" type="primary" @click="dialogVisible = true">
    {{options.Name}}
  </el-button>
  <el-dialog :title="options.Name" :visible.sync="dialogVisible" :before-close="handleClose">
    <tab-pane-content :name="options.Code" :tab-options="tabOptions"></tab-pane-content>
  </el-dialog>
</div>
</template>

<script>
import TabPaneContent from "@/components/TabPaneContent";

export default {
  components:{
    TabPaneContent
  },
  name: 'PageParam',
  props: ['scope', 'options', 'tabOptions'],
  data() {
    return {
      dialogVisible: false
    }
  },
  computed: {},
  created() {

  },
  methods: {
    handleClose() {
      this.dialogVisible = false
      console.log("close");
    }
  }
}
</script>

<style>

</style>
