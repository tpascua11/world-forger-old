<template>

  <div class="row">
    <section v-if="false">{{mode}} </section>

    <div class="col-12 col" v-if="(mode == 'MENU')">
				<section v-for="item in actions" :key="item.name">
					<button v-on:click="selectNewAction(item)" class="btn-success-outline btn-small
						btn-block smallfit">
						{{item.eventName}}
					</button>
        </section>

        <section>
          <MoveToArea
            v-bind:selectDescription="'Select Area To Move to'"
            v-bind:addScript="{activate: createAction}"
            v-bind:referenceList="$root.world.areaList"
          />

          <ToggleFlag
            v-bind:selectDescription="'Select Area To Move to'"
            v-bind:addScript="{activate: createAction}"
          />
        </section>

        <section>
          <button v-on:click="selectNewActionTemplate('addItem', 'NEW_ITEM')" class="btn-success-outline btn-small btn-block smallfit">
            Add Item
					</button>
        </section>

        <section>
          <button v-on:click="selectNewActionTemplate('toggleFlag', 'NEW_ITEM')" class="btn-success-outline btn-small btn-block smallfit">
            Toggle Flags 2
					</button>
        </section>

        <section>
          <button v-on:click="ifTemplate('NEW_ITEM')" class="btn-success-outline btn-small btn-block smallfit">
            If Set
					</button>
        </section>

        <section>
          <ConditionSingle />
        </section>
    </div>

    <div class="col-12 col"
      v-else-if="(    (editMode == 'EDITED' && (editedAction.eventName == 'addItem'))
              || (editMode == 'NEW_ITEM' && (selectedAction.eventName == 'addItem'))
      )">
      <AddItem
        v-bind:addScript="{activate: forgeAction, cancel}"
        v-bind:templateA="editedAction"
        v-bind:editMode="editMode"
      />
    </div>

    <div class="col-12 col"
      v-else-if="(    (editMode == 'EDITED'   && (editedAction.ifSet))
              || (     editMode == 'NEW_ITEM' && (selectedAction.ifSet))
              )">
      <IfCondition
        v-bind:templateA="editedAction"
        v-bind:editMode="editMode"
      />
    </div>

    <div class="col-12 col"
      v-else-if="   (editedAction.eventName == 'toggleFlag')
                 || (selectedAction.eventName == 'toggleFlag')
                 "
               >
      <ToggleFlag2
        v-bind:templateA="editedAction"
        v-bind:editMode="editMode"
      />
    </div>

    <div class="col-12 col" v-else-if="(
           editedAction.ifCondition
        && selectedAction.ifCondition
      )">
      <ConditionAlt v-model="editedAction.conditionList"/>
    </div>

    <div class="col-12 col" v-else>
      <table class="table" style="width: 100%;">
        <thead>
          <th style="width: 5%;"> id </th>
          <th colspan=2 style="width: 95%;">
            {{selectedActionName}}
          </th>
        </thead>
        <tbody>
          <tr v-for="(item, propertyName, index) in selectedAction"
            :key="propertyName">
            <td v-if="propertyName != 'description'">
              {{index}}
            </td>
            <td v-if="propertyName != 'description'" style="width: 40%;">
              {{propertyName}}
            </td>

            <td colspan=3 class="description" v-if="propertyName == 'description'">
              <textarea class="descriptionTextArea" rows="4" type="string" v-model="item.value" placeholder="...">
              </textarea>
            </td>
            <td v-else-if="item.type == 'string' && propertyName != 'eventName'" style="width: 60%;"> 
              <input class="smallInput" type="string" v-model="item.value" placeholder="...">
            </td>

            <td v-else-if="item.type == 'number'" style="width: 60%;">
              <input class="smallInput" type="number" v-model="item.value" placeholder="...">
            </td>
            <td v-else-if="item.type == 'boolean'" style="width: 60%;">
              BOOLEAN {{item.value}}
            </td>
            <td v-else-if="propertyName === 'eventName'">
              {{item.value}}
            </td>
          </tr>
          <tr>
            <td colspan=1>
              <button v-on:click="cancel()" class="btn-danger-outline btn-small btn-block">
                X
              </button>
            </td>
            <td colspan=2>
              <button v-if="editMode == 'NEW'" v-on:click="makeAction()" class="btn-success-outline btn-small btn-block">
                Make Action
              </button>

              <button v-if="editMode == 'EDITED'" v-on:click="editAction()" class="btn-success-outline btn-small btn-block">
                Edit Action
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="row">
      <div class="col col-12">
      <button v-on:click="cancel()" class="btn-danger-outline btn-small btn-block">
        Back
      </button>
      </div>
    </div>
  </div>

