<template>
    <div id="add_interview">
        <div class="container-fluid">
            <div class="row">
                <div class="col border mx-2">
                    <div class="form-group">
                        <label>Company</label>
                        <select class="custom-select custom-select-sm" v-model="interview.company_id" @change="getJobsByCompany">
                            <option disabled value="">Select Company</option>
                            <option 
                            v-for="company in companies"
                            :key="company.id"
                            :value="company.id"
                            >
                                {{company.name}}
                            </option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Position</label>
                        <select class="custom-select custom-select-sm" v-model="interview.job_id" @change="getStudentsByJob">
                            <option
                            v-for="company_job in company_jobs"
                            :key="company_job.id"
                            :value="company_job.id">
                                {{company_job.title}}
                            </option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Student</label>
                        <select class="custom-select custom-select-sm" v-model="interview.student_id">
                            <option
                            v-for="student in job_students"
                            :key="student.key"
                            :value="student.id">
                                {{student.name}}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="col border mx-2">
                    <div class="form-group">
                        <label>Assigned Date</label>
                        <date-picker
                        :format="date_format"
                        :bootstrapStyling="true"
                        v-model="interview.assigned_date"></date-picker>
                    </div>
                    <div class="form-group">
                        <label>Time</label>
                        <input type="time" class="form-control form-control-sm" v-model="interview.assigned_time">
                    </div>
                    <div class="form-group text-center">
                        <button class="btn btn-primary btn-sm w-25" @click="addInterview">Assign</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
export default {
    props: ['companies', 'jobs', 'students'],

    data(){
        return {
            interview: {
                company_id: '',
                job_id: '',
                student_id: '',
                assigned_date: '',
                assigned_time: '',
            },
            date_format: 'dd-MMM-yyyy',
            my_jobs: ''
        }
    },

    computed:{
        company_jobs(){
            return this.$store.getters['companies/company_jobs'];
        },

        job_students(){
            return this.$store.getters['students/students_by_job'];
        }
    },

    methods: {

        getJobsByCompany(){
            this.interview.job_id = '';
            this.interview.student_id = '';
            let company_id = this.interview.company_id;
            this.$store.dispatch('companies/getJobsByCompany', company_id);
        },

        getStudentsByJob(){
            let job_id = this.interview.job_id;
            let job = this.company_jobs.find(job => job.id == job_id);
            
            let data = {
                job_id: this.interview.job_id,
                township_id: job.township_id
            };
            this.$store.dispatch('students/getStudentsByJob', data);
        },

        addInterview(){
            this.$store.dispatch('interviews/addInterview', this.interview)
            .then(() => {
                this.$parent.new_interview = false;
            })
        }
    }

}
</script>