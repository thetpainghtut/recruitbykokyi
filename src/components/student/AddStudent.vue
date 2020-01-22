<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-4">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control form-control-sm" v-model="student.name">
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label>Father's Name</label>
                    <input type="text" class="form-control form-control-sm" v-model="student.father_name">
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label>Batch</label>
                    <input type="text" class="form-control form-control-sm" v-model="student.batch">
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-control form-control-sm" v-model="student.email">
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label>Phone</label>
                    <input type="text" class="form-control form-control-sm" v-model="student.phone">
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label>NRC</label>
                    <input type="text" class="form-control form-control-sm" v-model="student.nrc">
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label>Address</label>
                    <input type="text" class="form-control form-control-sm" v-model="student.address">
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label>Township</label>
                    <select v-model="student.township_id" class="custom-select custom-select-sm">
                        <option disabled value="">Select One</option>
                        <option v-for="township in townships" :key="township.id" :value="township.id">
                            {{township.name}}
                        </option>
                    </select>
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label>Gender</label>
                    <select v-model="student.gender" class="custom-select custom-select-sm">
                        <option v-for="gender in genders" :key="gender.key" :value="gender">
                            {{gender}}
                        </option>
                    </select>
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label>Religion</label>
                    <select v-model="student.religion" class="custom-select custom-select-sm">
                        <option v-for="religion in religions" :key="religion.key" :value="religion">
                            {{religion}}
                        </option>
                    </select>
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label>Date of Birth</label>
                    <date-picker v-model="student.dob" :format="date_format" :bootstrapStyling="true"></date-picker>
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label>Skills</label>
                    <v-select
                        :options="skills"
                        label="name"
                        taggable
                        multiple
                        :select-on-key-codes="[188,13]"
                        v-model="student.skills"
                        :reduce="skill => skill.name"></v-select>
                </div>
            </div>
            <div class="col-md-4">
                <label>Language Skills</label>
                <table class="table table-borderless">
                    <tr v-for="language in languages" :key="language.id">
                        <td>
                            <input class="form-check-input" type="checkbox" :value="language.id" v-model="student.language_skills">
                            <label class="form-check-label">
                                {{language.name}}
                            </label>
                        </td>
                        <td v-if="student.language_skills.some(skill => skill == language.id)">
                            <input type="text" class="form-control form-control-sm" placeholder="Language Level" v-model="levels[language.id]">
                        </td>
                    </tr>
                </table>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label>CV</label>
                    <input type="file" class="form-control-file form-control-sm" @change="getFile">
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
    props: ['townships', 'genders', 'religions', 'skills', 'languages'],

    data(){
        return {
            student: {
                name: '',
                father_name: '',
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
                expected_salary: '',
                language_skills: []
            },
            cv_file: '',
            date_format: 'dd MMM yyyy',
            styles: ['form-control form-control-sm'],
            levels: []
        }
    },

    methods: {

        getFile(e){
            this.cv_file = e.target.files[0] || e.dataTransfer.files[0];
            
            
        },

        addStudent(){
            let skills = [];
            this.student.language_skills.forEach(skill => {
                skills.push({
                    id: skill,
                    level: this.levels[skill]
                })
            });
            this.student.language_skills = skills;
            this.student.cv = this.cv_file;
            this.$store.dispatch('students/addStudent', this.student)
            .then(() => this.$parent.new_student = false);
        }
    }
}
</script>