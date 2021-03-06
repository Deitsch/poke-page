import axios from 'axios';
// eslint-disable-next-line import/no-unresolved
import { Pokemon } from './pokemon';

const pokemonCount = 20;
const teamSize = 6;
let pokemonOffset = 0;
let myPokemonTeam = [];

function setInnerHTML(id: string, value: string = '') {
  document.getElementById(id).innerHTML = value;
}

function createPokemonListItem(pokemon: Pokemon, idPrefix: string): string {
  return `<li id="${idPrefix}-${pokemon.name}" class="my-hover">${pokemon.name}</li>`;
}

function updateTeamSizeInfo() {
  document.getElementById('pokemon-team-count').innerHTML = `${myPokemonTeam.length}/${teamSize}`;
}

function removePokemon(pokemon: Pokemon) {
  setInnerHTML('pokemon-team-warning');
  myPokemonTeam = myPokemonTeam.filter(p => p !== pokemon);
  const prefix = 'team';
  document.getElementById('pokemon-team-list').innerHTML = myPokemonTeam.map(p => createPokemonListItem(p, prefix)).join('');
  myPokemonTeam.forEach(p => document.getElementById(`${prefix}-${p.name}`).addEventListener('click', () => removePokemon(p)));
  updateTeamSizeInfo();
}

function selectPokemon(pokemon: Pokemon) {
  setInnerHTML('pokemon-team-warning');
  if (myPokemonTeam.length >= teamSize) {
    setInnerHTML('pokemon-team-warning', `Team is full. A team has at max ${teamSize} Pokemon`);
    return;
  }
  if (myPokemonTeam.includes(pokemon)) {
    setInnerHTML('pokemon-team-warning', 'Pokemon already added');
    return;
  }
  myPokemonTeam = [...myPokemonTeam, pokemon];
  const prefix = 'team';
  document.getElementById('pokemon-team-list').innerHTML = myPokemonTeam.map(p => createPokemonListItem(p, prefix)).join('');
  myPokemonTeam.forEach(p => document.getElementById(`${prefix}-${p.name}`).addEventListener('click', () => removePokemon(p)));
  updateTeamSizeInfo();
}

async function loadPokemon() {
  const limit = pokemonCount;
  const offset = pokemonOffset;
  // https://pokeapi.co
  axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`).then(response => {
    document.getElementById('pokemon-from-to').innerHTML = `${offset}-${offset + limit}`;
    const pokemon: Array<Pokemon> = response.data.results;
    let pokemonList = '';
    const prefix = 'all';
    pokemon.forEach(p => {
      pokemonList += createPokemonListItem(p, prefix);
    });
    document.getElementById('pokemon-list').innerHTML = pokemonList;
    pokemon.forEach(p => document.getElementById(`${prefix}-${p.name}`).addEventListener('click', () => selectPokemon(p)));
  });
}

function loadNextPokemon() {
  pokemonOffset += pokemonCount;
  loadPokemon();
}

function loadPreviousPokemon() {
  if (pokemonOffset === 0) { return; }
  pokemonOffset -= pokemonCount;
  loadPokemon();
}

export default function setupPokemonTeamBuilder() {
  updateTeamSizeInfo();
  loadPokemon();
  document.getElementById('pokemon-load-next').addEventListener('click', loadNextPokemon);
  document.getElementById('pokemon-load-previous').addEventListener('click', loadPreviousPokemon);
}
