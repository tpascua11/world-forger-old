<template>
  <section
    v-if="    (value.eventName == 'toggle_area_flag')
           || (value.eventName == 'area_flag')"
    class="">
    <div class="script-select-title">
				<i class="ra ra-flower ra-1x"></i>
        Area Flag
    </div>
    <br>
    <div class="">
      Area Flag List
        <v-select
          v-model="value.name" :from="flagList"
          class="adaptable-width" placeholder="Add Flag"
          @create="createFlag($event)">
        </v-select>

      <v-select v-model="value.id" :options="flagList" label="id"
        @input="setName(); createFlag({value})">
        <template #selected-option="{}">
          {{flagKey[value.id].name}}
        </template>
        <template #option="{id}">
          {{flagKey[id].name}}
        </template>
      </v-select>

    </div>
    <br>
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
    <br>
    <p>
      Area Flags Is flag specific to the area.
      It will only affect the selected area flag.
    </p>
  </section>
</template>

<script>
export default {
  name: 'Basic',
  data: function(){
    return {
      template: {name: '', flag: true},
      flagList: this.setFlagMap(),
    }
  },
  props: ['value'],
  mounted(){},
  methods:{
    test(){},
    toggleFlag(){
      this.value.flag = !this.value.flag;
    },
    createFlag({value}){
      console.log("test", this.$root.world.flagMap);
      //this.$root.world.flapMap[value] = this.value.flag;
      //this.$root.world.flagMap[value] = false;
      //this.flagList = Object.keys(this.$root.selectedArea.flagMap);
      this.setFlagMap();
      this.value.name = value;
    },
    setFlagMap(){
      if(this.$root.selectedArea && this.$root.selectedArea.flagMap){
        this.flagList = Object.keys(this.$root.selectedArea.flagMap);
        return this.flagList;
      } else {
        this.flagList = [];
        return [];
      }
    }
  },
  computed: {
    classObject: function () {
      return { active: this.isActive && !this.error, 'text-danger': this.error && this.error.type === 'fatal'}
    }
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
    text-align: left;
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
