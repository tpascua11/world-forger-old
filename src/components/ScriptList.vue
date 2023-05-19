<template>
  <div>
    <div v-if="entity[listName]" class="">
      <div>
        <div style="height: 3vh;">
          {{error}}
        </div>

        <div style="height: 75vh; overflow:auto;">

          <draggable
            v-model="refScript[listName]"
            @start="drag=true"
            @end="drag=false"
					  @update="dragUpdate"
            tag="div"
            item-key="index">
            <template #item="{element, index}">
              <div class="script-row" v-bind:style="[value == element ?
                selected: {}]">
                <div class="pure-u-1-24 script-row-index center"> {{index}}: </div>
                <div class="pure-u-20-24" v-bind:style=[indexPush(index)]>
                  <div class="script-row-text" v-on:click="selectAction(element, index)"
                    v-bind:style="[ value == element ? selected: {}]">
                    {{element}}
                  </div>
                </div>
                <div class="pure-u-3-24" v-if="value == element">
                </div>
              </div>
            </template>
          </draggable>
          <!--
					<draggable item-key="index" v-model="refScript[listName]" tag="div" @update="dragUpdate">
						<div class="script-row" v-for="(item, index) in refScript[listName]" :key="index" v-bind:style="[ item.isMoved ? moved : {}]">
							<div class="pure-u-1-24 script-row-index center"> {{index}}: </div>
							<div class="pure-u-23-24" v-bind:style=[indexPush(index)]>
								<div class="script-row-text" v-on:click="selectAction(item, index)"
									v-bind:style="[ value == item ? selected : {},]">
									{{item}}
								</div>
							</div>
						</div>
          </draggable>
          -->
        </div>
			</div>

		</div>
	</div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'InteractionBuilder',
  data: function(){
		return {
      isActive: true,
      //error: null,
      styleObject: {
        color: 'red',
        fontSize: '13px'
      },
      moved:    { 'background-color': '#FFFFE0'   },
      selected: { 'background-color': 'pink' },
      targeted: { 'background-color': 'lightblue' },
      action: {},
      selectedActionName: '',
      atIndex: -1,
			testList: [{name: 'red'}, {name: 'blue'}, {name: 'gold'}],
      ifConditionIndexList : [],
      endConditionIndexList: [],
			elseConditionIndexList: [],
			currentScriptFlags: [],
			error: '',
    }
  },
  components: {
    draggable,
	},
	props: ['value', 'entity', 'listName'],
  watch: {
    /*
    scriptList: function(newv, oldv){
      //oldv; newv;
      //this.validScriptList();
    },
     */
    listName: function(){
      console.log("LIST CHANGE!");
      this.validScriptList();
    },
  },
  mounted(){
      this.validScriptList();
  },
  computed: {
		refScript    : function(){ return this.entity; },
		refScriptList: function(){ return this.entity[this.listName]; },
		classObject  : function () { return {
			active: this.isActive && !this.error,
			'text-danger': this.error && this.error.type === 'fatal'}
		},
  },
  methods:{
    targetIndex(index){
      this.atIndex = index;
    },
    selectAction(row, index){
			console.log("CHECK", index);
			console.log("SELECTING ACTION", row);
      this.validScriptList();
      this.$emit('selectAction', row, index);
    },
    deselectAction(){
			this.value = {empty: true};
    },
		saveScript(e){
      console.log("Script Overwritten!", e);
			this.validScriptList();
			console.log("secret...");
			this.$forceUpdate();
		},
		checkMove(/*{draggedContext}*/){
			this.validScriptList();
      //if(draggedContext)
      //console.log("movement at", draggedContext.element);
      //draggedContext.element.isMoved = true;
		},
    dragUpdate(){
      this.validScriptList();
    },
		validScriptList(){
      console.log("CHECK VALIDATION!");
      let ifConditionList = [];
      let endConditionList = [];

      let elseConditionList = [];
      let elseIfConditionList = [];

      let error = "";
			let enclosedList = []; let startIf = [];
			this.checkScriptFlags(this.refScriptList);

			if(!this.refScriptList) return;
			this.refScriptList.forEach(function(script, index){
        if(script.ifCondition) { ifConditionList.push(index); startIf.push(index)}
        if(script.elseCondition) elseConditionList.push(index);
        if(script.elseIfCondition) elseIfConditionList.push(index);

        if(script.endCondition){
          let enclosed = {start: startIf.pop(), end: index, else: [], elseIf: []};
          //CHECK ELSE CONDITION
          let test = (this.betweenList(elseConditionList, enclosed.start, enclosed.end));
          for(let i = 0; i < test ; i++){
            enclosed.else.push(elseConditionList.pop());
          }
          if(!error && enclosed.else.length >= 2)
            error = "EXTRA ELSE STATMENT BEFORE: " + index;

          //CHECK ELSE IF CONDITION
          let test2 = (this.betweenList(elseIfConditionList, enclosed.start, enclosed.end));
          for(let i = 0; i < test2 ; i++){
            enclosed.elseIf.push(elseConditionList.pop());
          }
          if(!error && enclosed.elseIf.length >= 2) error = "EXTRA ELSE IF STATMENT BEFORE: " + index;

          enclosedList.push(enclosed);
          endConditionList.push(index);
        }

        if(ifConditionList.length < endConditionList.length){
          if(!error) error = "If and End Statement Not Closed Correctly at index: " + index;
        }
        if(ifConditionList.length == endConditionList.length){
          if(elseConditionList.length >= 1) error = "ELSE OUTSIDE IF CASE!: " + index;
        }
      }, this);

      if(ifConditionList.length != endConditionList.length){
        if(!error) error = "Missing IF or END conditions to close condition!";
      }
      this.ifConditionIndexList  = ifConditionList ;
      this.endConditionIndexList = endConditionList;

      this.error = error;
      console.log("ENCLOSED!", enclosedList);

      return error;
    },

    betweenList(list, start, end){
      console.log(list);
      let between = [];
      let pop = 0;
      list.forEach(function(val){
        if(val >= start && val <= end){
          between.push(val);
          pop++;
        }
      });
      return pop;
		},

		checkScriptFlags(list){
			//console.log("----------------------------------");
			//console.log("LIST", list);
			let flagList = [];
			if(list) list.forEach(function(script){
				if(script.conditionList){
					script.conditionList.forEach(function(condition){
						if(condition.isScriptList){
							flagList = [...flagList, ...condition.isScriptList];
						}
					});
				}
				if(script.eventName == "toggleScriptList"){
					//console.log("SHOUD HAPPEN!!");
					flagList.push(name);
				}
			});
			//console.log("SCRIPT FLAGS", flagList);
		},

    indexPush(atIndex){
      //console.log(index);
      let push = 0;

      //console.log("WTF", this.ifConditionIndexList);
      if(this.ifConditionIndexList.some(function(ifIndex){
        if(atIndex > ifIndex){
          push++;
          return false;
        }
      })) push = this.ifConditionIndexList.length;

      this.endConditionIndexList.some(function(endIndex){
        if(atIndex >= endIndex){
          push--;
        }
      });

      this.elseConditionIndexList.some(function(elseIndex){
        if(atIndex == elseIndex){
          push--;
          return true;
        }
      });
      //if(push < 0) push = 0;

      /*
      if(this.endConditionIndexList.some(function(endIndex){
        if(atIndex < endIndex){
          push--;
          return false;
        }
      })) push -= this.endConditionIndexList.length;
      if(push > 0) push = 0;
       */

      /*
      endConditionList.some(function(endIndex){
        if(atIndex > endIndex){
          push -= atIndex;
        }
      });
       */

			if(push < 0) push = 0;
      return {
        'position': 'relative',
        'left': push*20 + 'px'
      }
    }
  },
}
</script>

