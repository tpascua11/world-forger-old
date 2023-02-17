<template>
  <section v-if="value.eventName == 'add_description'" class="good-height-r ofs">
      <div class="pure-u-3-3 action-title border-down">
        <i class="ra ra-book ra-1x"></i> Description
      </div>
      <div class="pure-u-3-3">
        <br>
        <textarea class="descriptionTextArea" rows="15" type="string"
          v-model="value.description" placeholder="..."
          style="width:100%;"
        >
        </textarea>
        <p> Writes a log </p>
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
    border-style: none;
    background-color: #F8F8F8;
  }
  .closer{
    position:relative;
    top: 0px;
    margin-top: -40px;
    /*margin-bottom: 10px;*/
  }

  .this-title{
    font-size: 18px;
    font-weight: bold;
  }



</style>
