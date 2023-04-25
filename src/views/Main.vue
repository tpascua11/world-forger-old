<template>
  <div class="home">
    <NewTableName v-if="newTableView"/>

    <Entity
      v-bind:entity="entityNameSelect"
      v-bind:title="entityNameSelect"
      v-bind:groupEntity="entityNameSelect"
      v-if="entityTableView"/>

    <div class="fixedBottom">
      <ul>
        <li v-for="navItem in seeEntityGroup" @click="selectEntityTable(navItem)">
          {{ navItem }}
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";
import Entity from "@/views/Entity.vue";
import Select from "@/components/Select.vue";


import { useWorldStore } from "@/stores/world";
import NewTableName from "../views/NewTableName.vue";

export default {
  name: "mainview",
  watch: {},
  components: {
    HelloWorld,
    Select,
    NewTableName,
    Entity,
  },
	data: function() {
    return {
      entityGroup: [],
      newTableView: true,
      entityTableView: false,
      entityNameSelect: '',
		};
	},
  setup() {},
  methods:{
    addEntity(){},
    selectEntityTable(entityName){
			this.$root.selectedEntityTableName = entityName;
      console.log("Select Entity Table", this.$root.selectedEntityTableName);
      this.newTableView = false;
      this.entityTableView = true;
      this.entityNameSelect = entityName;
      //this.$forceUpdate();
		}
  },
  mounted(){
    this.entityGroup = this.$root.world.group;
		this.$root.selectedEntityTableName = '';
  },
  computed: {
    tableName(){},
		seeEntityGroup(){
			return Object.keys(this.entityGroup);
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
