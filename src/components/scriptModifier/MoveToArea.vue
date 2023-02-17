<template>
  <section v-if="(value.eventName == 'move_to_area')" class="">
    <div class="row  script-select-title">
      <i class="ra ra-flower ra-1x"></i> Move to Area
    </div>
    <br>
    <div>
      Area List
      <SelectNameAndID v-model="value" v-bind:list="flagKey"/>

    </div>
    <br>
    <p>
      Move to designated selected area
    </p>
  </section>
</template>

<script>

export default {
  name: 'Basic',
  data: function(){
    return {
      template: {name: '', flag: true},
      flagList: Object.keys(this.$root.world.group.area.list),
      flagKey : this.$root.world.group.area.list,
      //flagList: Object.keys(this.$root.world.areaMap),
    }
  },
  components: {
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
    createFlag(){
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





</style>
