<template>
    <div id="add_interview">
        <div class="container-fluid">
            <div class="row">
                <div class="col border mx-2">
                    <div class="form-group">
                        <label>Company</label>
                        <select class="custom-select custom-select-sm" v-model="interview.company_id" @change="getJobs">
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
                        <select class="custom-select custom-select-sm" v-model="interview.job_id" @change="getStudentsByJob(interview.job_id)">
                            <option 
                            v-for="job in company_jobs" 
                            :key="job.key" 
                            :value="job.id">
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
                        <select class="custom-select custom-select-sm" v-model="interview.student_id">
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
            date_format: 'dd-MMM-yyyy',
        }
    },

    computed: {
        
        company_jobs(){
            return this.$store.getters['jobs/company_jobs'];
        },

        students(){
            return this.$store.getters['students/students_by_job'];
        },

        selected_student(){
            return this.students.length?this.students[0].id: '';
        }
    },

    methods: {
        addInterview(){

            this.$store.dispatch('interviews/addInterview', this.interview)
            .then(() => this.$parent.new_interview = false);
            
        },

        getJobs(){
            if (!this.interview.company_id) {
                this.jobs = '';
                this.students = '';
            } else {
                this.$store.dispatch('jobs/getJobsByCompany', this.interview.company_id)
            }
        },

        getStudentsByJob(job){
            this.$store.dispatch('students/getStudentsByJob', job)
        }
    }
}
</script>