# World Forger (formerly Draco Forge)

**Note:** This project has been rebranded and revamped. The new project is now called [Entity Master](https://github.com/tpascua11/Entity-Master).

## Project Overview

The focus was on designing a database-like data structure for creating straightforward games.

### Design Concept

The design involves a database-like structure with the ability to create various game elements dynamically. For instance:

```javascript
Group {
  Items: {
    templateInfo{name: 'string', cost: 'number', limit: 'number'},
    list: {item1, item2, item3}
  },
  Characters: {...},
  Items: {...},
  Entity3: {...},
}
