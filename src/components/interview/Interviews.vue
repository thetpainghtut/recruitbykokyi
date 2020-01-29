<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <table class="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Company</th>
                            <th>Position</th>
                            <th>Student</th>
                            <th>Interview Date</th>
                            <th>Interview Time</th>
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
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        computed: {
            status(){
                return this.$store.getters['interviews/interview_status'];
            },

            interviews(){
                return this.$store.getters['interviews/getInterviews'];
            },
        }
    }
</script>
<style></style>