<template>
  <section class="">
    <section class="margin2">
			<div class="">
				<section class="">
					<br>
					<div style="height: 32px;" class="">
            <div class="pure-u-8-24 list-title">
              Stats
						</div>
            <div class="pure-u-1-24"></div>
            <div class="pure-u-4-24 left">
              Max
            </div>
            <div class="pure-u-1-24"></div>
            <div class="pure-u-4-24 left">
              Current
						</div>

					</div>

					<div class="">
						<section class="" v-for="(item, index) in value.stat" :key="index">
							<div>
								<div class="pure-u-8-24">
									<SelectNameAndID v-model="value.stat[index]" :list="list"/>
                </div>
                <div class="pure-u-1-24"></div>
								<div class="pure-u-4-24">
									<input class="full-width" type="number" v-model="item.max" placeholder="num.." style="font-size: 13px; height: 27px;">
                </div>
                <div class="pure-u-1-24"></div>
                <div class="pure-u-4-24">
									<input class="full-width" type="number" v-model="item.current" placeholder="num.." style="font-size: 13px; height: 27px;">
                </div>
                <div class="pure-u-1-24"></div>
                <div class="pure-u-1-24">
                  <!--
									<button v-on:click="cut(item1.hasStat, index2)" class="pure-button full-width" style="height: 34px;">
										<div style="position: relative; right: 5px;"> X </div>
                  </button>
                  -->
								</div>
							</div>
						</section>
							<section class="">
								<br>
								<div class="pure-u-8-24">
									<button v-on:click="additionalAnd()"
										class="pure-button full-width"
										style="height: 30px;">
										<div class="left b-font-2"> + New Stat </div>
									</button>
								</div>
								<div class="pure-u-11-24"></div>
							</section>
							<br>
						</div>
					</section>
			</div>
    </section>
  </section>
</template>


<script>

export default {
  name: 'FlagStat',
  components: {
  },
  data: function(){
    return {
      operatorList: [">", ">=", "==", "<=", "<"],
      templateObj : [
        {hasStat: [{operator: ">"}] }
      ],
      template: {operator: ">"},
			flagList: Object.keys(this.$root.world.group.stat.list),
			list: this.$root.world.group.stat.list,
      keyList : Object.keys(this.$root.world.group.stat.list),
    }
  },
  props: ['value'],
  watch: {},
  mounted(){},
  methods:{
		additionalAnd(){
      console.log("CHECK!");
			if(!this.value.stat){
				this.$set(this.value.stat, 'stat', []);
			}
			this.value.stat.push({operator: ">", type: "#"});
		},
    additionalOr(){
      this.value.conditionList.push({hasStat: [{operator: ">", type: "#"}]});
    },
    additionalList(){
      this.value.conditionList.push({operator: ">", type: "#"});
    },
    cut(list, index){
      list.splice(index, 1);
		},
		type(item){
			if(item.type != "%") item.type = "%";
			else item.type = "#";
			this.$forceUpdate();
		},
    cutConfirm(list, index){
      console.log(list);
      if(!confirm("DELETE" + JSON.stringify(list))) return true;
      list[index].hasStat = [];
    },
    closeModal(){
      this.$modal.hide('flagStatModal');
    },
    updateNow(){
		},
    updateID(){
    }
  },
  computed: {
  }
}

</script>

<style scoped>
.this-title{
  font-size: 20px;
  text-decoration: underline;
  font-weight: bold;
}
.v-font{
  font-weight: bold;
	font-size: 13px;
	height: 22px;
	width: 100%;
}
.list-title{
  font-size: 17px;
	font-weight: bold;
	position:relative;
}
.v-select {
  font-size: 12px;
  font-weight: bold;
  width: 100%;
}
.referenceList{
  /* width: 200px; */
  width: 100%;
  height: 40px;
}
.b-font{
	color: darkred;
	position: relative;
	top: -5px;
}
.button-green{
	background-color: lightgreen;
}

.button-red {
	background-color: #ff6666;
}
.button-pink {
	background-color: pink;
}
.button-white{
	background-color: white;
	border: 1px;
}
.b-font-2{
	font-size: 15px;
}

.br-thin{
   display: block;
   margin: 2.5px;
}


</style>
