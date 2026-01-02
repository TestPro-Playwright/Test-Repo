import * as dotenv from 'dotenv';
dotenv.config();

export const testConfig = {
    TestBackOfficeUrl: 'https://saucedemo.com',
    WaitForTextTimeout: 200,
    TestAutoDelayEnabled: 'true',
    TestEnvUserName: 'standard_user',
    TestEnvLoginPassword: 'secret_sauce',
    TestEnvSecondUserName: 'admin',
    TestEnvSecondUserPassword: 'admin',
    ManualDelayShort: 0.25,
    ManualDelayMedium: 0.5,
    ManualDelayLong: 0.75,
    SignOutDelayDefault: 2,
    SignInDelayDefault: 2,
    RejectCookies: false,
    RejectCookieDelay: 2,
    CaseDetailsDelayDefault: 2,
    GetCaseRefFromUrlDelay: 2
};
