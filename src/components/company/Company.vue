<template>
    <div id="companies">
        <div class="container-fluid">
            <div v-if="status=='loading'" class="pt-3 text-center">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
            <div v-else-if="status == 'success'">
                <div class="row">
                    <div class="col-12 text-center">
                        <button class="btn btn-info btn-sm mt-2 ml-2" @click="new_company = !new_company">
                            <span v-if="new_company">Done</span>
                            <span v-else>Add New</span>
                        </button>
                    </div>
                    <div v-if="new_company" class="col-12 bg-light mx-auto m-4">
                        <add-company :townships="townships" :types="types"></add-company>
                    </div>
                </div>
                <div class="row p-3">
                    <div class="col-3 mx-auto">
                        <input type="text" placeholder="Search company..." class="form-control form-control-sm m-2" v-model="search">
                    </div>
                    <div class="col-12 mx-auto">
                        <table class="table table-striped table-sm">
                            <thead>
                                <tr>
                                    <th style="width: 5%;">No</th>
                                    <th style="width: 20%;">Name</th>
                                    <th style="width: 60%;">Offered Jobs</th>
                                    <th style="width: 15%;">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(company, index) in filterCompanies" :key="company.id">
                                    <td>{{getOverallIndex(index)}}</td>
                                    <td>{{company.name}}</td>
                                    <td>
                                        <span v-for="job in company.jobs" :key="job.key">
                                            <a href="#" @click="showEditJob(company, job)" class="btn btn-outline-info btn-sm m-1">{{job.title}}
                                            </a>
                                        </span>
                                    </td>
                                    <td>
                                        <button class="btn btn-sm btn-outline-info" @click="showInfo(company)" data-toggle="tooltip" data-placement="top" title="Show Info"><i class="fas fa-info"></i></button>

                                        <button class="btn btn-sm btn-outline-info ml-2" @click="showJobModal(company)" data-toggle="tooltip" data-placement="top" title="Add Job"><i class="fas fa-plus fa-sm"></i></button>

                                        <button class="btn btn-sm btn-outline-warning mx-2" @click="editCompany(company)" data-toggle="tooltip" data-placement="top" title="Edit Company Data"><i class="far fa-edit fa-sm"></i></button>
                                        <button class="btn btn-outline-danger btn-sm" @click="deleteCompany(company)" data-toggle="tooltip" data-placement="top" title="Remove Company"><i class="far fa-trash-alt fa-sm"></i></button>

                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <pagination :data="companies" @pagination-change-page="getCompanies"></pagination>
                    </div>
                </div>
            </div>
            <div v-else class="text-center">{{status}}</div>
        </div>

        <div class="modal" id="add_job_modal" tabindex="-1" role="dialog">
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Add Job</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label>Company Name</label>
                                <input type="text" class="form-control form-control-sm" v-model="current_company.name" disabled>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label>Required Position</label>
                                <v-select
                                :options="jobs"
                                label="title"
                                taggable
                                :select-on-key-codes="[9,13]"
                                v-model="job.title"
                                :reduce="job=>job.title"
                                ></v-select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label>Salary</label>
                                <input type="number" class="form-control form-control-sm" v-model="job.salary" min="0" required>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label>Working Location</label>
                                <v-select
                                :options="townships"
                                label="name"
                                v-model="job.township_id"
                                :reduce="township => township.id"></v-select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label>Working Hours</label>
                                <div class="form-inline">
                                    <input type="time" class="form-control form-control-sm col-5" v-model="job.start_time">
                                    <label class="col-2"> to </label>
                                    <input type="time" class="form-control form-control-sm col-5" v-model="job.end_time">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label>Off Days</label>
                                <input type="text" class="form-control form-control-sm" v-model="job.offdays">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="form-group">
                                <label>Job Description</label>
                                <textarea class="form-control" rows="5" v-model="job.desc" style="resize: none;"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary btn-sm" @click="addJob">Add</button>
              </div>
            </div>
          </div>
        </div>

        <div class="modal" id="edit_job_modal" tabindex="-1" role="dialog" ref="vuemodal">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Edit Jobs of Company</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="form-group col-6">
                                <p class="font-weight-bold">Company Name</p>
                                <p>{{current_company.name}}</p>
                            </div>
                            <div class="form-group col6">
                                <p class="font-weight-bold">Job Title</p>
                                <p>{{current_job.title}}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-6">
                                <label>Salary</label>
                                <input type="number" v-model="current_job.salary" class="form-control form-control-sm">
                            </div>
                            <div class="form-group col-6">
                                <label>Working Location</label>
                                <v-select
                                :options="townships"
                                label="name"
                                v-model="current_job.township_id"
                                :reduce="township => township.id"></v-select>
                            </div>
                            <div class="form-group col-6">
                                <label>Working Hours</label>
                                <div class="form-inline">
                                    <input type="time" class="form-control form-control-sm col-5" v-model="current_job.start_time">
                                    <label class="col-2"> to </label>
                                    <input type="time" class="form-control form-control-sm col-5" v-model="current_job.end_time">
                                </div>
                            </div>
                            <div class="form-group col-6">
                                <label>Off Days</label>
                                <input type="text" class="form-control form-control-sm" v-model="current_job.offdays">
                            </div>
                            <div class="form-group col-12">
                                <label>Job Description</label>
                                <textarea v-model="current_job.desc" class="form-control form-control-sm" rows="5" style="resize: none;"></textarea>
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

        <div class="modal" id="edit_modal" tabindex="-1" role="dialog">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Edit Company</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="form-group">
                    <label>Company Name</label>
                    <input type="text" class="form-control form-control-sm" v-model="current_company.name">
                </div>
                <div class="form-group">
                    <label>Technology</label>
                    <input type="text" class="form-control form-control-sm" v-model="current_company.technology">
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-control form-control-sm" v-model="current_company.email">
                </div>
                <div class="form-group">
                    <label>Township</label>
                    <select class="custom-select custom-select-sm" v-model="current_company.township_id">
                        <option 
                        v-for="township in townships" 
                        :key="township.id" 
                        :value="township.id"
                        :selected="current_company.township_id == township.id">
                            {{township.name}}
                        </option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Address</label>
                    <input type="text" class="form-control form-control-sm" v-model="current_company.address">
                </div>
                <div class="form-group">
                    <label>HR Name</label>
                    <input type="text" class="form-control form-control-sm" v-model="current_company.hr_name">
                </div>
                <div class="form-group">
                    <label>Phone1</label>
                    <input type="tel" class="form-control form-control-sm" v-model="current_company.phone1">
                </div>
                <div class="form-group">
                    <label>Phone2</label>
                    <input type="tel" class="form-control form-control-sm" v-model="current_company.phone2">
                </div>
                <div class="form-group">
                    <label>Type</label>
                    <select class="custom-select custom-select-sm" v-model="current_company.type">
                        <option
                        v-for="type in types"
                        :key="type.key"
                        :selected="current_company.type == type">
                            {{type}}
                        </option>
                    </select>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary btn-sm" @click="updateCompany">Update</button>
              </div>
            </div>
          </div>
        </div>

        <div class="modal" id="info_modal" tabindex="-1" role="dialog">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Company Information</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-lg-6">
                            <label>Company Name</label>
                            <p>{{current_company.name}}</p>
                        </div>
                        <div class="col-lg-6">
                            <label>Location</label>
                            <p v-if="current_company.township">{{current_company.township.name}}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <label>Required Positions</label>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Salary</th>
                                        <th>Location</th>
                                    </tr>
                                </thead>
                                <tbody v-if="company_jobs">
                                    <tr v-for="company_job in company_jobs" :key="company_job.id">
                                        <td>{{company_job.title}}</td>
                                        <td>{{company_job.salary}}</td>
                                        <td>{{company_job.township_name}}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <!-- <ul v-if="company_jobs">
                                <li v-for="company_job in company_jobs" :key="company_job.key">
                                    {{company_job.title}}
                                </li>
                            </ul> -->
                        </div>
                    </div>
                    
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary btn-sm" data-dismiss="modal" @click="current_company = {}">Close</button>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
import AddCompany from './AddCompany';

