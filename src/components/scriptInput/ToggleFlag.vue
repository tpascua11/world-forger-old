<template>
  <div class="creator">

    <div class="row ">
      <div class="col col-7 title2">
        Flag: {{editMode}}
      </div>
      <div class="col col-5 title2">
        <button v-on:click="flagFromSwap" class="btn-secondary btn-small btn-block ">
          {{flagFrom}}
        </button>
      </div>
    </div>

    <div class="row fit1">
      <div class="col-12 col" v-if="flagFrom == 'WORLD'">
        <v-select
          v-model="selectedName"
          as="name::id"
          :from="flagList"
          @create="createWorldFlag"
        />
      </div>

      <div class="col-12 col" v-if="flagFrom == 'AREA'">
        <v-select
          v-model="selectedAreaFlagName"
          as="name::id"
          :from="selectedAreaFlagList"
          @create="createNewAreaFlag"
        />
      </div>

      <div class="col-12 col" v-if="flagFrom == 'ACTION'">
        <input class="smallInput" type="string" v-model="flagInteractionName" placeholder="...">
      </div>

    </div>
    <div class="row fit1">
      <div class="col-12 col">
        <button v-on:click="switchType" class="btn-warning-outline btn-small
          smallfit btn-block">
          {{flag}}
        </button>
      </div>
    </div>
    <div class="row fit2">
      <div class="col-4 col">
        <button v-on:click="cancelAction" class="btn-danger btn-small btn-block ">
          X
        </button>
      </div>
      <div class="col-8 col">
        <button v-on:click="completeAction" class="btn-success-outline btn-small btn-block smallfit">
          Toggle Flag
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToggleFlag',
  data: function(){
    return {
      description: "",
      selectedItem: {},
      selectedName: '',
      selectedAreaFlagName: '',
      type: 'IS',
      flag: true,
      mode: '',
      selectedAreaFlagList: [],
      flagFrom: "WORLD",
      selectedInteractionFlagName: '',
      flagInteractionName: '',
      flagList: Object.keys(this.$root.world.flagMap),
    }
  },
  props: {
    name: String,
    templateA: Object,
    editMode: String,
    selectDescription: String,
  },
  watch: {
    templateA: function(oldv, newv){
      console.log("replace!");

      this.selectedName = newv.name;
    }
  },
  mounted(){
    console.log("CHECK DID THIS WORK!");
    this.list = Object.keys(this.$root.world.flagMap);

    if(this.$root.selectedArea != undefined){
      console.log("the selected area flag map", this.selectedAreaFlagList);
      this.selectedAreaFlagList = Object.keys(this.$root.selectedArea.flagMap);
    }
  },
  methods:{
    test(){
    },
    flagFromSwap (){
      if(this.flagFrom == "WORLD") this.flagFrom = "AREA";
      else if(this.flagFrom == "AREA") this.flagFrom = "ACTION";
      else this.flagFrom = "WORLD";
    },
    switchType(){
      this.flag = !this.flag;
    },
    show (){
      this.$modal.show('add-description-modal');
    },
    hide () {
      this.$modal.hide('add-description-modal');
    },
    completeAction(){
      let template;
      if(this.flagFrom == "WORLD"){
        template = {
          eventName: "toggleFlag",
          name: this.selectedName,
          flag: this.flag,
        }
      }
      if(this.flagFrom == "AREA"){
        template = {
          eventName: "toggleAreaFlag",
          name: this.selectedAreaFlagName,
          flag: this.flag,
        }
      }
      if(this.flagFrom == "ACTION"){
        template = {
          eventName: "toggleInteractionFlag",
          name: this.flagInteractionName,
          flag: this.flag,
        }
      }

      this.$parent.forgeAction(template);
      this.$parent.cancel();
    },
    cancelAction(){
      console.log("canceling action");
      this.$parent.cancel();
    },
    getTemplateA(){
      if(this.templateA.name) this.selectedName  = this.templateA.name;

      if(this.templateA.name){
        this.mode = 'EDIT';
      }
      else{
        this.mode = '';
      }
    },
    createWorldFlag({value}){
      console.log("CREATE NEW AREA FLAG", value.name);
      this.$root.world.flagMap[value.name] = false;
      this.selectedName = value.name;

      this.flagList = Object.keys(this.$root.world.flagMap);
      //console.log("check", this.$root.world.flagMap);
      //this.$forceUpdate();

    },

    createNewAreaFlag({value}){
      console.log("CREATE NEW AREA FLAG", value.name);
      if(this.$root.selectedArea){
        this.$root.selectedArea.flagMap[value.name] = false;
        this.selectedAreaFlagName = value.name;
      }

      if(this.$root.selectedArea != undefined){
        console.log("the selected area flag map", this.selectedAreaFlagList);
        this.selectedAreaFlagList = Object.keys(this.$root.selectedArea.flagMap);
      }
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
.v-select {
  font-size: 15px;
  width: 100%;
}
.referenceList{
  /* width: 200px; */
  width: 100%;
  height: 40px;
}
.smallInput{
  width: 100%;
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


</style>
