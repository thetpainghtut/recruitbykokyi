export default {
    namespaced: true,

    state: {
        status: '',
        students: {},
        all_students: [],
        students_by_job: []
    },

    getters: {
        student_status: state => state.status,
        students: state => state.students,
        all_students: state => state.all_students,
        getStudentsByJob: state => state.students_by_job
    },

    mutations: {
        loading: state => state.status = 'loading',
        
        success: (state, data) => {
            state.status = 'success';
            state.students = data;
        },

        setAllStudents: (state, data) => {
            state.all_students = data;
        },

        failed: state => {
            state.status = 'failed';
            state.students = [];
        },
        students_by_job: (state, data) => {
            state.status = 'success';
            state.students_by_job = data;
        }
    },

    actions: {
        getStudents(state, page = 1) {
            state.commit('loading');
            this._vm.$http.get(api.students_URL + '?page=' + page)
                .then(response => {
                    state.commit('success', response.data);
                })
                .catch(error => {
                    state.commit('failed');
                });
        },

        getAllStudents(state) {
            this._vm.$http.get(api.all_students_URL)
                .then(response => {
                    state.commit('setAllStudents', response.data)
                })
                .catch(error => {
                    state.commit('failed');
                })
        },

        getStudentsByJob(state, student_id) {
            if (!student_id) {
                return;
            }
            this._vm.$http.get(api.students_by_job_URL + student_id)
                .then(response => {
                    state.commit('students_by_job', response.data);
                })
                .catch(error => {
                    state.commit('failed');
                })
        },

        addStudent(state, data) {
            state.commit('loading');
            let form_data = new FormData();
            form_data.set('name', data.name);
            form_data.set('batch', data.batch);
            form_data.set('email', data.email);
            form_data.set('phone', data.phone);
            form_data.set('dob', data.dob);
            form_data.set('skills', data.skills);
            form_data.set('township_id', data.township_id);
            form_data.set('address', data.address);
            form_data.set('gender', data.gender);
            form_data.set('nrc', data.nrc);
            form_data.set('religion', data.religion);
            form_data.set('race', data.race);
            // form_data.set('required_location', data.required_location);
            // form_data.set('weekend', data.weekend);
            form_data.set('cv', data.cv);
            // form_data.set('expected_salary', data.expected_salary);

            // if (data.job_title) {
            //     form_data.set('job_title', data.job_title);
            // }

            this._vm.$http.post(api.students_URL, form_data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => {
                    state.dispatch('getStudents');
                })
                .catch(error => {
                    state.commit('failed');
                })
        },

        updateStudent(state, data) {
            state.commit('loading');
            this._vm.$http.put(api.students_URL + data.id, data)
                .then(response => {
                    state.dispatch('getStudents');
                })
                .catch(error => {
                    state.commit('failed');
                });
        },

        deleteStudent(state, data) {
            state.commit('loading');
            this._vm.$http.delete(api.students_URL + data.id, data)
                .then(response => {
                    state.dispatch('getStudents');
                })
                .catch(error => {
                    state.commit('failed');
                })
        }
    }
}