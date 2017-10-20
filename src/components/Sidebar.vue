<template>
  <div class="page-sidebar-wrapper">
    <div class="page-sidebar">
      <el-menu default-active="1"
               theme="dark"
               class="page-sidebar-menu page-sidebar-menu-hover-submenu"
               :collapse="isCollapse"
               uniqueOpened>
        <el-submenu class="navshow"
                    v-for="(list,index) in menuList"
                    :index="index+1+''"
                    :key="list.menuid">
          <template slot="title">
            <i :class="iconList[Math.floor(iconList.length*Math.random())]"></i>
            <span slot="title">{{list.menuname}}</span>
          </template>
          <el-menu-item-group v-if="isCollapse">
            <template slot="title">{{list.menuname}}</template>
            <el-menu-item v-for="(item,i) in list.menus"
                          :index="(index+1)+'-'+(i+1)"
                          :key="item.menuid"
                          @click="addTab(item)">
              {{item.menuname}}
            </el-menu-item>
          </el-menu-item-group>
          <el-menu-item v-if="!isCollapse"
                        v-for="(item,i) in list.menus"
                        :index="(index+1)+'-'+(i+1)"
                        :key="item.menuid"
                        @click="addTab(item)">
            {{item.menuname}}
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { post } from '@/config/fetch'

  export default {
    name: 'sidebar',
    data() {
      return {
        menuList: [],
        iconList: [
          'el-icon-fa-address-book',
          'el-icon-fa-address-card',
          'el-icon-fa-drivers-license-o',
          'el-icon-fa-id-card-o',
          'el-icon-fa-user-o',
          'el-icon-fa-vcard-o',
          'el-icon-fa-anchor',
          'el-icon-fa-bank',
          'el-icon-fa-calendar',
          'el-icon-fa-camera',
          'el-icon-fa-child',
          'el-icon-fa-comments',
          'el-icon-fa-dashboard',
          'el-icon-fa-desktop',
          'el-icon-fa-database',
          'el-icon-fa-feed',
          'el-icon-fa-heartbeat',
          'el-icon-fa-hourglass-o',
          'el-icon-fa-leaf',
          'el-icon-fa-map',
          'el-icon-fa-send-o',
        ]
      };
    },
    computed: {
      ...mapGetters(['apiUrlAdmin','isCollapse'])
    },
    created() {
      this.getMenuList();
    },
    watch: {
    },
    methods: {
      getMenuList: function () {
        post(this.apiUrlAdmin + "/Right/GetPointMenu").then((res) => {
          this.menuList = res.menus;
        })
      },
      addTab:function (item) {
        this.$store.dispatch("addTab",item);
      }
    }
  };
</script>

<style scoped>
  .el-menu{
    border-radius: 0;
  }
  .main-sidebar {
    width: 230px;
    background: #222d32;
  }
  .main-sidebar .user-panel {
    display: block;
    width: 100%;
    height: 65px;
  }
  .main-sidebar .sidebar-form {
    display: block;
    width: 100%;
  }
</style>