</template>

<script>
import ActionTemplates from '@/js/actionTemplates.js'
import MoveToArea from '@/components/modals/MoveToArea.vue'
import ToggleFlag from '@/components/modals/ToggleFlag.vue'

import ToggleFlag2 from '@/components/scriptInput/ToggleFlag.vue'
import AddItem from '@/components/scriptInput/AddItem.vue'
import IfCondition from '@/components/scriptInput/IfCondition.vue'
import ConditionSingle from '@/components/scriptInput/ConditionSingle.vue'
import ConditionAlt from '@/components/modals/Condition_Alt.vue'

export default {
  name: 'ActionBuilder',
  components: {
    MoveToArea,
    ToggleFlag,
    ToggleFlag2,
    AddItem,
    IfCondition,
    ConditionSingle,
    ConditionAlt,
  },
  data: function(){
    return {
			actionsTemplates: ActionTemplates,
      isActive: true,
      error: null,
      styleObject: {
        color: 'red',
        fontSize: '13px'
      },
      action: {},
      selectedActionName: '',
      selectedAction: {description: ""},
      mode: "MENU",
      editMode: "NEW",
      stop: 0,
      selectedArea: {}

    }
  },
  props: {
    name: String,
    editedAction: Object,
    method: Object,
  },
  watch: {
    editedAction: function(oldv, newv){
      console.log(oldv,newv);
      this.selectNewAction(oldv, 'EDITED');
    }
  },
  mounted(){
    //Just to make it easier to reference it
  },
  methods:{
    selectNewArea(newArea){
      console.log(newArea);
      //this.$parent.selectNewArea(newArea);
    },
    selectNewAction(action, editMode){
      if(editMode) this.editMode = editMode;
      else this.editMode = "NEW";

      this.mode = "action";
      console.log("see action", action);
      this.selectedAction = {};
      //this.selectedAction = action;
      //temporary solution TODO: Redo if a chance
      this.selectedActionName = action.eventName;

      for (let property in action) {
        this.selectedAction[property] =
          {type: typeof action[property], value: action.[property]}
      }
      console.log('test action', this.selectedAction);
    },
    selectNewActionTemplate(name, editMode){
      //Used For Advanced Template
      if(editMode) this.editMode = editMode;
      else this.editMode = "NEW";
      this.mode = "action";
      this.selectedAction = {eventName: name};
      console.log("new eventName", this.selectedAction.eventName);
    },
    ifTemplate(editMode){
      if(editMode) this.editMode = editMode;
      else this.editMode = "NEW";
      this.mode = "action";

      this.selectedAction = {ifSet: true};
    },
    cancel(){
      this.mode = "MENU";
      this.editMode = "NEW";
    },
    makeAction(){
      this.mode = "MENU";
      //Convert It Back
      console.log("see new selected area", this.selectedAction);
      let script = {};
      for(let i in this.selectedAction){
        console.log(i);
        script[i] = this.selectedAction[i].value;
      }
      console.log("see new script added", script);
      //this.$parent.insertNewAction(script);

      this.method.addToScriptList(script);
    },
    editAction(){
      this.mode = "MENU";

      let script = {};
      for(let i in this.selectedAction){
        console.log(i);
        script[i] = this.selectedAction[i].value;
      }
      this.method.hardModifyScript(script);
    },
    forgeAction(script){
      console.log(script);
      if(this.editMode == 'EDITED') this.method.hardModifyScript(script);
      else this.method.addToScriptList(script);

      this.mode = "MENU";
      this.editMode = "NEW_ITEM";
    },
    createAction(template){
      console.log("template added", template);
      //this.$parent.insertNewAction(template);
      this.$parent.addToScriptList(template);
    }
  },
  computed: {
    actions: function(){
      return ActionTemplates.actions;
    }
  }
}
</script>

<style scoped>
.creator{
  border: 1px solid black;
  background-color: #E8E8E8;
}
.smallInput{
  height: 8px;
  font-size: 14px;
  border: 0;
  background-color: #E8E8E8;
}
.description{
  height:250px;
}
.descriptionTextArea{
  font-size: 14px;
}
.smallfit{
  height: 25px;
  padding:0.1em
}
table {
  /* border: 1px solid black; */
  /*  border: none; */
  border: 1px solid black;
}
tr {
  padding: 50px;
}
tr {
}
td{
  font-size:12px;
}
th {
  font-size: 14px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
p {
  font-size: 15px;
}

textarea {
  box-sizing:border-box;
  height: 100%;
  width: 100%;
}



</style>
