<template>
  <section class="">
    <modal name="WorldFlag"
      :width="525"
      :height="'auto'"
      :shiftY="0.2"
      :styles="'border: 2px solid black'"
      :scrollable="true"
    >
      <section class="modal-total-height margin3">
            <div class="this-title">
              World Flag
            </div>
          <section>
            <div v-for="(item, index) in value.condition_list" class="" :key="index">
              <br>
              <div v-if="!item.isList">
                <button v-on:click="addThisSet(index)" class="pure-button">
                  <section class="smallxtext"> New World If/Not List </section>
                </button>
              </div>
              <div v-if="item.isList">
                <div>
                  <div class="pure-u-4-24 list-title"> Case {{index}}</div>
                  <div class="pure-u-12-24"></div>
                  <div class="pure-u-8-24 right">
                    <button v-on:click="removeAtIndex(index)"
                      class="pure-button full-width button-white"
                      style="height: 25px;">
                      <div class="b-font right"> Clear </div>
                    </button>
                  </div>
                </div>
                <div>
                  <div class="pure-u-2-24"></div>
                  <div class="pure-u-2-24 position-co"> IS </div>
                  <div class="pure-u-20-24">
                    <v-select v-model="item.isList"  :options="trueList(item)" :multiple="true" class=" " placeholder="Add Flag"> 
                      <template #selected-option-container="{ option}">
                        <div style="height: 30px; font-size: 15px;"
                          class="vs__selected">{{ option.label }}
                        </div>
                      </template>
                    </v-select>
                  </div>
                </div>
                <br class="br-thin">
                <div>
                  <div class="pure-u-2-24"></div>
                  <div class="pure-u-2-24 position-co"> NOT </div>
                  <div class="pure-u-20-24">
                    <v-select v-model="item.notList" :options="trueList(item)" :multiple="true" class=" " placeholder="Add Flag"> 
                      <template #selected-option-container="{ option}">
                        <div style="height: 30px; font-size: 15px;"
                          class="vs__selected">{{ option.label }}
                        </div>
                      </template>
                    </v-select>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <br><br>
          <button v-on:click="addNewList" class="pure-button full-width">
            Add New List
          </button>
      </section>
    </modal>
  </section>
</template>

<script>
export default {
  name: 'ToggleWorldFlag',
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
    checkIfAndNot(isList, notList){
      return isList.some( ai => notList.includes(ai) );
    },
    addNewList(){
      this.value.condition_list.push({isList: [], notList: []});
    },
    addThisSet(index){
      this.$set(this.value.condition_list[index], 'isList', []);
      this.$set(this.value.condition_list[index], 'notList', []);
    },
    removeAtIndex(index){
      this.value.condition_list.splice(index, 1);
    },
    trueList(set){
      console.log("what is set", set);
      let tmp = Object.keys(this.$root.world.flagMap);

      let filtered = tmp.filter(
        function(e) {
          return this.indexOf(e) < 0;
        },
        [...set.isList, ...set.notList]
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
.this-title{
  font-size: 20px;
  text-decoration: underline;
  font-weight: bold;
}
.v-font{
  font-weight: bold;
  font-size: 13px;
  height: 22px;
  width: 100%;
}
.list-title{
  font-size: 17px;
  font-weight: bold;
  position:relative;
}
.v-select {
  font-size: 12px;
  font-weight: bold;
  width: 100%;
}
.referenceList{
  /* width: 200px; */
  width: 100%;
  height: 40px;
}
.modal-total-height{
  max-height: 750px;
  overflow: scroll;
}
.b-font{
  color: darkred;
  position: relative;
  top: -5px;
}
.button-green{
  background-color: lightgreen;
}

.button-red {
  background-color: #ff6666;
}
.button-pink {
  background-color: pink;
}
.button-white{
  background-color: white;
  border: 1px;
}
.b-font-2{
  font-size: 15px;
}

.br-thin{
  display: block;
  margin: 2px;
}

.position-co{
  position: relative;
  top: 6px;
  right: 4px;
  text-align: right;
  font-weight: bold;
}

</style>
