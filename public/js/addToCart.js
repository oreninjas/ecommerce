// Button Logic
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

// Add to Cart Logic
// const addCartButton = document.querySelector('.add-cart');
// addCartButton.addEventListener('click', (item) => {
//     console.log(item._id);
// });
