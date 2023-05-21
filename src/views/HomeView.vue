<template>
  <div class="home">
    <div class="container">
      <div class="center">
        {{tableName}}
      <img src="" alt="Your Image" class="image">
      <input type="text" v-model="inputText" placeholder="New Enttiy" class="input-field">
      <button @click="addEntity()" class="confirm-button">Confirm</button>
    </div>
  </div>
  </div>
</template>

<script>
import Select from "@/components/Select.vue";
import { useWorldStore } from "@/stores/world";

export default {
  name: "HomeView",
  watch: {
    'gold': function(newVal, oldVal) {
      // Call your function here, passing in the new value
      //this.doSomethingWithValue(newVal);
      console.log("ROOT VALUE CHANGE!");
    }
  },
  components: {
    Select,
  },
	data: function() {
    return {
      inputText: '',
      gold: ''
		};
	},
  setup() {
    // eslint-disable-next-line
    const trueWorld = useWorldStore();
    trueWorld.baku();
  },
  methods:{
    addEntity(){
      console.log(this.$root.world.group);
      if(!this.$root.world.group[this.inputText]){
        console.log("NEW GROUP", this.inputText);
        this.$root.world.group[this.inputText] = {
          template: {},
          list: {}
        }
      } else window.alert("DUPLICATE!");
    },
  },
  mounted(){
    this.gold = this.$root.selectedEntityTableName;
  },
  computed: {
    tableName(){
      return this.$root.selectedEntityTableName;
    }
  }
};
</script>


<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.image {
  width: 100px;
  height: 100px;
}
.input-field {
  padding: 10px;
  margin-top: 20px;
}
.confirm-button {
  padding: 10px 20px;
  margin-top: 20px;
  background-color: #2196F3;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.confirm-button:hover {
  background-color: #0c7cd5;
}

</style>

<style>
</style>
