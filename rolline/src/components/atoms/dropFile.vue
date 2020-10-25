<template>
  <input type="file"  accept="image"/>
</template>

<script>
import {mapActions} from 'vuex';

export default {
    name: 'Dropfile',
    methods: {
        ...mapActions({
            uploadFile : 'uploadFile'
        })
    },
    mounted() {
        this.$el.onchange = (event) => {
            const file = event.target.files[0];
            let reader = new FileReader();

            reader.onload = (e) => {
                const fileData = new FormData();
                fileData.append("file", file);

                this.uploadFile(fileData);
            }
            
            reader.readAsText(file);
        }
    }
}
</script>

<style>

</style>