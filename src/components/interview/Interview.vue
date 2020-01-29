<template>
    <div id="interview">
        <div class="container-fluid">
            <div v-if="status=='loading'" class="pt-3 text-center">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
            <div v-else-if="status == 'success'" class="mt-2">
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <a class="nav-link" @click="active_tab = 1" :class="active_tab == 1?'current': ''">Pending</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" @click="active_tab = 2" :class="active_tab == 2?'current': ''">Confirmed</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" @click="active_tab = 3" :class="active_tab == 3?'current': ''">Rejected</a>
                    </li>
                </ul>
            </div>
            <div v-else class="text-center">{{status}}</div>
        </div>
        <div v-if="active_tab == 1">
            <interview-pending></interview-pending>
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
    // import AddInterview from './AddInterview';
    import InterviewPending from './Interviews';

    export default {
        components: {InterviewPending },

        data(){
            return {
                new_interview: false,
                current_interview: {},
                statuses: ['pending', 'confirmed', 'rejected'],
                date_format: 'dd MMM yyyy',
                active_tab: 1
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
<style scoped>
    .current {
        background: #c2c2f0;
    }
</style>