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

// Product remover from basket logic
const removeProduct = async (itemId) => {
    try {
        let response = await fetch(`/products/remove/${itemId}`, {
          method: 'POST',
        });
        window.location.href = '/basket'
    } catch (error) {
        console.log('There was error while removing product from your list !! ',error);
        window.location.href = '/basket';
    }
};