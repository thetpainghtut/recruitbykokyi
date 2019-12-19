export default {
    namespaced: true,

    state: {
        status: '',
        townships: [],
    },

    getters: {
        getTownships: state => state.townships,

        township_status: state => state.status
    },

    mutations: {
        township_request: state => state.status = 'loading',

        success_request: (state, data) => {
            state.status = 'success';
            state.townships = data;
        },

        failed_request: state => state.status = 'Failed to load data. Something is wrong!',
    },

    actions: {
        getTownships(state, page = 1){
            return new Promise((resolve, reject) => {
                state.commit('township_request');
                this._vm.$http.get(this._vm.$api.townships_URL + '?page=' + page)
                .then(response => {
                    state.commit('success_request', response.data);
                    resolve();
                })
                .catch(error => {
                    state.commit('failed_request');
                    reject(error);
                });
            });
        },

        addTownship(state, data){
            return new Promise((resolve, reject) =>{
                state.commit('township_request');
                this._vm.$http.post(this._vm.$api.townships_URL, data)
                .then(response => {
                    state.dispatch('getTownships');
                    resolve(response);
                })
                .catch(error => {
                    state.commit('failed_request');
                    reject(error);
                })
            })
        },

        editTownship(state, data){
            return new Promise((resolve, reject) => {
                state.commit('township_request');
                this._vm.$http.post(this._vm.$api.township_URL + data.id, data)
                .then(response => {
                    state.dispatch('getTownships');
                    resolve(response);
                })
                .catch(error => {
                    state.commit('failed_request');
                    reject(error);
                });
            });
        }
    }
}