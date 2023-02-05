<template>
  <section class="">
    <section class="margin2">
					<div style="height: 20px;" class="">
            <div class="pure-u-13-24 this-title">
              {{nameCap(title)}}
            </div>
					</div>
        </section>
        <section>
        </section>
    <section class="margin2">
			<div class="pure-u-24-24">
        <section class="">
          <div class="">
            <section style="border-bottom: 1px dotted;">
              <div class="row-title pure-u-4-24">
              </div>
              <div class="pure-u-1-24"></div>
              <div class="pure-u-18-24">
                <div v-for="(item, index) in valueOptions" :key="index"
                  class="pure-u-5-24 row-text">
                  {{nameCap(index)}}
                </div>
              </div>
            </section>

            <section v-if="true">
              <section class="" v-for="(item, index) in value" :key="index">
                <div style="min-height: 30px; border-bottom: 1px dotted;">
                  <div class="row-title pure-u-4-24">
                    {{nameCap(list[index].name)}}
                  </div>
                  <div class="pure-u-1-24"></div>
                  <div class="pure-u-18-24">
                    <div v-for="(item2, index2) in valueOptions"
                      :key="index2" class="row-text pure-u-5-24"
                       style="position: relative; top: 3px;">

                      <input v-if="item2 == '#'" class="full-width writer" type="number"
                        v-model="item[index2]" placeholder="num.."
                        @change="match(index2, item)">

                      <input v-if="item2 == 's'" class="full-width writer"
                        type="string"
                        v-model="item[index2]" placeholder="string..."
                        @change="match(index2, item)"
                      >
                    </div>

                    <div class="pure-u-1-24">
                      <button  v-if="restricted(index)" v-on:click="cutConfirm(index)" class="pure-button full-width"
                               style="height: 15px; position: relative; top: 7px;"
                      >
                        <div style="position: relative; right: 4px; bottom: 5px;
                          font-size: 12px;">
                          X </div>
                      </button>
                    </div>
                  </div>
                  <div class="pure-u-1-24">
                  </div>
                </div>
              </section>
            </section>
          </div>
        </section>
      </div>
    </section>
    <section class="margin2">
      <div class="pure-u-13-24 left"></div>
      <div class="pure-u-8-24 left">
        <SelectNameAndID v-model="newStat" :list="listNoRepeat"/>
      </div>
      <div class="pure-u-1-24 left"></div>
      <div class="pure-u-2-24 left">
        <button v-on:click="addStat(newStat)"
          class="pure-button button-green full-width"
          style="height: 30px; position: relative; top: 1px;">
          <div class="left b-font-2"> Add </div>
        </button>
      </div>
    </section>
  </section>
</template>


<script>

export default {
  name: 'List_Current_And_Max',
  components: {
  },
  data: function(){
    return {
      templateObj : [
        {hasStat: [{operator: ">"}] }
      ],
      template: {operator: ">"},
      list: this.$root.world.group[this.reference.ref].list,
      newStat: {},
    }
  },
  props: ['value', 'reference', 'title'],
  watch: {},
  mounted(){},
  methods:{
    addStat(stat){
      if(stat == {}) return;
      if(!stat.id) return;

      if(this.reference.new_set){
        this.$set(this.value, stat.id,
          JSON.parse(JSON.stringify(this.reference.new_set))
        );
      }
      else this.$set(this.value, stat.id, {name: stat.name});
      this.newStat = {};
    },
		type(item){
			if(item.type != "%") item.type = "%";
			else item.type = "#";
			this.$forceUpdate();
		},
    cutConfirm(index){
      delete this.value[index];
      //TODO: Any other ways to refresh list?
      this.$set(this.value, 'editedr', true);
      delete this.value['editedr'];

      this.$forceUpdate();
    },
    closeModal(){
      this.$modal.hide('flagStatModal');
    },
    match(index, stat){
      /*
      console.log("SEE INDEX", index);
      this.reference.rule_set.forEach(row => {
        let start;
        if(!(index == row.set[0])) return;

        if(row.rule == "FORCE_MATCH"){
          row.set.forEach(row2 => {
            console.log("-------;");
            if(!start) start = stat[row2];
            else stat[row2] = start;
            console.log(start);
          });
        }
        else if(row.rule == "FORCE_LOWER"){
          if(stat[row.set[0]] > stat[row.set[1]]){
            stat[row.set[0]] = stat[row.set[1]];
          }
        }
      });
       */
      index; stat;
    },
    updateNow(){
		},
    updateID(){
    },
    restricted: function(index){
      if(!this.restrictList) return true;
      return !this.restrictList.some(row => {
        return (row == index);
      });
    }
  },
  computed: {
    valueOptions: function(){ return this.reference.value_option; },
    restrictList: function(){ return this.reference.restrict; },
    valueOptionsLength: function() {
      return Object.keys(this.valueOptions).length;
    },
    group: function(){
      return this.$root.world.group;
    },
    listNoRepeat: function(){
      let filteredArray = (Object.keys(this.list)).filter(
        function(e) {
          return this.indexOf(e) < 0;
        },
        [...Object.keys(this.value)]
      );
      let filterObj = {};
      console.log("FILTERED ARRAY", filteredArray);
      filteredArray.forEach(index => {
        filterObj[index] = this.list[index];
      });
      console.log("FILTERED OBJ", filterObj);

      return filterObj;
    }
  }
}

</script>

<style scoped>
.this-title{
  font-size: 22px;
  text-decoration: underline;
  font-weight: bold;
}
.row-title{
  font-size: 16px;
  margin-top: 10px;
}
.row-text{
  font-size: 14px;
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
	background-color: #B9E9C9;
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
  position: relative;
  right: 1px;
}

.br-thin{
   display: block;
   margin: 2.5px;
 }

 .writer{
   font-size: 15px;
   height: 20px;
   width: 75px;
 }

 label {
    /* Other styling... */
    text-align: right;
    clear: both;
    float:left;
    margin-right:15px;
}


</style>
