<template>
	<section v-if="(value.eventName == 'stat_modifier_formula_1')" class="">
		<div class="row script-select-title">
			<i class="ra ra-player-lift ra-1x">
			</i>
			Formula Stat Modifier
		</div>
		<br>
		<div class="row">
			Modifier Stat
			<SelectSpecific :value="value" :list="flagKey"
				:option_to_value="[
				['id','modified_stat_id'],
				['name', 'modified_stat_name']
				]"
			/>
		</div>
		<br>
		<div>
			Influence By

			<SelectSpecific :value="value" :list="flagKey"
				:option_to_value="[
				['id','influence_stat_id'],
				['name', 'influence_stat_name']
				]"
			/>
		</div>
		<div>
			<p class="supersmall"> Value + ( (Stat - Minimal Stat) / (Stat Per Increase) ) * Multiplier </p>
		</div>
		<section class="font-5">
			<div>
				<div class="pure-u-2-5 right">Stat Required:</div>
				<div class="pure-u-3-5"> <input style="width: 80%" class="" type="number" v-model="value.min_stat" placeholder="min stat..">  </div>
			</div>
			<div>
				<div class="pure-u-2-5 right">Stat_Per_Inc.</div>
				<div class="pure-u-3-5"> <input style="width: 80%" class="" type="number" v-model="value.stat_per_influence" placeholder="min stat..">  </div>
			</div>
			<div>
				<div class="pure-u-2-5 right">Multiplier :</div>
				<div class="pure-u-3-5"> <input style="width: 80%" class="" type="number" v-model="value.multiplier" placeholder="min stat..">  </div>
			</div>
			<div>
				<div class="pure-u-2-5 right">Min Total :</div>
				<div class="pure-u-3-5"> <input style="width: 80%" class="" type="number" v-model="value.min_total" placeholder="min stat..">  </div>
			</div>
			<div>
				<div class="pure-u-2-5 right">Max Total :</div>
				<div class="pure-u-3-5"> <input style="width: 80%" class=""
            type="number" v-model="value.max_total" placeholder="min stat..">
        </div>
			</div>
		</section>
		<br>
		<div>
			<div>
				Test Result
			</div>
				<br>
			<div>
				<section class="font-5">
					<div class="pure-u-2-5 right" style="font-size: 15px;">
						Influence Stat...
					</div>
					<div class="pure-u-3-5 " style="font-size: 15px;">
						<input class="" style="width: 85%" type="number" v-model="testStat" placeholder="default value..."> <br>
					</div>
				</section>
			</div>
			<p> stat: {{testStat - value.min_stat}} = ({{testStat}} - {{value.min_stat}}) </p>
			<p> influnece: {{(testStat - value.min_stat)/value.stat_per_influence}}
				= {{testStat- value.min_stat}} / {{value.stat_per_influence}}
			</p>
			<p> multiplier: {{value.multiplier}} </p>

			Total {{(value.default_value -  -( (testStat - value.min_stat) /
			value.stat_per_influence) * value.multiplier)}}
			<p>
				Use formula to increase the selected modifier stat with influence stat.
			</p>

			<!--
			<div class="row">
				<div class="supersmall">
					<p> stat: {{testStat - value.min_stat}} = ({{testStat}} - {{value.min_stat}}) </p>
					<p> influnece: {{(testStat - value.min_stat)/value.stat_per_influence}}
						= {{testStat- value.min_stat}} / {{value.stat_per_influence}}
					</p>
					<p> multiplier: {{value.multiplier}} </p>

					Total {{(value.default_value -  -( (testStat - value.min_stat) /
					value.stat_per_influence) * value.multiplier)}}
				</div>
				-->
		</div>
	</section>
</template>

<script>
export default {
	name: 'Basic',
	data: function(){
		return {
      flagList: Object.keys(this.$root.world.group.stat.list),
			flagKey : this.$root.world.group.stat.list,

			template: {name: '', flag: true},
			//flagList: Object.keys(this.$root.world.statMap),
			testStat: 10,
			t2: {
				value: 0,
				statMin: 10,
				statDivideInfluence: 1,
				multiplier: 1,
				minValue: 0,
				maxValue: 20,
				/*
					let totalValue = value + ( (stat - statMin) / statDivideInfluence ) * multiplier;
					if(totalValue < minValue) Heal = minValue;
					if(totalValue > maxValue) Heal = maxValue;
				 */
			},
		}
	},
	props: ['value'],
	mounted(){},
	methods:{
		test(){},
		toggleFlag(){
			this.value.flag = !this.value.flag;
		},
		setNameMod(){
			this.value.modified_stat_name  = this.flagKey[this.value.modified_stat_id].name;
		},
		setNameInf(){
			this.value.influence_stat_name = this.flagKey[this.value.influence_stat_id].name;
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

.tablescroll{
	overflow: scroll;
	height: 100%;
}

.font-5{
	font-size: 13px;
}

.right{
	text-align: right;
	position:relative;
	top: 3px;
}

</style>
