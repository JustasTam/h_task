import { test } from '@playwright/test';
import { goToHomePage } from '../helpers/customFunctions';
import { 
  clickShopNavButton, 
  selectRandomProduct,
} from "../models/shopPage";
import { 
  goToCheckout,
  handleCheckoutForms,
} from "../models/checkoutPage";


test.describe('Happy path flows', () => {

  test.beforeEach(async ({ page }) => {
    await goToHomePage(page);
  });

  test('Journey from home page to successful order', async ({ page }) => {
    await clickShopNavButton(page);
    await selectRandomProduct(page);
    await goToCheckout(page);
    await handleCheckoutForms(page);
  });
});