<template>
    <div id="job">
        <div class="container-fluid">
            <div v-if="status=='loading'" class="pt-3 text-center">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
            <div v-else>
                <!-- <div class="row">
                    <div class="col-12 text-center">
                        <button class="btn btn-info btn-sm mt-2 ml-2" @click="new_job = !new_job">
                            <span v-if="new_job">Done</span>
                            <span v-else>Add New</span>
                        </button>
                    </div>
                    <div v-if="new_job" class="col-lg-6 bg-light mx-auto m-4">
                    </div>
                </div> -->
                <div class="row p-3">
                    <div class="col-md-6 mx-auto">
                        <table class="table table-striped table-sm">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Title</th>
                                    <th>By Company</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                v-for="(job, index) in jobs.data"
                                :key="job.id"
                                >
                                    <td>{{index+1}}</td>
                                    <td>{{job.title}}</td>
                                    <td><span v-for="company in job.company" :key="company.id">
                                        {{company}},
                                    </span></td>
                                    <td>
                                        <button class="btn btn-sm btn-outline-info" @click="showInfo(job)"><i class="fas fa-info" data-toggle="tooltip" data-placement="top" title="Details"></i></button>
                                        <button class="btn btn-sm btn-outline-warning mx-2" @click="editJob(job)" data-toggle="tooltip" data-placement="top" title="Edit Job"><i class="far fa-edit fa-sm"></i></button>
                                        <button class="btn btn-outline-danger btn-sm" @click="deleteJob(job)" data-toggle="tooltip" data-placement="top" title="Remove Job"><i class="far fa-trash-alt fa-sm"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <!-- <div v-else class="text-center">{{status}}</div> -->
        </div>
        <div class="modal" id="detail_modal" tabindex="-1" role="dialog">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Job Details</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-lg-12">
                            <label>Job Title</label>
                            <p>{{current_job.title}}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>By Company</th>
                                        <th>Salary</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="company in current_job.companies" :key="company.id">
                                        <td>{{company.name}}</td>
                                        <td>{{company.pivot.salary}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary btn-sm" data-dismiss="modal" @click="current_job = {}">Close</button>
              </div>
            </div>
          </div>
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
                    <label>Job Title</label>
                    <input type="text" class="form-control form-control-sm" v-model="current_job.title">
                    <span v-if="validate_error" class="text-danger">{{validate_error}}</span>
                    <!-- <span v-if="update_error" class="text-danger">{{update_error}}</span> -->
                </div>
                <!-- <div>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>By Company</th>
                                <th>Salary</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(company, index) in current_job.companies" :key="company.id">
                                <td>
                                    {{company.name}}
                                </td>
                                <td>
                                    <input type="number" v-model="current_job.companies[index].pivot.salary">
                                </td>
                                <td class="text-center">
                                    <input type="checkbox" class="form-check-input" @change="strike()">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div> -->
                <!-- <div class="form-group">
                    <label>By Company</label>
                    <v-select
                    :options="companies"
                    label="name"
                    taggable
                    multiple
                    v-model="current_job.companies"></v-select>

                </div> -->
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

export default {

    data(){
        return {
            new_job: false,
            current_job: {}
        }
    },

    computed: {

        status(){
            return this.$store.getters['jobs/job_status'];
        },

        jobs(){
            return this.$store.getters['jobs/jobs'];
        },

        companies(){
            let list = this.$store.getters['companies/all_companies'];
            return list?list:[];
        },

        validate_error(){
            return this.$store.getters['jobs/job_validate_error'];
        }
    },
    
    created(){
        this.getJobs();
        this.getAllCompanies();
    },

    methods: {
        getJobs(page = 1){
            this.$store.dispatch('jobs/getJobs', page);
        },

        getAllCompanies(){
            this.$store.dispatch('companies/getAllCompanies');
        },

        showInfo(job){
            this.current_job = Object.assign({}, this.current_job, job);
            $('#detail_modal').modal('show');
        },

        editJob(job){
            this.current_job = job;
            
            $('#edit_modal').modal('show');
        },

        updateJob(){
            // let company_ids = this.current_job.companies.map(company => company.id).toString();
            this.$store.dispatch('jobs/updateJob', this.current_job)
            .then(res => {
                if (res) {
                    $('#edit_modal').modal('hide');
                }
            });

        },

        deleteJob(job){
            this.$store.dispatch('jobs/deleteJob', job);
        }
    }
}
</script>