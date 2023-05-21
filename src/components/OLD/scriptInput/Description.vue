<template>
  <section v-if="value.eventName == 'addDescription'" class="default-thin-border">
    <div class="row">
        Description
    </div>
    <div class="row">
      <div class="col col-12">
        <textarea class="descriptionTextArea" rows="4" type="string"
          v-model="value.description" placeholder="...">
        </textarea>
      </div>
    </div>
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
    test(){}
  },
  computed: {
    classObject: function () {
      return { active: this.isActive && !this.error, 'text-danger': this.error && this.error.type === 'fatal'}
    }
  }
}

</script>

<style scoped>
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

</style>
