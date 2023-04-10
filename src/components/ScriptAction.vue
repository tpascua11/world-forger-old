<template>
	<div class="dt-border-x2">
		<div v-if="typeof refScriptList !== 'undefined'">
			<!-- Main -->
			<section class="">
				<div v-if="false" class="row"> {{value}} </div>
				<!-- Script: Menu 1 -->
				<div v-if="!value.eventName &&
					!(value.ifCondition || value.elseIfCondition)
					">
					<div class="pure-u-1-1 " style="height: 22px;">
						<div class="action-title margin2">
							<i class="ra   ra-focused-lightning  "></i>
							Add Script
						</div>
					</div>
					<div class="class-u-1-1 margin2">
						<div class="pure-u-1-2">
							<button class="pure-button action-button" v-on:click="newDescription()"       >  <h4> Description    </h4> </button>
							<button class="pure-button action-button" v-on:click="newStat()"              >  <h4> Stat           </h4> </button>
							<button class="pure-button action-button" v-on:click="newStatWithInfluence()" >  <h4> Stat Influence </h4> </button>
							<button class="pure-button action-button" v-on:click="newItem()"              >  <h4> Item           </h4> </button>
							<button class="pure-button action-button" v-on:click="newTime()"              >  <h4> Time           </h4> </button>
							<button class="pure-button action-button" v-on:click="newMove()"              >  <h4> Move           </h4> </button>
							<button class="pure-button action-button" v-on:click="toggleWorldFlag()"      >  <h4> Toggle Flag    </h4> </button>
							<button class="pure-button action-button" v-on:click="toggleScriptFlag()"     >  <h4> Script Flag    </h4> </button>
							<button class="pure-button action-button" v-on:click="newMoveIndex()"         >  <h4> Set Index At   </h4> </button>
							<button class="pure-button action-button" v-on:click="newChoiceList()"        >  <h4> Choice List    </h4> </button>
						</div>
						<div class="pure-u-1-2">
							<button class="pure-button action-button-p" v-on:click="addIf()"      >  <h4> IF      </h4> </button>
							<button class="pure-button action-button-p" v-on:click="addElse()"    >  <h4> ELSE    </h4> </button>
          <button class="pure-button action-button-p" v-on:click="addElseIf()"  >  <h4> ELSE IF </h4> </button>
          <button class="pure-button action-button-p" v-on:click="addEnd()"     >  <h4> END     </h4> </button>
        </div>
      </div>
    </div>
    <!-- Script: If Condition -->
		<div v-if="value.ifCondition || value.elseIfCondition">
			<div class="pure-u-1-1 " style="height: 22px;">
				<div class="action-title margin2">
					<i class="ra   ra-divert   "></i>
					Condition Modifiers
				</div>
			</div>
			<div>
				<br>
			</div>

      <div class="pure-u-1-2">
				<button v-on:click="showModal('FlagStat')"  			 	class="pure-button action-button-p "> <h4> Stat Flags 	</h4>	</button>
        <button v-on:click="showModal('FlagChanceOnStat')" 	class="pure-button action-button-p "> <h4> Chance Flags </h4>	</button>
        <button v-on:click="showModal('ItemFlag')"  				class="pure-button action-button-p "> <h4> Item Flags 	</h4>	</button>
        <button v-on:click="showModal('WorldFlag')" 				class="pure-button action-button-p "> <h4> World Flags 	</h4>	</button>
        <button v-on:click="showModal('ScriptFlag')" 				class="pure-button action-button-p "> <h4> Script Flags </h4>	</button>
				<button v-on:click="showModal('TimeFlag')" 					class="pure-button action-button-p "> <h4> Time Flags 	</h4>	</button>
			</div>
      <div class="pure-u-1-2">
        <button v-on:click="addIf()" 												class="pure-button action-button-p "> <h4>    	IF      </h4>	</button>
        <button v-on:click="addElse()" 											class="pure-button action-button-p "> <h4>  	ELSE    	</h4>	</button>
        <button v-on:click="addElseIf()" 										class="pure-button action-button-p "> <h4> ELSE IF 			</h4>	</button>
        <button v-on:click="addEnd()" 											class="pure-button action-button-p "> <h4>  	END     	</h4>	</button>
				<br>
				<br>
       </div>
     </div>
    </section>
    <!-- Back -->
    <!-- Script Imports Additions -->
    <section class="margin2">
      <Description      :value="value"/>
      <ToggleWorldFlag  :value="value"/>
      <ToggleScriptFlag :value="value"/>
      <MoveIndex        :value="value"/>
      <ModifierItem     :value="value"/>
      <ModifierStat     :value="value"/>
      <ModifierStatWithInfluence :value="value"/>
      <Time :value="value"/>
      <MoveToArea :value="value"/>
      <ChoiceList :value="value"/>
		</section>

		<div class="margin2" v-if="!value.empty">
			<div class="pure-u-3-5">
				<button class="button-warning pure-button full-width"
					v-on:click="deselect();"> Back </button>
			</div>
			<div class="pure-u-2-5">
				<button class="button-error pure-button full-width"
					v-on:click="remove();"> Remove </button>
			</div>
    </div>

    <GDialog v-model="dialogState">
      <WorldFlag v-if="modalName == 'WorldFlag'" :value="value" :modalName="modalName" />
      <ItemFlag  v-if="modalName == 'ItemFlag'"  :value="value"/>
      <ScriptFlag v-if="modalName == 'ScriptFlag'" :value="value"/>
      <FlagChanceOnStat v-if="modalName == 'FlagChanceOnStat'" :value="value" />
      <TimeFlag v-if="modalName == 'TimeFlag'" :value="value"/>
      <FlagStat v-if="modalName == 'FlagStat'" :value="value"/>

      <!--
      <AreaFlag   :value="value"/>
      TODO: Complete Remove, inefficient design
      <ToggleAreaFlag   v-if="modalName == 'AreaFlag'"   :value="value"/>
      -->
      <!--
      -->
    </GDialog>




	</div>

