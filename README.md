# World Forger

**Note:** This project has been rebranded and revamped. The new project is now called [Entity Master](https://github.com/tpascua11/Entity-Master).

## Project Overview

The focus was on designing a editiable data structure for creating straightforward games.

### Design Concept

The project is built on a robust database-like structure that enables users to define and organize data groups. This is couple of example of what it could be:

```javascript
Group {
  Items: {
    templateInfo{name: 'string', cost: 'number', limit: 'number'},
    list: {{name: 'Gold', cost: 1, limit: 9999}, {name: 'Potion', cost: 100, limit: 99} }
  },
  ...
}