export default {
    components: {
        AddCompany
    },

    data(){
        return {
            types: ['Foreign', 'Local'],
            new_company: false,
            show_edit: false,
            current_company: {},
            current_job: '',
            job: {
                title: '',
                salary: 0,
                township_id: '',
                desc: '',
                company_id: '',
                start_time: '',
                end_time: '',
                offdays:''
            },
            edit_salary: false,
            search: ''
        }
    },

    computed: {
        
        companies() {
            return this.$store.getters['companies/getCompanies'];
        },

        status(){
            return this.$store.getters['companies/company_status'];
        },

        townships(){
            return this.$store.getters['townships/all_townships'];
        },

        jobs(){
            return this.$store.getters['jobs/all_jobs'];
        },

        company_jobs(){
            return this.$store.getters['companies/company_jobs'];
        },

        filterCompanies(){
            return this.companies.data.filter(company => company.name.toLowerCase().includes(this.search.toLowerCase()));
        }
    },

    created(){
        this.getCompanies();
        this.getAllTownships();
        this.getAllJobs();
    },

    mounted(){
        $(this.$refs.vuemodal).on('hide.bs.modal', function(){
            
        })
    },

    methods: {
        getOverallIndex(index){
          return (this.companies.meta.current_page*25)-25 + index + 1;
        },

        getAllTownships(){
            this.$store.dispatch('townships/getAllTownships');
        },

        getCompanies(page = 1){
            this.$store.dispatch('companies/getCompanies', page);
        },

        getAllJobs(){
            this.$store.dispatch('jobs/getAllJobs');
        },

        showJobModal(company){

            this.current_company = company;
            $('#add_job_modal').modal('show');

        },

        addJob(){
            this.$set(this.job, 'company_id', this.current_company.id);
            this.$store.dispatch('companies/addJobByCompany', this.job)
            .then(() => {
                this.getCompanies();
                this.job = {};
                $('#add_job_modal').modal('hide');
            })
        },

        showEditJob(company, job){
            this.current_company = company;
            this.current_job = {...job, ...job.pivot};

            // this.$store.dispatch('companies/getJobsByCompany', this.current_company.id);
            $('#edit_job_modal').modal('show');
        },

        updateJob(){
            this.$store.dispatch('companies/updateJobByCompany', this.current_job)
            .then(res => {
                if (res) {
                    this.getCompanies(this.companies.meta.current_page);
                    $('#edit_job_modal').modal('hide');
                }
            })
        },

        removeJob(){
            this.$store.dispatch('companies/removeJobByCompany', this.current_job)
            .then(res => {
                if (res) {
                    this.getCompanies(this.companies.meta.current_page);
                    $('#edit_job_modal').modal('hide');
                }
            })
        },

        showInfo(company){
            this.current_company = company;
            this.$store.dispatch('companies/getJobsByCompany', this.current_company.id);

            $('#info_modal').modal('show');
        },

        editCompany(company){
            this.current_company = Object.assign({}, this.current_company, company);
            $('#edit_modal').modal('show');
        },

        updateCompany(){
            this.$store.dispatch('companies/updateCompany', this.current_company)
            .then(() => $('#edit_modal').modal('hide'));
        },

        deleteCompany(company){
            this.$store.dispatch('companies/deleteCompany', company);
        }
    }
}
</script>
<style scoped>
    .cursor-pointer {
        cursor: pointer;
    }
</style>