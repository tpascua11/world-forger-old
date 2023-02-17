<template>
  <section v-if="(value.eventName == 'stat_modifier')">
		<div class="script-select-title border-down">
			<div class="pure-u-3-3">
				<i class="ra ra-player-lift ra-1x"></i> Stat
			</div>
		</div>
		<br>
		<div class="pure-u-3-3" style="font-size: 20px;">
			Stat List
      <SelectNameAndID v-model="value" :list="flagKey"/>
		</div>
    <br>
    <div class="pure-u-3-3">
			Modifier
			<input style="width: 96%" class="" type="string" v-model="value.number" placeholder="..."> 
		</div>
		<div class="pure-u-3-3">
			<br>
			<div v-if="value.amount > 0"> Add {{value.amount}} {{value.name}}</div>
			<div v-if="value.amount < 0"> Remove {{value.amount}} {{value.name}}</div>
		</div>
		<p>
			Increase or Decrease a selected amount of a stat.
		</p>
  </section>
</template>

<script>
export default {
  name: 'Basic',
  data: function(){
		return {
      flagList: Object.keys(this.$root.world.group.stat.list),
      flagKey : this.$root.world.group.stat.list,
    }
  },
  props: ['value'],
  mounted(){},
  methods:{
    test(){console.log("TEST INPUT EVENT");},
    toggleFlag(){
      this.value.flag = !this.value.flag;
		},
		setName(){
			this.value.name = this.flagKey[this.value.id].name;
		},
    createFlag({value}){
      console.log("test", this.$root.world.statMap);
      //this.$root.world.flapMap[value] = this.value.flag;
      this.$root.world.statMap[value] = false;
      this.flagList = Object.keys(this.$root.world.statMap);
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

  .mox{
    position:relative;
    top: 0px;
    margin-top: -20px;
    /*margin-bottom: 10px;*/
  }
  .closer2{
    position:relative;
    top: 0px;
    margin-top: -50px;
    /*margin-bottom: 10px;*/
  }

  .closer3{
    position:relative;
    top: 0px;
    margin-top: 0px;
    /*margin-bottom: 10px;*/
  }

	.time-fit{
		width: 100%;
		height: 30px;
	}

	.supersmall{
		font-size: 13px;
		font-color: green;
	}



</style>
