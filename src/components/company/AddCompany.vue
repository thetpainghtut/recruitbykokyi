<template>
    <div id="add_company">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label>Company Name</label>
                        <input type="text" v-model="company.name" class="form-control form-control-sm" tabindex="1">
                    </div>
                    <div class="form-group">
                        <label>HR Name</label>
                        <input type="text" v-model="company.hr_name" class="form-control form-control-sm" tabindex="4">
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" v-model="company.email" class="form-control form-control-sm" tabindex="7">
                    </div>
                    
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label>Address</label>
                        <input type="text" v-model="company.address" class="form-control form-control-sm" tabindex="2">
                    </div>
                    <div class="form-group">
                        <label>Phone1</label>
                        <input type="tel" v-model="company.phone1" class="form-control form-control-sm" tabindex="5" required>
                    </div>
                    <div class="form-group">
                        <label>Technology</label>
                        <input type="text" v-model="company.technology" class="form-control form-control-sm" tabindex="8">
                    </div>
                    
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label>Township</label>
                        <select v-model="company.township_id" class="custom-select custom-select-sm" tabindex="3">
                            <option disabled value="">Select One</option>
                            <option v-for="township in townships.data" :key="township.id" :value="township.id">
                                {{township.name}}
                            </option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Phone2</label>
                        <input type="tel" v-model="company.phone2" class="form-control form-control-sm" pattern="[0-9]{2}-[0-9]{7,}" tabindex="6">
                    </div>
                    <div class="form-group">
                        <label>Type</label>
                        <select v-model="company.type" class="custom-select custom-select-sm" tabindex="9">
                            <option value="">Select One</option>
                            <option v-for="type in types" :key="type.key" :value="type">{{type}}</option>
                        </select>
                    </div>
                    
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 offset-md-3 text-center">
                    <div class="form-group">
                        <button class="btn btn-primary btn-sm w-25" @click="addCompany" tabindex="10">Add</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['townships', 'types'],

    data(){
        return {
            company: {
                name: '',
                technology: '',
                email: '',
                township_id: '',
                address: '',
                hr_name: '',
                phone1: '',
                phone2: '',
                type: '',
            }
        }
    },

    methods: {

        addCompany(){
            this.$store.dispatch('companies/addCompany', this.company)
            .then(() => this.$parent.new_company = false);
        }

    }
}
</script>