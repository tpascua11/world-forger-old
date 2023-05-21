<template>
  <div class="custom-select" :tabindex="tabindex" @blur="open = false">
    <div class="selected" :class="{ open: open }" @click="open = !open">
      <section class="operator-list-text">{{ selected }}</section>
    </div>
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
        <section class="operator-drop-text">
          {{ option }}
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: String,
      required: false,
      default: null,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      selected: this.default
        ? this.default
        : this.options.length > 0
        ? this.options[0]
        : null,
      open: false,
    };
  },
  mounted() {
    //this.$emit("input", this.selected);
  },
};
</script>

<style scoped>

.custom-select {
  position: relative;
  width: 90%;
  text-align: left;
  outline: none;
  height: 40px;
  line-height: 40px;
}

.custom-select .selected {
  background-color: #ffedb7;
  border-radius: 6px;
  border: 2px solid black;
  color: black;


  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}

.custom-select .selected.open {
  border: 2px solid white;
  border-radius: 6px 6px 0px 0px;
}

.custom-select .selected:after {
  position: absolute;
  content: "";
  top: 22px;
  right: 1em;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  /*border-color: #fff transparent transparent transparent;*/
}

.custom-select .items {
  color: black;
  border-radius: 0px 0px 6px 6px;
  overflow: hidden;
  border-right: 1px solid #ad8225;
  border-left: 1px solid #ad8225;
  border-bottom: 1px solid #ad8225;
  position: absolute;
  background-color: #ffedb7;
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
  background-color: lightblue;
}

.selectHide {
  display: none;
}

.operator-list-text {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 20px;
  height: 30px;
  position: relative;
  left: -8px;
  top: -5px;
}
.operator-drop-text {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 20px;
  height: 35px;
  position: relative;
  left: -8px;
}


</style>
