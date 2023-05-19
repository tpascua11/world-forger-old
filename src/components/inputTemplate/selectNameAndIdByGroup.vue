<template>
  <div>
    <VueMultiselect
      v-model="selected"
      :options="listWithSuperKeys"
      placeholder="HAHHAHAHA"
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
  name: 'Select_Name_and_ID',
  data: function(){
    return {
			selected: null,
      listtest: ["a", "b", "c", "d", "e"],
      template: {name: '', flag: true},
      listWithKeys: this.objectListToList(this.list),
    }
  },
  props: ['value', 'list', 'additional', 'group'],
  watch: {
    /*
    group: function(newV, oldV){
      this.selected = this.value;
    },
     */
    "value.name": function(newV, oldV){
      if(newV != oldV){
        //console.log("--- TEST ---");
        this.selected = this.value;
      }
    }
  },
  mounted(){
    console.log("MOUNT TEST!");
    this.selected = this.value;
  },
  methods:{
    test(){
      console.log("test");
    },
    toggleFlag(){
      this.value.flag = !this.value.flag;
    },
    setName(events){
      console.log("value", this.value);
      this.value.id = this.selected.id;
      this.value.name = this.selected.name;
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
    },
    listWithSuperKeys: function(){
      //return this.objectListToList(this.list);
      if(this.group) return this.objectListToList(this.$root.world.group[this.group].list);
      else return [];
    },
  }
}

</script>

<style scoped>

textarea {
  box-sizing:border-box;
  height: 100%;
  width: 100%;
}

.cool{
  height: 10px;
  font-size:15px;
}


</style>
