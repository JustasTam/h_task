async function goToHomePage(page) {
  await page.goto(process.env.PAGE_URL, {
    timeout: 5000,
    waitUntil: 'load',
  });
}

async function getRandomNumberFromZeroTo(max) {
  // math random will return something in between 0 and 1
  // math floor will return first full int -> won't round it
  // so this will always return something in between 0 and max - 1
  return Math.floor(Math.random() * max);
}

export { 
  goToHomePage,
  getRandomNumberFromZeroTo,
};