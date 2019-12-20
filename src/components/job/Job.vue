<template>
    <div id="job">
        <div class="container-fluid">
            <div v-if="status=='loading'" class="pt-3 text-center">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
            <div v-else-if="status == 'success'">
                <div class="row">
                    <div class="col-12">
                        <button class="btn btn-info btn-sm mt-2 ml-2" @click="new_job = !new_job">
                            <span v-if="new_job">Cancel</span>
                            <span v-else>Add New</span>
                        </button>
                    </div>
                    <div v-if="new_job" class="col-md-6 bg-light m-4">
                        <add-job :townships="townships"></add-job>
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
                                <tr v-for="(job, index) in jobs.data" :key="job.key">
                                    <td>{{index+1}}</td>
                                    <td>{{job.title}}</td>
                                    <td>
                                        <button class="btn btn-sm btn-warning mx-2" @click="editJob(job)">Edit</button>
                                        <button class="btn btn-danger btn-sm" @click="deleteJob(job)">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <pagination :data="jobs" @pagination-change-page="getJobs"></pagination>
                    </div>
                </div>
            </div>
            <div v-else class="text-center">{{status}}</div>
        </div>
        <div class="modal" id="edit_modal" tabindex="-1" role="dialog">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Edit Job</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="form-group">
                    <label>Job Name</label>
                    <input type="text" class="form-control form-control-sm" v-model="current_job.title">
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary btn-sm" @click="updateJob">Update</button>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
import AddJob from './AddJob';

export default {
    components: {
        AddJob
    },

    data(){
        return {
            new_job: false,
            current_job: {}
        }
    },
    
    computed: {
        status(){
            return this.$store.getters['jobs/job_status']
        },

        jobs(){
            return this.$store.getters['jobs/getJobs'];
        },

        townships(){
            return this.$store.getters['townships/getTownships'];
        }
    },

    created(){
        this.getJobs();
        this.getTownships();
    },

    methods: {
        getTownships(page = 1){
            this.$store.dispatch('townships/getTownships', page);
        },

        getJobs(page = 1){
            this.$store.dispatch('jobs/getJobs', page);
        },

        editJob(job){
            this.current_job = Object.assign({}, this.current_job, job);
            $('#edit_modal').modal('show');
        },

        updateJob(){
            this.$store.dispatch('jobs/updateJob', this.current_job)
            .then(() => $('#edit_modal').modal('hide'));
        },

        deleteJob(job){
            this.$store.dispatch('jobs/deleteJob', job);
        }
    }
}
</script>