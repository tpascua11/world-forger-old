<template>
  <section>
  </section>
</template>

<script>
export default {
  name: 'Basic',
  data: function(){
    return {
      isActive: true,
      error: null,
      styleObject: { color: 'red', fontSize: '13px' },
      referenceList: ['1', '2', '3'],
      selectedAction: {type: 'FLAG', name: ""},

      eventList: [
        {eventName: 'addDescription', description: ''},

        {eventName: 'lose'       , stat: '', name: '', number: 0}, {eventName: 'loseStat'   , name: '', stat: '', number: 0},
        {eventName: 'restore'    , stat: '', name: '', number: 0}, {eventName: 'restoreStat', name: '', stat: '', number: 0},

        {eventName: 'restoreItem', name: '', number: 0},
        {eventName: 'loseItem'   , name: '', number: 0},

        {eventName: 'toggleFlag', stat: '', number: 0},
      ]
    }
  },
  props: ['value'],
  mounted(){},
  methods:{
    test(){
      console.log("------");
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
  textarea {
    box-sizing:border-box;
    height: 100%;
  }

  .smallfit{
    height: 23px;
    display: table-cell;
    min-width: 120%;
    left: -10%;
    position: relative;
    padding:0.1em;
  }

</style>
