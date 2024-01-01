<template>
  <div>
  <div class="container dt-border">
    Non-Deletable List <input type="checkbox" v-model="newStructureInfo.nonDeletableList" />
  </div>
  <div class="container dt-border">
    <!-- Headers -->
    <div class="pure-g title">
      <div class="pure-u-3-24">
      </div>
      <div class="pure-u-4-24" >
        Name
      </div>
      <div class="pure-u-3-24" >
        Type
      </div>
      <div class="pure-u-5-24" >
        Link Reference To
      </div>
      <div class="pure-u-3-24" >
        List Type
      </div>
      <div class="pure-u-6-24" >
        <!-- Reference Focus -->
        Test
      </div>
      <div class="pure-u-2-24" @click="buildEntity()">
        <!--
        <button class="attribute__button" @click="setKeyPosition()">
          Reposition
        </button>
        -->
      </div>
    </div>
    <div class="dt-border"></div>
    <!-- Body -->
    <div class="body">
      <br>
      <!--
      <div v-for="(value, key) in attributes" :key="key">
        -->
        <div v-for="(key, index) in newStructureInfo.orderList" :key="index">
      <div v-if="attributes[key].name != 'name'" class="pure-g arow" style="z-index=2;
        margin-bottom: 5px;"> <!-- Base -->

        <div class="pure-u-3-24">
          <button @click="shiftUp(newStructureInfo.orderList, index)">Up</button>
          <button @click="shiftDown(newStructureInfo.orderList, index)">Down</button>
        </div>
        <div class="pure-u-4-24" >
          <div class="center-container" @click="selectProperty(key, attributes)">
            <!--
            <button class="attribute__button" @click="selectProperty(key, attributes)">
              {{value.name}}
            </button>
            -->
            {{attributes[key].name}}
          </div>
          <!-- <input class="attribute__input" type="string" v-model="value.name" />
          <div style="font-size:18px;  padding-top: 10px;">{{value.name}}</div>

          -->
        </div>
        <div class="pure-u-3-24" >
          <VueMultiselect
            v-model="attributes[key].dataType"
            :options="dataTypeOption"
            @select="forceRebuildEntity()"
            :show-labels="false"
            placeholder="..."
          >
          </VueMultiselect>
        </div>
        <div class="pure-u-5-24" >
          <VueMultiselect
            v-model="attributes[key].referenceTo"
            :options="referenceGroup"
            @select="cleanReferencesAndRebuildEntity()"
            :show-labels="false"
            :multiple="false"
            placeholder="..."
          >
          </VueMultiselect>
        </div>

        <div class="pure-u-3-24" v-if="attributes[key].referenceTo">
            <VueMultiselect
              v-model="attributes[key].isList"
              :options="listOption"
              :show-labels="false"
              placeholder="..."
              @select="forceRebuildEntity()"
            >
            </VueMultiselect>
        </div>
        <div class="pure-u-6-24" v-if="attributes[key].isList && attributes[key].isList != 'ALL'">
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
          <div v-if="attributes[key].isList == 'all'">
          </div>
          <div v-else>
            <!--
          <VueMultiselect v-model="value.referenceList"
            :multiple="true"
            track-by="name"
            label="name"
            placeholder="Select one"
            :options="newEntityReference(value.referenceTo)"
            :searchable="false" :allow-empty="false">
            <template slot="singleLabel" slot-scope="{ option }"><strong>{{ option.name }}</strong> is written in<strong>  {{ option.language }}</strong></template>
          </VueMultiselect>
          -->
          </div>
        </div>

      </div>
    </div>

    <GDialog v-model="dialogState" max-width="250">
      <div class="d-wrapper">
        <div class="d-content">
          <p>Original name: {{selectedPropertyName}}</p>
          <label for="new-name">New name:</label>
          <input id="new-name" type="text" v-model="rename">
          <button @click="renameProperty()">Change Property Name</button>
        </div>
      </div>
    </GDialog>

    <GDialog v-model="dialogPosition">
      <div class="wrapper">
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
    <div class="row-build">
      <div style="display: flex; align-items: center;">
        <input class="attribute__input"
          style="height: 20px; width: 200px;
          margin-right: 10px;
          "
          type="text" v-model="newAttribute" />

        <button class="attribute__button" @click="addAttribute()">Add new Attribute </button>
      </div>
      <div>
        <button class="rebuild-button" @click="buildEntity()"> Rebuild List </button>
      </div>
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


  </div>

