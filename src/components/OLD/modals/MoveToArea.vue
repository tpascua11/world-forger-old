<template>
  <div>
    <button v-on:click="show()" class="btn-warning-outline btn-block btn-small smallfit">
      MoveArea
    </button>

   <modal name="modal"
      :width="250"
      :height="252"
      :shiftY="0.1"
    >
      <div class="double-simple-border">
        <div class="row">
          <div class="col-12 col">
            <p>{{selectDescription}}</p>
            <select v-model="selectedArea" class="smalldir referenceList">
              <option v-for="(option, index) in referenceList" v-bind:value="option" :key="index">
                {{option.name}}
              </option>
            </select>
            <br>
            <button v-on:click="completeAction()" class="btn-success btn-block btn-small">
              Add Script
            </button>
          </div>
        </div>
        <div class="row">
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
    }
  },
  props: {
    name: String,
    selectDescription: String,
    referenceList: Array,
    addScript: Object,
  },
  mounted(){},
  methods:{
    show () {
      console.log("give me reference list", this.referenceList);
      this.$modal.show('modal');
    },
    hide () {
      this.$modal.hide('modal');
    },
    completeAction(){
      this.addScript.activate(
        {
          eventName: "movetoarea",
          areaName : this.selectedArea.name
        }
      );
    }

  },
  computed: {
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