</div>
</template>

<script>
import Description from '@/components/scriptModifier/Description.vue'
import ToggleWorldFlag from '@/components/scriptModifier/ToggleWorldFlag.vue'
import ToggleAreaFlag from '@/components/scriptModifier/ToggleAreaFlag.vue'
import ToggleScriptFlag from '@/components/scriptModifier/ToggleScriptFlag.vue'
import MoveIndex from '@/components/scriptModifier/MoveIndex.vue'

import MoveToArea from '@/components/scriptModifier/MoveToArea.vue'
import ModifierItem from '@/components/scriptModifier/Item.vue'
import ModifierStat from '@/components/scriptModifier/Stat.vue'
import ModifierStatWithInfluence from '@/components/scriptModifier/StatWithInfluence.vue'
import Time from '@/components/scriptModifier/Time.vue'

import ChoiceList from '@/components/scriptModifier/Choice.vue'

import FlagChanceOnStat from '@/components/scriptCondition/FlagChanceOnStat.vue'
import AreaFlag    from '@/components/scriptCondition/AreaFlag.vue'
import WorldFlag   from '@/components/scriptCondition/WorldFlag.vue'
import ScriptFlag  from '@/components/scriptCondition/ScriptFlag.vue'
import ItemFlag    from '@/components/scriptCondition/ItemFlag.vue'
import FlagStat    from '@/components/scriptCondition/FlagStat.vue'
import TimeFlag    from '@/components/scriptCondition/TimeFlag.vue'


