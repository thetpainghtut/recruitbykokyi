<template>
    <div id="add_township">
        <div class="container-fluid">
            <div class="row">
                <div class="col">
                    <form @submit.prevent="addTownship">
                        <div class="form-group">
                            <label>Township Name</label>
                            <input type="text" v-model="township.name" class="form-control form-control-sm">
                            <span v-if="township_message" class="text-danger">{{township_message}}</span>
                        </div>
                        <div class="form-group">
                            <input type="submit" class="btn btn-primary btn-sm w-25" value="Add">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            township: {
                name: ''
            },
            my_error:{}
        }
    },

    computed: {
        
        township_message(){
            return this.$store.getters['townships/township_message'];
        }
    },

    methods: {
        addTownship(){
            this.$store.dispatch('townships/addTownship', this.township)
            .then(res => {
                if (res) {
                    this.$store.commit('townships/setMessage', '');
                    this.$parent.new_township = false;
                }
            })

            
        },

        clearError(){
            this.$store.commit('townships/clearError');
        }
    }
}
</script>