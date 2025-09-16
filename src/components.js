import { formatTime } from './utils.js';

export function createSearchableDropdown(containerId, title, items) {
   const container = document.getElementById(containerId);

   container.innerHTML = `
      <div class="dropdown d-inline-block w-100">
        <button class="btn btn-light dropdown-toggle d-flex justify-content-between align-items-center w-100 rounded-3 shadow-sm" type="button" data-bs-toggle="dropdown">
          ${title}
        </button>
        <div class="dropdown-menu p-2" style="width: 285px; max-height: 200px; overflow-y: auto;">
          <input type="text" class="form-control mb-2 search-input" placeholder="Rechercher...">
          ${items.map((item) => `<a class="dropdown-item" href="#">${item}</a>`).join('')}
        </div>
      </div>
    `;

   const searchInput = container.querySelector('.search-input');
   searchInput.addEventListener('input', function () {
      let filter = this.value.toLowerCase();
      let dropdownItems = container.querySelectorAll('.dropdown-item');

      dropdownItems.forEach((item) => {
         item.style.display = item.textContent.toLowerCase().includes(filter) ? '' : 'none';
      });
   });
}

export function createCard(recipe) {
   const cardContainer = document.querySelector('.card-container');
   const card = document.createElement('div');
   card.classList.add('col-md-4', 'mb-4');
   const time = formatTime(recipe.time);

   const ingredientsHTML = recipe.ingredients
      .map((ing) => {
         let quantity = ing.quantity ? ` ${ing.quantity}` : '';
         let unit = ing.unit ? ` ${ing.unit}` : '';
         return `
            <div class="col-6 mb-2">
               <span class="fw-medium">${ing.ingredient}</span><br />
               <small class="text-muted">${quantity}${unit}</small>
            </div>
         `;
      })
      .join('');

   card.innerHTML = `
    <div class="card recipe-card border-0 shadow-sm h-100">
      <div class="card-header-custom">
        <img
          src="./assets/${recipe.image}"
          alt="${recipe.name}"
          class="recipe-image"
        />
        <div class="time-badge">${recipe.time} min</div>
      </div>
      <div class="card-body p-4">
        <h3 class="card-title fw-bold mb-5">${recipe.name}</h3>
        <div class="mb-4">
          <h6 class="text-uppercase text-muted fw-bold mb-3" style="font-size: 0.8rem; letter-spacing: 1px">Recette</h6>
          <p class="text-muted mb-0" style="line-height: 1.6">${recipe.description}</p>
        </div>
        <div>
          <h6 class="text-uppercase text-muted fw-bold mb-3" style="font-size: 0.8rem; letter-spacing: 1px">Ingrédients</h6>
          <div class="row gy-4">
            ${recipe.ingredients
               .map(
                  (ing) => `
              <div class="col-6 mb-2">
                <span class="fw-medium">${ing.ingredient}</span><br />
                <small class="text-muted">${ing.quantity || ''} ${ing.unit || ''}</small>
              </div>
            `
               )
               .join('')}
          </div>
        </div>
      </div>
    </div>
  `;

   cardContainer.appendChild(card);
}
