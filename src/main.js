import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import "../src/assets/css/styles.scss";

import VueSingleSelect from "vue-single-select";

import SelectNameAndID from '@/components/inputTemplate/selectNameAndID.vue'
import SelectSpecific  from '@/components/inputTemplate/selectSpecific.vue'
//import Multiselect from 'vue-multiselect'
import VueMultiselect from 'vue-multiselect'


const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.mount("#app");
app.component("vue-single-select", VueSingleSelect);
app.component("SelectNameAndID", SelectNameAndID);
app.component("SelectSpecific", SelectSpecific);
app.component('VueMultiselect', VueMultiselect);

app.mixin({
  methods: {
    objectListToList: function (list) {
      let newList = [];
      console.log("This List", list);
      if(!list) return;

      Object.keys(list).forEach(function(row){
        let newRow = {id: row};
        Object.assign(newRow, list[row]);
        newList.push(newRow);
      }, this);

      return newList;
    },
    nameCap: function (name){
      return name.charAt(0).toUpperCase() + name.slice(1);
    },
    nameVarCap: function (name){
      let fix = Object.keys({name})[0];
      return fix.charAt(0).toUpperCase() + fix.slice(1);
    },
    globalHelper: function () {
      alert("Hello world")
    },
  },
});

// eslint-disable-next-line
//
