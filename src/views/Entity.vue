<template>
  <div class="pure-g">
    <div class="pure-u-1-24" >
    </div>

    <!-- Entity List Selector -->
    <div class="pure-u-4-24">
      <JustList
        v-model="selectedEntity"
        v-bind:map="thisMapList"
        v-bind:title="title"
        v-bind:set_height="'550px'"
        v-bind:template="thisMap.template"
        v-bind:templateInfo="thisMap.templateInfo"
        @selected="refreshArea"
        @created="refreshInteractionList"
        @entitySetting="selectAttribute"
        @titleClick="showEntityTemplate"
        v-bind:refresh="refresh"
        v-bind:listUpdated="listUpdated"
      />
    </div>


    <div v-if="showView=='ENTITY_TEMPLATE'" class="pure-u-18-24">
      <Attribute
        v-bind:entityName="groupEntity"
        @newTable="newTable"
        @updateEntityList="updateEntityList"
      />
    </div>

    <div v-if="showView == 'ENTITY_EDIT'" class="pure-u-12-24 dt-border">
      <div v-if="!selectedEntity.empty">
        <div class="row border-down-x3 margin1" style="min-height: 40px;">
          <div class="d-font-x2-b">
            <!--
            <div class="pure-u-16-24">
              {{title}}
            </div>
            <div class="pure-u-8-24 right">
              <button class="pure-button b-yellow sm-button"
                v-on:click="copyEntity();">
                <div class="sm-text"> Copy </div>
              </button>
              -
              <button class="pure-button b-red sm-button" v-on:click="test();">
                <div class="sm-text"> X </div>
              </button>
            </div>
              -->
          </div>
          <div class="pure-u-24-24" style=" position:relative; top: 3px;">
              <div class="" style="overflow: hidden; ">
                <label>
                  <input
                    class="borderless-gray" placeholder="name..."
                    v-model="selectedEntity.name"
                    type="text" style="font-weight: 900; font-size: 20px; height: 25px; width: 100%;"
                  />
                </label>
              </div>
          </div>
        </div>
        <div class="dt-border-x2 margin1">
            <div class="pure-u-24-24" style="font-weight: 900;">
              <span>
                <button class="pure-button sm-button" v-on:click="selectAttribute"
                        v-bind:style="[showOption == 'ATTRIBUTE' ? targeted : {}]"
                >
                  <div class="sm-text">
                    Attributes
                  </div>
                </button>
                -
                <button class="pure-button sm-button" v-on:click="selectCondition"
                        v-bind:style="[showOption == 'CONDITION' ? targeted : {}]"
                >
                  <div class="sm-text">
                    Conditions
                  </div>
                </button>
              </span>
              <span v-for="(row,index) in templateInfo" :key="index">
                <span v-if="row.type == 'script_list' "> - </span>
                <button v-if="row.type == 'script_list'" class="pure-button sm-button"
                  v-bind:style="[(showOption == 'SCRIPT_LIST') && (listName == index) ? targeted : {} ]"
                  v-on:click="selectScriptListName(index)"
                >
                  <div class="sm-text"> {{index}} Event </div>
                </button>
              </span>
            </div>
        </div>
        <section class="cool-scroll" style="height: 70vh;">
          <div class="" v-if="showOption == 'ATTRIBUTE'">
            <div v-for="(row , index) in selectedEntity" :key="index">
              <div class="pure-g" v-if="index != 'name'">
                <div class="pure-u-4-24" style="text-align: center;
                  font-size:16px; margin-top: 5px;
                  " v-if="index != 'name'">
                  {{index}}
                </div>
                <div class="pure-u-1-24" style="">
                </div>

                <div class="pure-u-19-24" >
                    <!-- LIST COmplex-->
                    <div v-if="templateInfo[index] && templateInfo[index].isList">
                      <div v-for="(row2 , index2) in selectedEntity[index]" :key="index2">
                        <div class="pure-g border-down">
                          <div class="pure-u-5-24" style="margin-top: 5px;">
                            {{subAttributeRealName(index, index2)}}
                          </div>
                        <!--
                        <input class="borderless-gray" placeholder="name..."
                          v-model="selectedEntity[index][index2]" type="text" style=" height: 25px; width: 50%;" />
                        -->
                          <div class="pure-u-19-24" style="">
                            <div v-if="(templateInfo[index].type == 'string')">
                              <label>
                                <input class="borderless-gray" placeholder="name..."
                                  v-model="selectedEntity[index][index2]" type="text" style=" height: 25px; width: 50%;" />
                              </label>
                            </div>
                            <div v-else-if="(templateInfo[index].type == 'number')">
                              <label>
                                <input class="borderless-gray" placeholder="number..."
                                  v-model="selectedEntity[index][index2]" type="number" style=" height: 25px; width: 50%;" />
                              </label>
                            </div>
                            <div v-else-if="(templateInfo[index].type == 'current_and_max')">
                              <label>
                                Current: <input class="borderless-gray" placeholder="name..."
                                  v-model="selectedEntity[index][index2].current" type="number"
                                  style=" height: 25px; width: 30%;" />

                                Max: <input class="borderless-gray" placeholder="name..."
                                  v-model="selectedEntity[index][index2].max" type="number" style="
                                  height: 25px; width: 30%;" />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- BASICS -->
                    <div v-else-if="templateInfo[index]">
                      <div v-if="templateInfo[index].type == 'list_current_and_max'">
                        <div v-if="false">
                          <StatList v-bind:title="index" v-model="selectedEntity[index]" v-bind:reference="'stat'"/>
                        </div>
                        <hr>
                      </div>
                      <div v-else-if="(templateInfo[index].type == 'script_list') || (templateInfo[index].type == 'condition_list') || index == 'name'"> </div>
                      <div v-else-if="(templateInfo[index].type == 'string')">
                        <label>
                          <input class="borderless-gray" placeholder="name..."
                            v-model="selectedEntity[index]" type="text" style=" height: 25px; width: 50%;" />
                        </label>
                      </div>
                      <div v-else-if="(templateInfo[index].type == 'number')">
                        <label>
                          <input class="borderless-gray" placeholder="name..."
                            v-model="selectedEntity[index]" type="number" style=" height: 25px; width: 50%;" />
                        </label>
                      </div>
                      <div v-else-if="(templateInfo[index].type ==
                        'current_and_max')">
                        <label>
                          Current: <input class="borderless-gray" placeholder="name..."
                            v-model="selectedEntity[index].current" type="number"
                            style=" height: 25px; width: 30%;" />

                          Max: <input class="borderless-gray" placeholder="name..."
                            v-model="selectedEntity[index].max" type="number" style="
                            height: 25px; width: 30%;" />
                        </label>
                      </div>
                    </div>
                </div>
              </div>
              <hr>
            </div>
          </div>
        <div v-else-if="showOption == 'CONDITION'" class="">
        </div>
        <div v-else-if="showOption == 'SCRIPT_LIST'" class="">
          <ScriptList
            v-bind:scriptList="selectedEntity[listName]"
            v-bind:entity="selectedEntity"
            v-bind:listName="listName"
            v-bind:show="showOption"
            @selectAction="selectAction"
            :value="selectedAction"
          />
        </div>
        </section>
      </div>
    </div>


    <div v-if="showView == 'ENTITY_EDIT'" class="pure-u-5-24 margin2">
      <section class="">
        <div class="" v-if="showOption == 'SCRIPT_LIST'">
          <!-- TEST {{listName}} {{selectedAction}} -->
          <ScriptAction
            :value="selectedAction"
            v-bind:selectedAction="selectedAction"
            v-bind:scriptList="selectedEntity[listName]"
            v-bind:entity="selectedAction"
            @deselectAction="deselectAction"
            @removeEntity="removeEntity"
          />
        </div>
      </section>
    </div>


  </div>
