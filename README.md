# draco-forge-rpg (old name)

This is my old project attempting create game data for my simple game. Orignally for RPG games.
In this design, I was going to make something like a database-like data structure to create simple games.
For example
Group {
  Items: {
    templateInfo{name: 'string', cost: 'number', limit: 'number'},
    list: {item1, item2, item3}
  },
  Characters: {...},
  Items: {},
  Entity3: ...,
}
The reason why I created it list as a object, is because I needed something that I can dynmamically control at will
I feel using arrays, the array can move easily and that messes everything up.
I feel like using classes is too strict because I need the website to change Group/Entity templateInfo easily.
My whole website is based on reading those files and changing the properties of the templateInfo and the whole list.

What inspired me to make this, was that I was also making a phaser game.
The thing I wanted is when I make simple games is to create entities in the game faster, like items, characters, classes, and stuff.

The new project is at https://github.com/tpascua11/Entity-Master, I didn't realize for awhile that the vuejs version was old for awhile
I also needed to do a complete reorognization of code.

This is old version is usable at https://world-forger.web.app/ feel free to use it
