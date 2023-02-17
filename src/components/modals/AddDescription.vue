<template>
  <div>
    <button v-on:click="show()" class="btn-success btn-block btn-small">
      Toggle Flags
    </button>

    <modal name="add-description-modal"
      :width="250"
      :height="219"
      :shiftY="0.1"
    >
      <div class="double-simple-border child-borders">
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
          <textarea v-model="description" id="large-input"
            placeholder="describe item usage">
          </textarea>
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
      description: ""
    }
  },
  props: {
    name: String,
    selectDescription: String,
    referenceList: Array,
    addScript: Object,
  },
  mounted(){
    this.list = Object.keys(this.$root.world.flagMap);
  },
  methods:{
    show (){
      this.$modal.show('add-description-modal');
    },
    hide () {
      this.$modal.hide('add-description-modal');
    },
    completeAction(toggle){
      this.addScript.activate(
        {
          eventName: "addDescription",
          description: this.description
        }
      );
      this.$modal.hide('add-description-modal');
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
</style>
