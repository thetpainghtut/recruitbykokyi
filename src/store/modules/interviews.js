
export default {
    namespaced: true,

    state: {
        status: '',
        interviews: []
    },

    getters: {
        interview_status: state => state.status,

        getInterviews: state => state.interviews
    },

    mutations: {
        interview_request: state => state.status = 'loading',

        success_request: (state, data) => {
            state.status = 'success';
            state.interviews = data;
        },

        failed_request: state => {
            state.status = 'failed';
            state.interviews = [];
        }
    },

    actions: {
        getInterviews(state, page) {
            return new Promise((resolve, reject) => {
                state.commit('interview_request');
                this._vm.$http.get(api.interviews_URL, page)
                .then(response => {
                    state.commit('success_request', response.data);
                    resolve(response);
                })
                .catch(error => {
                    state.commit('failed_request');
                    reject(error);
                })
            });
        },

        addInterview(state, data){
            return new Promise((resolve, reject) => {
                state.commit('interview_request');
                this._vm.$http.post(api.interviews_URL, data)
                .then(response => {
                    state.dispatch('getInterviews');
                    resolve(response);
                })
                .catch(error => {
                    state.commit('failed_request');
                    reject(error);
                })
            });
        },

        updateInterview(state, interview){
            return new Promise((resolve, reject) => {
                this._vm.$http.put(api.interviews_URL + '/' + interview.id, interview)
                .then(response => {
                    state.dispatch('getInterviews');
                    resolve(response);
                })
                .catch(error => {
                    state.commit('failed_request');
                    reject(error);
                })
            });
        },

        deleteInterview(state, interview){
            return new Promise((resolve, reject) => {
                this._vm.$http.delete(api.interviews_URL + '/' + interview.id, interview)
                .then(response => {
                    state.dispatch('getInterviews');
                    resolve(response);
                })
                .catch(error => {
                    state.commit('failed_request');
                    reject(error);
                })
            });
        }
    }
}