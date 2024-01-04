<template>
	<div class="dt-border container">
		<section class="">
			<div v-on:click="test" v-if="title" class="border-down-x2">
				<div class="title-container">
					<div class="title-name">{{nameCap(title)}}</div>
					<div class="title-edit">Edit</div>
				</div>
			</div>

			<div class="border-down-x2">
				<button v-on:click="isExpanded = !isExpanded" class="pure-button full-width">
					Search Advanced
				</button>
				<div v-if="isExpanded">
					<div v-for="(value, key) in filterList" :key="key">
    				<div class="form-group">
							<label for="inputField"> {{key}} </label>
							<input v-model="filterList[key]" placeholder="..." />
						</div>
					</div>
					<button v-on:click="newSort();" class="pure-button full-width">
						Sort
					</button>
				</div>
			</div>

      <div id="the-list" class="cool-scroll" v-bind:style="{height: box_height}">
				<div v-for="(row, index) in trueList" :key="index"
          v-bind:style="[ row == selected ? styleObject : {}]"
          class="border-down row clickable"
          v-on:click="selectRow(row)"
        >
          <div class="pure-u-3-24 index-position left"> {{index}}.  </div>
          <div class="pure-u-1-24 text-position "> </div>
          <div class="pure-u-20-24 text-position" v-bind:class="classObject">
            {{row.name}}
          </div>
        </div>
      </div>

      <button v-on:click="addNewRow();" class="pure-button full-width">
        Create
      </button>

    </section>
  </div>
</template>

<script>

export default {
  name: 'ITEM_List',
  components: {},
  watch: {
    refresh: function(){
      console.log("?");
      this.$forceUpdate();
		},
		title: function(){
			console.log("refresh sort");
			this.makeFilterList();
		},
		templateInfo: function(){
			this.makeFilterList();
		},
		buildInfo: function(){
			this.makeFilterList();
		},
		listUpdated: function(){
			console.log("LIST UPDATED--------------------");
			this.makeFilterList();
		}
  },
  props: ['value', 'title', 'map', 'set_height', 'area', 'template', 'templateInfo', 'buildInfo' ,'refresh', 'listUpdated'],
  data: function(){
    return {
      hi: {},
      isActive: true,
      error: null,
      styleObject: {
        'font-weight': 'bold',
        'background-color': 'pink',
      },
      selectedItem: {},
      refTitle: this.title,
			selected: {},
			filterList: {},
			trueList: {},
			isExpanded: false,
    }
  },
	mounted(){
		this.makeFilterList();
  },
	methods:{
		forceUpdate(){
      this.$forceUpdate();
		},
		makeFilterList(){
			console.log("NEW TEMPLATE INFO", this.templateInfo);
			if(!this.templateInfo){
				this.filterList = {};
			}
			else{
				this.filterList = {};
				Object.entries(this.templateInfo).forEach(([key, value]) => {
					if(value.type == 'string') this.filterList[key] = '';
					if(value.type == 'table') this.filterList[key] = '';
					if(value.type == 'table_list') this.filterList[key] = '';
				});
			console.log(this.filterList);
			}
			this.newSort();
			this.$forceUpdate();
		},
		test(){
			console.log("TEST!");
			this.$emit('entitySetting');
		},
    nameFormat: function(name){
      let newStr = name.replace(/_/g, " ");
      let nameX = newStr.replace(/(^\w|\s\w)/g, m => m.toUpperCase());
      return nameX;
    },
		selectRow: function(row){
      this.selected = row;
			//this.$emit('input', row);
			this.$emit("selected", row);
    },
    addNewRow: function(){
			console.log("TEST REF MAP", this.refMap);
			let index;
			index = Object.keys(this.refMap).length;
			//if(Object.keys(this.refMap).length === 0){
			//	index = 0;
			//}
			//else{
      //	index = Object.keys(this.refMap).length + 1;
			//}
      let newEntity;

      console.log("template", this.template);
      if(this.templateInfo) newEntity = this.copyFromTemplateInfo();
      else if(this.template) newEntity = JSON.parse(JSON.stringify(this.template));
      else newEntity = {id: index};

      console.log("NEW ENTITY", newEntity);
      this.refMap[index] = newEntity;

      this.selected = newEntity;
			//this.$emit('input', newEntity);
			//this.$emit("selected");
			//this.$emit('created');

			this.$emit("selected", this.selected);

			this.newSort();
			this.$forceUpdate();

    },
    copyFromTemplateInfo: function(){
      console.log("Can i see if this exist", JSON.stringify(this.templateInfo));
      let newEntity = {};
			Object.keys(this.templateInfo).forEach(key => {
				if(!this.templateInfo[key]) return;

				if(this.templateInfo[key].isList){
					newEntity[key] = {};
					let refList;

					if(this.templateInfo[key].isList === 'all'){
						//console.log("SEE FERENCE LIST", this.templateInfo[key].referenceTo);
						refList = this.objectListToList(this.$root.world.group[this.templateInfo[key].referenceTo].list);
						console.log("REF LIST", refList);

						Object.keys(refList).forEach(key2 => {
							console.log("KEY2", key2);
							newEntity[key][key2] = 0;
						});
					}
					else{
						refList = this.templateInfo[key].referenceList;
						console.log("ref list multiselect", refList);

						if(refList){
							Object.keys(refList).forEach(key2 => {
								console.log("refList", key);
								let referenceName = refList[key2].id;

								newEntity[key][referenceName] = 0;
								//if (refList[key].type == 'string' ) newEntity[key][name] = '';
								//else if(refList[key].type == 'current_and_max' ) newEntity[key][name] = {current: 0, max: 0};
							});
						}
						else{
							newEntity[key] = [];
						}
						/*

						if(refList[key].type == 'number' ) newEntity[key][name] = 0;
						else if(refList[key].type == 'string' ) newEntity[key][name] = '';
						else if(refList[key].type == 'current_and_max' ) newEntity[key][name] = {current: 0, max: 0};
						 */
					}


					/*
					Object.keys(refList).forEach(key2 => {
						console.log("KEY--", key2);
						let name;
						else{
							name = refList[key].referenceList[key2].name;

							if(refList[key].type == 'number' ) newEntity[key][name] = 0;
							else if(refList[key].type == 'string' ) newEntity[key][name] = '';
							else if(refList[key].type == 'current_and_max' ) newEntity[key][name] = {current: 0, max: 0};
						}

						//else if(this.templateInfo[key].type == 'current_and_max' ) newEntity[key] = {'hp': {current: 0, max: 10}};
						//:wconsole.log("TEST!?", newEntity[key]);
					});
					 */
				}
				else if(this.templateInfo[key].default_set){
          newEntity[key] = JSON.parse(JSON.stringify(this.templateInfo[key].default_set));
        }
        else if(this.templateInfo[key].type == 'string'){
          newEntity[key] = '';
        }
        else if( this.templateInfo[key].type == 'number') newEntity[key] = 0;
        else if( this.templateInfo[key].type == 'condition_list') newEntity[key] = [];
				else if( this.templateInfo[key].type == 'script_list') newEntity[key] = [];
        else if( this.templateInfo[key].type == 'table_list') newEntity[key] = [];
        else newEntity[key] = {};
      });
      console.log("DUPLICATE FROM INFO", newEntity);
      return newEntity;
    },
    scrollToEnd: function() {
      var container = this.$el.querySelector("#item-list");
      container.scrollTop = container.scrollHeight;
		},
		titleClick:function(){
			this.$emit('titleClick');
		},
		newSort: function(){
			console.log("--------- SORT ------------");
			let newFilter = [];
			console.log("THIS MAP", this.map);
			Object.entries(this.map).forEach(([key, value]) => {
				let good = Object.entries(value).every(([key2, value2]) => {
					//console.log("VAL 2", value2);
					//console.log("Key 2", key2);

					//console.log("TEMPLATE INFO TEST", this.templateInfo[key2]);
					let ref = this.templateInfo[key2].referenceTo;
					let type = this.templateInfo[key2].type;
					let refGroup = this.$root.world.group[ref];
					console.log("REF GROUP", refGroup);
					if(refGroup && refGroup.list){
						console.log("LIST", refGroup.list);
					}

					if(Array.isArray(value2)){
						console.log("ARRAY FOUND!", value);
						if(this.filterList[key2]){
							return value2.some(function(val){
								console.log("VAL", refGroup.list[val].name);
								let fname = refGroup.list[val].name;
								if(fname.includes(this.filterList[key2])){
									return true;
								}
								else return false;
							}, this);
						}
						else return true;
					}
					else{
						if(this.filterList[key2]){
							if(value2.includes(this.filterList[key2])){
								return true
							}
							else return false;
						}
						else return true;
					}
				});
				if(good){
					newFilter.push(value);
				}
			});
			console.log("new filter", newFilter);
			this.trueList = newFilter;
		},
  },
  computed: {
    refMap: function(){
      return this.map;
    },
    classObject: function () {
      return {
        active: this.isActive && !this.error,
        'text-danger': this.error && this.error.type === 'fatal'
      }
    },
    list: function(){
      //return this.value[this.mapName];
      //console.log("test source", this.source);
      if(this.source) return this.$root.world[this.source][this.mapName];
      else return this.$root.world[this.mapName];
		},
		filteredSort(){
		},
    box_height: function(){
      if(this.set_height) return this.set_height.toString();
      else return '300px';
    }
  }
}
</script>

