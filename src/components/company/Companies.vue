<template>
    <div id="companies">
        <ul>
            <li v-for="company in companies" :key="company.id">
                {{company.name}}
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return {
            companies: []
        }
    },

    mounted(){
        this.$http.get('/v1/admin/companies')
        .then(response => this.companies = response.data.data)
        .catch(error => console.log(error));
    }
}
</script>