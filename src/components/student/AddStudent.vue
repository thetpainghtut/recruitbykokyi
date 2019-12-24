<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-4">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control form-control-sm" v-model="student.name" tabindex="1">
                </div>
                <div class="form-group">
                    <label>Phone</label>
                    <input type="tel" class="form-control form-control-sm" v-model="student.phone" tabindex="4">
                </div>
                <div class="form-group">
                    <label>Address</label>
                    <input type="text" class="form-control form-control-sm" v-model="student.address" tabindex="7">
                </div>
                <div class="form-group">
                    <label>NRC</label>
                    <input type="text" class="form-control form-control-sm" v-model="student.nrc" tabindex="10">
                </div>
                <div class="form-group">
                    <label>Wanted Location</label>
                    <select v-model="student.required_location" class="custom-select custom-select-sm" tabindex="13">
                        <option disabled value="">Select One</option>
                        <option v-for="township in townships.data" :key="township.id" :value="township.id">
                            {{township.name}}
                        </option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Expected Salary</label>
                    <input type="number" class="form-control form-control-sm" v-model="student.expected_salary" min="0">
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label>Batch</label>
                    <input type="text" class="form-control form-control-sm" v-model="student.batch" tabindex="2">
                </div>
                <div class="form-group">
                    <label>Date of Birth</label>
                    <date-picker v-model="student.dob" :format="date_format" :bootstrapStyling="true" tabindex="5"></date-picker>
                </div>
                <div class="form-group">
                    <label>Township</label>
                    <select v-model="student.township_id" class="custom-select custom-select-sm" tabindex="8">
                        <option disabled value="">Select One</option>
                        <option v-for="township in townships.data" :key="township.id" :value="township.id">
                            {{township.name}}
                        </option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Religion</label>
                    <select v-model="student.religion" class="custom-select custom-select-sm" tabindex="11">
                        <option v-for="religion in religions" :key="religion.key" :value="religion">
                            {{religion}}
                        </option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Weekends ?</label><br>
                
                    <div class="form-check form-check-inline">
                        <!-- <label>Weekend?</label> -->
                        <input type="radio" id="yes" v-model="student.weekend" class="form-check-input" :value="true" tabindex="14">
                        <label class="form-check-label" for="yes">Yes</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input type="radio" id="no" v-model="student.weekend" class="form-check-input" :value="false" tabindex="15">
                        <label class="form-check-label" for="no">No</label>
                    </div>
                </div>
                <div class="form-group">
                    <label>CV</label>
                    <input type="file" class="form-control-file form-control-sm" @change="getFile" tabindex="17">
                </div>
            </div>

            <div class="col-md-4">
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-control form-control-sm" v-model="student.email" tabindex="3">
                </div>
                <div class="form-group">
                    <label>Skills</label>
                    <v-select
                        :options="skills" 
                        taggable
                        multiple
                        :select-on-key-codes="[188,13]"
                        v-model="student.skills"
                        :tabindex="6"
                        ></v-select>
                </div>
                <div class="form-group">
                    <label>Gender</label>
                    <select v-model="student.gender" class="custom-select custom-select-sm" tabindex="9">
                        <option v-for="gender in genders" :key="gender.key" :value="gender">
                            {{gender}}
                        </option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Ethnicity</label>
                    <select v-model="student.race" class="custom-select custom-select-sm" tabindex="12">
                        <option v-for="race in races" :key="race.key" :value="race">
                            {{race}}
                        </option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Required Position</label>
                    <v-select
                        :options="job_titles" 
                        taggable 
                        :select-on-key-codes="[9,13]"
                        v-model="student.job_title"
                        :tabindex="16"
                        ></v-select>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 text-center">
                <button class="btn btn-info btn-sm w-25" @click="addStudent">Save</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['townships', 'job_titles', 'genders', 'religions', 'races'],

    data(){
        return {
            student: {
                name: '',
                batch: '',
                email: '',
                phone: '',
                dob: '',
                skills: '',
                township_id: '',
                address: '',
                gender: 'Male',
                nrc: '',
                cv: '',
                religion: 'Buddhist',
                race: 'Burma',
                required_location: '',
                weekend: true,
                job_title: '',
                expected_salary: ''
            },
            cv_file: '',
            date_format: 'dd MMM yyyy',
            skills: ['PHP', 'Laravel', 'VueJS'],
            
            
            
            styles: ['form-control form-control-sm']
        }
    },
 
    methods: {

        getFile(e){
            this.cv_file = e.target.files[0] || e.dataTransfer.files[0];
            
            
        },

        addStudent(){
            this.student.cv = this.cv_file;
            this.$store.dispatch('students/addStudent', this.student)
            .then(() => this.$parent.new_student = false);
        }
    }
}
</script>