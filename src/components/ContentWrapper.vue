<template>
  <div class="page-content-wrapper">
      <div class="page-content">
          <div class="page-tabs">
              <el-tabs v-model="activeName" @tab-remove="removeTab" @tab-click="getTabMenu">
                <el-tab-pane id="home" label="主页" name="home">
                  <home></home>
                </el-tab-pane>
                <el-tab-pane v-for="(list,index) in tabMenus"
                             :id="'tab_'+list.Code"
                             :label="list.menuname"
                             :name="list.Code"
                             :key="list.menuid"
                             closable>
                  <tab-pane-content :tab-options="list"></tab-pane-content>
                </el-tab-pane>
              </el-tabs>
          </div>
      </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import home from '@/components/Home';
  import tabPaneContent from '@/components/TabPaneContent';
  import { post } from '@/config/fetch';

  export default {
    components:{
      home,
      tabPaneContent
    },
    name: 'contentWrapper',
    data () {
      return {
        activeName: "home",
        tabMenus: []
      }
    },
    computed: {
      ...mapGetters(['tabMenu'])
    },
    watch:{
      tabMenu: function () {
        let isHave = false;
        this.tabMenus.forEach((tab,index) => {
          if (tab.Code === this.tabMenu.Code){
            isHave = true;
            this.activeName = this.tabMenu.Code;
            this.$store.dispatch('setActiveName', this.tabMenu.Code);
          }
        })
        if(!isHave){
          this.tabMenus.push(this.tabMenu);
          this.activeName = this.tabMenu.Code;
          this.$store.dispatch('setActiveName', this.tabMenu.Code);
        }
      }
    },
    methods:{
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
        if (this.tabMenus.length === 0){
          this.activeName = "home";
          this.$store.dispatch('setActiveName', 'home');
        }
      },
      getTabMenu(tab){
        this.$store.dispatch('setActiveName', this.activeName);
      }
    }
  };
</script>

<style scoped>

</style>
