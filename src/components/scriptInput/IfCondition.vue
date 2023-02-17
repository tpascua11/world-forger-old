<template>
  <div class="border">

    <div class="row">
      <div class="col col-7 title2">
        If Set Flag
      </div>
      <div class="col col-5 title2">
        <button v-on:click="flagFromSwap" class="btn-secondary btn-small btn-block ">
          {{flagFrom}}
        </button>
      </div>
    </div>

    <div v-if="flagFrom == 'WORLD'" class="row fit1">
      <div class="col-12 col">
        <v-select
          v-model="flagName"
          as="name::id"
          :from="flagMap"
          @create="test"
        />
      </div>
    </div>
    <div v-if="flagFrom == 'AREA'" class="row fit1">
      <div class="col-12 col">
        <v-select
          v-model="flagAreaName"
          as="name::id"
          :from="selectedAreaFlagList"
          @create="test"
        />
      </div>
    </div>
    <div v-if="flagFrom == 'ACTION'" class="row fit1">
      <div class="col-12 col">
        <input class="smallInput" type="string" v-model="flagInteractionName" placeholder="...">
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
         Set
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IfSet',
  data: function(){
    return {
      flagFrom: "WORLD",
      selectedAreaFlagList: [],
      description: "",
      selectedName: '',
      flagName: '',
      flagAreaName: '',
      flagInteractionName: '',
      mode: '',
    }
  },
  props: {
    name: String,
    templateA: Object,
    editMode: String,
    selectDescription: String,
    addScript: Object,
  },
  watch: {
    templateA: function(oldv, newv){
      console.log("replace!");

      this.selectedName = newv.name;
    }
  },
  mounted(){
    if(this.$root.selectedArea != undefined){
      console.log("the selected area flag map", this.selectedAreaFlagList);
      this.selectedAreaFlagList = Object.keys(this.$root.selectedArea.flagMap);
    }

    this.list = Object.keys(this.$root.world.flagMap);
    this.getTemplateA();
  },
  methods:{
    test(){
    },
    show (){
      this.$modal.show('add-description-modal');
    },
    hide () {
      this.$modal.hide('add-description-modal');
    },
    completeAction(){
      if(this.flagFrom == "WORLD"){
        this.$parent.forgeAction({
          ifCondition: this.flagFrom,
          conditionList: [{isList: [this.flagName]}]
        });
      }
      if(this.flagFrom == "AREA"){
        this.$parent.forgeAction({
          ifCondition: this.flagFrom,
          conditionList: [{isList: [this.flagAreaName]}]
        });
      }
      if(this.flagFrom == "ACTION"){
        this.$parent.forgeAction({
          ifCondition: 'INTERACTION',
          conditionList: [{isList: [this.flagInteractionName]}]
        });
      }
      //this.$parent.forgeAction({elseIfCondition: true});
      this.$parent.forgeAction({elseCondition: true});
      this.$parent.forgeAction({endCondition: true});
    },
    cancelAction(){
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
    flagFromSwap (){
      if(this.flagFrom == "WORLD") this.flagFrom = "AREA";
      else if(this.flagFrom == "AREA") this.flagFrom = "ACTION";
      else this.flagFrom = "WORLD";
    },
  },
  computed: {
    itemMap(){
      //return this.$root.world.itemMap;
      return Object.keys(this.$root.world.itemMap);
    },
    flagMap(){
      return Object.keys(this.$root.world.flagMap);
    },
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
.border{
  border: 1px solid black;
  min-width: 250px;
}
.big{
  width: 200px;
}

</style>
