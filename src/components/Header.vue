<template>
    <div class="page-header">
        <div class="page-header-inner">
            <div class="page-logo">
                <a>
                    <img src="../assets/images/logo.png" alt="logo" class="logo-default" />
                </a>
                <div role="button" class="menu-toggler sidebar-toggler" @click="expandSidebar"></div>
            </div>
            <a class="menu-toggler responsive-toggler"></a>
            <div class="page-top">
                <div class="welcome-text pull-left">
                    <span class="username">管理员</span>，
                    <span class="welcome-time">早上好!</span> 欢迎登陆后台管理系统3.0
                </div>
                <div class="top-menu">
                    <ul class="nav navbar-nav pull-right">
                        <li class="dropdown-user">
                            <div class="dropdown-toggle">
                                <span class="username">管理员</span>
                                <a class="logout" role="button">退出</a>
                                <img alt="" class="img-circle" src="../assets/images/avatar.png" />
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'header',
    data() {
        return {
        };
    },
    computed: {
    },
    methods: {
      expandSidebar: function () {
        this.$store.dispatch('expandSidebar')
      }
    }

  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .page-header{
    border-bottom: none;
  }
</style>
