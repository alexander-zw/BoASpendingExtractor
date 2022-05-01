function waitForElm(selector) {
  return new Promise(resolve => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelectorAll(selector));
    }

    const observer = new MutationObserver(mutations => {
      if (document.querySelector(selector)) {
        resolve(document.querySelectorAll(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}


console.log('Starting BoA spending info extraction...')
waitForElm('.default-view.no-budget').then((categories) => {
  categories.forEach((element) => {
    let categoryName = element.querySelector('.cnx-regular.link-category-name').textContent.trim();
    categoryName = categoryName.slice(0, categoryName.length - 16).trim();

    let amount = element.querySelector('.cnx-regular.spent-amount').textContent.trim();
    amount = amount.slice(0, amount.length - 6);

    console.log(categoryName + ', ' + amount);
  });
  console.log('Finished extraction');
});
