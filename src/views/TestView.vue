<template>
  <div class="Test">
    <p>Super Test!</p>
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
