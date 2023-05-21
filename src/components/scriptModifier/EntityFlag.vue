<template>
  <section v-if="(value.eventName == 'entity_flag')">
    <div class="script-select-title border-down">
      <i class="ra ra-ship-emblem ra-1x"></i>
      Entity Modifier
    </div>
    <br>
    <div>
      <div class="pure-u-3-3">
        Group
        <VueMultiselect
          v-model="value.entityGroup"
          tag-placeholder="..."
          :options="seeEntityGroup"
          placeholder="Chosen Entity"
          :multiple="false"
          :taggable="true"
          @tag="newEntityList"
          @select="newEntityList"
        >
        </VueMultiselect>
      </div>
      <br>
      <div class="pure-u-3-3">
        Entity
        <SelectNameAndIdByGroup :value="value" :list="flagKey" :group="value.entityGroup"/>
      </div>
      <br>
      <div class="pure-u-3-3">
        <div class="">
          <div class="col col-12">
            <button v-on:click="toggleFlag()"
              v-if="value.flag"
              class="pure-button full-width button-green"
            >
              <section class="smalltin"> True </section>
            </button>

            <button v-on:click="toggleFlag()"
              v-if="!value.flag"
              class="pure-button full-width button-red"
            >
              <section class="smalltin"> False </section>
            </button>
          </div>
        </div>
      </div>
      <p>
        Add or Subtract a selected amount of selected item of selected Entity
        Group
      </p>
    </div>
      <br>
  </section>
</template>

<script>
export default {
  name: 'Basic',
  watch: {
    /*
    value: function(oldE, newE){
      if(oldE.chosenEntity != newE.chosenEntity){
        this.chosenEntity = newE.chosenEntity;
      }
    }
     */
  },
  data: function(){
    return {
      selected: null,
      //flagList: Object.keys(this.$root.world.group.item.list),
      flagKey : [],
      //this.$root.world.group.item.list,
      listWithKeys: this.objectListToList(this.flagKey),
      entityGroup: [],
      chosenEntity: '',
    }
  },
  props: ['value'],
  mounted(){
    if(this.value && this.value.id){
      this.selected = this.value.id;
    }
    this.entityGroup = this.$root.world.group;
    console.log("MOUNTED VALUE", this.value);
    if(this.value.entityGroup){
      this.chosenEntity = this.value.entityGroup;
    }
  },
  refresh(){
    if(this.value && this.value.id){
      this.selected = this.value.id;
    }
    this.entityGroup = this.$root.world.group;
    console.log("MOUNTED VALUE", this.value);
    if(this.value.entityGroup){
      this.chosenEntity = this.value.entityGroup;
    }
  },
  methods:{
    test(){},
    toggleFlag(){
      this.value.flag = !this.value.flag;
    },
		setName(){
      //this.value.name = this.flagKey[this.value.id].name;
      //this.value.name = this.selected.name;
      this.value.id = this.selected;
      this.value.name = this.flagKey[this.value.id].name;
		},
    createFlag({value}){
      console.log("test", this.$root.world.itemMap);
      //this.$root.world.flapMap[value] = this.value.flag;
      this.$root.world.itemMap[value] = false;
      //this.flagList = Object.keys(this.$root.world.itemMap);
      this.value.name = value;
    },
    newEntityList(){
      console.log("NEW");
      this.chosenEntity = this.value.entityGroup;
      //this.flagList = Object.keys(this.$root.world.group[this.chosenEntity].list);
      this.flagKey = this.$root.world.group[this.chosenEntity].list;
      this.value.entityGroup = this.chosenEntity;
    },
    selectedEntityList(){
    }
  },
  computed: {
    classObject: function () {
      return { active: this.isActive && !this.error, 'text-danger': this.error && this.error.type === 'fatal'}
    },
		seeEntityGroup(){
			return Object.keys(this.entityGroup);
    },
    entityList(){
      if(this.chosenEntity) return this.objectListToList(this.$root.world.group[this.chosenEntity].list);
      else return [];
    },
  }
}

</script>

<style scoped>
.v-select {
  font-size: 13px;
  width: 100%;
}

  textarea {
    box-sizing:border-box;
    height: 100%;
    width: 100%;
  }

  .smallfit{
    height: 23px;
    display: table-cell;
    min-width: 120%;
    left: -10%;
    position: relative;
    padding:0.1em;
  }

  .descriptionTextArea{
    font-size: 14px;
  }

  .smallt{
    height: 38px;
    width: 50px;
    position:relative;
    left: -10px;
  }

  .smalltin{
    position:relative;
    font-weight: bold;
  }

  .closer{
    position:relative;
    top: 0px;
    margin-top: -40px;
    /*margin-bottom: 10px;*/
  }

  .closer2{
    position:relative;
    top: 0px;
    margin-top: -50px;
    /*margin-bottom: 10px;*/
  }

  .button-green{
    background-color: lightgreen;
  }

  .button-red {
    background-color: pink;
  }







</style>
