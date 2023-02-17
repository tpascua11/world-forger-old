<template>
  <div>
    <h5> Hello </h5>
  </div>
</template>

<script>
export default {
  name: 'AreaList',
  data: function(){
    return {
      isActive: true,
      error: null,
      styleObject: {
        color: 'red',
        fontSize: '13px'
      }
    }
  },
  props: {
    name: String,
    referenceList: Array,
    selectedChoice: Object,
  },
  mounted(){
    console.log("SEE THE AreaList", this.areaList);
  },
  methods:{
  },
  computed: {
    classObject: function () {
      return {
        active: this.isActive && !this.error,
        'text-danger': this.error && this.error.type === 'fatal'
      }
    }
  }
}

</script>

<style scoped>
  textarea {
    box-sizing:border-box;
    height: 100%;
    width: 100%;
  }
</style>
