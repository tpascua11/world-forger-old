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
            {{nameFormat(mapName)}}
        </div>
      </div>

      <div v-if="false" id="item-list" class="cool-scroll" v-bind:style="{height: box_height}">
        <div v-for="(row, index) in value[mapName]" :key="index"
          class="border-down row clickable"
          v-bind:style="[ row == value ? styleObject : {}]"
          v-on:click="selectRow(row)"
        >
          <div class="pure-u-3-24 index-position left"> {{index}}.  </div>
          <div class="pure-u-1-24 text-position "> </div>
          <div class="pure-u-20-24 text-position" v-bind:class="classObject">
            {{row.name}}
          </div>
        </div>
      </div>

      <div class="border-top-x2">
        <button v-on:click="addNewRow();" class="pure-button full-width">
          Create
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
        //'color': 'red',
        //fontSize: '13px'
        'font-weight': 'bold',
        'background-color': 'pink',
      },
      selectedItem: {}
    }
  },
  props: ['value', 'mapName', 'source', 'set_height'],
  mounted(){
  },
  methods:{
    nameFormat: function(name){
      let newStr = name.replace(/_/g, " ");
      let nameX = newStr.replace(/(^\w|\s\w)/g, m => m.toUpperCase());
      return nameX;
    },
    addNewRow: function(){
      this.$emit('input', {id: 'cool'});
      /*
      console.log("test", this.list);
      this.list[0] = {};
      console.log("This Value", this.value);

      this.$root.world[this.source][this.mapName] = {};

      if(!this.value[this.mapName]) this.value[this.mapName] = {};
      let index = Object.keys(this.value[this.mapName]).length+1;
      let newEntity = {id: index};

      this.value[this.mapName][index] = newEntity;
      this.$forceUpdate();
       */

      //newEntity;
      /*
      this.list[index] = newEntity;
      //this.$emit('input', newEntity);

      //console.log(this.value);
       */
    },
    selectRow: function(row){
      console.log("APPLE", row);
      this.$emit('input', row);
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
    list: function(){
      //return this.value[this.mapName];
      console.log("test source", this.source);
      return this.$root.world[this.source][this.mapName];
    },
    ritemMap: function(){
      return this.$root.world.itemMap;
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
