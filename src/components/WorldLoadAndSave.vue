<template>
  <div class="areaList card" style="width: 10rem;">
    <div class="card-body">
      <button class="btn-success btn-small btn-block">
        <vue-blob-json-csv
          file-type="json"
          file-name="todos"
          :data=[world]
        >
          Download JSON
        </vue-blob-json-csv>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadAndSave',
  data: function(){
    return {}
  },
  props: {
   name: String,
    world: Object,
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
</style>
