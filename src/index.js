import { recipes } from './recipes.js';
import { getDropdownData } from './dataService.js';
import { createSearchableDropdown } from './components.js';
import { createCard } from './components.js';

const mainSearchInput = document.getElementById('search-input');
const clearBtn = document.getElementById('clear-btn');

let currentRecipes = recipes;
let selectedFilters = [];

function filterRecipes() {
   let filtered = recipes;

   // Recherche principale
   const searchQuery = mainSearchInput.value;
   if (searchQuery.length >= 3) {
      filtered = searchRecipesMultipleKeywords(searchQuery);
   }
   // Recherche dropdowns
   selectedFilters.forEach((filterValue) => {
      filtered = filtered.filter((recipe) => {
         const hasIngredient = recipe.ingredients.some((ing) => ing.ingredient.toLowerCase() === filterValue.toLowerCase());
         const hasUstensil = recipe.ustensils.some((ust) => ust.toLowerCase() === filterValue.toLowerCase());
         const hasAppliance = recipe.appliance.toLowerCase() === filterValue.toLowerCase();
         return hasIngredient || hasUstensil || hasAppliance;
      });
   });

   // Mise à jour de l'affichage
   displayRecipes(filtered);
   DisplayDropdowns(filtered);
   showFilterTags();
}

// Solution avec le mot clé "coco" mais trouve aussi "cocotte" dans la description
function searchRecipesMultipleKeywords(query) {
   const keywords = query.toLowerCase().trim().split(/\s+/);

   return recipes.filter((recipe) => {
      const searchableText = [
         recipe.name.toLowerCase(),
         recipe.description.toLowerCase(),
         ...recipe.ingredients.map((ing) => ing.ingredient.toLowerCase()),
      ].join(' ');

      return keywords.every((keyword) => searchableText.includes(keyword));
   });
}

mainSearchInput.addEventListener('input', function () {
   filterRecipes();
   clearBtn.style.display = this.value.length > 0 ? 'block' : 'none';
});

// Efface la recherche au clic sur la croix
clearBtn.addEventListener('click', function () {
   mainSearchInput.value = '';
   clearBtn.style.display = 'none';
   mainSearchInput.focus();

   displayRecipes(recipes);
   DisplayDropdowns(recipes);
});

function showFilterTags() {
   const tagsContainer = document.getElementById('active-filters');
   if (!tagsContainer) return;

   tagsContainer.innerHTML = '';

   selectedFilters.forEach((filter) => {
      const tag = document.createElement('span');
      tag.className = 'filter-tag me-2 mb-2';
      tag.innerHTML = `
         ${filter}
         <button type="button" class="btn-close btn-close-black ms-1" style="font-size: 0.7em;"></button>
      `;

      tag.querySelector('.btn-close').addEventListener('click', () => {
         selectedFilters = selectedFilters.filter((f) => f !== filter);
         filterRecipes();
      });

      tagsContainer.appendChild(tag);
   });
}

// Affichage des dropdowns
function DisplayDropdowns(recipesToDisplay) {
   console.log('recipesToDisplay:', recipesToDisplay);
   document.querySelectorAll('[data-id]').forEach((el) => {
      const type = el.dataset.type;
      const data = getDropdownData(type, recipesToDisplay);
      createSearchableDropdown(el.id, type, data);

      el.querySelectorAll('.dropdown-item').forEach((item) => {
         item.addEventListener('click', (e) => {
            e.preventDefault();
            const value = item.textContent.trim();

            if (!selectedFilters.includes(value)) {
               selectedFilters.push(value);
               filterRecipes();
            }
         });
      });
   });
}

DisplayDropdowns(recipes);

// Affichage des recettes
function displayRecipes(recipesToDisplay) {
   currentRecipes = recipesToDisplay;
   const cardContainer = document.getElementById('card-container');
   cardContainer.innerHTML = '';

   if (recipesToDisplay.length === 0) {
      cardContainer.innerHTML = `<p class="text-center text-muted">Aucune recette trouvée</p>`;
   } else {
      recipesToDisplay.forEach((recipe) => {
         createCard(recipe);
      });
   }
   // Temps de préparation
   document.getElementById('recipe-count').textContent = `${recipesToDisplay.length} recette${recipesToDisplay.length > 1 ? 's' : ''}`;
}

displayRecipes(recipes);
