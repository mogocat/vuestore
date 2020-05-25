<template lang="html">

</template>

<script>
import { mapState } from 'vuex'

export default {
    watch:{
        message(){
            console.log("hello")
            if(this.message.status == 0){
                this.$message({message: this.message.info, type: 'success'})
            }else{
                this.$message.error(this.message.info)
            }
        }
    }
}
</script>

<style lang="css">
</style>
