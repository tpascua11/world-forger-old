<template>
  <section class="" v-if="value.ifCondition == 'WORLD'">
    <div class="">
      <div v-for="(item, index) in value.conditionList" class="" :key="index">
        <div class="col-12 col thin">
          <table class="table" style="table-layout: fixed;">
            <thead>
            </thead>
            <tbody v-if="item.isList">
              <tr class="topcloser">
                <td width="10%"> {{index}}</td>
                <td> OR - World Flag List -
                </td>
              </tr>
              <tr v-if="checkIfAndNot(item.isList, item.notList)">
                <td width="10%">  </td>
                <td>
                  Conflicted List
                </td>
              </tr>
              <tr class="">
                <td width="10%"> <p class="flagname"> IS </p> </td>
                <td> <v-select v-model="item.isList" :from="flagList" class="f-size adaptable-width" placeholder="Add Flag"> </v-select> </td>
              </tr>
              <tr>
                <td width="10%"> <p class="flagname"> NOT </p> </td>
                <td> <v-select v-model="item.notList" :from="flagList" class="f-size adaptable-width" placeholder="Add Flag"> </v-select> </td>
              </tr>
              <tr>
                <td width="10%"> </td>
                <td>
                  <button v-on:click="removeAtIndex(index)" class="btn--outline
                    btn-danger btn-small smallx btn-block">
                    <section class="smallxtext"> Delete  </section>
                  </button>
                  <button v-on:click="addNewList" class="btn-warning-outline
                    btn-small smallfit btn-block smallx">
                    <section class="smallxtext"> Add New List</section>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ToggleFlag',
  data: function(){
    return {
      selectedName: '',
      type: 'IS',
      flag: true,
      flagList: Object.keys(this.$root.world.flagMap),
    }
  },
  props: ['value'],
  watch: {},
  mounted(){
    console.log("CHECK DID THIS WORK!");
    this.list = Object.keys(this.$root.world.flagMap);
 },
  methods:{
    test(){},
    switchType(){
      this.flag = !this.flag;
    },
    completeAction(){},

    createWorldFlag({value}){
      console.log("CREATE NEW AREA FLAG", value.name);
      this.$root.world.flagMap[value.name] = false;
      this.selectedName = value.name;
      this.flagList = Object.keys(this.$root.world.flagMap);
    },
    checkIfAndNot(isList, notList){
      return isList.some( ai => notList.includes(ai) );
    },
    addNewList(){
      this.value.conditionList.push({ifCondition: 'WORLD',isList: [], notList: []});
    },
    removeAtIndex(index){
      this.value.conditionList.splice(index, 1);
    }
  },
  computed: {
    flagMap(){
      return Object.keys(this.$root.world.flagMap);
    }
  }
}

</script>

<style scoped>
.smallx{
  height: 10px;
  position:relative;
  top: 5px;
}
.smallxtext{
  font-size: 15px;
  position:relative;
  top: -5px;
}
.v-select {
  font-size: 11px;
  width: 100%;
}
.small{
  font-size: 15px;
  font-weight: bold;
}
.referenceList{
  /* width: 200px; */
  width: 100%;
  height: 40px;
}
.smallInput{
  width: 100%;
}
.sq{
  height: 50px;
  width: 50px;
}
.flagname{
  font-size: 17px;
  position:relative;
  top: -10px;
  left: -10px;
}

.fit1{
  margin-top: -50px;
}
.fit2{
  margin-top: -40px;
}
.creator{
  border: 1px solid black;
  min-width: 250px;
}
.big{
  width: 200px;
}
.title2{
  font-size: 12px;
  font-weight: bold;
}
.small{
  height: 10px;
}
.mini{
  height: 30px;
  width: 100%;
}
.mini-down{
  position:relative;
  font-size:14px;
  top: -17px;
  right: 5px;
  font-weight: bold;
}
.closer{
  position:relative;
  top: 30px;
}
.topcloser{
  font-size: 15px;
  height: 20px;
  position:relative;
  background-color: lightblue;
}

.thin{
  position:relative;
  top: -40px;
}


</style>
