<template>
	<section v-if="(value.eventName == 'time_pass')" class="">
    <div class="script-select-title">
			<i class="ra ra-player-lift ra-1x"></i> Time
		</div>
		<div class="row">
			<br>
		</div>
		<div class="time-font-5">
			<div class="pure-u-1-5">
        <span class=""> Years   <input style="width: 80%" class="" type="number" v-model="value.time.years"   placeholder="Value"> <br> </span>
			</div>
			<div class="pure-u-1-5">
        <span class=""> Months  <input style="width: 80%" class="" type="number" v-model="value.time.months"  placeholder="Value"> <br> </span>
			</div>
			<div class="pure-u-1-5">
        <span class=""> Days    <input style="width: 80%" class="" type="number" v-model="value.time.days"    placeholder="Value"> <br> </span>
			</div>
			<div class="pure-u-1-5">
        <span class=""> Hours   <input style="width: 80%" class="" type="number" v-model="value.time.hours"   placeholder="Value"> <br> </span>
			</div>
			<div class="pure-u-1-5">
				<span class=""> Minutes <input style="width: 80%" class="" type="number" v-model="value.time.minutes" placeholder="Value"> <br> </span>
			</div>
		</div>
		<br>
		<p>
			How much time will past in game.
		</p>
  </section>
</template>


<script>

export default {
  name: 'ItemFlag',
  components: {
  },
  data: function(){
    return {
      operatorList: [">", ">=", "==", "<=", "<"],
      templateObj : [
        {hasItem: [{operator: ">"}] }
      ],
      template: {operator: ">"},
      flagList: Object.keys(this.$root.world.itemMap),
    }
  },
  props: ['value'],
  watch: {},
  mounted(){},
  methods:{
		additionalAnd(index){
			console.log("CHECK! INDEX FIRE!!!", this.value.conditionList[index]);
      if(!this.value.conditionList[index].time){
        console.log("-???");
				this.$set(this.value.conditionList[index], 'time', {after: {}, before: {}});
			}
			//this.value.conditionList[index].hasItem.push({operator: ">"});
		},
    additionalOr(){
      this.value.conditionList.push({ });
    },
    additionalList(){
      this.value.conditionList.push({operator: ">"});
    },
    cut(index){
      this.$delete(this.value.conditionList[index], 'time');
    },
    cutConfirm(list, index){
      console.log(list);
      if(!confirm("DELETE" + JSON.stringify(list))) return true;
      list[index].hasItem = [];
    },
    closeModal(){
      this.$modal.hide('ItemFlag');
    },
    updateNow(){
    }
  },
  computed: {
  }
}

</script>

<style scoped>
.time-fit{
  width: 100%;
  height: 30px;
}

.this-title{
  font-size: 20px;
  text-decoration: underline;
  font-weight: bold;
}
.smallc{
  height: 35px;
  width: 100%;
}
.smallt{
  height: 20px;
}
.smalltin{
  position:relative;
  top: -6px;
  font-weight: bold;
}
.list-title{
  font-size: 18px;
  font-weight: bold;
}
.smallxtext{
  font-size: 16px;
  position:relative;
  top: -2px;
  left: 5%;
  font-weight: bold;
}
.v-select {
  font-size: 12px;
  font-weight: bold;
  width: 100%;
}
.small{
  font-size: 15px;
  font-weight: bold;
}
.referenceList{
  /* width: 200px; */
  width: 100%;
  height: 40px;
}
.small{
  height: 10px;
}
.closer{
	width: 5%;
  /*margin-bottom: 10px;*/
}
.modal-total-height{
  max-height: 750px;
}
.modal-body-height{
  max-height: 650px;
  overflow: scroll;
}
.modal-bottom-height{
  height: 100px;
}

input{
	font-size: 15px;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
.time-font-5{
	font-size: 13px;
}

</style>
