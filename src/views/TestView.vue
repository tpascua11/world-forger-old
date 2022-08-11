<template>
  <div class="Test">
    <p>Super Test!</p>
    <div class="pure-g">
      <div class="pure-u-1-3"><p>Thirds</p></div>
      <div class="pure-u-1-3"><p>Thirds</p></div>
      <div class="pure-u-1-3"><p>Thirds</p></div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line
import { useWorldStore } from "@/stores/world";
// eslint-disable-next-line
//useWorldStore();

export default {
  name: "TestView",
  components: {},
  mounted() {},
  setup() {
    // eslint-disable-next-line
    const trueWorld = useWorldStore();
    trueWorld.baku();
  },
};
</script>
