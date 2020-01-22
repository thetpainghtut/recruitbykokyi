export default {
    namespaced: true,

    state: {
        error: '',
        message: '',
        skills: []
    },

    getters: {
        skills: state => state.skills
    },

    mutations: {
        setSkills: (state,data) => {state.skills = data}
    },

    actions: {
        getSkills(state){
            this._vm.$http.get(api.skills_URL)
            .then(response => {
                state.commit('setSkills', response.data);
            })
            .catch(error => {console.log(error)});
        }
    }
}