<template>
    <div id="home">
      <nav-part></nav-part>
      
      <ul class="nav nav-tabs p-3">
        <li class="nav-item">
          <a class="nav-link" @click="active_tab = 1" :class="[ active_tab === 1 ? 'current' : '' ]">Township</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click="active_tab = 2" :class="[ active_tab === 2 ? 'current' : '' ]">Companies</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click="active_tab = 3" :class="[ active_tab === 3 ? 'current' : '' ]">Link</a>
        </li>
      </ul>
      <div v-if="active_tab === 1">
        <township></township>
      </div>
      <div v-if="active_tab === 2">
        <company></company>
      </div>
    </div>
</template>
<script>
import NavPart from './common/Nav';
import Township from './township/Township';
import Company from './company/Companies';

export default {
  components: {
    NavPart, Township, Company
  },

  data() {
    return {
      active_tab: 1
    }
  }
}
</script>
<style scoped>
  .current {
    background: blueviolet;
  }
</style>