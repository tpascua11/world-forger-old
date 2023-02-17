<template>
  <div class="areaList card" style="width: 11rem; height: 650px">
    <div class="card-body">
      <h5> Avaiable Areas To Connect </h5>
      <div style="overflow: scroll; height: 500px;">
        <table>
          <tbody>
            <tr v-for="(item, index) in selectedList" :key="index">
              <div v-bind:style="[ isInList(item) ? styleObject : {}]">
                <td v-bind:class="classObject"
                  v-on:click="selectArea(item)"
                >
                  {{item}}
                </td>
              </div>
            </tr>

            <tr v-for="item in filterReferenceList()" :key="item.name">
              <div v-bind:style="[ isInList(item.name) ? styleObject : {}]">
                <td
                  v-on:click="selectArea(item.name)"
                  v-bind:class="classObject"
                >
                  {{item.name}}
                </td>
              </div>
            </tr>
          </tbody>
        </table>
      </div>
     <br>
      <button v-on:click="method.addToList(selectedList); selectedList = [];"
        class="btn-default btn-small btn-block">
        {{name}}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConnectedAreaList',
  data: function(){
    return {
      isActive: true,
      error: null,
      selectedList: [],
      styleObject: {
        'text-decoration': 'underline',
        'font-weight': 'bold',
        'background-color': '#FFEBCD',
        //fontSize: '13px'
      }
    }
  },
  props: {
    name: String,
    referenceList: Array,
    connectedAreaList: Array,
    selectedArea: Object,
    method: Object,
  },
  mounted(){
    //console.log("SEE THE ConnectedAreaList", this.areaList);
  },
  methods:{
    selectArea(name){
      if(this.selectedList.includes(name)){
        this.selectedList.splice(this.selectedList.indexOf(name), 1);
      }
      else{
        this.selectedList.push(name);
      }
      console.log("selected list", this.selectedList);
      //console.log(newArea);
      //this.selectedArea.name = newArea.name;
      //this.$parent.selectNewArea(newArea);
    },
    isSelectedWorld(area){
      return this.selectedArea == area;
    },
    isInList: function(name){
      if(this.selectedList.includes(name)) return true;
      else return false;
    },
    filterReferenceList(){
      let filterList = [];

      let tlist = this.connectedAreaList;
      if(!tlist) tlist = [];
      console.log("CONNECTED LIST FILTER", tlist);

      let clist = [];
      clist = this.referenceList.filter(item => !tlist.includes(item.name));
      console.log("check in", clist);

      clist.forEach(function(row){
        if(!this.isInList(row.name)) filterList.push(row);
      }, this);

      return filterList;
    },

  },
  computed: {
    classObject: function () {
      return {
        active: this.isActive && !this.error,
        'text-danger': this.error && this.error.type === 'fatal'
      }
    }
  }
}
</script>

<style scoped>

</style>
