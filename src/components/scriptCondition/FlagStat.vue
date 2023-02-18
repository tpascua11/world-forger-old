<template>
  <section class="">
   <modal name="FlagStat"
      :width="525"
      :height="'auto'"
      :shiftY="0.1"
      :styles="'border: 3px solid black'"
      :scrollable="true"
    >
    <section class="modal-total-height margin3">
      <div class="this-title">
        Stat Condition
			</div>
			<br>
			<div v-for="(item1, index) in value.condition_list" :key="index" class="">
				<section class="border-top">
					<br>
					<div style="height: 32px;" class="">
						<div class="pure-u-3-24 list-title">
							Case {{index+1}}
						</div>

						<div class="pure-u-11-24 left">
						</div>

						<div class="pure-u-7-24">
						</div>

						<div class="pure-u-3-24 right">
							<button v-on:click="cutConfirm(value.condition_list, index)"
								class="pure-button full-width button-white"
								style="height: 25px;">
								<div class="b-font"> Clear </div>
							</button>
						</div>
					</div>

					<div class="">
						<section class="" v-for="(item2, index2) in item1.hasStat" :key="index2">
							<div>
								<div class="pure-u-2-24">
									<button v-on:click="type(item2)" class="pure-button full-width" style="height: 34px; font-size: 14px; width: 95%;">
										{{item2.type}}
									</button>
								</div>
								<div class="pure-u-9-24">
									<SelectNameAndID :value="value.condition_list[index].hasStat[index2]" :list="list"/>
										<!--
									<v-select v-model="item2.name" :options="flagList" label="id" @input="updateNow" :clearable="false">
										<template #selected-option="{}">
											<div class="v-font">
												{{list[item2.id].name}}
											</div>
										</template>
										<template #option="{id}">
											<div class="v-font">
												{{list[id].name}}
											</div>
										</template>
									</v-select>
										-->
								</div>

                <div class="pure-u-3-24">
                  <!--
									<v-select v-model="item2.operator" :options="operatorList" @input="updateNow" :clearable="false">
										<template #selected-option="{}">
											<div class="v-font">
												{{item2.operator}}
											</div>
										</template>
										<template #option="{label}">
											<div class="v-font">
												{{label}}
											</div>
										</template>
										<template #open-indicator="{ attributes }">
											<span v-bind="attributes"></span>
										</template>
                  </v-select>
                  -->
								</div>

								<div class="pure-u-4-24">
									<input class="full-width" type="number" v-model="item2.value" placeholder="num.." style="font-size: 13px; height: 27px;">
								</div>
								<div class="pure-u-1-24"></div>
								<div class="pure-u-3-24"></div>
								<div class="pure-u-1-24">
									<button v-on:click="cut(item1.hasStat, index2)" class="pure-button full-width" style="height: 34px;">
										<div style="position: relative; right: 5px;"> X </div>
									</button>
								</div>
							</div>
							<br v-if="index2 != item1.hasStat.length-1" class="br-thin">
							</section>
							<section class="">
								<br>
								<div class="pure-u-8-24">
									<button v-on:click="additionalAnd(index)"
										class="pure-button full-width"
										style="height: 30px;">
										<div class="left b-font-2"> + New Stat Condition </div>
									</button>
								</div>
								<div class="pure-u-11-24"></div>
							</section>
							<br>
						</div>
					</section>
			</div>
			<br><br>
			<div class="">
				<div class="pure-u-6-24">
					<button v-on:click="additionalOr()" class="pure-button full-width">
						Or...
					</button>
				</div>
			</div>
    </section>
  </modal>
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
		additionalAnd(index){
			console.log("CHECK!");
			if(!this.value.condition_list[index].hasStat){
				this.$set(this.value.condition_list[index], 'hasStat', []);
			}
			this.value.condition_list[index].hasStat.push({operator: ">", type: "#"});
		},
    additionalOr(){
      this.value.condition_list.push({hasStat: [{operator: ">", type: "#"}]});
    },
    additionalList(){
      this.value.condition_list.push({operator: ">", type: "#"});
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
.modal-total-height{
	max-height: 750px;
	overflow: scroll;
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
