const puppeteer = require("puppeteer");
require("dotenv").config();

const userList = require("./data.json");
process.setMaxListeners(0);
if (userList !== undefined) {
  let data = userList.user_data;
  if (data !== undefined && data.length > 0) {
    (async () => {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.goto(process.env.OPENMRS_BASE_URL, { timeout: 0 });
      await page.type("#username", process.env.OPENMRS_USER_NAME);
      await page.type("#password", process.env.OPENMRS_USER_PASSWORD);
      await page.waitForTimeout(200);
      await page.click('input[type="submit"]');
      await page.waitForTimeout(500);
      await page.goto(
        `${process.env.OPENMRS_BASE_URL}/module/teammodule/teamMemberAddForm.form`,
        { timeout: 0 }
      );
      await page.waitForTimeout(200);

      await registerUser(data, page);
      await page.waitForTimeout(500);
      await browser.close();
    })();
  } else {
    console.log("No data to register, user_data is empty");
    return;
  }
} else {
  console.log("No data to register, data.json is empty");
  return;
}

async function registerUser(users, page) {
  let usersLength = users.length;
  for (userListIndex = 0; userListIndex < usersLength; userListIndex++) {
    let userObj = users[userListIndex];
    console.log(`registering user: ${userObj.user_name}`);
    await page.type("#givenName", userObj.first_name);
    await page.type("#middleName", userObj.middle_name);
    await page.type("#familyName", userObj.family_name);
    await page.type("#birthDate", userObj.dob);
    await page.type("#gender", userObj.gender);
    await page.click("#loginChoice");
    await page.waitForTimeout(200);
    await page.type("#userName", userObj.user_name);
    await page.type("#password", userObj.password);
    await page.type("#confirmPassword", userObj.password);
    await page.type("#roleOption", userObj.user_role);
    await page.type("#identifier", userObj.member_identifier);
    await page.type("#teamOption", userObj.team_name);
    await page.type("#location", userObj.assigned_location);
    await page.click("#isDataProvider");
    await page.waitForTimeout(200);
    await page.click("#addBtn");

    await page.waitForTimeout(200);
    await page.goto(
      `${process.env.OPENMRS_BASE_URL}/module/teammodule/teamMemberAddForm.form`,
      { timeout: 0 }
    );
  }
}
