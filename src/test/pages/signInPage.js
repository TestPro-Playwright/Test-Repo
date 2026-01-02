const {expect} = require('@playwright/test');
const {testConfig} = require ('../configs/config');
const {BasePage} = require('../pages/basePage');
const {captureExpectResult} = require('../utils/assertionUtil');
const launchPageConfig = require('../dataFile/launchConfig.json');

exports.SignInPage = class SignInPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;
        this.usernameLocator = this.page.locator('#user-name');
        this.passwordLocator = this.page.locator('#password');
        this.loginButtonLocator = this.page.getByRole('button', {name: 'Login'});
        this.changePasswordTextLocator = this.page.getByText('Change your password');
        this.inventoryPageLocator = this.page.getByText('Swag Labs', { exact: true});
        this.menuBarLocator = this.page.locator('#react-burger-menu-btn');
        this.logoutLocator = this.page.getByText('Logout');
    }

    async launchPage () {
        await this.page.goto(`${testConfig.TestBackOfficeUrl}/`);
        await this.page.waitForTimeout(testConfig.ManualDelayLong);
        await expect(this.inventoryPageLocator).toBeVisible();
    }

    async enterUserCredentials (secondUser, signInDelay = testConfig.SignInDelayDefault) {
        await expect(this.usernameLocator).toBeVisible();
        await expect(this.passwordLocator).toBeVisible();
        await this.usernameLocator.fill(secondUser ? testConfig.TestEnvSecondUserName : testConfig.TestEnvUserName);
        await this.page.locator('#password').fill(secondUser ? testConfig.TestEnvSecondUserPassword : testConfig.TestEnvLoginPassword);
        await expect(this.loginButtonLocator).toBeEnabled();
        await this.loginButtonLocator.click();
        await this.page.waitForTimeout(signInDelay);
    }

    async ignorePasswordChangeWarning() {
        const dialogHandler = dialog => dialog.accept();
        this.page.on('dialog', dialogHandler);

        // Remove dialog handler when done
        this.page.off('dialog', dialogHandler);
    }

    async verifyLogin() {
        const result = await captureExpectResult(
            expect(this.usernameLocator).toBeVisible()
        );

        if (!result.passed) {
            console.log('Login Successful');
            await expect(this.inventoryPageLocator).toBeVisible();

            // Accessibility check after login
            const accessibilityResults = await this.performAccessibilityScan();
            if (!accessibilityResults.passed) {
                // Handle violations as needed
                console.log('Login page accessibility issues:', accessibilityResults.violations);
            }
            await this.signOut();
        } else {
            console.log('Login failed');
        }

    }

    async signOut() {
        await expect(this.menuBarLocator).toBeVisible();
        await this.menuBarLocator.click();
        const navigationPromise = this.page.waitForNavigation();
        await expect(this.logoutLocator).toBeVisible();
        await expect(this.logoutLocator).toBeEnabled();
        await this.logoutLocator.click();
        await navigationPromise;
        await expect(this.usernameLocator).toBeVisible();
    }
};
