<template>
<div>
  <div class="container dt-border" style="min-height: 500px;">
    <!-- Headers -->
    <div class="pure-g title">
      <div class="pure-u-3-24" >
        Name
      </div>
      <div class="pure-u-3-24" >
        Type
      </div>
      <div class="pure-u-5-24" >
        Reference To
      </div>
      <div class="pure-u-3-24" >
        List
      </div>
      <div class="pure-u-6-24" >
        Reference Focus
      </div>
    </div>

    <!-- Body -->
    <div class="body">

    <div v-for="(value, key) in attributes" :key="key">
      <div class="pure-g" style="z-index=2"> <!-- Base -->
        <div class="pure-u-3-24" >
          <!-- <input class="attribute__input" type="string" v-model="value.name" />
          -->
          <div style="font-size:18px;  padding-top: 10px;">{{value.name}}</div>
        </div>
        <div class="pure-u-3-24" >
          <VueMultiselect
            :max-height="600"
            v-model="value.dataType"
            :options="dataTypeOption"
            @select="test()"
            :show-labels="false"
            placeholder="..."
          >
          </VueMultiselect>
        </div>
        <div class="pure-u-5-24" >
          <VueMultiselect
            v-model="value.referenceTo"
            :options="referenceGroup"
            @select="test()"
            :show-labels="false"
            :multiple="false"
            placeholder="..."
          >
          </VueMultiselect>
        </div>

        <div class="pure-u-3-24" v-if="value.referenceTo">
          <VueMultiselect
            v-model="value.isList"
            :options="listOption"
            :show-labels="false"
            placeholder="..."
          >
          </VueMultiselect>
        </div>

        <div class="pure-u-6-24" v-if="value.isList && value.isList != 'ALL'">
          <!--
          <VueMultiselect
            v-model="value.referenceList"
            :options="newEntityReference(value.referenceTo)"
            @select="test()"
            :show-labels="false"
            :multiple="true"
            placeholder="..."
            track-by="name"
          >
          </VueMultiselect>
          -->

          <VueMultiselect v-model="value.referenceList"
            :multiple="true"
            track-by="name"
            label="name"
            placeholder="Select one"
            :options="newEntityReference(value.referenceTo)"
            :searchable="false" :allow-empty="false">
            <template slot="singleLabel" slot-scope="{ option }"><strong>{{ option.name }}</strong> is written in<strong>  {{ option.language }}</strong></template>
          </VueMultiselect>
        </div>

      </div>
      </div>
    </div>

  <br><br>
  </div>
  <div class="container dt-border">
  <div>
    <label class="attribute__label">New Attribute:</label>
    <input class="attribute__input"
           style="height: 20px; width: 200px;"
           type="text" v-model="newAttribute" />

         <button class="attribute__button" @click="addAttribute()">Add new Attribute </button>

    <!--
    <button class="attribute__button" @click="addMaxCurrent()">string</button>
    <button class="attribute__button" @click="addMaxCurrent()">string list</button>
    <button class="attribute__button" @click="addMaxCurrent()">currentAndMax </button>
    <button class="attribute__button" @click="addMaxCurrent()">currentAndMax list</button>
    -->
  </div>
  <div>
    <ul>
      <li v-for="(value, key) in attributes" :key="key">
        {{ key }}: {{ value }}
      </li>
    </ul>
  </div>
  <div>
    <button class="attribute__button" @click="buildEntity()">Build </button>
  </div>

  </div>
</div>
</template>

