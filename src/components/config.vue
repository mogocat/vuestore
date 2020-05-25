<template lang="html">

</template>

<script>
export default {
    emptyCategory(){
        return {id: -1, parent_code: null, code: null, label: null}
    },
    emptyAccessory(){
        return {cate: "1", name: null, code: null, note: null, path: null}
    },
    emptyBusiness(){
        return {stream: 0, contact_id: null, contact_name: null, note: null}
    },
    emptyContact(){
        return {name: null, stream: 0, cell: null, tel: null, address: null}
    },
    emptyRecord(){
        return {name: null, accessory_id: null, count: 0, price: 0}
    },
    emptyTotal(){
        return {name: "总计", count: 0, total: 0}
    }
}
</script>

<style lang="css" scoped>
</style>
