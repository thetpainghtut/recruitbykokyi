<template>
    <div id="student">
        <div class="container-fluid">
            <div v-if="status=='loading'" class="pt-3 text-center">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
            <div v-else-if="status == 'success'">
                <div class="row">
                    <div class="col-12">
                        <button class="btn btn-info btn-sm mt-2 ml-2" @click="new_student = !new_student">
                            <span v-if="new_student">Cancel</span>
                            <span v-else>Add New</span>
                        </button>
                    </div>
                    <div v-if="new_student" class="col-md-12 bg-light m-4">
                        <add-student
                        :townships="townships"
                        :job_titles="job_titles"
                        :genders="genders"
                        :religions="religions"
                        :races="races"></add-student>
                    </div>
                </div>
                <div class="row p-3">
                    <div class="col-md-6">
                        <table class="table table-striped table-sm">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Name</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(student, index) in students.data" :key="student.key">
                                    <td>{{index+1}}</td>
                                    <td>{{student.name}}</td>
                                    <td>
                                        <button class="btn btn-sm btn-warning mx-2" @click="editStudent(student)">Edit</button>
                                        <button class="btn btn-danger btn-sm" @click="deleteStudent(student)">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <pagination :data="students" @pagination-change-page="getStudents"></pagination>
                    </div>
                </div>
            </div>
            <div v-else class="text-center">{{status}}</div>
        </div>
        <div class="modal" id="edit_modal" tabindex="-1" role="dialog">
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Edit Student</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="container">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Student Name</label>
                                <input type="text" name="name" class="form-control form-control-sm" v-model="current_student.name">
                            </div>
                            <div class="form-group">
                                <label>Email</label>
                                <input type="email" name="email" class="form-control form-control-sm" v-model="current_student.email">
                            </div>
                            <div class="form-group">
                                <label>DOB</label>
                                <date-picker v-model="current_student.dob" :format="date_format" :bootstrapStyling="true"></date-picker>
                            </div>
                            <div class="form-group">
                                <label>Township</label>
                                <select class="custom-select custom-select-sm" name="township_id" v-model="current_student.township_id">
                                    <option 
                                    v-for="township in townships.data" 
                                    :key="township.id" 
                                    :value="township.id"
                                    :selected="current_student.township_id == township.id">
                                        {{township.name}}
                                    </option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Gender</label>
                                <select v-model="current_student.gender" name="gender" class="custom-select custom-select-sm">
                                    <option v-for="gender in genders" :key="gender.key" :value="gender">
                                        {{gender}}
                                    </option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Religion</label>
                                <select v-model="current_student.religion" class="custom-select custom-select-sm">
                                    <option v-for="religion in religions" :key="religion.key" :value="religion">
                                        {{religion}}
                                    </option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Wanted Location</label>
                                <select v-model="current_student.required_location" class="custom-select custom-select-sm">
                                    <option
                                    v-for="township in townships.data"
                                    :key="township.id"
                                    :value="township.id"
                                    :selected="current_student.required_location == township.id">
                                        {{township.name}}
                                    </option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Wanted Position</label>
                                <v-select
                                    :options="job_titles" 
                                    :select-on-key-codes="[9,13]"
                                    v-model="current_student.wanted_job"
                                    ></v-select>
                            </div>
                        </div>
                        
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Batch</label>
                                <input type="text" name="batch" class="form-control form-control-sm" v-model="current_student.batch">
                            </div>
                            <div class="form-group">
                                <label>Phone</label>
                                <input type="tel" name="phone" class="form-control form-control-sm" v-model="current_student.phone">
                            </div>
                            <div class="form-group">
                                <label>Skills</label>
                                <input type="text" name="skills" class="form-control form-control-sm" v-model="current_student.skills">
                            </div>
                            <div class="form-group">
                                <label>Address</label>
                                <input type="text" name="address" class="form-control form-control-sm" v-model="current_student.address">
                            </div>
                            <div class="form-group">
                                <label>NRC</label>
                                <input type="text" name="nrc" class="form-control form-control-sm" v-model="current_student.nrc">
                            </div>
                            <div class="form-group">
                                <label>Race</label>
                                <select v-model="current_student.race" name="race" class="custom-select custom-select-sm">
                                    <option v-for="race in races" :key="race.key" :value="race">
                                        {{race}}
                                    </option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Weekends ?</label><br>
                
                                    <div class="form-check form-check-inline">
                                        <!-- <label>Weekend?</label> -->
                                        <input type="radio" id="yes" v-model="current_student.weekend" class="form-check-input" :value="1" :checked="current_student.weekend == 1">
                                        <label class="form-check-label" for="yes">Yes</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input type="radio" id="no" v-model="current_student.weekend" class="form-check-input" :value="0" :checked="current_student.weekend == 0">
                                        <label class="form-check-label" for="no">No</label>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary btn-sm" @click="updateStudent">Update</button>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
import AddStudent from './AddStudent';

export default {
    components: {AddStudent},

    data() {
        return {
            date_format: 'dd MMM yyyy',
            new_student: false,
            current_student: {},
            genders:['Male', 'Female'],
            religions: ['Buddhist', 'Christian', 'Silk', 'Muslim', 'Hindu', 'Other'],
            races: ['Kachin', 'Kayin', 'Chin', 'Burma', 'Rakhine', 'Shan'],
        }
    },

    computed: {
        students(){
            return this.$store.getters['students/getStudents'];
        },

        status(){
            return this.$store.getters['students/student_status'];
        },

        townships(){
            return this.$store.getters['townships/getTownships'];
        },

        jobs(){
            return this.$store.getters['jobs/getJobs'];
        },

        job_titles(){
            return this.jobs.map((job) => job.title);
        },

    },

    created(){
        this.getStudents();
        this.getTownships();
        this.getAllJobs();
    },

    methods: {
        getAllJobs(){
            this.$store.dispatch('jobs/getAllJobs');
        },

        getTownships(page = 1){
            this.$store.dispatch('townships/getTownships', page);
        },

        getStudents(page = 1){
            this.$store.dispatch('students/getStudents', page);
        },

        setSelected(){

        },

        editStudent(student){
            this.current_student = Object.assign({}, this.current_student, student);
            $('#edit_modal').modal('show');
        },

        updateStudent(){
            this.$store.dispatch('students/updateStudent', this.current_student)
            .then(() => $('#edit_modal').modal('hide'));
        },

        deleteStudent(student){
            this.$store.dispatch('students/deleteStudent', student);
        }
    }
}
</script>