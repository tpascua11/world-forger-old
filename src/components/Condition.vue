<template>
  <div class="dt-border-x2">
    <div>
      <div class="pure-u-1-1 " style="height: 22px;">
        <div class="action-title margin2">
          <i class="ra   ra-divert   "></i>
          Condition Modifiers
        </div>
      </div>
    </div>
    <div class="margin2">
      <div class="pure-u-4-5">
        <br>
        {{value.condition_list}}
      </div>
      <div class="pure-u-1-5">
        <button v-on:click="showModal('FlagStat')"  			 	class="pure-button action-button-p "> <h4> Stat Flags 	</h4>	</button>
        <button v-on:click="showModal('FlagChanceOnStat')" 	class="pure-button action-button-p "> <h4> Chance Flags </h4>	</button>
        <button v-on:click="showModal('ItemFlag')"  				class="pure-button action-button-p "> <h4> Item Flags 	</h4>	</button>
        <button v-on:click="showModal('WorldFlag')" 				class="pure-button action-button-p "> <h4> World Flags 	</h4>	</button>
        <button v-on:click="showModal('AreaFlag')" 					class="pure-button action-button-p "> <h4> Area Flags 	</h4>	</button>
        <button v-on:click="showModal('ScriptFlag')" 				class="pure-button action-button-p "> <h4> Script Flags </h4>	</button>
        <button v-on:click="showModal('TimeFlag')" 					class="pure-button action-button-p "> <h4> Time Flags 	</h4>	</button>
      </div>
    </div>

    <!-- Back -->
    <!-- Script Imports Additions -->
    <section class="margin2">
      <WorldFlag v-model="value"/>
      <AreaFlag v-model="value"/>
      <ScriptFlag v-model="value"/>
      <FlagStat v-model="value"/>
      <FlagChanceOnStat v-model="value"/>
      <ItemFlag v-model="value"/>
      <TimeFlag v-model="value"/>
    </section>
  </div>
</template>

<script>

import AreaFlag    from '@/components/scriptCondition/AreaFlag.vue'
import WorldFlag   from '@/components/scriptCondition/WorldFlag.vue'
import ScriptFlag  from '@/components/scriptCondition/ScriptFlag.vue'
import ItemFlag    from '@/components/scriptCondition/ItemFlag.vue'
import FlagStat    from '@/components/scriptCondition/FlagStat.vue'
import TimeFlag    from '@/components/scriptCondition/TimeFlag.vue'

import FlagChanceOnStat from '@/components/scriptCondition/FlagChanceOnStat.vue'

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
    }
  },
  components: {
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
      this.$emit('input', {empty: true});
		},
		remove(){
			console.log("remove");
			this.$emit('remove');
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
    //-----------------------------------------------------------------
    // Modal Conditions
    //-----------------------------------------------------------------
    showModal(name){
      this.$modal.show(name);
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
  /*color: darkorange;*/
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
