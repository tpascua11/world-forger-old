<template>
  <div class="list" style="width: 10rem; height: 650px">
    {{testArray}}

    <!--
    <li v-for="(row, index) in list" :key="index">
      DUMB
    </li>
    -->

    <li v-for="(row, index) in testArray" :key="index">
      {{row}}
    </li>

  </div>
</template>

<script>
export default {
  name: 'List',
  data: function(){
    return {
      list: [1,2,3]
    }
  },
  props: {
    testArray: Array,
  },
  mounted(){},
  methods:{},
  computed: {}
}
</script>

<style scoped>

</style>
