const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const { clickElement, getText } = require("../../lib/commands.js");

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on {string} page", async function (string) {
  return await this.page.goto(`http://${string}.tmweb.ru/client/index.php`, {
    setTimeout: 20000,
  });
});

When("user user is booking a movie ticket", async function () {
  await clickElement(this.page, "[data-time-stamp='1646773200']");
  await clickElement(this.page, "[data-seance-id='95']");
  await clickElement(this.page, ".buying-scheme__wrapper > div:nth-of-type(1) > span:nth-of-type(4)");
  await clickElement(this.page, ".acceptin-button");
});

When("user user is booking multiple tickets", async function () {
  await clickElement(this.page, ".page-nav__day_chosen > .page-nav__day-number");
  await clickElement(this.page, "[data-seance-id='92']");
  await clickElement(this.page, ".buying-scheme__wrapper > div:nth-of-type(1) > span:nth-of-type(1)");
  await clickElement(this.page, ".buying-scheme__wrapper > div:nth-of-type(1) > span:nth-of-type(2)");
  await clickElement(this.page, ".acceptin-button");
});

When("user re-booking a booked movie ticket", async function () {
  await clickElement(this.page, "[data-seance-id='93']");
  await clickElement(this.page, "div:nth-of-type(7) > span:nth-of-type(5)");
});

Then("user sees the booking confirmation", async function () {
  let actual = await getText(this.page, "p:nth-of-type(8)");
  expect(actual).contain("Приятного просмотра!");
});

Then("user sees disabled button", async function () {
  let isDisabled = await this.page.$eval("button[disabled]", (el) => el.disabled);
  expect(isDisabled).true;
});
