<template>
<div>
  <div class="container dt-border" style="min-height: 500px;">
    <!-- Headers -->
    <div class="pure-g title">
      <div class="pure-u-4-24" >
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
      <div class="pure-u-2-24">
        <button class="attribute__button" @click="setKeyPosition()">
          Reposition
        </button>
      </div>
    </div>

    <!-- Body -->
    <div class="body">

    <div v-for="(value, key) in attributes" :key="key">
      <div v-if="value.name != 'name'" class="pure-g" style="z-index=2"> <!-- Base -->
        <div class="pure-u-4-24" >
          <button class="attribute__button" @click="selectProperty(key, attributes)">
            {{value.name}}
          </button>
          <!-- <input class="attribute__input" type="string" v-model="value.name" />
          <div style="font-size:18px;  padding-top: 10px;">{{value.name}}</div>

          -->
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
    <GDialog v-model="dialogState">
      <div>
        <p>Original name: {{selectedPropertyName}}</p>
        <label for="new-name">New name:</label>
        <input id="new-name" type="text" v-model="rename">
        <button @click="renameProperty()">Change Property Name</button>
        <p>New name: {{this.rename}}</p>
      </div>
    </GDialog>
    <GDialog v-model="dialogPosition">
      <div>
        <draggable
          v-model="keyPositionList"
          @start="drag=true"
          @end="drag=false"
          tag="div"
          item-key="index">
          <template #item="{element, index}">
            <div class="script-row" style="height:20">
              <div class="pure-u-1-24 script-row-index center"> {{index}}: </div>
              <div class="pure-u-20-24">
                <div>
                  {{element}}
                </div>
              </div>
            </div>
          </template>
        </draggable>
         <button class="attribute__button" @click="resetKeyPosition()"> Reset Key</button>
			</div>
    </GDialog>
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
  </div>
  <div>
    <!--
    <ul>
      <li v-for="(value, key) in attributes" :key="key">
        {{ key }}: {{ value }}
      </li>
    </ul>
    -->
  </div>
  <div>
    <button class="attribute__button" @click="buildEntity()">Build </button>
  </div>

  </div>
</div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  //props: ['value', 'entityName', 'entity_name'],
  props:{
    entityName: String
  },
  components: {
    draggable,
  },
  data() {
    return {
      character: {},
      attributes: {name: {name: 'name', dataType: 'string', dataFormat: 'string'}},
      setup: {dataType: 'list', referenceTo: '', dataFormat: 'currentAndMax',
        isList: false, data: [], referenceList: []},
      newAttribute: '',
      entityListExample: ['hp', 'mp', 'tp', 'str'],
      listOfEntity: ['stat', 'item', 'character'],
      dataTypeOption: [ 'number', 'string','currentAndMax'
                       ,'boolean', 'script_list'],
      listOption: ['all', 'select', 'multiselect'],
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
      dialogState: false,
      selectedProperty: {},
      selectedPropertyName: '',
      rename: '',
      dialogPosition: false,
      keyPositionList: [],

    }
  },
  methods: {
    test(){console.log("TEST")},
    newSetup(name, dataType, dataFormat, referenceTo){
      let tmp = {name: name};
      tmp.referenceTo = referenceTo ? referenceTo: '';
      tmp.dataType = dataType ? dataType : 'number';
      tmp.dataFormat = dataFormat ? dataFormat: 'default';
      tmp.data = [];
      return tmp;
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
    newEntityReference(name){
      return this.objectListToList(this.$root.world.group[name].list);
    },
    buildEntity(){
      let newTemplateInfo = {};

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

      this.$root.world.group[this.entityName].templateInfo = newTemplateInfo;
      this.$root.world.group[this.entityName].buildInfo = this.attributes;
      this.rebuildEntityList();

      console.log("BUILD INFO",
        this.$root.world.group[this.entityName].buildInfo);

    },
    rebuildEntityList(){
      let setup = this.$root.world.group[this.entityName].templateInfo;
      let refList = this.$root.world.group[this.entityName],templateInfo;

      let list = this.$root.world.group[this.entityName].list;
      let newList = {};

      Object.keys(list).forEach(key => {
        console.log("KEY 1", key);
        if(!newList[key]) newList[key] = {};

        for (let property in setup) {
          let flist = setup[property].referenceList;

          if(setup[property].isList == 'all'){
            newList[key][property] = {};
            if(flist){
              Object.keys(flist).forEach(key2 => {
                let rename = flist[key2].name;
                if(!list[key][property]) list[key][property] = {};
                if(list[key][property][rename]){
                  newList[key][property][rename] = list[key][property][rename];
                }
                newList[key][property][rename] = this.reformatEntity(list[key][property][rename], property);
              });
            }
          }

          else if(setup[property].isList == 'select'){
            if(flist){
            newList[key][property] = {};
            Object.keys(flist).some(key2 => {
              let rename = flist[key2].name;
              if(list[key][property][rename]){
                newList[key][property][rename] = list[key][property][rename];
                return true;
              }
            });
            }
          }

          else if(setup[property].isList == 'multiselect'){
            if(flist){
            newList[key][property] = {};
            newList[key][property] = {};
            Object.keys(flist).forEach(key2 => {
              let rename = flist[key2].name;
              if(list[key][property][rename]){
                newList[key][property][rename] = list[key][property][rename];
              }
            });
            }

          }

          else{
            newList[key][property] = this.reformatEntity(list[key][[property]], property);
          }
        }
      });
      this.$root.world.group[this.entityName].list = newList;
    },
    reformatEntity(entity, key){
      let setup = this.$root.world.group[this.entityName].templateInfo;
      let varType = typeof entity;
      let newEntity;
      let fixProp = setup[key].type;

      if(fixProp == 'string' && varType != 'string'){
        newEntity = '';
      }
      else if(fixProp == 'number' && varType != 'number'){
        newEntity = 0;
      }
      else if(fixProp == 'script_list' && !Array.isArray(entity)){
        newEntity = [];
      }
      else if(fixProp == 'currentAndMax' && varType != 'object'){
        newEntity = {current: 0, max: 0};
      }
      else{
        newEntity = entity;
      }

      return newEntity;
    },

    //----- Position Changer -----
    selectProperty(name, property){
      this.dialogState = true;
      this.selectedProperty = property;
      this.selectedPropertyName = name;
      this.rename = '';
    },
    renameProperty(){
      let list = this.$root.world.group[this.entityName].list;
      let newList = {};

      Object.keys(list).forEach(key => {
          list[key][this.rename] =
          list[key][this.selectedPropertyName];
          delete list[key][this.selectedPropertyName];
      });

      let setup = this.$root.world.group[this.entityName].templateInfo;

      setup[this.rename] = setup[this.selectedPropertyName];
      this.attributes[this.rename] = this.attributes[this.selectedPropertyName];
      this.attributes[this.rename].name = this.rename;

      delete setup[this.selectedPropertyName];
      delete this.attributes[this.selectedPropertyName];

    },
    setKeyPosition(){
      this.dialogPosition = true;
      this.keyPositionList = Object.keys(this.attributes);
    },
    resetKeyPosition(){
      let newAttributes = {};
      this.keyPositionList.forEach(function(key){
        newAttributes[key] = this.attributes[key];
      }, this);
      this.attributes = newAttributes;
    },
  },
  mounted() {
    console.log("ENTITY NAME", this.entityName)
    let tmp = this.$root.world.group[this.entityName];
    console.log("TEMP", tmp);
    if(tmp.buildInfo){
      this.attributes = tmp.buildInfo;
    }
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