</template>

<script>

import StatList from   '@/components/attribute/Stat_List.vue';
import ScriptList from '@/components/ScriptList.vue';
import Attribute from '@/components/Attribute.vue';
import ScriptAction from '@/components/ScriptAction.vue';
import Condition from '@/components/Condition.vue';
import JustList from '@/components/JustList.vue';


export default {
  name: 'Character',
  components: {
    StatList,
    Attribute,
    ScriptList,
    ScriptAction,
    JustList,
    Condition,
  },
  watch: {
    entityMode(newE, oldE) {
      if(newE == 'ENTITY_CONFIGURE'){
        this.showView = "ENTITY_TEMPLATE";
      }
      else if(newE == 'ENTITY_LIST'){
        this.showView = "ENTITY_EDIT";
      }
    },
    groupEntity(newE, oldE){
      if(newE != oldE){
        this.selectedEntity = {};
      }
    }
  },
  data: function() {
    return {
      //groupEntity: 'character',
      name: "Character",
      //groupEntity: "item",
      //title: "Item",

      selectedAction: {empty: true},
      selectedInteraction: {},
      selectedEntity: {empty: false},

      selectedScriptList: [],
      listName: "",

      targeted: { 'background-color': 'lightblue' },
      showOption: 'ATTRIBUTE',
      refresh: 0,
      showView: 'entityEdit',
      //entityName: 'item',
      tempName: [],
      goName: 'name',
      listUpdated: 0,
    };
  },
  props: {
    //groupEntity: String,
    //title: String
    entityName: String,
    title: String,
    groupEntity: String,

    entityMode: String,
  },
  computed: {
    thisMap: function(){
      return this.$root.world.group[this.groupEntity]
    },
    thisGroup: function(){
      return this.$root.world.group;
    },
    thisMapList: function(){
      if(!this.$root.world.group[this.groupEntity]) return [];

      return this.$root.world.group[this.groupEntity].list
    },
    templateInfo: function(){
      if(!this.$root.world.group[this.groupEntity].templateInfo) return {};
      return this.$root.world.group[this.groupEntity].templateInfo;
    }
  },
  methods:{
    test2(){
      console.log("TEST 2");
    },
    updateEntityList(list){
      console.log("FORCE UPDATE ENTITY LIST ---");
      this.$root.world.group[this.groupEntity].list = list;
      this.listUpdated++;
    },
    newTable(){
      console.log("New Table Test");
      this.$emit("newTable");
    },
    selectEntity: function(entity){
      this.selectedEntity = entity;
      this.showView = "ENTITY_EDIT";
    },
    selectAttribute: function(){
      console.log("ATTRIBUTE");
      this.showOption = 'ATTRIBUTE';
      this.showView = "ENTITY_TEMPLATE";
    },
    selectScriptListName: function(scriptListName){
      this.listName = scriptListName;
      this.showOption = 'SCRIPT_LIST';
      console.log("new list name", this.listName);
    },
    selectCondition: function(){
      this.showOption = 'CONDITION';
    },
    selectAction(data, index){
      console.log("Select Action", data);
      console.log("Index", index);
      this.selectedAction = data;
    },
    deselectAction(){
      console.log("TRUE DESELECT -");
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
    removeEntity(test){
      let findIndex;
      this.selectedEntity[this.listName].forEach(function(row, index){
        if(row == test) findIndex = index;
      });
      if (findIndex !== -1) {
        this.selectedEntity[this.listName].splice(findIndex, 1);
      }
    },
    remove(test){
      console.log("TEST --------- ", test);
    },
    refreshArea(test){
      console.log("CLICK EVENT!", test);
      if(test) this.selectedEntity = test;

      this.showOption = 'ATTRIBUTE';
      this.showView = "ENTITY_EDIT";
    },
    refreshInteractionList(){
      //console.log("check before", this.selectedInteraction);
      //this.selectedInteraction = {empty: true};
      //console.log("check after", this.selectedInteraction);
    },
    showEntityTemplate(){
      this.showView = "ENTITY_TEMPLATE";
    },
    showEntityEdit(){
      this.showView = "ENTITY_EDIT";
    },
    addToList(list, type){
      console.log("WHAT IS LIST", list);
      if(type == 'string') list.push('');
      else if(type == 'number') list.push(0);
      else if(type == 'current_and_max') list.push({current: 0, max: 0});
    },
    subAttributeRealName(index, index2){
      let trueIndex2 = (parseInt(index2) + 1).toString();
      let referenceTo = this.templateInfo[index].referenceTo;
      let deepi = this.thisGroup[referenceTo].list[trueIndex2];
      if(deepi){
        return deepi['name'];
      }
      else
      return deepi;

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

.true-font{
	font-family: Neucha;
}

#app {
  font-family: "Neucha", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
	color: #2c3e50;

	/* text-align: center; */
}





</style>
