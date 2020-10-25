<template>
  <input type="file"  accept="image"/>
</template>

<script>
import {mapActions} from 'vuex';

export default {
    name: 'Dropfile',
    props: {
        autoUpload: {
            type:Boolean,
            required: false
        }
    },
    methods: {
        ...mapActions({
            uploadFile : 'uploadFile'
        })
    },
    mounted() {
        this.$el.onchange = (event) => {
            const file = event.target.files[0];
            let reader = new FileReader();

            reader.onload = async (e) => {
                const fileData = new FormData();
                fileData.append("file", file);

                if(this.autoUpload){
                    await this.uploadFile(fileData).then (rep => {
                        this.$emit('getPathFile', rep.data);
                    });
                } else {
                    this.$emit('fileLoaded', fileData);
                }
            }
            
            reader.readAsText(file);
        }
    }
}
</script>

<style>

</style>