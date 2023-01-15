<template>
    <input type="file" multiple ref="filepond">
</template>

<script>
import * as FilePond from 'filepond';
import axios from 'axios';
import { mapMutations } from 'vuex';

export default {
    methods: {
        ...mapMutations({
            INCREMENT_USAGE : "usage/INCREMENT_USAGE"
        }),
        async getSignUrlInfos(metaData){
             //get signed upload url and infos for upload file
            let res = await axios.post('/api/files/signed',{
                name : metaData.name,
                extension : metaData.extension,
                size : metaData.size
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
       async uploadFileToS3(attributes,formData,progress,load,cancelToken,serverId){
            await axios.post(attributes.action,formData,{
                onUploadProgress(e){
                    progress(e.event.lengthComputable,e.loaded,e.total);
                },
                cancelToken
            });
            //mark as complete
            load(serverId); // we can pass serverId from this functin parameter
        }
    },
    mounted(){
        let pond = FilePond.create(this.$refs.filepond, {
            allowRevert:false,
            server  : {
                //***process method not allowed to use async function***
                process : (fieldName,file,metaData,load,error,progress,abort) => {
                    this.$emit('validationError','');
                    let cancelTokenSource = axios.CancelToken.source();

                    this.getSignUrlInfos(metaData).then(({attributes,form_input}) => {
                        let formData = this.buildFormData(file,form_input);
                        this.uploadFileToS3(attributes,formData,progress,load,cancelTokenSource.token,form_input.key)
                    }).catch(e => {
                        if (e.response.status === 422) {
                            this.$emit('validationError',e.response.data.message);
                            abort();
                        }
                    });

                   return {
                        abort: () => {
                            //cancel the upload api request
                            cancelTokenSource.cancel();
                            //remove from filepond files list
                            abort();
                        },
                    };
                }
            },
            onaddfile(e,file) {
                if(e) return
                file.setMetadata({
                    name : file.filenameWithoutExtension,
                    extension : file.fileExtension,
                    size : file.fileSize
                })
            },
            //after uploaded a file ,remove that file from uploaded file list
            onprocessfile: (e,file) => {
                if(e) return;
                pond.removeFile(file);
                this.INCREMENT_USAGE(file.fileSize);
                this.$emit('onprocessfile',file);
            }
        })
    }
}
</script>