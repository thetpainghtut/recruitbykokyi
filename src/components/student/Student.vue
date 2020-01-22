<template>
    <div id="student">
        <div class="container-fluid">
            <div v-if="status=='loading'" class="pt-3 text-center">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
            <div v-else>
                <div class="row">
                    <div class="col-12 text-center">
                        <button class="btn btn-info btn-sm mt-2 ml-2" @click="new_student = !new_student">
                            <span v-if="new_student">Done</span>
                            <span v-else>Add New</span>
                        </button>
                    </div>
                    <div v-if="new_student" class="col-lg-12 bg-light mx-auto m-4">
                        <add-student
                        :townships="townships"
                        :genders="genders"
                        :religions="religions"
                        :skills="skills"
                        :languages="languages"></add-student>
                    </div>
                </div>
                <div class="row p-3">
                    <div class="col-md-12 mx-auto">
                        <table class="table table-striped table-sm">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Name</th>
                                    <th class="col-lg-6">Required Jobs</th>
                                    <th class="col-lg-2">Expected Salary</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(student, index) in students.data" :key="student.key">
                                    <td>{{index+1}}</td>
                                    <td>{{student.name}}</td>
                                    <td>
                                        <span v-for="job in student.jobs" :key="job.key">
                                            <a href="#" @click="showEditJob(student, job)" class="btn btn-outline-info btn-sm m-1">{{job.title}}</a>
                                        </span>
                                    </td>
                                    <td>{{student.salary?student.salary:0}}</td>
                                    <td>
                                        <button class="btn btn-sm btn-outline-info ml-2" @click="showInfo(student)" data-toggle="tooltip" data-placement="top" title="Show Info"><i class="fas fa-info fa-sm"></i></button>
                                        <button class="btn btn-sm btn-outline-success ml-2" @click="showAddModal(student)" data-toggle="tooltip" data-placement="top" title="Add Job"><i class="fas fa-plus fa-sm"></i></button>
                                        <button class="btn btn-sm btn-outline-warning mx-2" @click="editStudent(student)" data-toggle="tooltip" data-placement="top" title="Edit Student Data"><i class="far fa-edit fa-sm"></i></button>
                                        <button class="btn btn-outline-danger btn-sm" @click="deleteStudent(student)" data-toggle="tooltip" data-placement="top" title="Remove Student"><i class="far fa-trash-alt fa-sm"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <pagination :data="students" @pagination-change-page="getStudents"></pagination>
                    </div>
                </div>
            </div>
            <!-- <div v-else class="text-center">{{status}}</div> -->
        </div>

        <div class="modal" id="edit_job_modal" tabindex="-1" role="dialog" ref="vuemodal">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Edit Job of Student</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="form-group col-6">
                                <p class="font-weight-bold">Student Name</p>
                                <p>{{current_student.name}}</p>
                            </div>
                            <div class="form-group col-6">
                                <p class="font-weight-bold">Job Title</p>
                                <p>{{current_job.title}}</p>
                            </div>
                            <div class="form-group col-6">
                                <label>Expected Salary</label>
                                <input type="text" class="form-control form-control-sm" v-model="current_student.salary">
                            </div>
                            <div class="form-group col-6">
                                <label>Wanted Locations</label>
                                <v-select
                                :options="townships"
                                label="name"
                                multiple
                                v-model="current_student.townships"></v-select>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-danger btn-sm" @click="removeJob()"><i class="far fa-trash-alt"></i></button>
                        <button type="button" class="btn btn-primary btn-sm" @click="updateJob">Update</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal" id="info_modal" tabindex="-1" role="dialog">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Student Info</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                    <label>Name</label>
                    <p>{{current_student.name}}</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary btn-sm" data-dismiss="modal" @click="current_student = {}">Close</button>
              </div>
            </div>
          </div>
        </div>

        <div class="modal" id="add_job_modal" tabindex="-1" role="dialog">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Add Job</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                    <div class="form-group">
                        <label>Student Name</label>
                        <input type="text" class="form-control form-control-sm" v-model="current_student.name" disabled>
                    </div>
                    <div class="form-group">
                        <label>Required Position</label>
                        <v-select
                            :options="jobs"
                            label="title"
                            multiple
                            :select-on-key-codes="[188,13]"
                            :reduce="job => job.id"
                            v-model="student.jobs"
                            ></v-select>
                    </div>
                    <div class="form-group">
                        <label>Expected Salary</label>
                        <input type="number" min="0" class="form-control form-control-sm" v-model="student.salary">
                    </div>
                    <div class="form-group">
                        <label>Location</label>
                        <v-select
                        :options="townships"
                        label="name"
                        multiple
                        :select-on-key-codes="[188,13]"
                        v-model="student.townships"
                        :reduce="township => township.id"></v-select>
                    </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary btn-sm" @click="addJob">Add</button>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
