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
            <div v-for="(index, key1) in orderInfo" :key="key1">
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
                      <!-- Reference ALL -->
                      <div v-if="templateInfo[index].isList == 'all'">
                        <div v-for="(row2 , index2) in selectedEntity[index]" :key="index2">
                          <div class="pure-g border-down">
                            <div class="pure-u-5-24" style="margin-top: 5px;">
                              {{subAttributeRealName(index, index2)}}
                            </div>
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
                      <!-- Reference Multipleselectable -->
                      <div v-else-if="templateInfo[index].isList ==
                        'multiselectable' && (index != 'name')">
                        <!--
                          {{templateInfo[index].referenceTo}}
                          {{referenceList(templateInfo[index].referenceTo)}}
                          {{selectedEntity[index]}}
                          -->
                          <div>
                            <div v-for="(row2 , index2) in selectedEntity[index]" :key="index2">
                              <div style="height: 45px">
                                <div class="pure-u-12-24" >
                                  <!-- Reference Selector -->
                                  <!--
                                {{referenceList(templateInfo[index].referenceTo)}}
                                  -->
                                  <VueMultiselect
                                    v-model="selectedEntity[index][index2].referenceID"
                                    deselect-label="Can't remove this value"
                                    placeholder="Select..."
                                    :options="selectedEntityReferenceList[templateInfo[index].referenceTo]"
                                    :searchable="true"
                                    :allow-empty="false"
                                  >
                                    <!--
                                    <template v-slot:selection="" slot-scope="">
                                    </template>
                                    -->
                                    <template v-slot:option="{option}">
                                      {{option}} --
                                      {{thisGroup[templateInfo[index].referenceTo].list[option]['name']}}
                                    </template>
                                    <template v-slot:singleLabel="{}" slot-scope="">
                                      {{thisGroup[templateInfo[index].referenceTo].list[selectedEntity[index][index2].referenceID]['name']}}
                                    </template>
                                  </VueMultiselect>
                                </div>
                                <!-- Value Selector -->
                                <div class="pure-u-9-24" >
                                  <div v-if="(templateInfo[index].type == 'string')">
                                    <label>
                                      <input class="borderless-gray" placeholder="name..."
                                        v-model="selectedEntity[index][index2].data"
                                        type="text" style=" height: 40px; width: 90%;" />
                                    </label>
                                  </div>
                                  <div v-else-if="(templateInfo[index].type == 'number')">
                                    <label>
                                      <input class="borderless-gray" placeholder="number..."
                                        v-model="selectedEntity[index][index2].data"
                                        type="number" style=" height: 40px; width: 90%;" />
                                    </label>
                                  </div>
                                  <div v-else-if="(templateInfo[index].type == 'current_and_max')">
                                    <label>
                                      Current: <input class="borderless-gray" placeholder="name..."
                                        v-model="selectedEntity[index][index2].data.current" type="number"
                                        style=" height: 25px; width: 50%;" />

                                      Max: <input class="borderless-gray" placeholder="name..."
                                        v-model="selectedEntity[index][index2].data.max" type="number" style="
                                        height: 25px; width: 50%;" />
                                    </label>
                                  </div>
                                </div>
                                <div class="pure-u-3-24" >
                                  <button
                                    v-on:click="removeObjectByIndex(selectedEntity[index]
                                    , index2,
                                    thisGroup[templateInfo[index].referenceTo].list[selectedEntity[index][index2].referenceID]['name'])"
                                    class="pure-button b-red"
                                    style="height: 40px">
                                    X
                                  </button>
                                </div>
                              </div>
                            </div>
                            <br>
                            <button @click="addReferenceToList(selectedEntity[index])"> Add </button>
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
                      <div v-else-if="(templateInfo[index].type == 'current_and_max')">
                        <label>
                          Current: <input class="borderless-gray" placeholder="name..."
                            v-model="selectedEntity[index].current" type="number"
                            style=" height: 25px; width: 30%;" />

                          Max: <input class="borderless-gray" placeholder="name..."
                            v-model="selectedEntity[index].max" type="number" style="
                            height: 25px; width: 30%;" />
                        </label>
                      </div>
                      <div v-else-if="(templateInfo[index].type == 'image_url')">
                        <div>
                          Image URL:
                          <input class="borderless-gray" placeholder="name..."
                            v-model="selectedEntity[index]" type="text" style="
                            height: 25px; width: 100%;" />
                        </div>
                        <div>
                        </div>
                        <div>
                          <img :src="selectedEntity[index]" alt="Image 1">
                        </div>
                      </div>
                      <div v-else-if="(templateInfo[index].type == 'table') && (index != 'name')">
                        <div v-if="(templateInfo[index].type == 'table')">
                          <VueMultiselect
                            v-model="selectedEntity[index]"
                            placeholder="Select..."
                            :options="selectedEntityReferenceList[templateInfo[index].referenceTo]"
                            :searchable="true"
                            :allow-empty="false">
                            <!--
                            <template v-slot:selection="" slot-scope="">
                            </template>
                            -->
                            <template v-slot:option="{option}">
                              {{option}} -
                              {{thisGroup[templateInfo[index].referenceTo].list[option]['name']}}
                            </template>
                            <template v-slot:singleLabel="{}" slot-scope="">
                                <div v-if="thisGroup[templateInfo[index].referenceTo].list[selectedEntity[index]]">
                                {{thisGroup[templateInfo[index].referenceTo].list[selectedEntity[index]].name}}
                                </div>
                            </template>
                          </VueMultiselect>
                        </div>
                      </div>
                      <div v-else-if="(templateInfo[index].type == 'table_list')">
                        <!--
                        <p> entity --  {{selectedEntity[index]}} </p>
                        <p> templateInfo -- {{templateInfo[index]}} </p>
                        <p> template Info Reference {{templateInfo[index].referenceTo}} </p>
                          ------
                          {{referenceListFix(templateInfo[index])}}
                        -->
                        <div v-if="(templateInfo[index].type == 'table_list')">

                          <div v-for="(row2 , index2) in selectedEntity[index]" :key="index2">

                                <div class="pure-u-12-24" >
                                  <VueMultiselect
                                    v-model="selectedEntity[index][index2]"
                                    deselect-label="Can't remove this value"
                                    placeholder="Select..."
                                    :options="referenceListFix(templateInfo[index])"
                                    :searchable="true"
                                    :allow-empty="false"
                                  >
                                    <template v-slot:option="{option}">
                                      {{option}} -
                                      {{thisGroup[templateInfo[index].referenceTo].list[option]['name']}}
                                    </template>


                                    <template v-slot:singleLabel="{option}" slot-scope="">
                                      <div v-if="thisGroup[templateInfo[index].referenceTo].list[option]">
                                        {{thisGroup[templateInfo[index].referenceTo].list[option].name}}
                                        <br><br>
                                      </div>
                                    </template>

                                    <!--
                                    <template v-slot:selection="" slot-scope="">
                                    </template>
                                    -->
                                  </VueMultiselect>
                                </div>
                                <div class="pure-u-12-24" >
                                  <!--
                                  {{thisGroup[templateInfo[index].referenceTo].list[row2].name}}
                                  -->
                                  <button
                                    v-on:click="removeObjectByIndex(selectedEntity[index], index2, 
                                    thisGroup[templateInfo[index].referenceTo].list[row2].name)"
                                    class="pure-button b-red"
                                    style="height: 40px">
                                    X
                                  </button>
                                </div>
                          </div>
                          <!--
                          <VueMultiselect
                            v-model="selectedEntity[index]"
                            placeholder="Select..."
                            :options="referenceList(templateInfo[index].referenceTo)"
                            :searchable="true"
                            :multiple="true"
                            :allow-empty="false"
                          >
                            <template v-slot:option="{option}">
                              {{option}} -
                              {{thisGroup[templateInfo[index].referenceTo].list[option]['name']}}
                            </template>
                            <template v-slot:tag="{option}" slot-scope="">
                              <div v-if="thisGroup[templateInfo[index].referenceTo].list[option]">
                                       {{thisGroup[templateInfo[index].referenceTo].list[option].name}}
                                      <br><br>
                              </div>
                            </template>
                          </VueMultiselect>
                          -->
                        <button @click="addReferenceToList2(selectedEntity[index])"> Add </button>
                        </div>
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
        this.showView = "";
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
      selectedEntityReferenceList: {},

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
    },
    orderInfo: function(){
      if(!this.$root.world.group[this.groupEntity].structureInfo) return [];
      else return this.$root.world.group[this.groupEntity].structureInfo.orderList;
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
      console.log("SELECT NEW ENTITY", this.selectedEntity);
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
      //TODO: THIS IS NOT RIGHT NO MORE! Name change
      console.log("CLICK EVENT!", test);
      if(test) this.selectedEntity = test;

      this.showOption = 'ATTRIBUTE';
      this.showView = "ENTITY_EDIT";

      this.refreshEntityAttributeReferenceList();
    },
    refreshEntityAttributeReferenceList(){
      this.selectedEntityReferenceList = {};

      Object.entries(this.templateInfo).forEach((row, index) => {
        //console.log("row refrence", row[1].referenceTo);
        //console.log("row type", row[1].type);

        if(row[1].type === 'table_list' || row[1].type == 'table'){
          if(this.thisGroup[row[1].referenceTo]){
            this.selectedEntityReferenceList[row[1].referenceTo] =
                  Object.keys(this.thisGroup[row[1].referenceTo].list);
          }
        }
        else if(row[1].isList){
          if(this.thisGroup[row[1].referenceTo]){
            this.selectedEntityReferenceList[row[1].referenceTo] =
                  Object.keys(this.thisGroup[row[1].referenceTo].list);
          }
        }
        else {}
      });
      //console.log("NEW REFERENCE LIST", this.selectedEntityReferenceList);
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
      let trueIndex2 = (parseInt(index2)).toString();
      let referenceTo = this.templateInfo[index].referenceTo;
      let deepi = this.thisGroup[referenceTo].list[trueIndex2];
      if(deepi){
        return deepi['name'];
      }
      else
      return deepi;
    },
    addReferenceToList(list){
      list.push({referenceID: '0', data: 0});
      console.log("LIST", list);
    },
    addReferenceToList2(list){
      list.push('0');
      console.log("LIST", list);
    },
    referenceList(reference){
      if(!this.thisGroup[reference]) return [];
      else if(this.thisGroup[reference].list){
        console.log("THE REFERENCE", Object.keys(this.thisGroup[reference].list));
        return Object.keys(this.thisGroup[reference].list);
      }
      else return [];
    },
    referenceListComplex(reference){
      if(!this.thisGroup[reference]) return [];
      else if(this.thisGroup[reference].list){
        let ref = this.thisGroup[reference].list;
        let newList = Object.entries(ref).map(([referenceID, value]) => ({
          referenceID: parseInt(referenceID),
          name: value.name
        }));
        return newList;
      }
      else return [];
    },
    referenceListFix(templateInfo){
      return this.selectedEntityReferenceList[templateInfo.referenceTo];
      /*
      console.log("????");
      let ref = templateInfo.referenceTo;
      let array1 = this.selectedEntityReferenceList[ref];
      let array2 = this.selectedEntity[ref];

      let newArray = array1.filter(item => !array2.includes(item));
      return newArray;


       */
      //return this.selectedEntity[ref];
    },
    referenceAdd(reference, entity){
      console.log("REFERENCE", reference);
      console.log("ENTITY", entity);
      //entity.push(reference);
    },
    referenceIdentity({}){
    },
    removeObjectByIndex(list, indexToRemove, name) {
      if(!name) name = '---';
      console.log("LIST", list);
      if(!confirm(`Remove ${name}`)) return;
      list.splice(indexToRemove, 1);
      return list;
    }

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
