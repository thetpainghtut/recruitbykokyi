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
                    <div class="col-12">
                        <button class="btn btn-info btn-sm mt-2 ml-2" @click="new_company = !new_company">
                            <span v-if="new_company">Cancel</span>
                            <span v-else>Add New</span>
                        </button>
                    </div>
                    <div v-if="new_company" class="col-md-12 bg-light m-4">
                        <add-company :townships="townships" :types="types"></add-company>
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
                                <tr v-for="(company, index) in companies.data" :key="company.id">
                                    <td>{{index+1}}</td>
                                    <td>{{company.name}}</td>
                                    <td>
                                        <button class="btn btn-sm btn-warning mx-2" @click="editCompany(company)">Edit</button>
                                        <button class="btn btn-danger btn-sm" @click="deleteCompany(company)">Delete</button>
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
                        v-for="township in townships.data" 
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
            current_company: {}

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
            return this.$store.getters['townships/getTownships'];
        },
    },

    created(){
        this.getCompanies();
        this.getTownships();
    },

    methods: {
        getTownships(page = 1){
            this.$store.dispatch('townships/getTownships', page);
        },

        getCompanies(page = 1){
            this.$store.dispatch('companies/getCompanies', page);
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