export default {
	name: 'AreaList',
  props: ['value', 'scriptList'],
  data: function(){
    return {
      dog: "good",
      isActive: true,
      error: null,
      styleObject: { color: 'red', fontSize: '13px' },
      stuff: {},
      dialogState: false,
      modalName: '',
    }
  },
  components: {
    Description,
    ToggleWorldFlag,
    ToggleAreaFlag,
    ToggleScriptFlag,
    MoveIndex,

    MoveToArea,
    ModifierItem,
    ModifierStat,
    ModifierStatWithInfluence,
    Time,
    ChoiceList,

    WorldFlag,
    AreaFlag,
    ScriptFlag,
    FlagStat,
    FlagChanceOnStat,
    ItemFlag,
    TimeFlag,
  },
  mounted(){
  },
  methods:{
    test(){ console.log("------");},
    newAction(){},
    deselect(){
      console.log("DESELECT!");
      this.$emit('deselectAction', {empty: true});
		},
		remove(){
      console.log("--- remove ---");
      //this.$emit('removeEntity', {empty: true});
      this.$emit('removeEntity', this.value);
      //this.$emit('remove');
			//this.$emit('input', {deleted: true});
			//this.$parent.removeAction();
		},
    newDescription(){
			let template = {eventName: "add_description"};
			this.refScriptList.push(template);
			//this.$parent.addToScriptList(template);
    },
    toggleWorldFlag(){
      let template = {eventName: "toggle_flag", flag: true, name: ''};
      this.refScriptList.push(template);

    },
    toggleAreaFlag(){
			let template = {eventName: "toggle_area_flag", flag: true, name: ''};
      this.refScriptList.push(template);
    },
    toggleScriptFlag(){
      console.log("THIS THIS APP!")
			let template = {eventName: "toggle_script_flag", flag: true, name: ''};
      this.refScriptList.push(template);
    },
    newMoveIndex(){
			let template = {eventName: "set_script_current_index_to",  name: ''};
      this.refScriptList.push(template);
    },
    newItem(){
			let template = {eventName: "item_modifier",  name: '', amount: 0};
			this.refScriptList.push(template);
    },
    newStat(){
			let template = {eventName: "stat_modifier",  name: '', number: 0};
			this.refScriptList.push(template);
    },
    newStatWithInfluence(){
      let template = {
        eventName: "stat_modifier_formula_1",
        stat: '', influence_stat: 0,
        default_value: 0, min_stat: 10, stat_per_influence: 1, multiplier: 1,
        min_total: 0, max_total: 100,
      };
			this.refScriptList.push(template);
    },
    newTime(){
			let template = {eventName: "time_pass", time: {years: 0, months: 0, days: 0, hours: 0, minutes: 0 }};
			this.refScriptList.push(template);
    },
    newMove(){
			let template = {eventName: "move_to_area",  name: ''};
			this.refScriptList.push(template);
    },
    newChoiceList(){
			let template = {eventName: "choice_list",  choiceList: []};
			this.refScriptList.push(template);
    },
    //-----------------------------------------------------------------
    // Conditions
    //-----------------------------------------------------------------
    simpleFlag(){
      let template = {ifCondition: "WORLD", condition_list: [{isList: [], notList: []}]};
      this.refScriptList.push(template);
    },
    simpleAreaFlag(){
			let template = {ifCondition: "AREA", condition_list: [{area_is_list: [], area_not_list: []}]};
      this.refScriptList.push(template);
    },
    simpleScriptFlag(){
			let template = {ifCondition: "SCRIPT", condition_list: [{scriptIsList: []}]};
      this.refScriptList.push(template);
    },
		addIf(){
      this.refScriptList.push({ifCondition: "ADVANCED", condition_list: []});
      this.refScriptList.push({endCondition: "ADVANCED"});
    },
    addElse(){
      this.refScriptList.push({elseCondition: "ADVANCED"});
    },
    addElseIf(){
      this.refScriptList.push({elseIfCondition: "ADVANCED", condition_list: []});
    },
    addEnd(){
      this.refScriptList.push({endCondition: "ADVANCED"});
    },
    //-----------------------------------------------------------------

    //-----------------------------------------------------------------
    // Modal Conditions
    //-----------------------------------------------------------------
    showModal(name){
      this.dialogState = true;
      this.modalName = name;
    },

    //-----------------------------------------------------------------
  },
	computed: {
		refScriptList: function(){
			console.log("TEST", this.scriptList);
			return this.scriptList;
		},
    classObject: function () {
      return { active: this.isActive && !this.error, 'text-danger': this.error && this.error.type === 'fatal'}
    }
  }
}

</script>

<style scoped>
textarea {
  box-sizing:border-box;
  height: 100%;
}



.smallfit{
  height: 23px;
  display: table-cell;
  min-width: 100%;
  position: relative;
  padding:0.1em;
}

.input-type-name{
  font-size: 17px;
}

.action-button{
  width: 100%;
  border: 1px solid black;
  background-color: white;
  height: 25px;;
}
.action-button-p{
  width: 100%;
  border: 1px solid black;
	background-color: white;
	color: darkorange;
  height: 25px;;
}

.action-button-text{
}

#ac{
  position: relative;
  bottom: 5px;
}


.this-title{
  font-size: 22px;
  font-weight: bold;
}

.border-down{
  border-bottom-style: solid;
  /*
  border-right-style: solid;
  border-left-style: solid;
   */
  border-width: 1px;
}

h4{
	font-size:15px;
	margin-top: 0px;
	margin-bottom: 0px;
	position: relative;
	top: -4px;

}

.button-error {
	background-color: #E9967A;
}
.button-warning {
  background-color: #f2f28d;
}



</style>