<style scoped>
.creator{
  border: 1px solid black;
  background-color: #E8E8E8;
}
.smallInput{
  height: 14px;
  font-size: 18px;
  border: 0;
  background-color: #E8E8E8;
}
.basedHeight{
	height:77vh;
}

.tablescroll{
	max-height: 650px;
	overflow: scroll;
	position: relative;
}

.bitright{
  margin-left: 20px;
}
.bigInput{
  height: 40px;
  font-size: 22px;
  border: 0;
  background-color: #E8E8E8;
}

.script-match-height{
  position:relative;
  top: 0px;
}
.script-match-height-left{
  position:relative;
  top: -20px;
}

.test2{
  position:relative;
  top: -20px;
}
tr {
  padding: 50px;
}
tr {
}
td{
  font-size:12px;
}
th {
  font-size: 14px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
p {
  font-size: 15px;
}

.script-list-height {
	height: 500px;
	resize: both;
}

.action-script-back {
	position: absolute;
	width: 100px;
	bottom: 10px;
}

.this-title{
  font-size: 12px;
	font-weight: 900;
	text-color: gray;
	line-height: 1.6;

	position:relative;
	top:5px;
}

.script-row{
	font-size: 13px;
	border-bottom-style: solid;
	border-width: 1px;
	min-height: 18px;
}
.script-row-text{
	position: relative;
	top: 3px;
}
.script-row-index{
	position: relative;
	top: 3px;
  font-weight: bold;
}
.script-row:hover{
	background-color: #ededed;
	cursor: grab;
}

input:focus {
	outline: none;
	background: #e5e4e2;
}

.scrollable-div {
  /* Set the height of the div and enable scrolling */
  height: 300px;
  overflow-y: scroll;
  /* Hide the scrollbar */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer and Edge */
}

/* Hide the scrollbar in Webkit-based browsers */
.scrollable-div::-webkit-scrollbar {
  display: none;
}

</style>
