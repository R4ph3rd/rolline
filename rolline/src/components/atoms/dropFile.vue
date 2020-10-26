<template>
  <div class="dropzone">
      <input type="file" name="file"  accept="image"/>
      <label v-show="files.length == 0" >JPG ou PNG, taille inférieure à 3 MB</label>
      <label v-show="files.length == 0">Drag & drop ton image </label>
      <!-- <v-button rounded primary>Choisir un fichier</v-button> -->
      <div v-show="files.length > 0" v-for="file in files" :key="file.name" class="filelist">
          <span></span>
          <p>{{file.name}}</p>
      </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
import button from '@/components/atoms/button';

export default {
    name: 'Dropfile',
    props: {
        autoUpload: {
            type:Boolean,
            required: false
        }
    },
    data(){
        return{
            files: []
        }
    },
    components:{
        'v-button':button
    },
    methods: {
        ...mapActions({
            uploadFile : 'uploadFile'
        })
    },
    mounted() {
        this.$el.onchange = (event) => {
            this.files = event.target.files;
            const file = event.target.files[0];
            console.log(this.files)
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

<style scoped lang="scss">
.dropzone{
    position: relative;
    display:flex;
    justify-content: space-evenly;
    align-items:center;
    flex-direction: column;

    input {
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        opacity: 0;
        cursor:pointer;
    }

    label{
        text-align:center;
        color:$r-color-light04;
        font-weight:600;

        &:nth-child(2){
            color: $r-color-dark04;
            font-weight:300;
            margin-bottom:3%;
        }
    }

    .filelist{
        width:max-content;
        display:flex;
        align-items: center;
        padding:10px 20px;
        border-radius:8px;

        background: $r-layer-02dp;

        span{
            display: inline-block;
            width:20px;
            height:20px;
            background:$r-color-primary;
            margin-right:20px;
        }

        p{
            display:inline-block;
            color: $r-color-light04;
        }
    }

    
}

</style>