<template>
    <div id="interview">
        <div class="container-fluid">
            <div v-if="status=='loading'" class="pt-3 text-center">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
            <div v-else-if="status == 'success'">
                <div class="row">
                    <div class="col-12 text-center mb-2">
                        <button class="btn btn-info btn-sm mt-2" @click="new_interview = !new_interview">
                            <span v-if="new_interview">Done</span>
                            <span v-else>Add New</span>
                        </button>
                    </div>
                    <div v-if="new_interview" class="col-lg-12 bg-light mx-auto">
                        <add-interview
                        :companies="companies"
                        :jobs="jobs"
                        :students="students"></add-interview>
                    </div>
                </div>
                <div class="row p-3">
                    <div class="col-md-12">
                        <table class="table table-striped table-sm">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Company</th>
                                    <th>Position</th>
                                    <th>Student</th>
                                    <th>Interview Date</th>
                                    <th>Interview Time</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(interview, index) in interviews.data" :key="interview.key">
                                    <td>{{index+1}}</td>
                                    <td>{{interview.company.name}}</td>
                                    <td>{{interview.job.title}}</td>
                                    <td>{{interview.student.name}}</td>
                                    <td>{{interview.assigned_date | date}}</td>
                                    <td>{{interview.assigned_time | time}}</td>
                                    <td>{{interview.status}}</td>
                                    <td>
                                        <button class="btn btn-sm btn-outline-warning mx-2" @click="editInterview(interview)" data-toggle="tooltip" data-placement="top" title="Edit Interview"><i class="far fa-edit fa-sm"></i></button>
                                        <button class="btn btn-outline-danger btn-sm" @click="deleteInterview(interview)" data-toggle="tooltip" data-placement="top" title="Remove Interview"><i class="far fa-trash-alt fa-sm"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <pagination :data="interviews" @pagination-change-page="getInterviews"></pagination>
                    </div>
                </div>
            </div>
            <div v-else class="text-center">{{status}}</div>
        </div>
        <div class="modal" id="edit_interview_modal" tabindex="-1" role="dialog">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Edit Interview</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="form-group">
                    <label>Company</label>
                    <input v-if="check" type="text" class="form-control form-control-sm" v-model="current_interview.company.name" disabled>
                </div>
                <div class="form-group">
                    <label>Job Title</label>
                    <input v-if="check" type="text" class="form-control form-control-sm" :value="current_interview.job.title" disabled>
                </div>
                <div class="form-group" v-if="job_students">
                    <label>Student</label>
                    <select class="custom-select custom-select-sm" v-model="current_interview.student_id">
                        <option
                        v-for="student in job_students"
                        :key="student.id"
                        :value="student.id"
                        :selected="current_interview.student_id == student.id">
                            {{student.name}}
                        </option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Assigned Date</label>
                    <date-picker v-model="current_interview.assigned_date" :format="date_format" :bootstrapStyling="true"></date-picker>
                </div>
                <div class="form-group">
                    <label>Assigned Time</label>
                    <input type="time" class="form-control form-control-sm" v-model="current_interview.assigned_time">
                </div>
                <div class="form-group">
                    <label>Status</label>
                    <select class="custom-select custom-select-sm" v-model="current_interview.status">
                        <option
                        v-for="status in statuses"
                        :key="status.key"
                        :value="status"
                        :selected="current_interview.status == status">
                            {{status}}
                        </option>
                    </select>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary btn-sm" @click="updateInterview">Update</button>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
    import AddInterview from './AddInterview'

    export default {
        components: { AddInterview },

        data(){
            return {
                new_interview: false,
                current_interview: {},
                statuses: ['pending', 'confirmed', 'rejected'],
                date_format: 'dd MMM yyyy',
            }
        },

        computed: {
            status(){
                return this.$store.getters['interviews/interview_status'];
            },

            interviews(){
                return this.$store.getters['interviews/getInterviews'];
            },

            companies(){
                return this.$store.getters['companies/all_companies'];
            },

            jobs(){
                return this.$store.getters['jobs/all_jobs'];
            },

            students(){
                return this.$store.getters['students/all_students'];
            },

            check(){
                return $.isEmptyObject(this.current_interview)?false:true;
            },

            job_students(){
                return this.$store.getters['students/students_by_job'];
            }
        },

        filters: {
            date(assigned_date){
                let dateTime = new Date(assigned_date);
                let dateString = dateTime.getDate() + '-' + dateTime.toLocaleString('default', {month: 'long'}) + '-' +  dateTime.getFullYear();
                return dateString;
            },

            time(assigned_time){
                let time = new Date(new Date().toDateString() + ' ' + assigned_time);
                let ampm = time.getHours()<12?'AM':'PM';
                let hours = time.getHours() % 12;
                hours = hours?hours: 12;
                let minutes = time.getMinutes();
                minutes = minutes<10?'0'+minutes: minutes;
                let timeFormat = hours + ':' + minutes + ' ' + ampm;
                return timeFormat;
            }
        },

        created(){
            this.getInterviews();
            this.getAllCompanies();
            this.getAllJobs();
            this.getAllStudents();
        },

        methods: {
            getAllCompanies(){
                this.$store.dispatch('companies/getAllCompanies');
            },

            getAllJobs(){
                this.$store.dispatch('jobs/getAllJobs');
            },

            getAllStudents(){
                this.$store.dispatch('students/getAllStudents');
            },

            getInterviews(page = 1){
                this.$store.dispatch('interviews/getInterviews', page);
            },

            editInterview(interview){

                this.current_interview = Object.assign({},this.current_interview, interview);
                this.$store.dispatch('students/getStudentsByJob', this.current_interview.job_id)
                .then(() => {
                    $('#edit_interview_modal').modal('show');
                });
            },

            deleteInterview(interview){
                this.$store.dispatch('interviews/deleteInterview', interview);
            },

            updateInterview(){
                this.$store.dispatch('interviews/updateInterview', this.current_interview)
                .then(() => $('#edit_interview_modal').modal('hide'));
            }
        }
    }
</script>