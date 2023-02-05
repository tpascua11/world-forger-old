export class World {
  constructor() {
    this.name = "cool";

    this.area_list = {
			1 : {name: 'area1', interaction_list:{1: {test: 'hello'}}, connectedAreaList: [], triggerEventList:[], onVisitEventList:[], flagMap: {'d1': true} },
			2 : {name: 'area2', interaction_list:{1: {test: 'hello'}}, connectedAreaList: [], triggerEventList:[], onVisitEventList:[], flagMap: {'d1': false}},
			3 : {name: 'area3', interaction_list:{1: {test: 'hello'}}, connectedAreaList: [], triggerEventList:[], onVisitEventList:[], flagMap: {'d1': true} },
    };

		//this.areaList = [];
    this.worldItemList = [];
		this.statusEffectList = [];
		this.tags = ['unique', 'normal', 'monday', 'tuesday', 'wenesday', 'thursday', 'friday', 'sunday', 'extra', 'fighter', 'knight', 'druid', 'priest'];
		this.conditionList =  ['debug1', 'debug2'];
		this.flagList =  ['test', 'fire', 'cool'];

    this.flagMap =  {'debug1': true, 'debug2': false, 'debug3': true};

    this.itemList = [
			{name: 'Gold'   , description: "currency", carry_limit: 9001, scriptList:[]},
      {name: 'Silver' , description: "currency", carry_limit: 9001, scriptList:[]},
    ];
		this.itemMap = {
			'Gold'    : {name: 'Gold'   ,description: "currency", limit: 9001, scriptList:[]},
      'Silver'  : {name: 'Silver' ,description: "currency", limit: 9001, scriptList:[]},
    };


		this.startingItemList = [{name: 'Gold', total: 10}, {name: 'Silver', total: 20}];

		this.complexConditionList = [{}];
		this.complexConditionMap  = {};

    this.statMap = {'health': {}, 'mana': {}, 'stamina': {}};
    this.statList = [
      {name: 'health'},
      {name: 'mana'},
      {name: 'stamina'},
      {name: 'currency'},
      {name: 'grit'},
      {name: 'gold'},
    ]
    this.statKeyMap = {
      0: {name: 'health'},
      1: {name: 'mana'},
      2: {name: 'stamina'},
      3: {name: 'currency'}
    }

		this.timeSystem = {
			minutes: 60, hour: 24, daysInMonth: 28, month:['Spring','Summer','Fall','Winter'], year: 1000,
    };

    this.globalEventMap = {};
    this.commonEventMap = {};

    this.globalEventList = [];
    this.commonEventList = [];

    this.selectedArea = {flagMap: []};

    this.template = {
      interaction: {eventName: "", script_list: []}
    };

    this.group = {
      stat: {
        template: {name: '', amount: 0},
        list: {
          0: {name: 'health'},
          1: {name: 'mana'},
          2: {name: 'stamina'},
          3: {name: 'currency'},
          4: {name: 'experience'},
        }

      },
      area: {
        template: {name: '', script_list: [], condition_list: [], interaction_list: {}},
        list: {
          0 : {name: 'area1', interaction_list:{1: {script_list: []}}, connectedAreaList: [], triggerEventList:[], onVisitEventList:[], flagMap: {'d1': true} },
          1 : {name: 'area2', interaction_list:{1: {script_list: []}}, connectedAreaList: [], triggerEventList:[], onVisitEventList:[], flagMap: {'d1': false}},
          3 : {name: 'area3', interaction_list:{1: {script_list: []}}, connectedAreaList: [], triggerEventList:[], onVisitEventList:[], flagMap: {'d1': true} },
        }
      },
      flag: {template: {name: '', },
        list: {
          0: {name: 'Flag Example 1', state: false},
          1: {name: 'Flag Example 2', state: false},
          2: {name: 'Flag Example 3', state: false},
          3: {name: 'Flag Example 4', state: false},
          4: {name: 'Flag Example 5', state: false},

        }
      },
      complex_condition: {template: {}, list: {}},
      common_event: {template: {}, list: {}},
      global_event: {template: {}, list: {}},

      character: {
        templateInfo: {
          name           : {type: 'string'},
          stat           : {
            type: 'list_custom',
            ref: 'stat',
            restrict: [0],
            value_option: {'max': '#', 'current': '#', /*'description': 's'*/},
            sync: [['max', 'current']],
            rule_set: [
              {rule: 'FORCE_MATCH', set: ['max', 'current']},
              {rule: 'FORCE_LOWER', set: ['current', 'max']},
            ],
            default_set: {0: {max: 100, current: 100}},
            //new_set{max: 100, current: 100}
          },

          inventory: {
            type: 'list_custom',
            ref: 'item',
            value_option: {'amount': '#'},
            new_set: {'amount': 1}
          },



          on_death       : {type: 'script_list'},
          on_creation    : {type: 'script_list'},
          condition_list : {type: 'condition_list'}
        },
        list: {},
      },
      item: {
        templateInfo: {
          name           : {type: 'string'},
          description    : {type: 'string'},
          on_use         : {type: 'script_list'},
        },
        list: {},
      },
      item2: {
        template: {name: '', amount: 0, amount_max: 10000, script_list: []},
        list: {
          0: {name: 'Gold'   , description: "currency", amount_max: 9001, script_list:[]},
          1: {name: 'Silver' , description: "currency", amount_max: 9001, script_list:[]},
          2: {name: 'Copper' , description: "currency", amount_max: 9001, script_list:[]},
          3: {name: 'Spice'  , description: "currency", amount_max: 9001, script_list:[]},
        }
      },


    }

  }
}
