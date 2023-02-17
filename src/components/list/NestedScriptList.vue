<template>
  <tr>
    <td style="min-width: 250px;">
      <draggable class="dragArea" tag="ul" :list="tasks" :group="{ name: 'g1' }">
      <li v-for="el in tasks" :key="el.name">
        <p>{{ el.name }}</p>
        <nested-draggable v-if="el.tasks" :tasks="el.tasks" />
      </li>
    </draggable>
    </td>
  </tr>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  props: {
    tasks: {
      required: true,
      type: Array
    }
  },
  components: {
    draggable
  },
  name: "nested-draggable"
};
</script>
<style scoped>
.dragArea {
  min-height: 50px;
  outline: 1px dashed;
}
</style>
