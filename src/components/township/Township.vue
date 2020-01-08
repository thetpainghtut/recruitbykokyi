<template>
    <div id="township">
        <div class="container-fluid">
            <div v-if="status=='loading'" class="pt-3 text-center">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
            <div v-else>
                <div class="row">
                    <div class="col-12 text-center">
                        <button class="btn btn-info btn-sm mt-2 ml-2" @click="new_township = !new_township">
                            <span v-if="new_township">Done</span>
                            <span v-else>Add New</span>
                        </button>
                    </div>
                    <div v-if="new_township" class="col-lg-6 bg-light mx-auto m-4">
                        <add-township></add-township>
                    </div>
                </div>
                <div class="row p-3">
                    <div class="col-md-6 mx-auto">
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
                                        <button class="btn btn-sm btn-outline-warning mx-2" @click="editTownship(township)"><i class="far fa-edit fa-sm"></i></button>
                                        <button class="btn btn-outline-danger btn-sm" @click="deleteTownship(township)"><i class="far fa-trash-alt fa-sm"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <pagination :data="townships" @pagination-change-page="getTownships"></pagination>
                    </div>
                </div>
            </div>
            <!-- <div v-else class="text-center">{{status}}</div> -->
        </div>
        <div class="modal" id="edit_modal" tabindex="-1" role="dialog">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Edit Township</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="form-group">
                    <label>Township Name</label>
                    <input type="text" class="form-control form-control-sm" v-model="current_township.name">
                    <span v-if="update_error" class="text-danger">{{update_error}}</span>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary btn-sm" @click="updateTownship">Update</button>
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
            return this.$store.getters['townships/townships'];
        },

        update_error(){
            return this.$store.getters['townships/update_error'];
        }
    },

    created(){
        this.getTownships();
    },

    methods: {
        getTownships(page = 1){
            this.$store.dispatch('townships/getTownships', page);
        },

        editTownship(township){
            this.current_township = Object.assign({}, this.current_township, township);
            $('#edit_modal').modal('show');
        },

        updateTownship(){
            this.$store.dispatch('townships/updateTownship', this.current_township)
            .then(res => {
                if (res) {
                    this.$store.commit('townships/update_error', '');
                    $('#edit_modal').modal('hide');
                }
            })
        },

        deleteTownship(township){
            this.$store.dispatch('townships/deleteTownship', township);
        }
    }
}
</script>