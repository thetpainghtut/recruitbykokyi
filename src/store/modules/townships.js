export default {
    namespaced: true,

    state: {
        status: '',
        error: '',
        message: '',
        townships: {},
    },

    getters: {
        townships: state => state.townships,

        township_status: state => state.status,

        township_error: state => state.error,

        township_message: state => state.message
    },

    mutations: {
        loading: state => state.status = 'loading',

        success: (state, data) => {
            state.status = 'success';
            state.townships = data;
        },

        failed: (state, error) => {
            state.status = 'error';
            state.error = error;
        },

        setMessage: (state, message) => {
            state.message = message;
        },

        clearError: state => {state.error = ''}
    },

    actions: {
        getTownships(state, page = 1){
            state.commit('loading');
            this._vm.$http.get(api.townships_URL + '?page=' + page)
            .then(response => {
                state.commit('success', response.data);
            })
            .catch(error => {
                state.commit('failed', error);
            });
        },

        addTownship(state, data){
            return this._vm.$http.post(api.townships_URL, data)
            .then(response =>{
                // state.commit('setMessage', response.data);
                return true;
            })
            .catch(error =>{
                state.commit('setMessage', error.response.data.errors.name[0]);
                return false;
            });
        },

        updateTownship(state, data){
            state.commit('loading');
            this._vm.$http.put(api.townships_URL + data.id, data)
            .then(response => {
                state.dispatch('getTownships');
            })
            .catch(error => {
                state.commit('failed', error);
            });
        },

        deleteTownship(state, data){
            state.commit('loading');
            this._vm.$http.delete(api.townships_URL + data.id, data)
            .then(response => {
                state.dispatch('getTownships');
            })
            .catch(error => {
                state.commit('failed', error);
            });
        }
    }
}