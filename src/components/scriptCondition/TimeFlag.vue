<template>
  <section class="">
    <section class="modal-total-height">
      <div class="row this-title">
        Flag Condition
      </div>
      <section class="modal-body-height">
        <section class="default-thin-border" v-for="(item1, index) in value.condition_list" :key="index">
          <div v-if="true" class="row">
            <div class="list-title col col-4">
              List {{index}}
            </div>
            <div class="col col-5 smallc">
              <button
                v-if="!item1.time"
                v-on:click="additionalAnd(index)"
                class="btn-secondary btn-small smallt btn-block">
                <section class="smalltin"> Add Time </section>
              </button>
            </div>
            <div class="col col-3 smallc">
              <button v-on:click="cut(index)"
                class="btn-danger btn-small smallt btn-block">
                <section class="smalltin"> X </section>
              </button>
            </div>
          </div>
          <section style="height: 0px;"></section>
          <section>
            <div v-if="item1.time" class="closer row">
              <div class="col-12">
                <table class='' style="table-layout: fixed ; width: 900px;">
                  <thead>
                    <tr>
                      <th> Op..</th>
                      <th> Year </th>
                      <th> Months </th>
                      <th> Day </th>
                      <th> Hour </th>
                      <th> Minute </th>
                    </tr>
                    <tr>
                      <td> Greater </td>
                      <td> <input class="time-fit" type="number" v-model="item1.time.after.year" placeholder="Value"> </td>
                      <td> Month</td>
                      <td> <input class="time-fit" type="number" v-model="item1.time.after.day" placeholder="Value"> </td>
                      <td> <input class="time-fit" type="number" v-model="item1.time.after.hour" placeholder="Value"> </td>
                      <td> <input class="time-fit" type="number" v-model="item1.time.after.minute" placeholder="Value"> </td>
                    </tr>
                    <tr>
                      <td> Less </td>
                      <td>
                           <input class="time-fit" type="number" v-model="item1.time.before.year" placeholder="Value">
                      </td>
                      <td>Month</td>
                      <td> <input class="time-fit" type="number" v-model="item1.time.before.day" placeholder="Value"> </td>
                      <td> <input class="time-fit" type="number" v-model="item1.time.before.hour" placeholder="Value"> </td>
                      <td> <input class="time-fit" type="number" v-model="item1.time.before.minute" placeholder="Value"> </td>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          </section>
        </section>
        <section style="height: 100px"> </section>
      </section>

      <div class="row">
        <button v-on:click="additionalOr()" class="btn--outline
          btn-success btn-small smallx btn-block">
          <section class="smallxtext"> Or... </section>
        </button>
      </div>
    </section>
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
			console.log("CHECK! INDEX FIRE!!!", this.value.condition_list[index]);
      if(!this.value.condition_list[index].time){
        console.log("-???");
        //this.$set(this.value.condition_list[index], 'time', {after: {}, before: {}});
        this.value.condition_list[index]['time'] = {};
        this.value.condition_list[index]['time'].after  = {};
        this.value.condition_list[index]['time'].before= {};
			}
			//this.value.condition_list[index].hasItem.push({operator: ">"});
		},
    additionalOr(){
      this.value.condition_list.push({ });
    },
    additionalList(){
      this.value.condition_list.push({operator: ">"});
    },
    cut(index){
      this.$delete(this.value.condition_list[index], 'time');
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
  width: 100px;
  height: 50px;
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
  position:relative;
  top: 0px;
  margin-top: -20px;
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

</style>
