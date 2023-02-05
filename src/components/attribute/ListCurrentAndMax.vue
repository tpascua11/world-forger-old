<template>
  <section class="">
    <section class="margin2">
			<div class="pure-u-14-24">
        <section class="">
          <div>
          </div>
					<div style="height: 32px;" class="">
            <div class="pure-u-6-24 this-title">
              {{nameCap(title)}}
						</div>
            <div class="pure-u-6-24 left">
              max
            </div>
            <div class="pure-u-1-24"></div>
            <div class="pure-u-6-24 left">
              current
						</div>
					</div>

					<div class="">
						<section class="" v-for="(item, index) in value" :key="index">
							<div style="height: 35px;">
                <div class="pure-u-6-24">
                  {{nameCap(list[index].name)}}
                </div>
								<div class="pure-u-6-24" style="position: relative; bottom: 4px;">
									<input class="full-width writer" type="number"
                    v-model="item.max" placeholder="num.."  @change="match(item)">
                </div>
                <div class="pure-u-1-24"></div>
                <div class="pure-u-6-24" style="position: relative; bottom: 4px;">
									<input class="foly-width writer" type="number" v-model="item.current" placeholder="num..">
                </div>
                <div class="pure-u-1-24"></div>
                <div class="pure-u-1-24">
                  <button v-on:click="cutConfirm(index)" class="pure-button
                    button-pink full-width"
                    style="height: 20px;"
                  >
										<div style="position: relative; right: 5px; bottom: 5px;"> X </div>
                  </button>
								</div>
							</div>
            </section>
          </div>
        </section>
        <section>
          <section class="">
              <p> Notes: Updating Max Increases Current</p>
            </section>
        </section>
      </div>
      <div class="pure-u-1-24"></div>
      <div class="pure-u-9-24">
        <div>
            <div class="" style="height: 25px;"> select new {{reference}}</div>
        </div>
        <div>
          <div class="pure-u-18-24">
            <SelectNameAndID v-model="test" :list="listNoRepeat"/>
          </div>
          <div class="pure-u-1-24"></div>
          <div class="pure-u-5-24">
            <button v-on:click="addStat(test)"
              class="pure-button button-green full-width"
              style="height: 30px;">
              <div class="left b-font-2"> Add </div>
            </button>
          </div>
        </div>
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
			flagList: Object.keys(this.$root.world.group.stat.list),
			list: this.$root.world.group[this.reference].list,
      keyList : Object.keys(this.$root.world.group.stat.list),
      test: {},
    }
  },
  props: ['value', 'reference', 'title'],
  watch: {},
  mounted(){},
  methods:{
    addStat(stat){
      if(stat == {}) return;
      if(!stat.id) return;

      this.$set(this.value, stat.id, {name: stat.name, max: 100, current: 100});
      this.test = {};
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
    match(stat){
      stat.current = stat.max;
    },
    updateNow(){
		},
    updateID(){
    }
  },
  computed: {
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
 }


</style>
