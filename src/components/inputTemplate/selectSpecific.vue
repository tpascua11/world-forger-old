<template>
  <div>
    <v-select v-model="value.refresh" :options="listWithKeys" label="name"
      :reduce="stat => (stat.id)" @input="setName($event);"
    >
      <template #selected-option="{}">
        {{list[indexer].name}}
      </template>
      <!--
      <template #option="{id}">
        {{list[id].name}}
      </template>
      -->
    </v-select>
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
    }
  },
  props: ['value', 'list', 'option_to_value', 'name_set'],
  mounted(){
  },
  methods:{
    test(){},
    toggleFlag(){
      this.value.flag = !this.value.flag;
    },
    setName(newID){

      //let newID = this.value.id;
      //this.value.id = newID;
      console.log("what is", this.option_to_value);
      if(this.option_to_value){
        this.option_to_value.forEach(row =>{
          if(row[0] == 'id') this.value.[row[1]] = newID;
          else this.value.[row[1]] = this.list[newID].[row[0]];
        }, this);
      }
      this.indexer = newID;
      delete this.value.refresh;
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
