<template>
  <div class="areaList card" style="width: 10rem; height: 650px">
    <div class="card-body">
      {{name}}
      <br>
      <br>

      <div style="overflow: scroll; height: 500px;">
        <table>
          <!--
          <thead>
            <tr style="height: 10px;">
              <th> <h5>{{name}}</h5> </th>
            </tr>
          </thead>
          -->
          <tbody>
            <tr v-for="item in areaList" :key="item.name">
              <div v-bind:style="[ item == selectedArea ? styleObject : {}]">
                <td
                  v-on:click="selectNewArea(item)"
                  v-bind:class="classObject"
                 >
                  {{item.name}}
                </td>
              </div>
            </tr>
          </tbody>
        </table>
      </div>
      <button v-on:click="method.addToList()" class="btn-success btn-small btn-block">
        Add Area
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AreaList',
  data: function(){
    return {
      isActive: true,
      error: null,
      styleObject: {
        'text-decoration': 'underline',
        'font-weight': 'bold',
        //color: 'red',
        //fontSize: '13px'
      }
    }
  },
  props: {
    name: String,
    areaList: Array,
    selectedArea: Object,
    method: Object,
  },
  mounted(){
    console.log("SEE THE AreaList", this.areaList);

  },
  methods:{
    selectNewArea(newArea){
      console.log(newArea);
      //this.selectedArea.name = newArea.name;
      this.$parent.selectNewArea(newArea);
    },
    isSelectedWorld(area){
      return this.selectedArea == area;
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
