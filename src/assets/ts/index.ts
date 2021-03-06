/* eslint-disable import/no-unresolved */
import '../styles/style.scss';
import loadImages from './regions';
import activateValidators from './about';
import setupPokemonTeamBuilder from './pokemon-list';

window.addEventListener('load', () => {
  if (document.getElementById('navigation') != null) {
    const nav = document.getElementById('navigation');
    nav.classList.add('h-12', 'bg-gray-200', 'shadow', 'px-4');
    nav.innerHTML = `
    <nav class="h-full flex items-center justify-between">
      <h1>Pokemon Page</h1>
      <ul class="h-full flex justify-end items-center">
        <li class="pr-2"><a href="index.html">Team Builder</a></li>
        <li class="pr-2"><a href="regions.html">Regions</a></li>
        <li class="pr-2"><a href="about.html">About</a></li>
      </ul>
    </nav>`;
  }

  if (document.getElementById('pokemon-list-page') != null) {
    setupPokemonTeamBuilder();
  }

  if (document.getElementById('about-page') != null) {
    activateValidators();
  }

  if (document.getElementById('regions-page') != null) {
    loadImages();
  }
});
