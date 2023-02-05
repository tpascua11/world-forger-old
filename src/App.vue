<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
		<router-link to="/test">Test</router-link> |
    <router-link to="/entity">entity</router-link>
  </nav>
  <router-view />
</template>

<script>
import {World} from '@/data/world.js';

export default {
	name: "top",
	data: function() {
		return {
			world: new World(),
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
			localStorage.setItem('currentWorld', JSON.stringify(this.world));
		}
	},
	mounted() {
		/*
		let storedWorld = localStorage.getItem('currentWorld');
		console.log("lets see stored world", JSON.parse(storedWorld));
		this.world = JSON.parse(storedWorld);
		 */
		this.$root.world = this.world;
		this.$root.group = this.group;

	},
	computed:{
		loadWhichWorld(){
			return new World();
		}
	}
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 1px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
