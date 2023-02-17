<template>
  <section v-if="(value.eventName == 'set_script_current_index_to')" class="">
    <div class="script-select-title">
      <i class="ra  ra-broadhead-arrow ra-1x"></i>
      Move Index
    </div>
    <br>
    Set Index At
    <input style="width: 96%" class="" type="number" v-model="value.index" placeholder="...">
    <br>
    <p>
      Move back and foward by index position.
      Best used with if statement conditions.
    </p>
  </section>
</template>

<script>
export default {
  name: 'Basic',
  data: function(){
    return {
    }
  },
  props: ['value'],
  mounted(){},
  methods:{
    test(){},
    toggleFlag(){
      this.value.flag = !this.value.flag;
    },
  },
  computed: {
    classObject: function () {
      return { active: this.isActive && !this.error, 'text-danger': this.error && this.error.type === 'fatal'}
    }
  }
}

</script>

<style scoped>
.v-select {
  font-size: 13px;
  width: 100%;
}

textarea {
  box-sizing:border-box;
  height: 100%;
  width: 100%;
}

.smallfit{
  height: 23px;
  display: table-cell;
  min-width: 120%;
  left: -10%;
  position: relative;
  padding:0.1em;
}

.descriptionTextArea{
  font-size: 14px;
}

.smallt{
  height: 38px;
  width: 50px;
  position:relative;
  left: -10px;
}

.smalltin{
  position:relative;
  font-weight: bold;
}

.closer{
  position:relative;
  top: 0px;
  margin-top: -40px;
  /*margin-bottom: 10px;*/
}

.closer2{
  position:relative;
  top: 0px;
  margin-top: -50px;
  /*margin-bottom: 10px;*/
}





</style>