</div>

<div>
</div>
<div class="centered-div">
  <button class="delete-table-button" @click="deleteTable()"> Delete Table </button>
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
  watch: {
    entityName(newE, oldE) {
      if(newE != oldE){
        console.log("-----------------");
        console.log("New Table Set", this.entityName);
        console.log("-----------------");
        console.log("ATTRIBUTES", this.attributes);
        this.resetInfo();
      }
    },
    /*
    attributes: {
      handler() {
        // When the originalObject is modified, set the 'changed' flag to true
        //this.originalObject.changed = true;
        if(this.enableWatch){
          this.changed = true;
        }
      },
      deep: true, // Watch for changes within nested objects and arrays
    },
     */
  },
  data() {
    return {
      character: {},
      changed: false,
      enableWatch: false,
      attributes: {name: {name: 'name', dataType: 'string', dataFormat: 'string'}},
      oldAttributes: {},
      setup: {dataType: 'list', referenceTo: '', dataFormat: 'current_and_max',
        isList: false, data: [], referenceList: []},
      newAttribute: '',
      entityListExample: ['hp', 'mp', 'tp', 'str'],
      listOfEntity: ['stat', 'item', 'character'],
      dataTypeOption: [
        'number', 'string','current_and_max',
        'boolean', 'script_list', 'resource',
        'table', 'table_list'
        ],
      listOption: ['all', 'multiselectable'],
      dataFormatOption: ['default', 'current_and_max'],
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
      newStructureInfo: {
        fixedRow: false,
        nonDeletableList: false,
        orderList: [],
      },
      oldTemplateInfo: {},
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
      this.setNewOrderList();
      this.buildEntity();
    },
    newEntityReference(name){
      return this.objectListToList(this.$root.world.group[name].list);
    },
    buildEntity(){
      this.oldAttributes = JSON.parse(JSON.stringify(this.attributes));
      //console.log(this.oldAttributes == this.attributes);


      let newTemplateInfo = {};
      //TODO: Merge BuildInfo into Template Info
      //------------------------------------------------
      Object.keys(this.attributes).forEach(key => {
        this.attributes[key].type = this.attributes[key].dataType;
        this.attributes[key].ref = this.attributes[key].referenceTo;
        this.attributes[key].value_option =
          this.attributes[key].dataType ==
          'current_and_max' ? {'max': '#', 'current': '#'} : null;
      });
      console.log("NEW ATTRIBUTES AP", JSON.stringify(this.attributes));

      //TODO:-------------------------------------------
      /*
      Object.keys(this.attributes).forEach(key => {
        let tmp = this.attributes[key];
        newTemplateInfo[key] = {
          type: tmp.dataType || '',
          ref: tmp.referenceTo || '',
          value_option: tmp.dataType == 'current_and_max' ? {'max': '#', 'current': '#'} : null,
          isList: tmp.isList,
          referenceList: tmp.referenceList,
        };
      });
      this.$root.world.group[this.entityName].buildInfo = this.attributes;
       */
      this.$root.world.group[this.entityName].templateInfo = this.attributes;
      this.$root.world.group[this.entityName].structureInfo = this.newStructureInfo;
      //Template Info is what type of data rows are
      //Structure Info is the rules of what it can be

      this.rebuildEntityList();

      console.log("TEMPLATE ", JSON.stringify(newTemplateInfo));
      console.log("BUILD INFO ", JSON.stringify(this.attributes));
      //this.oldAttributes = JSON.parse(JSON.stringify(this.attributes));
      //this.oldTemplateInfo = this.attributes;

    },
    forceRebuildEntity(){
      this.buildEntity();
    },
    cleanReferencesAndRebuildEntity(){
      let attributeList = this.$root.world.group[this.entityName].templateInfo;
      let entityList    = this.$root.world.group[this.entityName].list;

      Object.keys(entityList).forEach(row => {
        console.log("ROW NUMBER", row);
        console.log("ROW", entityList[row]);

        Object.keys(attributeList).forEach(attribute => {
          console.log("Attribute", attribute);
          console.log("Attribute Property", attributeList[attribute]);
          let attributeInfo = attributeList[attribute];
          if(attributeInfo.type == 'table_list'){
            entityList[row][attribute] = [];
          }
        });
      });

      this.buildEntity();
    },
    rebuildEntityList(){
      let attributeList = this.$root.world.group[this.entityName].templateInfo;
      let entityList    = this.$root.world.group[this.entityName].list;
      let newEntityList = {};
      console.log("ENTITY LIST", entityList);
      console.log("Attribute List", attributeList);


      Object.keys(entityList).forEach(row => {
        console.log("ROW NUMBER", row);
        console.log("ROW", entityList[row]);
        newEntityList[row] = {};


        Object.keys(attributeList).forEach(attribute => {
          console.log("Attribute", attribute);
          console.log("Attribute Property", attributeList[attribute]);
          let attributeInfo = attributeList[attribute];


          //Normal
          if(!attributeInfo.isList){
            if(entityList[row][attribute]){
              //newEntityList[row][attribute] = entityList[row][attribute];
              //TODO: IF Type Change Adapt the changes
              console.log("WHAT IS ENTITY LIST", entityList[row][attribute]);
              newEntityList[row][attribute] =
              this.reformatValue(entityList[row][attribute], attributeInfo.type);
            }
            else{
              this.reformatValue(entityList[row][attribute], attributeInfo.type);
              //newEntityList[row][attribute] = 0;
            }
          }
          //All Sub Attributes
          else if(attributeInfo.isList === 'all'){
            let referenceEntityList = this.newEntityReference(attributeInfo.referenceTo);
            //console.log("REFERENCE ENTITY LIST", referenceEntityList);
            newEntityList[row][attribute] = {};

            Object.keys(referenceEntityList).forEach(subAttribute => {
              //console.log("SUB ATTRIBUTE", subAttribute);
              //console.log("ROW 1", entityList[row]);
              //console.log("ROW 2", entityList[row][attribute]);
              //console.log("ROW 3", entityList[row][attribute][subAttribute]);
              if(this.checkExist(entityList[row][attribute][subAttribute])){
                console.log("EXIST!");
                //TODO: IF Type Change Adapt the changes
                console.log('Format this value', this.reformatValue(entityList[row][attribute][subAttribute],
                  attributeInfo.type));

                newEntityList[row][attribute][subAttribute] =
                  this.reformatValue(entityList[row][attribute][subAttribute], attributeInfo.type);
              }
              else{
                console.log("CREATE NEW");
                newEntityList[row][attribute][subAttribute] = 2;
              }
            });
          }
          // Selectable Sub Attributes
          else if(attributeInfo.isList === 'multiselectable'){
            if(!Array.isArray(entityList[row][attribute])){
              newEntityList[row][attribute] = [];
            }
            else{
              newEntityList[row][attribute] = entityList[row][attribute];
            }
          }
        });

      });
      //UPDATE NEW ENTITY LIST
      console.log("NEW ENTITY LIST", newEntityList);
      //this.$root.world.group[this.entityName].list = newEntityList;
      this.$emit('updateEntityList', newEntityList);
      //UPDATE NEW ORDER LIST
      //this.setNewOrderList();
    },
    checkExist(value){
      if (value !== undefined && value !== null) {
        return true;
      } else {
        return false;
      }
    },
    rebuildEntityList2(){
      let setup = this.$root.world.group[this.entityName].templateInfo;
      let refList = this.$root.world.group[this.entityName].templateInfo;
      console.log("-=-=-=-=" , JSON.stringify(setup));

      let list = this.$root.world.group[this.entityName].list;
      let newList = {};
      //console.log("Reference LIST", this.$root.world.group[this.referenceTo].templateInfo);

      //console.log("ALL LIST", allList);

      //console.log("ALL LIST", allList);
      //console.log("SEE SETUP!", setup)

      //let allList;
      if(setup.isList === 'all'){
        console.log("SETUP REFERENCE TO", setup.referenceTo);
      }

      Object.keys(list).forEach(key => {
        console.log("KEY 1", key);
        if(!newList[key]) newList[key] = {};

        for (let property in setup) {
          let flist = setup[property].referenceList;
          let alistref = setup[property].referenceTo;
          console.log("referenceTo", JSON.stringify(alistref));
          console.log("CHECK FLIST", JSON.stringify(flist));

          if(setup[property].isList == 'all'){
            /*
            if(allList){
              newList[key][property] = {};
              Object.keys(allList).forEach(key2 => {
                let rename = allList[key2].name;
                if(!list[key][property]) list[key][property] = {};
                if(list[key][property][rename]){
                  newList[key][property][rename] = list[key][property][rename];
                }
                newList[key][property][rename] = this.reformatEntity(list[key][property][rename], property);
              });
            }
             */
            let allList = this.newEntityReference(setup[property].referenceTo);
            console.log("ALL LIST CHECK!", allList);
            if(allList){
              allList.forEach(function(row){
                console.log("ROW", row);
                let rename = row.name;
                console.log("name", rename);
                console.log("key", key);
                console.log("property", property);
                /*
                console.log("full", list[key][property]);
                //newList[key][property] = {};
                if(!list[key][property][name]){
                  console.log("NEW PROPERTY SET!!");
                  newList[key][property][name] = 0;
                }
                else{
                  console.log("OLD!!");
                  newList[key][property][rename] = this.reformatEntity(list[key][property][rename], property);
                }
                */
              });

            }
            console.log("cooler new list", newList);
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
    reformatValue(value, fixProp){
      console.log("VALUE", value);
      console.log("Fix Prop", fixProp);
      let varType = typeof value;
      let newValue;

      if(fixProp == 'string' && varType != 'string'){
        newValue = '';
      }
      else if(fixProp == 'number' && varType != 'number'){
        newValue = 0;
      }
      else if(fixProp == 'script_list' && !Array.isArray(value)){
        newValue = [];
      }
      else if(fixProp == 'table_list'){
        if(!Array.isArray(value)) newValue = [];
        else if (value == 0) return [];
        else newValue = value;
      }
      else if(fixProp == 'current_and_max' && varType != 'object'){
        newValue = {current: 0, max: 0};
      }
      else{
        newValue = value;
      }

      return newValue;
    },

    reformatEntity(entity, key){
      let setup = this.$root.world.group[this.entityName].templateInfo;
      console.log("REFORTMAT 1");
      let varType = typeof entity;
      let newEntity;
      console.log("REFORTMAT 2");
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
      else if(fixProp == 'current_and_max' && varType != 'object'){
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
      if(this.rename === this.selectedPropertyName){
        alert("Can't Rename");
        return;
      }
      console.log("OLD", this.selectedPropertyName);
      console.log("NEW", this.rename);
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


      let newArray = this.newStructureInfo.orderList.map(item => (item ===
        this.selectedPropertyName? this.rename: item));

      this.newStructureInfo.orderList = newArray;
      this.dialogState = false;

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
      this.changed = false;
    },

    resetInfo(){
      let tmp = this.$root.world.group[this.entityName];
      console.log("TEMP", tmp);
      console.log("TEMP", JSON.stringify(tmp.templateInfo));
      console.log("TEMP", JSON.stringify(tmp.buildInfo));
      /*
      if(tmp.buildInfo){
        this.attributes = tmp.buildInfo;
        this.enableWatch = true;
        this.changed = false;
      }
       */
      if(tmp.templateInfo){
        this.attributes = tmp.templateInfo;
        this.enableWatch = true;
        this.changed = false;
      }
      if(tmp.structureInfo){
        this.newStructureInfo = tmp.structureInfo;
      }

      //this.oldAttributes = JSON.parse(JSON.stringify(this.attributes));
      //console.log(this.oldAttributes == this.attributes);
    },
    resetInfo2(){
      let tmp = this.$root.world.group[this.entityName];
      console.log("TMP!", JSON.stringify(tmp));
      if(tmp.buildInfo){
        this.attributes = tmp.buildInfo;
        this.enableWatch = true;
        this.changed = false;
      } else {
        tmp.buildInfo =
        this.attributes = {name: {name: 'name', dataType: 'string', dataFormat: 'string'}};
      }
    },
    deleteTable(){
      if(!confirm("Delete Table?")) return;
      this.attributes = {name: {name: 'name', dataType: 'string', dataFormat: 'string'}};
      delete this.$root.world.group[this.entityName];
      this.$emit("newTable");
    },

    //------------------------------------------------------------------------------
    //TODO: Move To Better Location 
    //------------------------------------------------------------------------------
    setNewOrderList(){
      //if(!this.newStructureInfo.orderList) this.newStructureInfo.orderList = [];
      const newProperties = Object.keys(this.attributes).filter(prop => !this.newStructureInfo.orderList.includes(prop));
      this.newStructureInfo.orderList = this.newStructureInfo.orderList.concat(newProperties);
      console.log("NEW ORDER LIST", this.newStructureInfo.orderList);
    },
    shiftUp(list, index) {
      if (index > 0) {
        // Swap the positions of the current property and the one above it
        [list[index], list[index - 1]] = [list[index - 1], list[index]];
      }
    },
    shiftDown(list, index) {
      if (index < list.length - 1) {
        // Swap the positions of the current property and the one below it
        [list[index], list[index + 1]] = [list[index + 1], list[index]];
      }
    },
    shiftPropertyDown(obj, key) {
      const keys = Object.keys(obj);
      const index = keys.indexOf(key);

      if (index < keys.length - 1) {
        // Swap the current property with the one below it
        [obj[keys[index]], obj[keys[index + 1]]] = [
          obj[keys[index + 1]],
          obj[keys[index]]
        ];
      }
      //this.reorderListProperty();
      console.log("OBJ", JSON.stringify(obj));
    },
    shiftPropertyUp(obj, key) {
      const keys = Object.keys(obj);
      const index = keys.indexOf(key);

      if (index > 0) {
        // Swap the current property with the one above it
        [obj[keys[index]], obj[keys[index - 1]]] = [
          obj[keys[index - 1]],
          obj[keys[index]]
        ];
      }
      //this.reorderListProperty();
    },

    reorderProperties(row) {
      const orderedRow = {};
      Object.keys(this.attributes).forEach(property => {
        orderedRow[property] = row[property];
      });
      return orderedRow;
    },

    reorderListProperty(){
      let entityList = this.$root.world.group[this.entityName].list;
      Object.keys(entityList).forEach(key => {
        entityList[key] = this.reorderProperties(entityList[key]);
      });
    }

  },
  mounted() {
    console.log("MOUNTED ATTIRBUTES");
    console.log("ENTITY NAME", this.entityName);
    this.resetInfo();
  },
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

.build-button{
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  margin-left: auto;
}

.build-button:hover {
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
  height: 526px;
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

.center-container {
	cursor: pointer;
  text-align: center; /* Center horizontally */
  display: flex;
  justify-content: center;
  align-items: center; /* Center vertically */
  height: 38px; /* Set a fixed height for the container if needed */
  border: 1px solid #ccc; /* Optional: Add a border for visualization */
}
.center-container:hover {
	text-decoration: none; /* Remove underline on hover if not needed */
	font-weight: bold; /* Optionally, make the text bold on hover */
	text-decoration: underline; /* Optionally, underline the word */
	color: blue;
}
.arow {
}
.arow:hover{
  background-color: #f2f2f2;
  border-color: blue;
   border: 1px solid #ccc;
 }

.row-build {
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: relative;
	top: 0px;
}

.rebuild-button{
  background-color: #FFB6C1;
  color: black;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  margin-left: auto;
}

.rebuild-button:hover {
  background-color: #FF69B4;
}

.delete-table-button{
  background-color: violet;
  color: black;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.delete-table-button:hover {
  background-color: #FF69B4;
}


.centered-div {
	text-align: center; /* Center the content horizontally */
	display: flex;
	justify-content: center; /* Center the content both horizontally and vertically */
	align-items: center;
	height: 60px; /* Set the height of the div */
}

.centered-div button {
	/* You can style the button as needed */
}



.d-wrapper {
  color: #000;
}

.d-content {
  padding: 20px;
}

.d-title {
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 20px;
}

.d-actions {
  display: flex;
  justify-content: flex-end;
  padding: 10px 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
}

</style>
