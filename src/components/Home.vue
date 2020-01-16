<template>
    <div id="home">
      <nav-part></nav-part>
      
      <ul class="nav nav-tabs pt-1">
        <li class="nav-item">
          <a class="nav-link" @click="active_tab = 1" :class="[ active_tab === 1 ? 'current' : '' ]">Companies</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click="active_tab = 2" :class="[ active_tab === 2 ? 'current' : '' ]">Students</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click="active_tab = 3" :class="[ active_tab === 3 ? 'current' : '' ]">Interviews</a>
        </li>
      </ul>
      <div v-if="active_tab === 1">
        <company></company>
      </div>
      <div v-if="active_tab === 2">
        <student></student>
      </div>
      <div v-if="active_tab === 3">
        <interview></interview>
      </div>
    </div>
</template>
<script>
import NavPart from './common/Nav';
import Company from './company/Company';
import Student from './student/Student';
import Interview from './interview/Interview';

export default {
  components: {
    NavPart, Company, Student, Interview
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