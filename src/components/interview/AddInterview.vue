<template>
    <div id="add_interview">
        <div class="container-fluid">
            <div class="row">
                <div class="col border mx-2">
                    <div class="form-group">
                        <label>Company</label>
                        <v-select
                            :options="companies" 
                            label="name"
                            :reduce="company => company.id"
                            @input="getJobs"
                            :select-on-key-codes="[9,13]"
                            v-model="interview.company_id"
                            ></v-select>
                    </div>
                    <div class="form-group">
                        <label>Position</label>
                        <select class="custom-select custom-select-sm" v-model="selected_job">
                            <option 
                            v-for="job in jobs" 
                            :key="job.key" 
                            :value="job.id"
                            >
                                {{job.title}}
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
                    
                </div>
                <div class="col border mx-2">
                    <div class="form-group">
                        <label>Student</label>
                        <select class="custom-select custom-select-sm" v-model="selected_student">
                            <option
                            v-for="(student, index) in students"
                            :key="student.key"
                            :value="student.id"
                            :selected="index == 0">
                                {{student.name}}
                            </option>
                        </select>
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
    props: ['companies'],

    data(){
        return {
            interview: {
                company_id: '',
                job_id: '',
                student_id: '',
                assigned_date: '',
                assigned_time: '',
            },
            jobs: '',
            date_format: 'dd-MMM-yyyy',
            students: ''
        }
    },

    watch: {
        jobs(){
            return this.jobs;
        },

        students(){
            return this.students;
        }
    },

    computed: {
        selected_job(){
                return this.jobs.length?this.jobs[0].id:'';
        },

        selected_student(){
            return this.students.length?this.students[0].id: '';
        }
    },

    methods: {
        addInterview(){

            this.interview.job_id = this.selected_job;
            this.interview.student_id = this.selected_student;

            this.$store.dispatch('interviews/addInterview', this.interview)
            .then(() => this.$parent.new_interview = false);
            
        },

        getJobs(){
            if (!this.interview.company_id) {
                this.jobs = '';
                this.students = '';
            } else {
                this.$store.dispatch('jobs/getJobsByCompany', this.interview.company_id)
                .then(()=>{
                    let jobs = this.$store.getters['jobs/getCompanyJobs'];
                    this.jobs = jobs;
                })
                .then(() => {
                    this.$store.dispatch('students/getStudentsByJob', this.selected_job)
                    .then(() => {
                        let students = this.$store.getters['students/getStudentsByJob'];
                        this.students = students;
                    })
                });
            }
        },
    }
}
</script>