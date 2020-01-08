<template>
    <div id="student">
        <div class="container-fluid">
            <div v-if="status=='loading'" class="pt-3 text-center">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
            <div v-else>
                <div class="row">
                    <div class="col-12 text-center">
                        <button class="btn btn-info btn-sm mt-2 ml-2" @click="new_student = !new_student">
                            <span v-if="new_student">Done</span>
                            <span v-else>Add New</span>
                        </button>
                    </div>
                    <div v-if="new_student" class="col-lg-6 bg-light mx-auto m-4">
                        <!-- <add-student></add-student> -->
                    </div>
                </div>
                <div class="row p-3">
                    <div class="col-md-6 mx-auto">
                        <table class="table table-striped table-sm">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Name</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(student, index) in students.data" :key="student.key">
                                    <td>{{index+1}}</td>
                                    <td>{{student.name}}</td>
                                    <td>
                                        <button class="btn btn-sm btn-outline-warning mx-2" @click="editStudent(student)"><i class="far fa-edit fa-sm"></i></button>
                                        <button class="btn btn-outline-danger btn-sm" @click="deleteStudent(student)"><i class="far fa-trash-alt fa-sm"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <pagination :data="students" @pagination-change-page="getStudents"></pagination>
                    </div>
                </div>
            </div>
            <!-- <div v-else class="text-center">{{status}}</div> -->
        </div>
    </div>
</template>
<script>
// import Addstudent from './Addstudent';

export default {
    /*components: {
        Addstudent
    },
*/
    data(){
        return {
            new_student: false,
            current_student: {}
        }
    },
    
    computed: {
        status(){
            return this.$store.getters['students/student_status']
        },

        students(){
            return this.$store.getters['students/students'];
        },
    },

    created(){
        this.getStudents();
    },

    methods: {
        getStudents(page = 1){
            this.$store.dispatch('students/getStudents', page);
        },
    }
}
</script>