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
                        :races="races"></add-student>
                    </div>
                </div>
                <div class="row p-3">
                    <div class="col-md-6 mx-auto">
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
                            taggable
                            multiple
                            :select-on-key-codes="[188,13]"
                            :reduce="job => job.id"
                            v-model="job.title"
                            ></v-select>
                    </div>
                    <div class="form-group">
                        <label>Expected Salary</label>
                        <input type="number" min="0" class="form-control form-control-sm" v-model="job.salary">
                    </div>
                    <div class="form-group">
                        <label>Location</label>
                        <select v-model="job.township_id" class="custom-select custom-select-sm">
                            <option disabled value="">Select One</option>
                            <option v-for="township in townships" :key="township.id" :value="township.id">
                                {{township.name}}
                            </option>
                        </select>
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
            genders:['Male', 'Female'],
            religions: ['Buddhist', 'Christian', 'Silk', 'Muslim', 'Hindu', 'Other'],
            races: ['Kachin', 'Kayin', 'Chin', 'Burma', 'Rakhine', 'Shan'],
            job: {
                student_id: '',
                title: '',
                salary: 0,
                township_id: ''
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
        }
    },

    created(){
        this.getStudents();
        this.getAllJobs();
        this.getAllTownships();
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

        showInfo(student){
            this.current_student = student;
            $('#info_modal').modal('show');
        },

        showAddModal(student){
            this.current_student = student;
            this.job.student_id = student.id;
            $('#add_job_modal').modal('show');
        },

        addJob(){
            this.$store.dispatch('jobs/addStudentJob', this.job)
            .then(res => {
                if (res) {
                    this.current_student = {};
                    $('#add_job_modal').modal('hide');
                }
            })
        },

        editStudent(student){},

        updateStudent(){},

        deleteStudent(student){}
    }
}
</script>