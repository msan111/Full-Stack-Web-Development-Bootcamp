/* var generateName = require('sillyname'); */
import generateName from 'sillyname';
import superheroes from 'superheroes';

var sillyName = generateName();

console.log(`My silly name is ${sillyName}.`);

const superhero = superheroes.random();


console.log(`I am ${superhero}.`);