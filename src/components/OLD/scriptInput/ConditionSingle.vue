<!--
This is a div box that contains a button to create condition for object 
     it will show conditions added to objects
-->
<template>
  <div>
      <button v-on:click="makeNewConditionSet()" class="btn-danger-outline btn-block thin">
        Add Condition
      </button>

      <modal name="conditionSingleModal"
        :width="600"
        :height="780"
        :shiftY="0.1"
        :styles="'border: 2px solid black'"
      >
        <button v-on:click="confirmNewConditionSet()" class="btn-warning btn-block">
          Insert Condition Template
        </button>
        <div class="modal-body">
        <ConditionSet
          v-model="conditionSet"
          :world="referenceWorld"
          @confirm="updateConditionSet()"
        />
      </div>


      </modal>
  </div>
</template>

<script>

import ConditionSet from '@/components/inputs/ConditionSet.vue'
export default {
  name: 'Conddition',
  components: {
    ConditionSet
  },
  data: function(){
    /*
        REMEMBER: This is where the condition template is made at...
     */
    return {
      name: "OK",
      mode: "NEW",
      conditionSet: {
        complexList: [],
				isList: [],
				notList: [],
				hasItem: [],
				hasStat: [],
        time: {},

        areaIsList: [],
        areaNotList: [],
			},

      selectedCondition: {},
    }
  },
  props: ['value', 'active'],
  mounted(){},
  methods:{
    test(){},
    show () {
      this.mode = "NEW";
      this.conditionSet = {
        complexList: [],
				isList: [],
				notList: [],
				hasItem: [],
				hasStat: [],
        time: {},

        areaIsList: [],
        areaNotList: [],
			};
      this.$modal.show('');
    },
    hide () {
      this.$modal.hide('conditionSingleModal');
    },
    makeNewConditionSet (){
      console.log("TESTETSTETSETS");
      this.conditionSet = {
        complexList: [],
				name: '',
				isList: [],
				notList: [],
				hasItem: [],
				hasStat: [],
        time: {},

        areaIsList: [],
        areaNotList: [],
      };
      this.$modal.show('conditionSingleModal');
    },
    updateConditionSet(){
      this.hide();
    },
    confirmNewConditionSet (){
      console.log("WHAT IS THE NEW CONDOTION SET", this.conditionSet);
      let template = {
        ifCondition: "WOLRD",
        conditionList: [this.conditionSet]
      };
      this.$parent.forgeAction(template);
      this.hide();
    },
    editCondition(conditionSet){
      this.mode = "EDIT";
      this.conditionSet = conditionSet;


      this.$modal.show('conditionSingleModal');
    },
    removeCondition(index){
      this.value.splice(index, 1);
    },
    arrayRemove(arr, value) {
        return arr.filter(function(ele){
            return ele != value;
        });
    },
  },
  computed: {
    conditionList(){
      return this.value;
    },
    referenceConditionList(){
      return this.value;
    },
    referenceWorld: function(){
      return this.$parent.referenceWorld;
    },
  }
}

</script>

<style scoped>
.thin{
  height: 30px;
  font-size: 14px;
  padding:0.5em;
}
.nice-border{
	border: 3px solid black;
}

</style>

