<template>
  <section class="basedHeight">
    <div class="row"> <hr> <hr></div>
    <div class="row">
      <div class="col-2 col"> </div>
      <div class="col-8 col">
        <div class="row">
          <button v-on:click="saveScript()" class="btn-warning
            btn-small scriptSave btn-block">
            Save Script Order
          </button>
        </div>
      </div>
      <div class="col-2 col"> </div>
    </div>
    <div class="row">
      <div class="col-8 col">
        <table class="table" style="width: 100%; table-layout: fixed;">
          <thead>
            <tr>
              <th scope="col" style="width: 90%;">
                Script List
              </th>
              <th scope="col" style="width: 10%;"> Edit </th>
            </tr>
          </thead>


          <draggable v-model="selectedScriptList" tag="tbody" :move="checkMove">
            <tr v-for="(item, index) in selectedScriptList" :key="index"
          v-bind:style="[ item.isMoved ? moved : {}]"
            >
              <td v-on:click="selectAction(item)" style="cursor: move;"
                v-bind:style="[ selectedAction == item ? selected : {}]"
              >
                {{item}}
              </td>
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
      <div class="col-4 col script-match-height">
        <div class="row">
          <div class="col-12 col" v-if="(mode === 'MENU')">
            <section v-for="item in actions" :key="item.name">
              <button v-on:click="selectNewAction(item)" class="btn-success-outline btn-small
                btn-block smallfit">
                {{item.eventName}}
              </button>
            </section>

            <section>
              <MoveToArea
                v-bind:selectDescription="'Select Area To Move to'"
                v-bind:addScript="{activate: createAction}"
                v-bind:referenceList="$root.world.areaList"
              />

              <ToggleFlag
                v-bind:selectDescription="'Select Area To Move to'"
                v-bind:addScript="{activate: createAction}"
              />
            </section>

            <section>
              <button v-on:click="mode = 'ADD_ITEM'" class="btn-success-outline btn-small btn-block smallfit">
                Add Item
              </button>
            </section>

          </div>

          <div class="col-12 col" v-else-if="mode == 'ADD_ITEM'">
            <AddItem
              v-bind:addScript="{activate: forgeAction}"
            />
          </div>

          <div class="col-12 col" v-else>
            <table class="table" style="width: 100%;">
              <thead>
                <th style="width: 5%;"> id </th>
                <th colspan=2 style="width: 95%;">
                  {{selectedActionName}}
                </th>
              </thead>
              <tbody>
                <tr v-for="(item, propertyName, index) in selectedAction"
                  :key="propertyName">
                  <td v-if="propertyName != 'description'">
                    {{index}}
                  </td>
                  <td v-if="propertyName != 'description'" style="width: 40%;">
                    {{propertyName}}
                  </td>

                  <td colspan=3 class="description" v-if="propertyName == 'description'">
                    <textarea class="descriptionTextArea" rows="4" type="string" v-model="item.value" placeholder="...">
                    </textarea>
                  </td>
                  <td v-else-if="item.type == 'string' && propertyName != 'eventName'" style="width: 60%;"> 
                    <input class="smallInput" type="string" v-model="item.value" placeholder="...">
                  </td>

                  <td v-else-if="item.type == 'number'" style="width: 60%;">
                    <input class="smallInput" type="number" v-model="item.value" placeholder="...">
                  </td>
                  <td v-else-if="item.type == 'boolean'" style="width: 60%;">
                    BOOLEAN {{item.value}}
                  </td>
                  <td v-else-if="propertyName === 'eventName'">
                    {{item.value}}
                  </td>
                </tr>
                <tr>
                  <td colspan=1>
                    <button v-on:click="cancel()" class="btn-danger-outline btn-small btn-block">
                      X
                    </button>
                  </td>
                  <td colspan=2>
                    <button v-on:click="makeAction()" class="btn-success-outline btn-small btn-block">
                      Make Action
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>


  </section>
</template>


