export default {
    namespaced: true,

    state: {
        error: '',
        message: '',
        languages: []
    },

    getters: {
        languages: state => state.languages
    },

    mutations: {
        setLanguages: (state,data) => {state.languages = data}
    },

    actions: {
        getLanguages(state){
            this._vm.$http.get(api.languages_URL)
            .then(response => {
                state.commit('setLanguages', response.data);
            })
            .catch(error => {console.log(error)});
        }
    }
}