function createSearchableDropdown(containerId, title, items) {
    const container = document.getElementById(containerId);
    
    container.innerHTML = `
      <div class="dropdown">
        <button class="btn btn-light dropdown-toggle w-100" type="button" data-bs-toggle="dropdown">
          ${title}
        </button>
        <div class="dropdown-menu p-2" style="width: 250px; max-height: 200px; overflow-y: auto;">
          <input type="text" class="form-control mb-2 search-input" placeholder="Rechercher...">
          ${items.map(item => `<a class="dropdown-item" href="#">${item}</a>`).join('')}
        </div>
      </div>
    `;

    const searchInput = container.querySelector('.search-input');
    searchInput.addEventListener('keyup', function () {
        let filter = this.value.toLowerCase();
        let dropdownItems = container.querySelectorAll('.dropdown-item');
        
        dropdownItems.forEach(item => {
            item.style.display = item.textContent.toLowerCase().includes(filter) ? '' : 'none';
        });
    });
}

// Données
const ingredients = ["Jus de citron", "Glaçons", "Tomate", "Poulet", "Poivron rouge", "Thon en miettes", "Vinaigrette"];
const ustensiles = ["Casserole", "Poêle", "Couteau", "Cuillère en bois", "Mixeur", "Spatule"];
const appareils = ["Four", "Micro-ondes", "Plaque à induction", "Robot pâtissier", "Cafetière"];

// Création des 3 dropdowns
createSearchableDropdown("dropdownIngredients", "Ingrédients", ingredients);
createSearchableDropdown("dropdownUstensiles", "Ustensiles", ustensiles);
createSearchableDropdown("dropdownAppareils", "Appareils", appareils);