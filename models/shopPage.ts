import { expect } from '@playwright/test';
import { LOCATORS } from '../data/locators';
import { getRandomNumberFromZeroTo } from '../helpers/customFunctions';

async function clickShopNavButton(page) {
  await console.log('Clicking shop navigation button');
  await page.click(LOCATORS.shop_nav_button);
  expect(page.url()).toContain('/shop');
}

async function selectRandomProduct(page) {
  await console.log('Selecting random product from the shop');
  // wait for the dynamic load of products
  // this will be ran on the browser so parameter passing is neccessary
  await page.waitForFunction(
    (selector) => {
      return document.querySelectorAll(selector).length > 0;
    },
    LOCATORS.all_products
  );
  // get array of all visible products
  const products = await page.locator(LOCATORS.all_products).all();

  // if there are actualy visible products -> continue with the random selection
  if (products.length != 0){
    // select random product
    const randomIndex = await getRandomNumberFromZeroTo(products.length);
    const selectedProduct = products[randomIndex];

    // Get the name of the product
    const productText = await selectedProduct.textContent();
    console.log(`Selected product is: ${productText.trim()}`);

    await products[randomIndex].click();

  } else {
    console.log("No images found!");
    return;
  }

  // expect for the button to be visible and then click it
  await page.waitForSelector(LOCATORS.add_to_bag_btn, { state: 'visible' });
  await expect(page.locator(LOCATORS.add_to_bag_btn)).toBeVisible();
  await page.click(LOCATORS.add_to_bag_btn);
}


export { 
  clickShopNavButton,
  selectRandomProduct,
};
