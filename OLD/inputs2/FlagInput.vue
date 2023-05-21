<!--
  //----------------
    Flag Input
  //----------------
  Takes 2 Props,
    v-model: flagSet,
    referenceList: []

flagSet Object should have at least these 2 list
ConditionTemplate that will be reference will have these 2 variables

  flagset = {
    ...
    isList: [],  // used to check if flags in list are true in the world.flagList
    notList: [], // used check if flags is NOT true or NOT exist in the world.flagList
  }
  referenceList must be an array of strings.


  Has 2 Inputs Sections and A Confirm Button
  The Second Input lets you select multiple option of flags from a reference list
  The First Input has 2 option 'IS' or 'NOT' and it determines which
  selected options of flags goes into which list in the flagSet.

  The Confirm Button will add to the update the flagSet list with the newest
  option of flags added.

  set true if the isList and notList meets the condition based on the world flags
-->


<template>
  <div>
    <div class="row f-height">
      <div class="col-1 small-s title-s">
          Flag
      </div>
      <div class="col-1">
        <button v-if="flagType == 'IS'"  v-on:click="flagType = 'NOT'"
          class="btn-success small-s"> IS </button>
        <button v-if="flagType == 'NOT'" v-on:click="flagType = 'IS'"
          class="btn-danger small-s"> NOT </button>
      </div>
      <div class="col-6">
        <v-select v-model="flagList" :from="dlist"
          class="f-size adaptable-width" placeholder="Add Flag">
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
      <div class="col-2">
        <button v-on:click="updateFlagSet()"
          class="small-s btn-secondary"> Add
        </button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'FlagInput',
  props: ["value", "referenceList"],
  components: {
  },
  data: function(){
    return {
      typeList: ["NOT", "IS"],
      flagType: "IS",
      flagList: [],
      putBackList: [],
    }
  },
  methods:{
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

    setToPutBack(item){
      this.putBackList(item);
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

    }
  },
  mounted(){},
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
  font-size: 15px;
  height: 35px;
  width: 35px;
  padding:0.3em;
}
.title-s{
  font-size: 20px;
}
.border-bottom{
  border: 1px solid black;
}

</style>
