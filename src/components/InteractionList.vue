<template>
  <div class="basedHeight bordero">
    <div class="rowA">
      <button v-on:click="createInteraction" class="btn-danger fixedButton">
        Add New Interaction
      </button>
      <div>
      <div v-for="(item, index) in interactionList" :key="index">
        <button v-on:click="selectInteraction(item)" class="btn-default
          fixedButton">
          {{item.name}}
        </button>
      </div>
      </div>
    </div>
    <!--
    <section v-for="(item, index) in interactionList" :key="index">
      <button v-on:click="selectInteraction(item)" class="btn-default fixedButton">
        {{item.name}}
      </button>
    </section>
    -->
  </div>
</template>

<script>
export default {
  name: 'InteractionList',
  data: function(){
    return {
      isActive: true,
    }
  },
  props: {
    selectedInteraction: Object,
    interactionList: Array,
    tags: Array,
    name: String,
  },
  mounted(){
  },
  methods:{
    createInteraction(){
      if(!this.interactionList){
        console.log('interaction list is bad');
        return;
      }

      this.interactionList.push({
        name: 'New Interaaction',
        scriptList: [],
        tags: [],
        conditionList: [],
      });
    },
    selectInteraction(interaction){
      console.log("selected interaction", interaction);
      this.$parent.selectInteraction(interaction);
    },
  },
  computed: {}
}

</script>

<style scoped>
.fixedButton{
  width: 137px;
  padding:0.2em;
  font-size: 15px;
}
.bordero {
}
.addInteraction{
  position: relative;
}
.basedHeight{
  height: 25vh;
  /* border-top: 1px solid; */
}
.title{
  margin-top: 10px;
  font-size: 25px;
  text-align: left;
}
.rowA{
  /*
  margin-top: -15px;
   */
}
table {
  /* border: 1px solid black; */
  /*  border: none; */
  border: 1px solid black;
}
tr{

}
td{
  font-size:12px;
  padding: 10px;
  cursor: pointer
}


</style>
