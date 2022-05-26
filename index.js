const puppeteer = require("puppeteer");
require("dotenv").config();

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(process.env.OPENMRS_BASE_URL);
  await page.type("#username", process.env.OPENMRS_USER_NAME);
  await page.type("#password", process.env.OPENMRS_USER_PASSWORD);
  await page.waitForTimeout(500);
  await page.click('input[type="submit"]');
  await page.waitForTimeout(2000);
  await page.goto(
    "http://45.79.110.194:8081/openmrs/admin/locations/location.form"
  );
  await page.waitForTimeout(1000);

  await browser.close();
})();
