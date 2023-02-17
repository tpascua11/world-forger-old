<template>
  <section>
  <div @click="$emit('input', 'dog')">
    Test 1 2 3
  </div>
  <div v-on:click="test">
    <v-select
      v-model="name"
      :from="referenceList"
      @change="converge"
    />
  </div>


  </section>
</template>

<script>
export default {
  name: 'Simple_Select',
  data: function(){
    return {
      row: "",
      referenceList: ['A', 'B', 'C'],
      selectedArea: "",
      name: "hello",
      selectedObject: {},
      selected: '',
    }
  },
  methods:{
    test(){
      this.$emit('input', this.name);
    },
    converge(){
      console.log("CONVERGE!");
    }
  },
  props: {},
  computed: {},
  mounted() {
    this.$emit("input", this.selected);
  },
}
</script>

<style scoped>
</style>
