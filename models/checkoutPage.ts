import { expect } from '@playwright/test';
import { LOCATORS } from '../data/locators';


async function handleShoppingBag(page) {
  // After clicking add to bag the shopping bag modal will be shown
  // meaning that some flows might end up with a shopping bag already open at this point
  if (!(await page.locator(LOCATORS.checkout_btn).isVisible())) {
    await console.log('Shopping bag was closed - opening it');
    await page.click(LOCATORS.open_shopping_bag_btn);
  }
  await page.click(LOCATORS.checkout_btn);
  await console.log('Going from shopping bag to checkout page');
  // Wait and expect navigation
  await page.waitForSelector(LOCATORS.checkout_continue_btn, { state: 'visible' });
  await expect(page.locator(LOCATORS.checkout_continue_btn)).toBeVisible();
}

async function goToCheckout(page) {
  await handleShoppingBag(page);
  expect(page.url()).toContain('/checkout');
}

async function handleShippingFields(page) {
  // Wait for page load
  await page.waitForLoadState('load');
  
  // Fill destination field
  await console.log('Filling destination field');

  const destinationInput = page.locator(LOCATORS.destination_field);
  await expect(destinationInput).toBeVisible();
  await destinationInput.fill('');

  // await destinationInput.fill(process.env.DESTINATION);
  await destinationInput.type(process.env.DESTINATION, { delay: 50 });
  const firstDestinationOption = page.locator(LOCATORS.dropdown_v_list_item).first();
  await firstDestinationOption.click();

  // Wait for the shipping options dynamic load
  await page.waitForFunction(
    (selector) => {
      return document.querySelectorAll(selector).length > 0;
    },
    LOCATORS.shipping_providers_table
  );

  // Fill shipping box field
  await console.log('Filling parcel box destination field');
  // Adding a strict wait for the parcel input field wait
  // await page.waitForTimeout(2000);

  const parcelInput = page.locator(LOCATORS.shipping_parcel_select);
  await expect(parcelInput).toBeVisible();

  await parcelInput.click();
  await parcelInput.fill(process.env.PARCEL_BOX_DESTINATION);
  const firstParcelBoxOption = page.locator(LOCATORS.dropdown_v_list_item).first();
  await firstParcelBoxOption.click();

  // Click continue
  await page.click(LOCATORS.checkout_continue_btn);
}

async function handleContactFields(page) {
  // Fill email
  await console.log('Filling email');
  await expect(page.locator(LOCATORS.email_field)).toBeVisible();
  await page.locator(LOCATORS.email_field).fill(process.env.EMAIL);

  // Fill full name
  await console.log('Filling full name');
  await expect(page.locator(LOCATORS.name_field)).toBeVisible();
  await page.locator(LOCATORS.name_field).fill(process.env.FULL_NAME);

  // Fill phone
  await console.log('Filling phone number');
  await expect(page.locator(LOCATORS.phone_field)).toBeVisible();
  const phoneInput = page.locator(LOCATORS.phone_field);
  await phoneInput.fill(process.env.PHONE);

  // Fill comment
  await console.log('Filling comment');
  await expect(page.locator(LOCATORS.comment_field)).toBeVisible();
  await page.locator(LOCATORS.comment_field).fill(process.env.COMMENT);

  // Click continue
  await console.log('Going from contact info to summary page');
  await page.click(LOCATORS.continue_contact_details_btn);
}

async function handleSummary(page) {
  await console.log('Validating summary page and placing an order');
  await expect(page.locator(LOCATORS.continue_payment_btn)).toBeVisible();
  await page.click(LOCATORS.continue_payment_btn);
}

async function assertOrderModal(page) {
  await console.log('Validating successful order modal');
  // Verify that modal is visible
  await expect(page.locator(LOCATORS.order_confirmation_modal)).toBeVisible();

  // Verify text
  await expect(page.locator(LOCATORS.payment_info_label_class)).toHaveText('Thank you for your order');

  // Verify that button is visible
  await expect(page.locator(LOCATORS.order_confirmation_modal + ' button')).toBeVisible();
}

async function handleCheckoutForms(page) {
  await handleShippingFields(page);
  await handleContactFields(page);
  await handleSummary(page);
  await assertOrderModal(page);
}

export {
  handleShoppingBag,
  goToCheckout,
  handleCheckoutForms,
}