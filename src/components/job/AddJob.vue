<template>
    <div id="add_job">
        <div class="container-fluid">
            <div class="row">
                <div class="col">
                    <div class="form-group">
                        <label>Job Name</label>
                        <input type="text" v-model="job.title" class="form-control form-control-sm">
                    </div>
                    <div class="form-group">
                        <label>Township</label>
                        <select class="custom-select custom-select-sm" v-model="job.township_id">
                            <option value="">Select One</option>
                            <option 
                            v-for="township in townships.data" 
                            :key="township.id" 
                            :value="township.id">
                                {{township.name}}
                            </option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Address</label>
                        <input type="text" class="form-control form-control-sm" v-model="job.address">
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <textarea class="form-control form-control-sm" v-model="job.desc" style="resize: none;"></textarea>
                    </div>
                    <div class="form-group">
                        <label>Salary</label>
                        <input type="number" class="form-control form-control-sm" min="0" v-model="job.salary">
                    </div>
                    <div class="form-group">
                        <button class="btn btn-primary btn-sm w-25" @click="addJob">Add</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['townships'],

    data(){
        return {
            job: {
                title: '',
                township_id: '',
                address: '',
                desc: '',
                salary: 0
            }
        }
    },

    methods: {
        addJob(){
            this.$store.dispatch('jobs/addJob', this.job)
            .then(() => {
                this.$parent.new_job = false;
            })
        }
    }
}
</script>
<style scoped>

</style>