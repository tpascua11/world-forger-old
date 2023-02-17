<!--
Condition Set is part of the IS_CONDITION of an objects
ITEM, AREA, INTERACTION[[],[]]

The Condition Set is the inner array [], which represent the AND Statement of
the is_condition.
	Everything in the single array must be true for the inner array to be true
But if there are more inner arrays [[],[],[],[]], ethier one of them
can be true for the whole is_condition to be true.
	A Condition Set can also be saved into a Complex so it can be easier to reused
or be used in a another Condition Set
-->

<template>
	<div class="simple-border max-height paper">
		<!-- Input Types -->
		<div class="row border-bottom border-top title-3">
			<div class="col col-4 title-s-2">Condition</div>
				<div class="col-4 col">
					<input
						class="small-s-width" type="string"
						v-model="name" placeholder="Name of Complex"
					>
				</div>
				<div class="col-4 col">
					<button v-on:click="saveComplex" class="btn-secondary small-s-width
						btn-block "> Save As Complex
					</button>
				</div>
			</div>
			<!-- Condition Sets -->
			<div class="row condition-list-section">
				<div class="col-12 col">
					<div class="condition-list-table">
						<table class=''>
							<thead>
							</thead>
							<tbody class="condition-list-table">
								<tr class="short-row" v-if="emptyList(conditionSet.isList)">
									<td style="width: 20%"> Is Flag </td>
									<td style="width: 70%"> {{conditionSet.isList}} </td>
									<td style="width: 10%">
										<button v-on:click="conditionSet.isList = []" class="btn-danger nice-small-fit btn-block "> X </button>
									</td>
								</tr>
								<tr class="short-row" v-if="emptyList(conditionSet.notList)">
									<td style="width: 20%"> Not Flag </td>
									<td style="width: 70%"> {{conditionSet.notList}} </td>
									<td style="width: 10%"> <button v-on:click="conditionSet.notList = []" class="btn-danger nice-small-fit btn-block "> X </button> </td>
								</tr>
								<tr class="short-row" v-if="emptyList(conditionSet.hasItem)">
									<td style="width: 20%"> Has Item</td>
									<td style="width: 70%"> {{conditionSet.hasItem}} </td>
									<td style="width: 10%"> <button v-on:click="conditionSet.hasItem = []" class="btn-danger nice-small-fit btn-block "> X </button> </td>
								</tr>
								<tr class="short-row" v-if="emptyList(conditionSet.hasStat)">
									<td style="width: 20%"> Has Stat</td>
									<td style="width: 70%"> {{conditionSet.hasStat}} </td>
									<td style="width: 10%"> <button v-on:click="conditionSet.hasStat = []" class="btn-danger nice-small-fit btn-block "> X </button> </td>
								</tr>
								<tr class="short-row" v-if="!emptyObj(conditionSet.time)">
									<td style="width: 20%"> Time </td>
									<td style="width: 70%"> {{conditionSet.time}} </td>
									<td style="width: 10%"> <button v-on:click="conditionSet.time = {} " class="btn-danger nice-small-fit btn-block "> X </button> </td>
								</tr>
								<tr class="short-row" v-if="emptyList(conditionSet.complexList)">
									<td style="width: 20%"> Complex </td>
									<td style="width: 70%"> {{conditionSet.complexList}} </td>
									<td style="width: 10%"> <button v-on:click="conditionSet.complexList = []" class="btn-danger nice-small-fit btn-block "> X </button> </td>
								</tr>
								<tr class="short-row" v-if="emptyList(conditionSet.areaIsList)">
									<td style="width: 20%"> Area Is List </td>
									<td style="width: 70%"> {{conditionSet.areaIsList}} </td>
									<td style="width: 10%"> <button v-on:click="conditionSet.complexList = []" class="btn-danger nice-small-fit btn-block "> X </button> </td>
								</tr>
								<tr class="short-row" v-if="emptyList(conditionSet.areaNotList)">
									<td style="width: 20%"> Area Not List</td>
									<td style="width: 70%"> {{conditionSet.areaNotList}} </td>
									<td style="width: 10%"> <button v-on:click="conditionSet.complexList = []" class="btn-danger nice-small-fit btn-block "> X </button> </td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		<section class="input-type-section">
			<!-- Flag Inputs  -->
			<div class="row">
				<div class="col-12 col">
					<ImprovedCondition
						v-model="value"
						:referenceList="referenceWorld.flagList"
					/>
				</div>
			</div>
		</section>

	</div>
</template>

<script>
import ImprovedCondition from '@/components/inputs/ImprovedCondition.vue'



