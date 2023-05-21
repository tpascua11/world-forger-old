<template>
  <div>
    {{value}}


        <button v-on:click="test();" class="pure-button full-width">
          Add Item
        </button>
  </div>
</template>

<script>
export default {
  props: ['value'],
  methods:{
    test: function(){
      this.$emit('input', 5);
    }
  }
}
</script>
