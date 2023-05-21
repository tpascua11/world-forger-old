<template>
  <div class="container dt-border-x2">
    <section class="">
      <div class="border-down-x3" style="height: 30px;">
        <div class="pure-u-4-24">
          <i class="ra  ra-book   ra-lg"
            style="position: relative; top: 5px; left: 2px;
            font-size: 24px;"></i>
          </div>
        <div class="pure-u-16-24 this-title left">
          {{name}}
        </div>
      </div>

      <div id="item-list" class="cool-scroll" style="height: 325px;">
        <div v-for="(value, index) in map" :key="index"
          class="border-down row clickable"
          v-bind:style="[ value == selectedItem ? styleObject : {}]"
          v-on:click="method.selectItem(value)"
        >
          <div class="pure-u-3-24 index-position left"> {{index}}.  </div>
          <div class="pure-u-1-24 text-position "> </div>
          <div class="pure-u-20-24 text-position" v-bind:class="classObject">
            {{value.name}}
          </div>
        </div>
      </div>

      <div class="border-top-x2">
        <button v-on:click="method.addNewItem(); scrollToEnd();" class="pure-button full-width">
          Add Item
        </button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ITEM_List',
  data: function(){
    return {
      itemMap: this.$root.world.itemMap,
      isActive: true,
      error: null,
      styleObject: {
        //'text-decoration': 'underline',
        'font-weight': 'bold',
        //'color': 'red',
        'background-color': 'pink',
        //fontSize: '13px'
      }
    }
  },
  props: {
    name: String,
    list: Object,
    map: Object,
    selectedItem: Object,
    selectedName: String,
    method: Object,
  },
  mounted(){

  },
  methods:{
    selectNewArea(newArea){
      console.log(newArea);
      //this.selectedItem.name = newArea.name;
      this.$parent.selectNewArea(newArea);
    },
    isSelectedWorld(area){
      return this.selectedItem == area;
    },
    addNewItem: function(){
      this.itemMap['template'] = {};
      this.selectedItem = {};

      this.$forceUpdate();
    },
    scrollToEnd: function() {
      var container = this.$el.querySelector("#item-list");
      container.scrollTop = container.scrollHeight;
    },
  },
  computed: {
    classObject: function () {
      return {
        active: this.isActive && !this.error,
        'text-danger': this.error && this.error.type === 'fatal'
      }
    },
    rworld: function(){
      return this.$root.world;
    },
    ritemMap: function(){
      return this.$root.world.itemMap;
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
  height: 20px;
  font-size: 15px;
  position:relative;
  text-align: left;
  overflow: hidden;
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


</style>
