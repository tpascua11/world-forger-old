<template>
  <div class="home">

    <div style="height: 30px; background-color: #f2f2f2; display: flex; justify-content: flex-start; align-items: center;">
      <!--
      <h1 @click="changeMode" style="font-size: 30px; font-weight: bold; color: #333; margin-left: 16px;">{{entityNameSelect}}</h1>
      -->
      <WorldSave />
      <WorldLoad @json-loaded="processJsonData"/>
    </div>

    <NewTableName v-if="newTableView"/>

    <Entity
      v-bind:entity="entityNameSelect"
      v-bind:title="entityNameSelect"
      v-bind:groupEntity="entityNameSelect"
      v-bind:entityMode="entityMode"
      v-if="entityTableView"/>

    <div class="fixedBottom">
      <ul>
        <li @click="test()">
          New...
        </li>
        <li v-for="navItem in seeEntityGroup" @click="selectEntityTable(navItem)">
          {{ navItem }}
        </li>
      </ul>
    </div>


  </div>
</template>

<script>
import Entity from "@/views/Entity.vue";
import WorldSave from "@/components/WorldLoadAndSave.vue";
import WorldLoad from "@/components/WorldLoad.vue";


import { useWorldStore } from "@/stores/world";
import NewTableName from "../views/NewTableName.vue";

export default {
  name: "mainview",
  watch: {},
  components: {
    NewTableName,
    Entity,
    WorldSave,
    WorldLoad,
  },
	data: function() {
    return {
      entityGroup: [],
      newTableView: true,
      entityTableView: false,
      entityNameSelect: '',
      entityMode: 'ENTITY_CONFIGURE',
      buildWorld: false,
		};
	},
  setup() {},
  methods:{
    test(){
      console.log("TEST");
      this.newTableView = true;
      this.entityTableView = false;
    },
    changeMode(){
      console.log("CHANGE MODW!");
      if(this.entityMode == 'ENTITY_CONFIGURE') this.entityMode = 'ENTITY_LIST';
      else this.entityMode = 'ENTITY_CONFIGURE';
    },
    addEntity(){},
    selectEntityTable(entityName){
			this.$root.selectedEntityTableName = entityName;
      console.log("Select Entity Table", this.$root.selectedEntityTableName);
      this.newTableView = false;
      this.entityTableView = true;
      this.entityNameSelect = entityName;
      //this.$forceUpdate();
    },
    processJsonData(jsonData) {
      // Handle the loaded jsonData here
      console.log("PROCESSING JSON!", jsonData);
    }
  },
  mounted(){
    this.entityGroup = this.$root.world.group;
		this.$root.selectedEntityTableName = '';
  },
  computed: {
    tableName(){},
		seeEntityGroup(){
			return Object.keys(this.$root.world.group);
		},
  }
};
</script>


<style scoped>
			.fixedBottom {
				position: fixed;
        bottom: 0;
				left: 0;
				width: 100%;

			}
      ul {
        list-style-type: none;
        padding: 0.2;
        margin: 0;
        display: flex;
        align-items: center;
        height: 50px;
        background-color: #f2f2f2;
        border-top: 1px solid #ccc;
				overflow-x: scroll;
      }
      li {
        margin-right: 10px;
        cursor: pointer;
        padding: 5px 10px;
        border-radius: 5px;
        background-color: #ccc;
        color: #333;
        transition: background-color 0.2s ease;
        font-size: 16px;
				font-weight: bold;
      }
      li:hover {
        background-color: #666;
        color: #fff;
      }
</style>

<style>
</style>
