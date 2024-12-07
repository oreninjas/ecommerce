// Button logic
const button = document.querySelector('.responsive-button');
const mobileMenu = document.querySelector('.mobile-menu');
let holder = false; // true means enabled false disabled.
button.addEventListener('click', () => {
  if (holder == false) {
    holder = true;
    mobileMenu.classList.remove('hidden');
  } else {
    holder = false;
    mobileMenu.classList.add('hidden');
  }
});

// Search logic
const searchInput = document.querySelector('.search');
const suggestionList = document.querySelector('.suggestion-list');

searchInput.addEventListener('keyup', async () => {
  suggestionList.innerHTML = '';
  const query = searchInput.value;

  if (query.length > 0) {
    try {
      const response = await fetch(`/search-suggestions?q=${query}`);
      const suggestions = await response.json();

      suggestions.forEach((suggestion) => {
        const newLi = document.createElement('li');
        newLi.textContent = suggestion.title;
        suggestionList.appendChild(newLi);
        if (newLi) {
          newLi.classList.add('cursor-pointer');
        }
        newLi.addEventListener('click', () => {
          window.location.href = `/products/${suggestion._id}`;
        });
      });
    } catch (error) {
      console.log('There was error fetching Search Queries !!! ', error);
    }
  }
});

// Add to Cart logic
const addCart = async (productId) => {
  let response = await fetch(`/products/addtocart/${productId}`, {
    method: "POST",
  });
  window.location.href = '/products';
};
