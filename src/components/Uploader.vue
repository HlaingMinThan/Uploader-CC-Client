<template>
    <input type="file" multiple ref="filepond">
</template>

<script>
import * as FilePond from 'filepond';
import axios from 'axios';

export default {
    methods: {
        async getSignUrlInfos(metaData){
             //get signed upload url and infos for upload file
            let res = await axios.post('/api/files/signed',{
                name : metaData.name,
                extension : metaData.extension
            });
            //build a form using the signed upload api response
            return res.data;
        },
        buildFormData(file,form_input){
            let formData = new FormData();
            for (let field in form_input) {
                formData.append(field,form_input[field]);
            }

            formData.append('file',file);
            return formData;
        },
       async uploadFileToS3(attributes,formData,progress,load){
            await axios.post(attributes.action,formData,{
                onUploadProgress(e){
                    progress(e.event.lengthComputable,e.loaded,e.total);
                }
            });
            //mark as complete
            load();
        }
    },
    mounted(){
        FilePond.create(this.$refs.filepond, {
            allowRevert:false,
            server  : {
                process : async(fieldName,file,metaData,load,error,progress,abort) => {
                    let  {attributes,form_input} =await this.getSignUrlInfos(metaData);
                    let formData = this.buildFormData(file,form_input);
                    await this.uploadFileToS3(attributes,formData,progress,load)
                }
            },
            onaddfile(e,file) {
                if(e) return
                file.setMetadata({
                    name : file.filenameWithoutExtension,
                    extension : file.fileExtension,
                    size : file.fileSize
                })
            }
        })
    }
}
</script>