import AddStudent from './AddStudent';

export default {
    components: {
        AddStudent
    },

    data(){
        return {
            date_format: 'dd MMM yyyy',
            new_student: false,
            current_student: {},
            current_job:{},
            genders:['Male', 'Female'],
            religions: ['Buddhist', 'Christian', 'Silk', 'Muslim', 'Hindu', 'Other'],
            student: {
                id: '',
                jobs: '',
                salary: 0,
                townships: ''
            }
        }
    },
    
    computed: {
        status(){
            return this.$store.getters['students/student_status']
        },

        students(){
            return this.$store.getters['students/students'];
        },

        jobs(){
            return this.$store.getters['jobs/all_jobs'];
        },

        townships(){
            return this.$store.getters['townships/all_townships'];
        },

        skills(){
            return this.$store.getters['skills/skills'];
        },

        languages(){
            return this.$store.getters['languages/languages'];
        }
    },

    created(){
        this.getStudents();
        this.getAllJobs();
        this.getAllTownships();
        this.getSkills();
        this.getLanguages();
    },

    methods: {
        getStudents(page = 1){
            this.$store.dispatch('students/getStudents', page);
        },

        getAllJobs(){
            this.$store.dispatch('jobs/getAllJobs');
        },

        getAllTownships(){
            this.$store.dispatch('townships/getAllTownships');
        },

        getSkills(){
            this.$store.dispatch('skills/getSkills');
        },

        getLanguages(){
            this.$store.dispatch('languages/getLanguages');
        },

        showInfo(student){
            this.current_student = student;
            $('#info_modal').modal('show');
        },

        showAddModal(student){
            this.current_student = student;
            this.student.id = student.id;
            $('#add_job_modal').modal('show');
        },

        addJob(){

            this.$store.dispatch('students/addJobsByStudent', this.student)
            .then(res => {
                if (res) {
                    this.current_student = {};
                    $('#add_job_modal').modal('hide');
                }
            })
        },

        showEditJob(student, job){
            this.current_student = student;
            this.current_job = {...job, ...job.pivot};
            $('#edit_job_modal').modal('show');
        },

        removeJob(){
            let payload = {
                student_id: this.current_student.id,
                job_id: this.current_job.id
            };

            this.$store.dispatch('students/removeJobOfStudent', payload)
            .then(res => {
                if (res) {
                    this.getStudents(this.students.meta.current_page);
                    this.current_student = this.current_job = {};
                    $('#edit_job_modal').modal('hide');
                }
            })
        },

        updateJob(){
            let payload = {
                student_id: this.current_student.id,
                job_id: this.current_job.id,
                salary: this.current_student.salary,
                townships: this.current_student.townships.map(township => township.id)
            };
            
            this.$store.dispatch('students/updateJobOfStudent', payload)
            .then(res => {
                if (res) {
                    this.getStudents(this.students.meta.current_page);
                    this.current_student = this.current_job = {};
                    $('#edit_job_modal').modal('hide');
                }
            })
        },

        editStudent(student){},

        updateStudent(){},

        deleteStudent(student){}
    }
}
</script>