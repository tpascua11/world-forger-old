<template>
  <section v-if="value.eventName == 'choice_list'" class="good-height-r ofs">
    <div class="action-title border-down">
      <i class="ra ra-book ra-1x"> </i> Choice List
    </div>
    <div>
      <br>
        <v-select v-model="value.choiceList"
          label="id"
          :taggable="true"
          :multiple="true"
        >
        </v-select>


    </div>
    <div class="row">
      <p>
        A selection of multiple choices.
        A game can select a choice and mark that name of a flag true.
        This is used to mimic case statements.
       </p>
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
    test(){console.log("new option")},
    createChoice({value}){
      console.log("CHECK");
      this.value.choiceList.push(value);
    }
  },
  computed: {
    classObject: function () {
      return { active: this.isActive && !this.error, 'text-danger': this.error && this.error.type === 'fatal'}
    }
  }
}

</script>

<style scoped>
p {
  font-size: 15px;
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

.closer{
  position:relative;
  top: 0px;
  margin-top: -40px;
  /*margin-bottom: 10px;*/
}

.fire {
  background: #FFD580;
}

</style>
