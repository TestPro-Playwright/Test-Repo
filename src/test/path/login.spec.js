// @ts-check
const { test} = require('../Fixture/fixture');
// const launchPageConfig = require('../DataFile/launchConfig.json');

test('Launch Home Page', async ({ basePage, signInPage }) => {
    await basePage.logInfo('Launch a web application');
    await signInPage.launchPage();
});

test('Application Login Failure', async ({ basePage, signInPage }) => {
    await basePage.logInfo('Login as Caseworker with incorrect credentials');
    await signInPage.launchPage();
    await signInPage.enterUserCredentials(true);
    await signInPage.verifyLogin();
});

test('Successful Application Login', async ({ basePage, signInPage }) => {
    await basePage.logInfo( 'Login as Caseworker with valid credentials and perform accessibility check');
    await signInPage.launchPage();
    await signInPage.enterUserCredentials(false);
    await signInPage.ignorePasswordChangeWarning();
    await signInPage.verifyLogin();
});
