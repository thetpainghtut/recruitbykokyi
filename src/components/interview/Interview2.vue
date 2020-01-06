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
                    <div class="col-12">
                        <button class="btn btn-info btn-sm mt-2 ml-2" @click="new_interview = !new_interview">
                            <span v-if="new_interview">Cancel</span>
                            <span v-else>Add New</span>
                        </button>
                    </div>
                    <div v-if="new_interview" class="col-md-8 bg-light m-4">
                        <add-interview
                        :companies="companies"></add-interview>
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
                                        <button class="btn btn-sm btn-warning mx-2" @click="editInterview(interview)">Edit</button>
                                        <button class="btn btn-danger btn-sm" @click="deleteInterview(interview)">Delete</button>
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
        
    </div>
</template>
<script>
    import AddInterview from './AddInterview'

    export default {
        components: { AddInterview },

        data(){
            return {
                new_interview: false,
                current_interview: {}
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
                return this.$store.getters['companies/getCompanies'];
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
        },

        methods: {
            getAllCompanies(){
                this.$store.dispatch('companies/getAllCompanies');
            },

            getInterviews(page = 1){
                this.$store.dispatch('interviews/getInterviews', page);
            },

            editInterview(interview){
                this.current_interview = Object.assign({}, this.current_interview, interview);
                $('#edit_modal').modal('show');
            },

            deleteInterview(interview){

            },

            updateInterview(){

            }
        }
    }
</script>