<script>
export default {
  props: ['value', 'entityName', 'entity_name'],
  data() {
    return {
      character: {},
      attributes: {},
      setup: {dataType: 'list', referenceTo: '', dataFormat: 'currentAndMax',
        isList: false, data: [], referenceList: []},
      newAttribute: '',
      entityListExample: ['hp', 'mp', 'tp', 'str'],
      listOfEntity: ['stat', 'item', 'character'],
      dataTypeOption: ['number', 'string','currentAndMax', 'scriptList'],
      listOption: [true, 'ALL'],
      dataFormatOption: ['default', 'currentAndMax'],
      referenceGroup: Object.keys(this.$root.world.group),
      options: [
        { name: 'Vue.js', language: 'JavaScript' },
        { name: 'Rails', language: 'Ruby' },
        { name: 'Sinatra', language: 'Ruby' },
        { name: 'Laravel', language: 'PHP', $isDisabled: true },
        { name: 'Phoenix', language: 'Elixir' }
      ],
      dtest: null,
    }
  },
  methods: {
    newSetup(name, dataType, dataFormat, referenceTo){
      let tmp = {name: name};
      tmp.referenceTo = referenceTo ? referenceTo: '';
      tmp.dataType = dataType ? dataType : 'number';
      tmp.dataFormat = dataFormat ? dataFormat: 'default';
      tmp.data = [];
      return tmp;
    },
    test(){console.log("TEST")},
    submitForm() {
    },
    addAttribute() {
      const newName = this.newAttribute;
      if (this.newAttribute) {
        if(this.attributes[newName]){
          window.alert("it exist!");
        }
        else this.attributes[newName] = this.newSetup(newName, 'number', '', '');
      }
    },
    addMaxCurrent(){
      const newName = this.newAttribute;
      if (this.newAttribute) {
        this.attributes[newName] = this.newSetup(newName, '', 'currentAndMax',
          '');
      }
    },
    addReferenceTo(){
      if (this.newAttribute) {
        //this.attributes[this.newAttribute] = {current: 0, max: 0};
      }
    },
    addNumber(){
      if (this.newAttribute) {
        //this.attributes[this.newAttribute] = -1;
      }
    },
    addString(){
      if (this.newAttribute) {
        this.attributes[this.newAttribute] = 'string...';
      }
    },
    addData(list, newData){
      if(!list) list = [];
      list.push(newData);
    },
    newEntityReference(entityName){
      return this.objectListToList(this.$root.world.group[entityName].list);
      //return this.$root.world.group[entityName].list;
    },
    buildEntity(){
      let newTemplateInfo = {};
      //console.log("THIS ATTRIBUTES", this.attributes);

      Object.keys(this.attributes).forEach(key => {
        let tmp = this.attributes[key];
        newTemplateInfo[key] = {
          type: tmp.dataType || '',
          ref: tmp.referenceTo || '',
          value_option: tmp.dataType == 'currentAndMax' ? {'max': '#', 'current': '#'} : null,
          isList: tmp.isList,
          referenceList: tmp.referenceList,
        };
      });

      //console.log("NEW TEMPLATE INFO", JSON.stringify(newTemplateInfo));
      //console.log("VALUE", this.value);
      this.$root.world.group['item'].templateInfo = newTemplateInfo;

      this.$root.world.group['item'].buildInfo = this.attributes;
      this.rebuildEntityList();

    },
    rebuildEntityList(){
      let setup = this.$root.world.group['item'].templateInfo;
      //console.log("what is setup", JSON.stringify(setup));

      let refList = this.$root.world.group['item'],templateInfo;
      //console.log("what is refList", JSON.stringify(refList));

      let list = this.$root.world.group['item'].list;
      let newList = {};

      Object.keys(list).forEach(key => {
        //console.log("PART 1 ---", key, JSON.stringify(list[key]));
        //console.log("ref list", JSON.stringify(refList));
        //newList[key] = list[key];
        if(!newList[key]) newList[key] = {};

        for (let property in setup) {
          let flist = setup[property].referenceList;
          //console.log("NEW FIRE", JSON.stringify(flist));

          if(setup[property].isList){
            newList[key][property] = {};
            Object.keys(flist).forEach(key2 => {
              let rename = flist[key2].name;
              if(list[key][property][rename]){
                newList[key][property][rename] = list[key][property][rename];
              }
              newList[key][property][rename] = this.reformatEntity(list[key][property][rename], property);
            });
          }
          else{
            newList[key][property] = this.reformatEntity(list[key][[property]], property);
          }
        }
      });
      console.log("Modified Entity List", JSON.stringify(newList));
      this.$root.world.group['item'].list = newList;
    },
    listFormat(entityWithList, setup){
      Object.keys(entityWithList).forEach(key => {
        console.log("row", key);
        newList[key] = list[key];
        for (let property in setup) {
          newList[key][property] = this.reformatEntity(list[key][[property]], property);
        }
      });
    },
    reformatEntity(entity, key){
      console.log("ENTITY", entity);
      let setup = this.$root.world.group['item'].templateInfo;
      let varType = typeof entity;
      console.log("VARTYPE", varType);
      let newEntity;
      let fixProp = setup[key].type;

      if(fixProp == 'string' && varType != 'string'){
        console.log("STRING!");
        newEntity = '';
      }
      else if(fixProp == 'number' && varType != 'number'){
        console.log("NUMBER!");
        newEntity = 0;
      }
      else if(fixProp == 'scriptList' && !Array.isArray(entity)){
        console.log("SCRIPT LIST!");
        newEntity = [];
      }
      else if(fixProp == 'currentAndMax' && varType != 'object'){
        console.log("CURRENT AND MAX!");
        newEntity = {current: 0, max: 0};
      }
      else{
        newEntity = entity;
        console.log("...........");
      }

      return newEntity;
    }

  },
  mounted() {
    let tmp = this.$root.world.group['item'];
    if(tmp.buildInfo)  this.attributes = tmp.buildInfo;
    /*
    this.attributes.forEach(attribute => {
      this.$set(this.character, attribute, '');
    });
     */
  }
}
</script>

<style>
.attributes {
  display: flex;
  flex-direction: column;
}

.attribute {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.attribute--new {
  margin-top: 20px;
}

.attribute__label {
  display: inline-block;
  width: 120px;
  font-weight: bold;
}

.attribute__input {
  width: 50px;
}

.attribute__button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  margin-left: auto;
}

.attribute__button:hover {
  background-color: #0062cc;
}


.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.col {
  flex: 1;
  margin-right: 10px;
}

.container {
  padding: 5px; /* Add padding to move the text down and right */

}

.body {
  height: 500px;
  position: relative;
}

.title {
  margin-left: 5px; /* Add margin to move the text to the right */
  font-size:17px;
}

.fixed-down{
  position: absolute;
  left: 0;
  top: 100%;
  width: 100%;
  z-index: 1;
}

</style>
