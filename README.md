Prerequisites: 

> NodeJs and npm (https://nodejs.org/en)
> git

Once or if you already have the package manager and git installed -
Clone task repository from github:
> `git clone`

then install packages/dependencies:
> `npm install`

thats it!
-----

To run test cases type:

> `npm run tests` 
// will start 3 parallel workers and run all tests that are inside `/tests` folder with chromium browser.

or to run them with visual ui type: 

> `npm run tests-ui`
// will start tests with visual flow for you to follow allong


// Both of these scripts are added to package.json and they oweride the basic `npx playwright test` command
// Allowing to have/create different alliasses with different parameters for -> different needs
// For example have `--project=chromium` for ui tests only


------
Used packages:
> playwright
> dotenv // allows the use of .env 

------
Used ES modules structure (import/export instead of require and commonJS) for clearer and newer structure approach.
Tests are under being stored `/tests` folder.
Custom functions or other helpfull functions are being stored under `/helpers`.
Specific page helpers that do the main load/logic are being held under the `models` folder.
In order to reduce code repetitivness and have more readable code - data like selectors are being held under `data`.
Playwright config can be found in `configs` folder.
Lasts local test run result will be held in `test-results` folder - but it is .gitignored.
