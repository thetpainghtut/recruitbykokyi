export default {
    namespaced: true,

    state: {
        status: '',
        students: {},
        all_students: [],
        students_by_job: [],
        student_jobs: [],
    },

    getters: {
        student_status: state => state.status,
        students: state => state.students,
        all_students: state => state.all_students,
        students_by_job: state => state.students_by_job,
        student_jobs: state => state.student_jobs,
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
        },

        setJobsByStudents: (state, data) => {
            state.student_jobs = data;
        }
    },

    actions: {
        getStudents(state, page) {
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

        getStudentsByJob(state, job_id) {
            this._vm.$http.get(api.students_by_job_URL + job_id)
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
            form_data.set('father_name', data.father_name);
            form_data.set('batch', data.batch);
            form_data.set('email', data.email);
            form_data.set('phone', data.phone);
            form_data.set('nrc', data.nrc);
            form_data.set('address', data.address);
            form_data.set('township_id', data.township_id);
            form_data.set('gender', data.gender);
            form_data.set('religion', data.religion);
            form_data.set('dob', data.dob);
            form_data.set('skills', data.skills);
            form_data.set('language_skills', JSON.stringify(data.language_skills));
            form_data.set('cv', data.cv);

            this._vm.$http.post(api.students_URL, form_data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => {
                    state.dispatch('getStudents', 1);
                })
                .catch(error => {
                    state.commit('failed');
                })
        },

        updateStudent(state, data) {
            state.commit('loading');
            return this._vm.$http.put(api.students_URL + data.id, data)
                .then(response => {
                    state.dispatch('getStudents', 1);
                    return true;
                })
                .catch(error => {
                    state.commit('failed');
                    return false;
                });
        },

        deleteStudent(state, data) {
            state.commit('loading');
            this._vm.$http.delete(api.students_URL + data.id, data)
                .then(response => {
                    state.dispatch('getStudents', 1);
                })
                .catch(error => {
                    state.commit('failed');
                })
        },

        addJobsByStudent(state, data){
            let student_id = data.id;
            return this._vm.$http.post(api.student_jobs_URL(student_id), data)
            .then(response => {
                state.dispatch('getStudents', 1);
                return true;
            })
            .catch(error => {
                return false;
            });
        },

        updateJobOfStudent(state, data){
            return this._vm.$http.put(api.student_jobs_URL(data.student_id) + `/${data.job_id}`, data)
            .then(response => {
                return true;
            })
            .catch(error => {
                return false;
            })
        },

        removeJobOfStudent(state, data){
            return this._vm.$http.delete(api.student_jobs_URL(data.student_id) + `/${data.job_id}`)
            .then(response => {
                return true;
            })
            .catch(error => {
                return false;
            })
        },

        getJobsByStudent(state, student_id){
            this._vm.$http.get(api.student_jobs_URL(student_id))
            .then(response => {
                state.commit('setJobsByStudents', response.data)
            })
            .catch(error =>{
                console.log(error);
            })
        }
    }
}