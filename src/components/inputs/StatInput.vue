<!--
//----------------
  Stat Input 
//----------------
Takes 2 Props
  v-model: statSet,
  referenceList: []
]
statSet= {
  name: "",
  operator: ""
  value: number
}
reference a list of strings names. This is used for the the Worlds based stat list.

  Has 3 Inputs
  First Input is the name of the stat 
  Second Input is the operator selection "<" ">" "=" "<=" ">="
  Third Input is value

Using these can determine if the user have the required stat amounts for
the condition to be true.
-->

<template>
  <div>
    <div class="row ">
      <div class="col-2">
        <button
          class="btn-default nice-mid-fit f-size adaptable-width">
          Has Stat
        </button>
      </div>

      <div class="col-5">
        <input class="nice-small-fit adaptable-width" type="string"
          v-model="inputStat.name" placeholder="Stat...">

        <v-select v-model="inputStat.operator" :from="operatorList"
          class="f-size adaptable-width" placeholder="operator...">
          </v-select>

      </div>

      <div class="col-2">
        <input class="nice-small-fit adaptable-width" type="number"
          v-model="inputStat.value" placeholder="Value">
      </div>

      <div class="col-1">
      </div>

      <div class="col-2">
        <button v-on:click="addStatConditionToPacket()"
          class="btn-secondary nice-mid-fit adaptable-width"> Add
        </button>

      </div>
    </div>

    <div class="row f-height">
      <div class="col-2"><p>Item Condition </p></div>
      <div class="col-10 simple-border">
          <draggable class="list-group" :list="statSet" group="people">
            <span
              class="list-group-item"
              v-for="(element, index) in statSet"
              :key="index"
            >
              <button class="btn-default  nice-small-fit">
                "{{element.name}}" {{element.operator}} {{element.value}}
              </button>
            </span>
          </draggable>
      </div>
    </div>

    <div class="row f-height">
      <div class="col-2"><p>Clear </p></div>
      <div class="col-10 simple-border">
          <draggable class="list-group" :list="clearList" group="people">
            <span
              class="list-group-item"
              v-for="(element, index) in clearList"
              :key="index"
            >
              <button class="btn-default  nice-small-fit">
                "{{element.name}}" {{element.operator}} {{element.value}}
              </button>
            </span>
          </draggable>
      </div>
    </div>

  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'StatInput',
  components: {
    draggable,
  },
  data: function(){
    return {
      operatorList: [">", ">=", "==", "<=", "<"],
      inputString: "",
      inputStat: {
        name: "",
        operator: ">=",
        value: 0
      },
      flagList: [],
      clearList: [],
    }
  },
  props: ['value', 'referenceList'],
  mounted(){
    console.log("SEE THE AreaList", this.areaList);
  },
  methods:{
   addStatConditionToPacket(){
      console.log("see stat input", this.inputStat);
      let newStatSet = [...this.statSet, this.inputStat];

      this.$emit('input', newStatSet);

      this.inputStat = {
        name: "",
        operator: ">=",
        value: 0
      }
    }
  },
  computed: {
    statSet: function(){
      return this.value;
    }

  }
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
.f-size{
  font-size: 15px;
}
</style>
