<template>
  <div>
    <VueMultiselect
      v-model="selected"
      :options="listWithKeys"
      @select="setName()"
      track-by="name"
      label="name"
      :show-labels="false"
    >
    </VueMultiselect>
  </div>
</template>

<script>
export default {
  name: 'Select_Specific',
  data: function(){
    return {
      template: {name: '', flag: true},
      listWithKeys: this.objectListToList(this.list),
      indexer: 0,
      selected: null,
    }
  },
  props: ['value', 'list', 'option_to_value', 'name_set'],
  mounted(){
    if(this.option_to_value){
      this.selected = {};
      this.option_to_value.forEach(row =>{
        this.selected[row[0]] = this.value[row[1]];
      }, this);
      }
  },
  methods:{
    test(){},
    toggleFlag(){
      this.value.flag = !this.value.flag;
    },
    setName(){
      if(this.option_to_value){
        this.option_to_value.forEach(row =>{
          this.value[row[1]] = this.selected[row[0]];
        }, this);
      }
    },
    createFlag(){
    }
  },
  computed: {
    keyList: function(){
      if(!this.list) return [];
      return Object.keys(this.list);
    },
    classObject: function () {
      return { active: this.isActive && !this.error, 'text-danger': this.error && this.error.type === 'fatal'}
    }
  }
}

</script>

<style scoped>
.v-select {
  font-size: 13px;
  width: 100%;
}

textarea {
  box-sizing:border-box;
  height: 100%;
  width: 100%;
}

.smallfit{
  height: 23px;
  display: table-cell;
  min-width: 120%;
  left: -10%;
  position: relative;
  padding:0.1em;
}

.descriptionTextArea{
  font-size: 14px;
}

.smallt{
  height: 38px;
  width: 50px;
  position:relative;
  left: -10px;
}

.smalltin{
  position:relative;
  font-weight: bold;
}

.closer{
  position:relative;
  top: 0px;
  margin-top: -40px;
  /*margin-bottom: 10px;*/
}

.closer2{
  position:relative;
  top: 0px;
  margin-top: -50px;
  /*margin-bottom: 10px;*/
}





</style>
