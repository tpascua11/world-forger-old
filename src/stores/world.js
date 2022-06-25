import { defineStore } from "pinia";
import world from "@/data/world.json";

export const useWorldStore = defineStore("WorldStore", {
  state: () => ({
    world: world,
    counter: 0,
  }),

  getters: {
    hello() {
      return "taco";
    },
  },

  actions: {
    baku() {
      this.counter++;
      console.log("baku", this.counter);
    },
  },
  //Actions
  //Getters
});