export default {
	name: 'ConditionSet',
	data: function(){
		return {
			menuConditionType: "FLAG",
			name: '',
			conditionTemplate: {
				complexList: [],
				isList: [],
				notList: [],
				hasItem: [],
				hasStat: [],
				time: {},

				areaIsList: [],
				areaNotList: [],
			},
		}
	},
	components: {
		ImprovedCondition,
	},
	props: ['value', 'world', 'confirm'],
	mounted(){
		console.log("SEE THE Reference World", this.$root.world);
	},
	methods:{
		selectConditionType(type){
			this.menuConditionType = type;
		},
		insertConditionAnd(){
			this.$emit('input', this.conditionSet);
			this.$emit('confirm');
			//this.referenceConditionList.push(this.conditionTemplate);
			//this.$emit('input', newSet);
		},
		insertConditionOr(){
			this.$emit('confirm');
			//this.convert();
			//this.$emit('input', newSet);
		},
		convert(){
			let newConditionTemplate = {
				complexList: [],
				isList: [],
				notList: [],
				hasItem: [],
				hasStat: [],
				time: {},

				areaIsList: [],
				areaNotList: [],
			};
			//let template = Object.assign({}, newConditionTemplate);

			this.conditionTemplate.isList.forEach(function(item){
				let template = JSON.parse(JSON.stringify(newConditionTemplate));
				template.isList.push(item);
				console.log("template added", template);
			});

			this.conditionTemplate.notList.forEach(function(item){
				let template = JSON.parse(JSON.stringify(newConditionTemplate));
				template.notList.push(item);
				console.log("template added", template);
			});

			this.conditionTemplate.hasItem.forEach(function(item){
				let template = JSON.parse(JSON.stringify(newConditionTemplate));
				template.hasItem.push(item);
				console.log("template added", template);
			});

			this.conditionTemplate.hasStat.forEach(function(item){
				let template = JSON.parse(JSON.stringify(newConditionTemplate));
				template.hasStat.push(item);
				console.log("template added", template);
			});
		},
		saveComplex(){
			if(this.$root.world.complexConditionMap[this.name]){
				if(!confirm("Complex Name Is Used \n do you wish to override")) return;
			}
			if(this.conditionSet.complexList){
				if(!confirm("Nested Complex Will Be Removed, Continue?")) return;
			}
			this.conditionSet.complexlist = [];

			this.$root.world.complexConditionMap[this.name] =  JSON.parse(JSON.stringify(this.conditionSet));
			/*
			this.$root.world.complexConditionMap[this.name] =
				this.conditionSet;
			//let objCopy = Object.assign({}, obj);
			 */
			console.log("SEE THE COMPLEX MAP", this.$root.world.complexConditionMap);
		},
    emptyList(list){
      if(!list) return false;
      return list.length;
    },
    emptyObj(obj){
      return Object.keys(obj).length === 0;
    }
	},
	computed: {
		classObject: function () {
			return {
				active: this.isActive && !this.error,
				'text-danger': this.error && this.error.type === 'fatal'
			}
		},
		conditionSet: function(){
			return this.value;
		},
		referenceWorld: function(){
			//return this.$parent.referenceWorld;
			return this.$root.world;
		},
		referenceConditionList: function(){
			return this.value;
		},
		referenceFlagList: function(){
			return 10;
		},
		showIsList: function()    { return this.value.isList.length > 0},
		showNotList: function()   { return this.value.notList.length > 0},
		showItemList: function()  { return this.value.hasItem.length > 0},
		showStatList: function()  { return this.value.hasStat.length > 0},

	}
}

</script>

<style scoped>
textarea {
	box-sizing:border-box;
	height: 100%;
	width: 100%;
}
.nice-small-fit{
	font-family: Neucha;
	font-size: 17px;
	height: 25px;
	padding:0.2em
}

.nice-mid-fit{
	font-family: Neucha;
	font-size: 21px;
	height: 30px;
	padding:0.2em
}

/* The Small Row For Condition */
.condition-short-row{
	min-height: 100px;
	font-size: 20px;
}

.new-line{
	white-space: pre;
}

.short-row{
	height: 25px;
	margin:0px;
}

.top-section{
}

.condition-list-table{
	overflow: scroll;
}

.input-type-section{
	height: 325px;
  overflow: scroll;
}

.condition-list-section{
	height: 300px;
  overflow: scroll;
}

.confirm-section{
}
.title{
  font-size: 20px;
}

.title-3{
  font-weight: bold;
  position:relative;
	top: -30px;
	text-decoration: underline;
	height: 20px;
}

th, td{
  font-size: 14px;
}

.small-s-width{
  font-size: 14px;
  height: 35px;
  padding:0.3em;
  width: 95%;
}

</style>
