<template>
  <div :class="isCollapse?'sidebar-hide':''">
    <main-header></main-header>
    <div class="page-container">
       <sidebar></sidebar>
       <content-wrapper></content-wrapper>
    </div>
    <el-alert class="jy_alert" :class="alertOption.show?'show':'hide'"
              :title="alertOption.title"
              :type="alertOption.type"
              :description="alertOption.description"
              :closable="alertOption.closable"
              :close-text="alertOption.closeText"
              :show-icon="alertOption.showIcon"
              @close=""></el-alert>
  </div>
</template>

<script>
import '@/assets/css/style.css';
import mainHeader from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ContentWrapper from '@/components/ContentWrapper';
import { mapGetters } from 'vuex';

export default {
    components: {
        Sidebar,
        mainHeader,
        ContentWrapper
    },
    name: 'main',
    data() {
        return {

        };
    },
    computed: {
      ...mapGetters(['isCollapse','alertOption'])
    },
    created() {

    },
    methods: {
      closeAlert(){
        this.$store.dispatch('setAlertOptions',{show: false})
      }
    }
};
</script>

<style scoped>
  .jy_alert{
    position: absolute;
    top:20px;
    left: 25%;
    width: 50%;
  }
</style>
