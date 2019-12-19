<template>
    <div id="township">
        <div class="container-fluid">
            <div v-if="status=='loading'" class="pt-3 text-center">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
            <div v-else-if="status == 'success'">
                <div class="row">
                    <div class="col-12">
                        <button class="btn btn-info btn-sm mt-2 ml-2" @click="new_township = !new_township">
                            <span v-if="new_township">Cancel</span>
                            <span v-else>Add New</span>
                        </button>
                    </div>
                    <div v-if="new_township" class="col-md-6 bg-light m-4">
                        <add-township></add-township>
                    </div>
                </div>
                <div class="row p-3">
                    <div class="col-md-6">
                        <table class="table table-striped table-sm">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Name</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(township, index) in townships.data" :key="township.key">
                                    <td>{{index+1}}</td>
                                    <td>{{township.name}}</td>
                                    <td>
                                        <button @click="currentTownship(township)">Edit</button>
                                        <button class="btn btn-danger btn-sm">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <pagination :data="townships" @pagination-change-page="getTownships"></pagination>
                    </div>
                </div>
            </div>
            <div v-else class="text-center">{{status}}</div>
        </div>
        <div class="modal" id="edit_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    ...
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import AddTownship from './AddTownship';

export default {
    components: {
        AddTownship
    },

    data(){
        return {
            new_township: false,
            current_township: {}
        }
    },
    
    computed: {
        status(){
            return this.$store.getters['townships/township_status']
        },

        townships(){
            return this.$store.getters['townships/getTownships'];
        }
    },

    created(){
        this.getTownships();
    },

    methods: {
        getTownships(page = 1){
            this.$store.dispatch('townships/getTownships', page);
        },

        currentTownship(township){
            Object.assign(this.current_township, township);
            // eslint-disable-next-line no-undef
            $('#edit_modal').show();
        },

        editTownship(){
            this.$store.dispatch('townships/editTownship', this.current_township);
        }
    }
}
</script>