<template>
  <section class="basedHeight">
    <div class="row">
      <div class="col-6 col rightside">
        <div class="row">
          <table class="table">
            <thead>
             <tr>
                <th scope="col" style="width: 90%;"> Script List</th>
                <th scope="col" style="width: 10%;"> Edit </th>
              </tr>
            </thead>
            <draggable v-model="currentInteraction.scriptList" tag="tbody">
              <tr v-for="(item, index) in currentInteraction.scriptList" :key="index">
                <td>{{item}}</td>
                <td>
                  <button v-on:click="removeAction(index)" class="btn-danger
                    btn-small smalltext">
                    x
                  </button>
                </td>
              </tr>
            </draggable>

          </table>
        </div>
      </div>
      <div class="col-6 col leftside">
        <ActionBuilder />
      </div>

    </div>
  </section>
</template>

<script>
import ActionBuilder from '@/components/ActionBuilder.vue'
import draggable from 'vuedraggable'


export default {
  name: 'InteractionBuilder',
  data: function(){
    return {
      isActive: true,
      error: null,
      styleObject: {
        color: 'red',
        fontSize: '13px'
      },
      action: {},
      selectedActionName: '',
      selectedAction: {},
      person: {
        firstName: 'Bo',
        lastName: 'Andersen',
        age: 27
      },
      templateActionList: [],
    }
  },
  components: {
    ActionBuilder,
    draggable,
  },
  props: {
    name: String,
    currentInteraction: Object,
  },
  mounted(){
  },
  methods:{
    selectNewAction(action){
      console.log(action);
    },
    insertNewAction(action){
      if(!this.currentInteraction) return;
      if(!this.currentInteraction.scriptList) return;

      this.currentInteraction.scriptList.push(action);
    },
    insertNewInteraction(interaction){
      this.$parent.addInteraction(interaction);
    },
    removeAction(index){
      console.log(index);
      this.currentInteraction.scriptList.splice(index, 1);
    }
  },
  computed: {
    classObject: function () {
      return {
        active: this.isActive && !this.error,
        'text-danger': this.error && this.error.type === 'fatal'
      }
    },
  }
}
</script>

<style scoped>
.creator{
  border: 1px solid black;
  background-color: #E8E8E8;
}
.smallInput{
  height: 14px;
  font-size: 18px;
  border: 0;
  background-color: #E8E8E8;
}
.smallX{
  font-size: 25px;
}
.smalltext{
  font-size: 15px;
  height: 25px;
  padding:0.1em
}

.rightside{
  /*background-color: lightgrey;*/
}
.leftside{
  margin-top: -20px;
  /*background-color: grey;*/
}

.basedHeight{
  height:77vh;
}

.bitright{
  margin-left: 20px;
}
.bigInput{
  height: 40px;
  font-size: 22px;
  border: 0;
  background-color: #E8E8E8;
}

table {
  /* border: 1px solid black; */
  /*  border: none; */
  border: 1px solid black;
}
tr {
  padding: 50px;
}
tr {
}
td{
  font-size:12px;
}
th {
  font-size: 14px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
p {
  font-size: 15px;
}



</style>
