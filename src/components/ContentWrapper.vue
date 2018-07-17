<template>
<div class="page-content-wrapper">
  <div class="page-content">
    <div class="page-tabs">
      <el-tabs v-model="activeName" type="border-card" @tab-remove="removeTab" @tab-click="getTabMenu">
        <el-tab-pane id="home" name="home">
          <span slot="label"><i class="el-icon-fa-home"></i> 主页</span>
          <home></home>
        </el-tab-pane>
        <el-tab-pane v-for="(list,index) in tabMenus" :id="'tab_'+list.Code" :label="list.menuname" :name="list.Code" :key="list.menuid" closable>
          <tab-pane-content :name="list.Code" :tab-options="list"></tab-pane-content>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters} from 'vuex';
import home from '@/components/Home';
import TabPaneContent from '@/components/TabPaneContent';
import {  post } from '@/config/fetch';

export default {
  components: {
    home,
    TabPaneContent
  },
  name: 'contentWrapper',
  data() {
    return {
      activeName: "home",
      tabMenus: []
    }
  },
  computed: {
    ...mapGetters(['tabMenu'])
  },
  watch: {
    tabMenu: function() {
      let isHave = false;
      this.tabMenus.forEach((tab, index) => {
        if (tab.Code === this.tabMenu.Code) {
          isHave = true;
          this.activeName = this.tabMenu.Code;
          this.$store.dispatch('setActiveName', this.tabMenu.Code);
        }
      })
      if (!isHave) {
        this.tabMenus.push(this.tabMenu);
        this.activeName = this.tabMenu.Code;
        this.$store.dispatch('setActiveName', this.tabMenu.Code);
      }
    }
  },
  methods: {
    removeTab(targetName) {
      let tabs = this.tabMenus;
      let activeName = this.activeName
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.Code === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.Code;
            }
          }
        });
      }
      this.activeName = activeName;
      this.$store.dispatch('setActiveName', activeName);
      this.tabMenus = tabs.filter(tab => tab.Code !== targetName);
      if (this.tabMenus.length === 0) {
        this.activeName = "home";
        this.$store.dispatch('setActiveName', 'home');
      }
    },
    getTabMenu(tab, ev) {
      this.$store.dispatch('setActiveName', this.activeName);
    }
  }
};
</script>

<style>

</style>
