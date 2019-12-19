<template>
    <div id="add_township">
        <div class="container-fluid">
            <div class="row">
                <div class="col">
                    <div class="form-group">
                        <label>Township Name</label>
                        <input type="text" v-model="township.name" class="form-control form-control-sm">
                    </div>
                    <div class="form-group">
                        <button class="btn btn-primary btn-sm w-25" @click="addTownship">Add</button>
                    </div>
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
            }
        }
    },

    methods: {
        addTownship(){
            this.$store.dispatch('townships/addTownship', this.township)
            .then(() => {
                this.$parent.new_township = false;
            })
        }
    }
}
</script>