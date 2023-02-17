<template>
  <div>
    <button v-on:click="addNewRow();" class="pure-button full-width">
      Create {{value}}
    </button>
  </div>
</template>

<script>
export default {
  name: 'Creation',
  data: function(){
    return {
    }
  },
  props: ['value'],
  mounted(){
  },
  methods:{
    addNewRow(){
      //this.$emit('input', {id: 'cool'});
      this.$emit('input', 'HOT DOGS!');
    },
    createFlag(){
    }
  },
  computed: {
    keyList: function(){
      if(!this.list) return [];
      return Object.keys(this.list);
    },
    classObject: function () {
      return { active: this.isActive && !this.error, 'text-danger': this.error && this.error.type === 'fatal'}
    }
  }
}

</script>

<style scoped>



</style>
