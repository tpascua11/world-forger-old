<template>
  <section
    v-if="    (value.eventName == 'toggle_world_flag')
           || (value.eventName == 'toggle_flag')"
    class="">
    <div class="row script-select-title">
				<i class="ra ra-round-shield ra-1x"></i>
        World Flag
    </div>
    <br>
    <div class="row">
      <SelectNameAndID :value="value" :list="flagKey"/>
      <!--
      <v-select v-model="value.id" :options="flagList" label="id" @input="setName">
        <template #selected-option="{}">
          {{flagKey[value.id].name}}
        </template>
        <template #option="{id}">
          {{flagKey[id].name}}
        </template>
      </v-select>
      -->
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
    <p>
      A world flag is a global flag. This flag is used from anywhere.
    </p>
  </section>
</template>

<script>
export default {
  name: 'Basic',
  data: function(){
    return {
      template: {name: '', flag: true},
      //flagList: Object.keys(this.$root.world.flagMap),
      flagList: Object.keys(this.$root.world.group.flag.list),
      flagKey : this.$root.world.group.flag.list,
    }
  },
  props: ['value'],
  mounted(){},
  methods:{
    test(){},
    toggleFlag(){
      this.value.flag = !this.value.flag;
    },
		setName(){
			this.value.name = this.flagKey[this.value.id].name;
		},
    createFlag({value}){
      console.log("test", this.$root.world.flagMap);
      //this.$root.world.flapMap[value] = this.value.flag;
      this.$root.world.flagMap[value] = false;
      this.flagList = Object.keys(this.$root.world.flagMap);
      this.value.name = value;
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
