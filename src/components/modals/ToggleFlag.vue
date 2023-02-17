
<template>
  <div>
    <button v-on:click="show()" class="btn-warning-outline btn-block btn-small smallfit">
      Toggle Flags
    </button>

    <modal name="flag-modal"
      :width="250"
      :shiftY="0.1"
      :styles="'border: 2px solid black'"
    >
      <div>
        <div class="row">
          <div class="col-12 col">
            <v-select
              v-model="selectedFlag.name"
              as="name::id"
              :from="flagList"
              @create="newFlag"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-6 col">
            <button v-on:click="completeAction(false)" class="btn-danger-outline btn-small"
                    v-bind:disabled="!selectedFlag.name">
              Toggle False
            </button>
          </div>
          <div class="col-6 col">
            <button v-on:click="completeAction(true)" class="btn-success-outline btn-small"
                    v-bind:disabled="!selectedFlag.name">
              Toggle True
            </button>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
export default {
  name: 'MoveToArea',
  data: function(){
    return {
      selectedArea: {},
      selectedFlag: {},
      testList: [{name: "cool", flag: true}],
      list: [],
      update: false,
      componentKey: 0,
    }
  },
  props: {
    name: String,
    selectDescription: String,
    referenceList: Array,
    areaReferenceList: Array,
    addScript: Object,
  },
  mounted(){
    this.list = Object.keys(this.$root.world.flagMap);
  },
  methods:{
    show (){
      console.log("give me reference list", this.referenceList);
      this.$modal.show('flag-modal');

      this.update = !this.update;
      this.componentKey++;
    },
    hide () {
      this.$modal.hide('flag-modal');
    },
    newFlag({value}){
      console.log("new flag", value.name);

      this.selectedFlag = {name: value.name, flag:true};
      this.testList.push({name: value.name, flag: true});

      this.$root.world.flagMap[value.name] = false;

      this.list = Object.keys(this.$root.world.flagMap);
    },
    completeAction(toggle){
      this.addScript.activate(
        {
          eventName: "toggleflag",
          name: this.selectedFlag.name,
          flag: toggle
        }
      );
      this.selectedFlag = {};
      this.$modal.hide('flag-modal');

      this.update = !this.update;
    }
  },
  computed: {
    flagList (){
      return this.list;
    }
  }
}

</script>

<style scoped>
.referenceList{
  width: 200px;
  height: 40px;
}
.smallfit{
  height: 25px;
  padding:0.1em
}

</style>
