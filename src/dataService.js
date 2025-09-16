import { recipes } from './recipes.js';

export function getDropdownData(type, recipesToUse = recipes) {
   let allDataDropdown;

   if (type === 'Ingrédients') {
      allDataDropdown = recipesToUse.flatMap((recipe) => recipe.ingredients.map((ing) => ing.ingredient));
   } else if (type === 'Ustensiles') {
      allDataDropdown = recipesToUse.flatMap((recipe) => recipe.ustensils);
   } else if (type === 'Appareils') {
      allDataDropdown = recipesToUse.map((recipe) => recipe.appliance);
   }

   const normalizedItems = allDataDropdown.map((item) => item.trim().toLowerCase());
   const uniqueItems = [...new Set(normalizedItems)];
   const formattedItems = uniqueItems.map((item) => item.charAt(0).toUpperCase() + item.slice(1));

   return formattedItems;
}
