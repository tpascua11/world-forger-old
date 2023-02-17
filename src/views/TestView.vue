<template>
  <div class="Test">
		<p>Super Test!</p>
		<div class="pure-g">
			<div class="pure-u-1-3">
				Test
			</div>
			<div class="pure-u-1-3">
				Test
				<VueMultiselect
					v-model="selected"
					:options="list"
				/>
			</div>
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
			selected: null,
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
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
