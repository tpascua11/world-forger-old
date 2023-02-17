<template>
  <div class="card" style="width: 11rem; height: 600px">
    <div class="card-body">
      {{name}}
      <div style="overflow: scroll; height: 500px;">
        <table>
          <tbody>
            <tr v-for="item in selectedList" :key="item.name">
              <div v-bind:style="[ isInList(item) ? styleObject : {}]">
                <td
                  v-on:click="selectArea(item)"
                  v-bind:class="classObject"
                >
                  {{item}}
                </td>
              </div>
            </tr>

            <tr v-for="(item, index) in filterReferenceList()" :key="index">
              <div v-bind:style="[ isInList(item) ? styleObject : {}]">
                <td v-bind:class="classObject"
                  v-on:click="selectArea(item)"
                >
                  {{item}}
                </td>
              </div>
            </tr>

          </tbody>
        </table>
      </div>
      <button v-on:click="removeSelectedList" class="btn-success-outline btn-small">
        Unassigned Selcted
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'List',
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
    list: Array,
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

      this.list.forEach(function(row){
        if(!this.isInList(row)) filterList.push(row);
      }, this);

      console.log("SEE THE NEW FILTER OMG", filterList);

      return filterList;
    },
    removeSelectedList(){
      let newList = [];
      newList = this.list.filter(item => !this.selectedList.includes(item));
      this.selectedList = [];

      console.log("SEE......", newList);
      this.method.changeList(newList);
    }

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
