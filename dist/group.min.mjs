/**
 * group@1.0.0 https://github.com/EvitcaStudio/Group
 * Compiled 1/11/2024, 9:10:57 PM UTC
 * 
 * group is licensed under a MIT styled License. See LICENSE.md for more info.
 * 
 * Copyright 2024, Evitca Studio, All Rights Reserved
 */
 var t={d:(e,o)=>{for(var r in o)t.o(o,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:o[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)},e={};t.d(e,{Z:()=>o});class o{version="1.0.0";constructor(t){Array.isArray(t)&&(this.collection=[...t])}static create(t){return new o(t)}map(t){return this.collection=this.collection.map(t),this}forEach(t){return this.collection.forEach(t),this}toArray(){return[...this.collection]}add(t){return this.collection.includes(t)||this.collection.push(t),this}remove(t){return this.collection.includes(t)&&this.collection.splice(this.collection.indexOf(t),1),this}}var r=e.Z;export{r as Group};