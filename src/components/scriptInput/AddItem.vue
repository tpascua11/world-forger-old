<template>
  <div class="creator">
    <div class="row">
      <div class="col">
        {{editMode}}
      </div>
    </div>
    <div class="row fit1">
      <div class="col-12 col">
        <v-select
          v-model="selectedName"
          as="name::id"
          :from="itemMap"
          @create="test"
        />
      </div>
    </div>
    <div class="row fit1">
      <div class="col-7 col">
        <input class="smallInput" type="number" v-model="amount" placeholder="...">
      </div>
      <div class="col-5 col">
        <button v-on:click="switchType" class="btn-warning-outline btn-small smallfit">
          {{type}}
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
          {{type}} Item
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MoveToArea',
  data: function(){
    return {
      description: "",
      amount: 1,
      referenceMap: this.$root.world.itemMap,
      selectedItem: {},
      selectedName: '',
      type: 'ADD',
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
      this.amount = newv.amount;
    }
  },
  mounted(){
    this.list = Object.keys(this.$root.world.flagMap);
    this.getTemplateA();

  },
  methods:{
    test(){
    },
    switchType(){
      if(this.type === 'ADD') this.type = 'SUBTRACT';
      else this.type = 'ADD';
    },
    show (){
      this.$modal.show('add-description-modal');
    },
    hide () {
      this.$modal.hide('add-description-modal');
    },
    completeAction(){
      let eventName = '';
      if(this.type == 'ADD') eventName = "addItem";
      else eventName = "subtractItem";
      this.addScript.activate(
        {
          eventName,
          name: this.selectedName,
          amount: this.amount
        }
      );
    },
    cancelAction(){
      this.addScript.cancel();
    },
    getTemplateA(){
      if(this.templateA.name) this.selectedName  = this.templateA.name;
      if(this.templateA.amount) this.amount      = this.templateA.amount;

      if(this.templateA.name){
        this.mode = 'EDIT';
      }
      else{
        this.mode = '';
      }

    }
  },
  computed: {
    itemMap(){
      //return this.$root.world.itemMap;
      return Object.keys(this.$root.world.itemMap);
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

</style>
