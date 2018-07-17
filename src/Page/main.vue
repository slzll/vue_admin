<template>
<div :class="isCollapse?'sidebar-hide':''">
  <main-header></main-header>
  <div class="page-container">
    <sidebar></sidebar>
    <content-wrapper></content-wrapper>
  </div>
</div>
</template>

<script>
import '@/assets/css/style.css';
import mainHeader from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ContentWrapper from '@/components/ContentWrapper';
import {
  mapGetters
} from 'vuex';

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
    ...mapGetters(['isCollapse', 'alertOption'])
  },
  created() {

  },
  methods: {}
};
</script>

<style scoped>
.jy_alert {
  position: absolute;
  top: 20px;
  left: 25%;
  width: 50%;
}
</style>