<style scoped>
.border-up{
  /*border-top-style: solid;*/
  border-right-style: solid;
  border-left-style: solid;
}
.border-down{
  border-bottom-style: solid;
  /*
  border-right-style: solid;
  border-left-style: solid;
   */
  border-width: 1px;
}
.row{
  min-height: 20px;
  font-size: 15px;
  position:relative;
  text-align: left;
  /*overflow: hidden;*/
}
.row:hover{
  background-color: #99cfe0;
}
.text-position{
  font-size: 17px;
  position: relative;
  top: 3px;
}

.index-position{
  font-size: 13px;
  position: relative;
  top: 6px;
  left: 5px;
  /*
  font-family: "Avenir";
   */
}

.this-title{
  font-size: 22px;
  font-weight: bold;
  position: relative;
  top: 5px;
}

.this-title-icon{
  font-size: 22px;
  font-weight: bold;
  position: relative;
  top: 2px;
}

.title-container {
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: relative;
	top: 8px;
}

.title-name:hover {
	cursor: pointer;
	color: blue;
}

.title-name {
	height: 40px;
	font-size: 25px;
	font-weight: bold;
	color: #333;
}
.title-edit {
	font-size: 17px;
	cursor: pointer;
	color: black; /* You can change the color to your preferred text color */
	text-decoration: underline; /* Optionally, underline the word */
}
/* Style for when the word is hovered */
.title-edit:hover {
	text-decoration: none; /* Remove underline on hover if not needed */
	font-weight: bold; /* Optionally, make the text bold on hover */
	text-decoration: underline; /* Optionally, underline the word */
	color: blue;
}

label {
  display: block;
  margin-bottom: -1px;
}

.form-group {
  margin-bottom: 10px; /* Adjust the margin as needed */
}

</style>

