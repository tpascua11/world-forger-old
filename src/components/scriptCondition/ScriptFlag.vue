<template>
  <section class="">
    <modal name="ScriptFlag"
      :width="675"
      :height="'auto'"
      :shiftY="0.2"
      :styles="'border: 2px solid black'"
      :scrollable="true"
    >
      <section class="modal-total-height">
        <div class="row modal-body-height">
          <section style="height: 100px; default-title-sm2">
            <div class="row" style="position: relative; left: 20px;">
              Script Flag
            </div>
          </section>
          <section>
            <div v-for="(item, index) in value.condition_list" class="closer" :key="index">
              <div class="col-12 col thin">
                <table class="table" style="table-layout: fixed;">
                  <tbody v-if="!item.isScriptList">
                    <tr>
                      <button v-on:click="addThisSet(index)" class="btn-outline btn-danger btn-small smallx btn-block">
                        <section class="smallxtext"> New World If/Not List </section>
                      </button>
                    </tr>
                  </tbody>
                  <tbody v-if="item.isScriptList">
                    <tr>
                      <td width="4%"> {{index}} </td>

                      <td class="if-color"  width="5%">  IS </td>
                      <td class="if-color"  width="37%">
                        <v-select v-model="item.isScriptList"
                          :from="trueList(item)" class=" " placeholder="Add Flag"
                          @create="createIsScriptFlag($event, item)">
                        </v-select>
                      </td>

                      <td class="not-color" width="8%">  NOT </td>
                      <td class="not-color" width="37%">
                        <v-select v-model="item.notScriptList" :from="trueList(item)" class=" " placeholder="Add Flag"
                          @create="createNotScriptFlag($event, item)">
                        </v-select>
                      </td>

                      <td width="7%">
                        <button v-on:click="removeAtIndex(index)" class="btn-outline btn-danger btn-small smallx btn-block">
                          <section class="smallxtext"> X </section>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <br>
            </div>
          </section>
        </div>
        <div class="row modal-bottom-height">
          <button v-on:click="addNewList" class="btn-warning btn-small smallfit btn-block">
            Add New List
          </button>
        </div>
      </section>
    </modal>
  </section>
</template>

<script>
export default {
  name: 'ToggleAreaFlag',
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
    //this.list = Object.keys(this.$root.world.flagMap);
 },
  methods:{
    test(){},
    createWorldFlag({value}){
      console.log("CREATE NEW AREA FLAG", value.name);
      this.$root.world.flagMap[value.name] = false;
      this.selectedName = value.name;
      this.flagList = Object.keys(this.$root.world.flagMap);
    },
    createIsScriptFlag({value}, set){
      let check1 =  set.isScriptList.find(element => element == value);
      let check2 = set.notScriptList.find(element => element == value);
      if(!check1 && !check2) set.isScriptList.push(value);
    },
    createNotScriptFlag({value}, set){
      let check1 =  set.isScriptList.find(element => element == value);
      let check2 = set.notScriptList.find(element => element == value);
      if(!check1 && !check2) set.notScriptList.push(value);
    },
    checkIfAndNot(isScriptList, notScriptList){
      return isScriptList.some( ai => notScriptList.includes(ai) );
    },
    addNewList(){
      this.value.condition_list.push({isScriptList: [], notScriptList: []});
    },
    addThisSet(index){
      this.$set(this.value.condition_list[index], 'isScriptList', []);
      this.$set(this.value.condition_list[index], 'notScriptList', []);
    },
    removeAtIndex(index){
      this.value.condition_list.splice(index, 1);
    },
    trueList(set){
      console.log("what is set", set);
      let tmp = [];
      //Object.keys(this.$root.world.flagMap);

      let filtered = tmp.filter(
        function(e) {
          return this.indexOf(e) < 0;
        },
        [...set.isScriptList, ...set.notScriptList]
      );
      return filtered;
    },
  },
  computed: {
    flagMap(){
      return Object.keys(this.$root.world.flagMap);
    }
  }
}

</script>

<style scoped>
table, th, td {
  border: 1px solid black;
}
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
  font-size: 12px;
  width: 100%;
  z-index: 10px;
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
  margin-top: -50px;
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

.modal-total-height{
  max-height: 750px;
}
.modal-body-height{
  max-height: 650px;
  overflow: scroll;
}
.modal-bottom-height{
  height: 100px;
}

.if-color{
  background-color: lightblue;
}
.not-color{
  background-color: pink;
  border: 2px solid pink;
}



</style>
