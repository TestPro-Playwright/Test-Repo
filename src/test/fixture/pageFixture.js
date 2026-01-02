const base = require('@playwright/test');
const {BasePage} = require('../pages/basePage');
const {SignInPage} = require('../pages/signInPage');

exports.test = base.test.extend({
    basePage: async ({page}, use) => {
        await use(new BasePage(page));
    },

    signInPage: async ({page}, use) => {
        await use(new SignInPage(page));
    },
});
exports.expect = base.expect;
