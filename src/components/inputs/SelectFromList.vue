<template>
  <div>
      <div v-if="canAddToList">
        <v-select
          v-model="name"
          :from="list"
          @create="addToList"
        />
      </div>

      <div v-else>
        <v-select
          v-model="selectedObject.name"
          :from="list"
          @create="addToList"
          as="name::id"
        />
      </div>
  </div>
</template>

<script>
export default {
  name: 'List',
  data: function(){
    return {
      row: "",
      referenceList: ['A', 'B', 'C'],
      selectedArea: "",
      name: "",
      selectedObject: {},
    }
  },
  props: {
    targetListName: String,
    method: Object,
    type: String,
  },
  mounted(){
    console.log("SEE THE NEW LIST", this.$root.world[this.targetListName]);
  },
  methods:{
    addToList(newInput){
      if(this.type != 'String'){
        console.log("Not able to add anything but string");
        return;
      }
      this.$root.world[this.targetListName].push(newInput.value);
      console.log("referenceList", newInput.value);
    },

    test(newInput){
      console.log("test", newInput);
      //this.referenceList.push(newInput.value);
      //this.name = newInput.value;
    },
  },
  computed: {
    list(){
      //return this.targetListName;
      return this.$root.world[this.targetListName];
    },
    canAddToList(){
      if(this.type != 'Object') return true;
      else return false;
    }
  },
}
</script>

<style scoped>
.v-select {
  font-size: 25px;
}
</style>
