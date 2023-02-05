<template>
  <div class="pure-g">
    <div class="pure-u-1-24" >
    </div>

    <div class="pure-u-3-24" style="right: 10">
      <JustList
        v-model="selectedEntity"
        v-bind:map="thisMapList"
        v-bind:title="title"
        v-bind:set_height="'450px'"
        v-bind:template="thisMap.template"
        v-bind:templateInfo="thisMap.templateInfo"
        @selected="refreshArea"
        @created="refreshInteractionList"
        v-bind:refresh="refresh"
      />
    </div>

    <div class="pure-u-1-24" >
    </div>

  </div>
</template>

<script>

/*
import ScriptList from '@/components/ScriptList.vue'
import ScriptAction from '@/components/ScriptAction.vue'
import Condition from '@/components/Condition.vue'
import StatList from '@/components/attribute/ListCurrentAndMax.vue'

*/

//import ListMultiSelect from '@/components/attribute/ListMultiSelect.vue'

//import ListAmount from '@/components/attribute/ListWithAmount.vue'
//import ListCustom from '@/components/attribute/ListCustom.vue'
import JustList from '@/components/JustList.vue'


export default {
  name: 'Character',
  components: {
    //ScriptList,
    //ScriptAction,
    //StatList,
    //ListMultiSelect,
    //ListAmount,
    //ListCustom,
    JustList,
    //Condition,
  },
  data: function() {
    return {
      //groupEntity: 'character',
      name: "Character",
      groupEntity: "item",

      selectedAction: {empty: true},
      selectedInteraction: {},
      selectedEntity: {empty: true},

      selectedScriptList: [],
      listName: "",

      targeted: { 'background-color': 'lightblue' },
      showOption: 'ATTRIBUTE',
      refresh: 0,
    };
  },
  props: {
    //groupEntity: String,
    title: String
  },
  computed: {
    thisMap: function(){
      return this.$root.world.group[this.groupEntity]
    },
    thisMapList: function(){
      return this.$root.world.group[this.groupEntity].list
    },
    templateInfo: function(){
      if(!this.$root.world.group[this.groupEntity].templateInfo) return {};
      return this.$root.world.group[this.groupEntity].templateInfo;
    }
  },
  methods:{
    selectEntity: function(entity){
      this.selectedEntity = entity;
    },
    selectAttribute: function(){
      this.showOption = 'ATTRIBUTE';
    },
    selectScriptListName: function(scriptListName){
      this.listName = scriptListName;
      this.showOption = 'SCRIPT_LIST';
      console.log("new list name", this.listName);
    },
    selectCondition: function(){
      this.showOption = 'CONDITION';
    },
    deselectAction(){
      this.selectedAction = {empty:true};
    },
    copyEntity(){
      console.log("COPY");
      let index = Object.keys(this.thisMapList).length + 1;
      index;
      let newEntity = JSON.parse(JSON.stringify(this.selectedEntity));
      this.thisMapList[index] = newEntity;
      this.selectedEntity = this.thisMapList[index];
      this.refresh+=1;
      this.$forceUpdate();
    },
    removeEntity(){
    },
    refreshArea(){
      this.showOption = 'ATTRIBUTE';
    },
    refreshInteractionList(){
      //console.log("check before", this.selectedInteraction);
      //this.selectedInteraction = {empty: true};
      //console.log("check after", this.selectedInteraction);
    },


  },
  mounted(){
  }
}
</script>


<style scoped>
textarea {
  box-sizing:border-box;
  height: 20%;
  width: 100%;
}
.nice-border{
  border: 1px solid black;
}

.simple-border{
  border: 1px solid black;
}

.hidden-border{
  border-style: none;
}

.nice-small-fit{
  font-family: Neucha;
  font-size: 17px;
  height: 25px;
  padding:0.2em
}

.nice-mid-fit{
  font-family: Neucha;
  font-size: 21px;
  height: 30px;
  padding:0.2em
}

.description-row{
  position:relative;
  top: -50px;
}

.script-row{
  height: 225px;
  position:relative;
  top: -125px;
}

p{
  font-size: 16px;
}

.big{
  width: 190vh;
}

input{
  background: #e5e4e2;
}
input:focus {
  border-color: black;
  border-width: 1px;
  background: pink;
}

.border-down{
  border-color: black;
  border-bottom-style: solid;
  /*
  border-right-style: solid;
  border-left-style: solid;
   */
  border-width: 1px;
}

.button-error {
  background-color: #E9967A;
}

.button-warning {
  background-color: #f2f28d;
}

.title-row {
  position: relative;
  bottom: 9px;
  left: 5px;
}

.b-yellow{
  background-color: #F0E68C;
}
.b-red{
  background-color: #FF7F7F;
}

</style>
