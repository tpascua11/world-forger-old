<template>
	<section>
   <!-- Add Area Flag Condition -->
    <div class="row border-bottom border-top close-up">
      <div class="col-2 small-s title-s mini-down">
        Area Flag
      </div>
      <div class="col-1">
        <button v-if="areaFlagType == 'IS'"  v-on:click="areaFlagType = 'NOT'"
          class="btn-success small-s mini-down"> IS </button>
        <button v-if="areaFlagType == 'NOT'" v-on:click="areaFlagType = 'IS'"
          class="btn-danger small-s mini-down"> NOT </button>
      </div>
      <div class="col-6">
        <v-select v-model="areaFlagList" :from="aflist" class="f-size mini-down" placeholder="Add Flag">
          <template v-slot:selected="{option}">
            <div class="f-size">
              <p> {{option.raw}}</p>
            </div>
          </template>

          <template v-slot:option="{option}">
            <div class="f-size">
              {{option.raw}}
            </div>
          </template>
        </v-select>
      </div>
      <div class="col-1"></div>
      <div class="col-2">
        <button v-on:click="updateAreaFlagSet()"
          class="small-s-width btn-secondary"> Add
        </button>
      </div>
    </div>
   <!-- Add Flag Condition -->
    <div class="row border-bottom border-top close-up">
      <div class="col-2 small-s title-s mini-down">
        Flag
      </div>
      <div class="col-1">
        <button v-if="flagType == 'IS'"  v-on:click="flagType = 'NOT'"
          class="btn-success small-s mini-down"> IS </button>
        <button v-if="flagType == 'NOT'" v-on:click="flagType = 'IS'"
          class="btn-danger small-s mini-down"> NOT </button>
      </div>
      <div class="col-6">
        <v-select v-model="flagList" :from="dlist" class="f-size mini-down" placeholder="Add Flag">
          <template v-slot:selected="{option}">
            <div class="f-size">
              <p> {{option.raw}}</p>
            </div>
          </template>

          <template v-slot:option="{option}">
            <div class="f-size">
              {{option.raw}}
            </div>
          </template>
        </v-select>
      </div>
      <div class="col-1"></div>
      <div class="col-2">
        <button v-on:click="updateFlagSet()"
          class="small-s-width btn-secondary"> Add
        </button>
      </div>
    </div>
    <!-- Add Item Condition -->
    <div class="row border-bottom close-up-2">
      <div class="col-1 small-s title-s">
        Item
      </div>
      <div class="col-1">
      </div>

      <div class="col-4">
        <v-select v-model="inputItem.name" :from="itemList"
          class="f-size" placeholder="Add Item" />
      </div>

      <div class="col-1">
        <Dropdown
          v-model="inputItem.operator"
          v-bind:options="operatorList" />
      </div>

      <div class="col-2">
        <input class="small-s-width" type="number" v-model="inputItem.value" placeholder="Value">
      </div>

      <div class="col-1">
      </div>

      <div class="col-2">
        <button v-on:click="updateItemSet()"
          class="btn-secondary small-s-width"> Add
        </button>
      </div>
    </div>

    <!-- Add Stat Condition -->
    <div class="row border-bottom close-up-3">
      <div class="col-1 small-s title-s">
        Stat
      </div>

      <div class="col-1"></div>

      <div class="col-4">
        <v-select v-model="inputStat.name" :from="statList"
          class="f-size " placeholder="Add Item" />
      </div>

      <div class="col-1">
        <Dropdown
          v-model="inputStat.operator"
          v-bind:options="operatorList" />

      </div>

      <div class="col-2">
        <input class="small-s-width " type="number"
          v-model="inputStat.value" placeholder="Value">

        </div>

        <div class="col-1">
        </div>

        <div class="col-2">
          <button v-on:click="updateStatSet()"
            class="btn-secondary small-s-width"> Add
          </button>
        </div>

      </div>

    <!-- Add Time Condition -->
    <div class="row move50up" v-if="false">
			<div class="col-2 small-s title-s">
				<button v-on:click="showTime = !showTime" class="small-s-width title-s">
					Time
				</button>
			</div>
		</div>
    <div class="row move50up" v-if="showTime">
      <div class="col-12">
        <table class=''>
          <thead>
            <tr>
              <th> Op..</th>
              <th> Year </th>
              <th> Months </th>
              <th> Day </th>
              <th> Hour </th>
              <th> Minute </th>
            </tr>
            <tr>
              <td> Greater </td>
              <td> <input class="small-s-width adaptable-width" type="number" v-model="inputDate.after.year" placeholder="Value"> </td>
							<td>Month</td>
              <td> <input class="small-s-width adaptable-width" type="number" v-model="inputDate.after.day" placeholder="Value"> </td>
              <td> <input class="small-s-width adaptable-width" type="number" v-model="inputDate.after.hour" placeholder="Value"> </td>
              <td> <input class="small-s-width adaptable-width" type="number" v-model="inputDate.after.minute" placeholder="Value"> </td>
            </tr>
            <tr>
              <td> Less </td>
              <td>
                <!--
                <select v-model="selectedArea" class="smalldir areaName">
                  <option v-for="(option, index) in referenceAreaList" v-bind:value="option" :key="index">
                    {{option.name}}
                  </option>
                </select>
                -->
                <input class="small-s-width adaptable-width" type="number"    v-model="inputDate.before.year" placeholder="Value">
              </td>
							<td>Month</td>
              <td> <input class="small-s-width adaptable-width" type="number" v-model="inputDate.before.day" placeholder="Value"> </td>
              <td> <input class="small-s-width adaptable-width" type="number" v-model="inputDate.before.hour" placeholder="Value"> </td>
              <td> <input class="small-s-width adaptable-width" type="number" v-model="inputDate.before.minute" placeholder="Value"> </td>
            </tr>
          </thead>
        </table>
      </div>
    </div>
    <!-- Time Condition -->
    <div class="row move50up">
      <div class="col-2">
				<button v-on:click="showTime = !showTime" class="small-s-width title-s">
					Time
				</button>
      </div>
      <div class="col-8"></div>
      <div class="col-2">
        <button v-on:click="updateDateSet()"
          class="btn-secondary small-s-width"> Add
        </button>
      </div>
    </div>
   <!-- Add Complex Condition -->
    <div class="row border-bottom border-top close-up">
      <div class="col-2 small-s title-s mini-down">
        Complex
      </div>
     <div class="col-7">
        <v-select v-model="complexList" :from="referenceComplexList" class="f-size mini-down" placeholder="Add Flag">
          <template v-slot:selected="{option}">
            <div class="f-size">
              <p> {{option.raw}}</p>
            </div>
          </template>

          <template v-slot:option="{option}">
            <div class="f-size">
              {{option.raw}}
            </div>
          </template>
        </v-select>
      </div>
      <div class="col-1">
        <button v-on:click="refresh()" class="small-s-width btn-warning">
          <i class="ra ra-gears ra-2x"></i>
        </button>
      </div>
      <div class="col-2">
        <button v-on:click="updateComplexSet()"
          class="small-s-width btn-secondary"> Add
        </button>
      </div>
    </div>
    <br><br><br><br>

  </section>
