<template>
  <div class="Test">
    <p>Super Test!</p>
    <div class="pure-g">
      <!--
      <div class="pure-u-1-3">
        <JustList
          v-model="selectedEntity"
          v-bind:map="thisMapList"
          v-bind:title="title"
          v-bind:set_height="'450px'"
          v-bind:template="thisMap.template"
          v-bind:templateInfo="thisMap.templateInfo"
          @selected="refreshArea"
          @created="refreshInteractionList"
          v-bind:refresh="refresh"
        />
      </div>
      -->
      <div class="pure-u-1-3">
        <Select
          :options="list"
          :default="'go'"
          class="select"
          @input="test()"
        />
      </div>
      <div class="pure-u-1-3"></div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line
import { useWorldStore } from "@/stores/world";
import Select from "@/components/Select.vue";
import JustList from "@/components/JustList.vue";
import {World} from '@/data/world.js';


// eslint-disable-next-line
//useWorldStore();

export default {
  name: "TestView",
  data() {
    return {
      list: ["a", "b"],
      listb: [
        { a: 1, b: 2 },
        { a: 2, b: 4 },
      ],
    };
  },
  components: {
    Select,
  },
  methods: {
    test() {
      console.log("TEST!");
    },
  },
  mounted() {},
  setup() {
    // eslint-disable-next-line
    const trueWorld = useWorldStore();
    trueWorld.baku();
  },
};
</script>

<style scoped>
.border {
  border: 1px solid black;
}
</style>
