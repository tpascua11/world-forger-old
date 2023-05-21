/* eslint-disable */

<template>
  <div class="hello">
    {{ selected }}
    <div class="custom-select" :tabindex="tabindex">
      <input
        v-model="test"
        class="selected"
        :class="{ open: open }"
        @focus="open = true"
      />
      <div class="items" :class="{ selectHide: !open }">
        <div
          v-for="(option, i) of options"
          :key="i"
          @click="
            selected = option;
            open = false;
            $emit('input', option);

          "
        >
          {{ option }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: String,
      required: false,
      default: "GO",
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      /*
      selected: this.default
        ? this.default
        : this.options.length > 0
        ? this.options[0]
        : null,
			 */
      selected: "GO",
      open: false,
      test: "",
    };
  },
  mounted() {
    this.$emit("input", this.selected);
  },
  methods: {
    handleblur() {
      console.log("Handle Blur");
      this.open = false;
    },
    changeinput() {},
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.custom-select {
  position: relative;
  width: 100%;
  outline: none;
  height: 30px;
  line-height: 30px;
}

.custom-select .selected {
  position: relative;
  background-color: white;
  border-radius: 6px;
  border: 1px solid #666666;
  color: black;
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
  height: 25px;
  width: 100%;
  text-align: center;
  box-sizing: border-box;
}

.custom-select .selected:hover {
  border: 1px solid pink;
}

.custom-select .selected.open {
  border: 1px solid orange;
  /*border-radius: 6px 6px 0px 0px;*/
}

.custom-select .items {
  color: black;
  border-radius: 0px 0px 6px 6px;
  overflow: hidden;
  border-right: 1px solid #ad8225;
  border-left: 1px solid #ad8225;
  border-bottom: 1px solid #ad8225;
  position: absolute;
  background-color: white;
  left: 0;
  right: 0;
  z-index: 1;
}

.custom-select .items div {
  color: black;
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}

.custom-select .items div:hover {
  background-color: lightgrey;
  outline: 0;
}

.selectHide {
  display: none;
}

input {
  outline-style: none;
  box-shadow: none;
  border-color: red;
}
</style>