</template>

<script>

import Dropdown from '@/components/list/Dropdown.vue'

export default {
  name: 'FlagInput',
  props: ["value", "referenceList"],
  components: {
    Dropdown,
  },
  data: function(){
    return {
			referenceComplexList:  Object.keys(this.$root.world.complexConditionMap),
			//referenceAreaFlagList: [],
			referenceAreaFlagList: this.areaFlagKeys(),
			//Object.keys(this.$root.selectedArea.flagMap),

			showTime: true,

      areaTypeList: ["NOT", "IS"],
			areaFlagType: "IS",
      areaFlagList: [],

      typeList: ["NOT", "IS"],
			flagType: "IS",
      flagList: [],
			complexList: [],

      putBackList: [],


      operatorList: [">", ">=", "==", "<=", "<"],
      inputString: "",
      inputItem: {
        name: "",
        operator: ">=",
        value: 0
      },
      inputStat: {
        name: "",
        operator: ">=",
        value: 0
      },
      inputDate: {
        after : {year: 0, day: 0, hour: 0, minute: 0},
        before: {year: 0, day: 0, hour: 0, minute: 0}
      },
      clearList: [],
    }
  },
	methods:{
		areaFlagKeys(){
			if(this.$root.selectedArea && this.$root.selectedArea.flagMap) return Object.keys(this.$root.selectedArea.flagMap);
			else return [];
		},
    refresh(){
      this.referenceComplexList = Object.keys(this.$root.world.complexConditionMap);
    },
    modern(){
			//return this.$root.world.complexConditionMap;
			console.log("--=-=--=-=-=-=-=-=-=-==-");
    },
    updateFlagSet(){
      /* Use the selected flags and option to add new flags into one of the
       * flagSet lists */

      let newSet = this.value;
      console.log("-----", newSet);
      if(this.flagType == 'IS'){
        newSet.isList = [...newSet.isList, ...this.flagList]
        this.$emit('input', newSet);
      }
      else if (this.flagType == "NOT"){
        newSet.notList = [...newSet.notList, ...this.flagList]
        this.$emit('input', newSet);
      }
      this.flagList = [];
		},
    updateAreaFlagSet(){
      /* Use the area selected flags and option to add new flags into one of the
       * flagSet lists */

      let newSet = this.value;
      console.log("-----", newSet);
      if(this.areaFlagType == 'IS'){
        newSet.areaIsList = [...newSet.areaIsList, ...this.areaFlagList]
        this.$emit('input', newSet);
      }
      else if (this.areaFlagType == "NOT"){
        newSet.areaNotList = [...newSet.areaNotList, ...this.areaFlagList]
        this.$emit('input', newSet);
      }
      this.areaFlagList = [];
    },
    updateComplexSet(){
      //this.value.complexList = this.complexList;
      //console.log("see this value", this.value);
      //console.log("SEE THIS INPUT", this.input);
      /* Use the selected flags and option to add new flags into one of the
       * flagSet lists */
      let newSet = this.value;
      newSet.complexList = [...newSet.complexList, ...this.complexList]
      this.$emit('value', newSet);
      this.complexList = [];
      this.$forceUpdate();
    },
    updateItemSet(){
      console.log("Item Set", this.inputItem);
      this.value.hasItem.push(this.inputItem);
      this.inputItem = {name:"",operator: ">=", value:0};
    },
    updateStatSet(){
      console.log("Stat Set", this.inputStat);
      this.value.hasStat.push(this.inputStat);
      this.inputStat = {name:"",operator: ">=", value:0};
    },
    updateDateSet(){
      console.log("Date Set", JSON.stringify(this.inputDate));
      if(this.clearDates(this.inputDate.before)) console.log("CLEANED");
      if(this.clearDates(this.inputDate.after)) console.log("CLEANED 2");

      if(this.inputDate) this.value.time = this.inputDate;

      /*
      this.inputDate = {
        after : {year: 0, day: 0, hour: 0, minute: 0},
        before: {year: 0, day: 0, hour: 0, minute: 0}
      };
       */
    },
    clearDates(row){
      if(row.year   <= 0) delete row.year;
      if(row.day    <= 0) delete row.day;
      if(row.hour   <= 0) delete row.hour;
      if(row.minute <= 0) delete row.minute;
      if(Object.keys(row).length === 0) return true;
      else return false;
    },
    setToPutBack(item){
      this.putBackList(item);
    },

    addItemConditionToPacket(){
      console.log("see item input", this.inputItem);
      //let newItemSet = [...this.itemSet, this.inputItem];

      //this.$emit('input', newItemSet);

      /*
      this.inputItem = {
        name: "",
        operator: ">=",
        value: 0
      }
       */
    },
    addStatConditionToPacket(){
      console.log("see item input", this.inputStat);
    }



  },
  computed: {
    flagSet: function(){
      return this.value;
    },
    optionList: function(){
      let tmp = Object.keys(this.$root.world.flagMap);
      console.log(tmp);

      /* Returns A List that is not selected or not already in the flagSet */
      let filtered = this.referenceList.filter(
        function(e) {
          return this.indexOf(e) < 0;
        },
        [...this.value.isList, ...this.value.notList, ...this.putBackList]
      );
      console.log("filtered", filtered);
      return filtered;
		},
		aflist: function(){
			let tmp;
			if(this.$root.selectedArea && this.$root.selectedArea.flagMap){
				tmp = Object.keys(this.$root.selectedArea.flagMap);
			} else tmp = [];
			console.log(tmp);
			//return tmp;

			console.log("see tmp", tmp);
			console.log("see value", this.value);
      let filtered = tmp.filter(
        function(e) {
          return this.indexOf(e) < 0;
        },
        [...this.value.areaIsList, ...this.value.areaNotList, ...this.putBackList]
      );
      console.log("filtered", filtered);
			return filtered;
    },
    dlist: function(){
      let tmp = Object.keys(this.$root.world.flagMap);
      console.log(tmp);

      let filtered = tmp.filter(
        function(e) {
          return this.indexOf(e) < 0;
        },
        [...this.value.isList, ...this.value.notList, ...this.putBackList]
      );

      console.log("filtered", filtered);
      return filtered;
    },
    clist: function(){
      return Object.keys(this.$root.world.complexConditionMap);
      /*
      let tmp = Object.keys(this.$root.world.complexConditionMap);
      console.log(tmp);

      let filtered = tmp.filter(
        function(e) {
          return this.indexOf(e) < 0;
        },
        [...this.value.complexList, ...this.complexList]
      );

      console.log("filtered", filtered);
      return filtered;*/
    },

    itemList: function(){
      return Object.keys(this.$root.world.itemMap);
    },
    statList: function(){
      return ['Health', 'Mana', 'Stamina'];
      //return Object.keys(this.$root.world.statMap);
    },
    itemSet: function(){
      return this.value;
    },
    timeSystem: function(){
      return this.$root.world.timeSystem;
    }
  },
	mounted(){
		if(this.$root.selectedArea != undefined){
			this.referenceAreaFlagList = Object.keys(this.$root.selectedArea.flagMap);
			console.log("CHECK KEYS", this.referenceAreaFlagList);
		}
	},
}

</script>

<style scoped>
textarea {
  box-sizing:border-box;
  height: 100%;
  width: 100%;
}
.border-line {
  border: 1px solid black;
  font-size: 25px;
}
.adaptable-width {
  width: 95%;
}
.f-height{
  height:50px;
}
.f-check-size{
  height:45px;
  font-size: 15px;
}
.small-s{
  font-size: 14px;
  height: 35px;
  width: 35px;
  padding:0.3em;
}
.small-s-width{
  font-size: 14px;
  height: 35px;
  padding:0.3em;
  width: 95%;
}

.title-s{
  font-size: 15px;
  font-weight: bold;
}
.title-s2{
  font-size: 20px;
  font-weight: bold;
}
.border-bottom{
  border-bottom: 2px solid black;
}
.border-top{
  border-top: 2px solid black;
}

.mini-up{
  position:relative;
  top: -3px;
}
.mini-down{
  position:relative;
  top: 2px;
}
.close-up{
  min-height:86px;
  position:relative;
  top: -15px;
}
.close-up-2{
  position:relative;
  top: -30px;
}
.close-up-3{
  position:relative;
  top: -45px;
}

.f-size{
  font-size:12px;
}

th, td{
  font-size: 14px;
}




</style>
