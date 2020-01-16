export default {
    namespaced: true,

    state: {
        status: '',
        jobs: [],
        all_jobs: [],
        company_jobs: [],
        job_validate_error: ''
    },

    getters: {
        jobs: state => state.jobs,

        all_jobs: state => state.all_jobs,

        company_jobs: state => state.company_jobs,

        job_status: state => state.status,

        job_validate_error: state => state.job_validate_error
    },

    mutations: {
        job_request: state => state.status = 'loading',

        success_request: (state, data) => {
            state.status = 'success';
            state.jobs = data;
        },

        set_all_jobs: (state, data) =>{
            state.all_jobs = data;
        },

        company_jobs: (state, data) => {
            state.status = 'success';
            state.company_jobs = data;
        },

        failed_request: state => state.status = 'Failed to load data. Something is wrong!',

        set_validate_error: (state, error) => {
            state.job_validate_error = error;
        }
    },

    actions: {
        getJobs(state, page = 1) {
            state.commit('job_request');
            this._vm.$http.get(api.jobs_URL + '?page=' + page)
                .then(response => {
                    state.commit('success_request', response.data);
                })
                .catch(error => {
                    state.commit('failed_request');
                });
        },

        getAllJobs(state) {
            state.commit('job_request');
            this._vm.$http.get(api.all_jobs_URL)
                .then(response => {
                    state.commit('set_all_jobs', response.data);
                })
                .catch(error => {
                    state.commit('failed_request');
                });
        },

        getJobsByCompany(state, company_id) {
            if (!company_id) {
                return;
            }
            this._vm.$http.get(api.company_jobs_URL + '/' + company_id)
                .then(response => {
                    state.commit('company_jobs', response.data);
                })
                .catch(error => {
                    state.commit('failed_request');
                });
        },

        addJob(state, data) {
            state.commit('job_request');
            this._vm.$http.post(api.jobs_URL, data)
                .then(response => {
                    state.dispatch('getAllJobs');
                })
                .catch(error => {
                    state.commit('failed_request');
                })
        },

        addStudentJob(state, data){
            return this._vm.$http.post(api.student_job_URL, data)
            .then(response => {
                return true;
            })
            .catch(error => {
                return false;
            })
        },

        editJobByCompany(state, company_id){
            this._vm.$http.post(api.company_jobs_URL, company_id)
            .then(response => {
                return true;
            })
            .catch(error => {
                return false;
            })
        },

        updateJob(state, data) {
            state.commit('job_request');
            return this._vm.$http.put(api.jobs_URL + data.id, data)
                .then(response => {
                    state.dispatch('getJobs');
                    return true;
                })
                .catch(error => {
                    state.commit('set_validate_error', error.response.data.errors.title[0]);
                    return false;
                });
        },

        deleteJob(state, data) {
            state.commit('job_request');
            this._vm.$http.delete(api.jobs_URL + data.id, data)
                .then(response => {
                    state.dispatch('getJobs');
                })
                .catch(error => {
                    state.commit('failed_request');
                });
        }
    }
}