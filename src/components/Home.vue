<template>
    <div id="home">
      <nav-part></nav-part>
      
      <ul class="nav nav-tabs pt-1">
        <li class="nav-item">
          <a class="nav-link" @click="active_tab = 1" :class="[ active_tab === 1 ? 'current' : '' ]">Township</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click="active_tab = 2" :class="[ active_tab === 2 ? 'current' : '' ]">Companies</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click="active_tab = 3" :class="[ active_tab === 3 ? 'current' : '' ]">Offered Jobs</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click="active_tab = 4" :class="[ active_tab === 4 ? 'current' : '' ]">Students</a>
        </li>
      </ul>
      <div v-if="active_tab === 1">
        <township></township>
      </div>
      <div v-if="active_tab === 2">
        <company></company>
      </div>
      <div v-if="active_tab === 3">
        <job></job>
      </div>
      <div v-if="active_tab === 4">
        <student></student>
      </div>
    </div>
</template>
<script>
import NavPart from './common/Nav';
import Township from './township/Township';
import Company from './company/Company';
import Job from './job/Job';
import Student from './student/Student';

export default {
  components: {
    NavPart, Township, Company, Job, Student
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