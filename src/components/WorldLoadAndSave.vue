<template>
  <div style="margin-left: 10px;">
    <!--<input type="text" id="nameInput" v-model="name">-->
      <button @click="downloadJson()" class="btn-success btn-small btn-block">
        Save World
      </button>
      <button @click="saveLocalStorage()" class="btn-success btn-small btn-block">
        Local Storage Save
      </button>
      <button @click="downloadJson()" class="btn-success btn-small btn-block">
        Reset
      </button>
  </div>
</template>

<script>
export default {
  name: 'LoadAndSave',
  data: function(){
    return {}
  },
  props: {
    world: Object,
  },
  mounted(){
    console.log("SEE THE AreaList", this.areaList);
  },
  methods:{
    downloadJson() {
      if(!this.name) this.name = 'World';
      const jsonDataString = JSON.stringify(this.$root.world);
      const blob = new Blob([jsonDataString], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = this.name;
      link.click();
    },
    saveLocalStorage() {
      if(!this.name) this.name = 'World';
			const serializedObject = JSON.stringify(this.$root.world);
      localStorage.setItem(this.name, serializedObject);
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        console.log("KEY", key);
        const value = localStorage.getItem(key);
        //console.log(`${key}: ${value}`);
      }
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
