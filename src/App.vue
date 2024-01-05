<template>
	<div>
		<nav>
		<!--
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
		<router-link to="/test">Test</router-link> |
		<router-link to="/entity">entity</router-link>
		-->
	</nav>
  <div class="fixedBottom">
		<ul>
				<li v-for="navItem in seeEntityGroup" @click="selectEntityTable(navItem)">
					{{ navItem }}
				</li>
			</ul>

		</div>
	</div>
  <router-view />
</template>

<script>
import {World} from '@/data/world.js';

export default {
	name: "top",
	data: function() {
		return {
      world: {group: {}},
			entityGroup: [],
			test2: [1,2,3],
		};
	},
	methods:{
		worldLoad(newWorld){
			console.log("SEE WORLD", newWorld);
			this.world = newWorld;
		},
		changeWorldName(name){
			this.world.name = name;
		},
		saveToLocalStorage(){
			localStorage.setItem('World', JSON.stringify(this.world));
		},
		allEntityList(){
			//let groupName = Object.keys(this.group);
			//console.log("what is group", groupName);
			//return groupName;
		},
		selectEntityTable(entityName){
			this.$root.selectedEntityTableName = entityName;
			console.log("Select Entity Table", this.$root.selectedEntityTableName);
			this.$forceUpdate();
		}
	},
	mounted() {
		let storedWorld = localStorage.getItem('World');
		console.log("lets see stored world", JSON.parse(storedWorld));
		let jsonWorld = JSON.parse(storedWorld);

		if(jsonWorld){
			//this.$root.world = this.world;
			this.world = jsonWorld;
		}

		//this.world
		this.$root.world = this.world;
		//this.$root.group = this.group;

		//console.log("CHECK", JSON.stringify(this.$root.world.group));
		this.entityGroup = this.$root.world.group;
		//console.log("GROUP", this.group);

		//this.$root.value = '';
		this.$root.selectedEntityTableName = '';
	},
	computed:{
		loadWhichWorld(){
			return new World();
		},
		seeEntityGroup(){
			return Object.keys(this.entityGroup);
		},
	}
}
</script>


<style>

nav {
  padding: 1px;
}


#app {
  font-family: "Neucha", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
	color: #2c3e50;

	/* text-align: center; */
}

@font-face {
	font-family: "Neucha";
	src: local("Neucha"),  url(./css/Neucha-Regular.ttf) format("truetype");
}




p{
  font-weight: bold;
	font-size: 13px;
	font-style: italic;
}

#nav {
  padding: 20px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.routerFont {
  font-size: 15px;
  border: none;
}
.label {
	color: white;
}
.top-bar-height{
  font-family: Neucha;
  font-size: 15px;
	height: 29px;
	padding:0.5em;
}

/* default */
.default-based-font{
	font-size: 14px;
}

.default-thin-border{
	border: 1px solid black;
}
.dt-border{
	border: 1px solid black;
}
.dt-border-x2{
	border: 2px solid black;
}

.double-border{
	border: 2px solid black;
}

.no-border{
	border-style: hidden;
	overflow: visible;
}

.borderless-gray{
	border-style: hidden;
	z-index: 10;
}

.default-title-sm1{
	font-size: 14px;
	font-weight: bold;
  text-decoration: underline;
}

.default-title-sm2{
	font-size: 20px;
	font-weight: bold;
	/*text-decoration: underline;*/
}
.script-action-title{
	font-size: 18px;
	font-weight: bold;
  text-decoration: underline;
}
.script-remove{
	font-size: 15px;
	font-weight: bold;
	font-color: red;
}
.cool-scroll{
  overflow: scroll;
}

.default-modal-total-height{
  height: 750px;
}
.default-modal-body-height{
  height: 500px;
  overflow: scroll;
}
.default-modal-bottom-height{
  height: 100px;
}

.default-modal-total-height-sm{
  height: 750px;
}
.default-modal-body-height-sm{
  height: 500px;
  overflow: scroll;
}
.default-modal-bottom-height-sm{
  height: 100px;
}

/* Based Stuff*/
.move25up{
  position: relative;
  top: 25px;
}
.move50up{
  position: relative;
  top: -50px;
}
.move75up{
  position: relative;
  top: -75px;
}
.move100up{
  position: relative;
  top: -100px;
}

.debugblue{
  background-color: lightblue;
}

.debugpink{
  background-color: pink;
}

.debugy{
  background-color: #dbd1b4;
}

.default-font{
  font-family: 'Neucha';
}

.script-select-title{
	font-size: 18px;
	font-weight: bold;
	border-color: black;
	border-bottom-style: solid;
	border-width: thin;
}

.button{
	font-family: 'Neucha';
}

.fixed{
	position: fixed;
	z-index: 4;
	background-color:white;
	width: 100%;
}

.good-height{
	height: 75vh;
}

.good-height-r{
	height: 55vh;
}

.center{
	text-align: center;
}

.right{
	text-align: right;
}
.left{
	text-align: left;
}

.bolded{
  font-weight: bold;
}

.full-width{
	width: 100%;
}

.foly-width{
	width: 80%;
}

.quater-width{
	width: 25%;
}
.width-33{
	width: 25%;
}
.half-width{
	width: 25%;
}

.clickable{
	cursor: pointer;
}

.ofs{
	/* over flow scroll */
	overflow: scroll;
}
.border-down{
	border-color: black;
	border-bottom-style: solid;
  border-width: 1px;
}
.border-down-x2{
	border-color: black;
	border-bottom-style: solid;
  border-width: 2px;
}
.border-down-x3{
	border-color: black;
	border-bottom-style: solid;
  border-width: 3px;
}
.border-top{
	border-color: black;
	border-top-style: solid;
  border-width: 1px;
}
.border-top-x2{
	border-color: black;
	border-top-style: solid;
  border-width: 2px;
}
.border-top-x3{
	border-color: black;
	border-top-style: solid;
  border-width: 3px;
}
.action-title{
	font-size: 18px;
	font-weight: bold;
}

.margin1{
	margin: 5px;
}
.margin2{
	margin: 10px;
}
.margin3{
	margin: 15px;
}

.sm-button{
	height: 20px;
	padding-top: 50px;
}
.sm-text{
	line-height: 8px;
}

.d-font-x1{
	font-size: 15px;
}
.d-font-x1-b{
	font-size: 15px;
	font-weight: bold;
}
.d-font-x2{
	font-size: 18px;
}
.d-font-x2-b{
	font-size: 18px;
	font-weight: bold;
}
.d-font-x3{
	font-size: 21px;
}
.d-font-x3-b{
	font-size: 21px;
	font-weight: bold;
}

.button-error {
	background-color: #E9967A;
}
.true-red{
	background-color: #E9967A;
}
.button-warning {
  background-color: #f2f28d;
}

.pure-g [class *="pure-u"] {
	font-family: "Neucha" !important;
}
.pure-u {
	font-family: "Neucha";
}

</style>

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

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
