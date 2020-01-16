<template>
    <div class="modal" id="edit_job_modal" tabindex="-1" role="dialog" ref="vuemodal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Edit Jobs of Company</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Job Title</label>
                        <input type="text" class="form-control form-control-sm" v-model="job.title">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary btn-sm">Update</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';

    export default {
        props: ['job'],

        mounted(){
            $('#edit_job_modal').modal('show');
            $(this.$refs.vuemodal).on('hide.bs.modal', function(){
                this.__vue__.$parent.show_edit = false;
            })
        },
    }
</script>