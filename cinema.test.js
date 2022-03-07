const {getText, clickElement} = require("./lib/commands");
let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Cinema App tests", () => {
  beforeEach(async () => {
    await page.goto("http://qamid.tmweb.ru/client/index.php");
  }, 15000);

  test("book a movie ticket", async () => {
    await clickElement(page, "[data-time-stamp='1646773200']");
    await clickElement(page, "[data-seance-id='95']");
    await clickElement(page, ".buying-scheme__wrapper > div:nth-of-type(1) > span:nth-of-type(4)");
    await clickElement(page, ".acceptin-button");
    let actual = await getText(page, "p:nth-of-type(8)");
    expect(actual).toContain("Приятного просмотра!");
  }, 30000);

  test("book multiple movie tickets", async () => {
    await clickElement(page, ".page-nav__day_chosen > .page-nav__day-number");
    await clickElement(page, "[data-seance-id='92']");
    await clickElement(page, ".buying-scheme__wrapper > div:nth-of-type(1) > span:nth-of-type(1)");
    await clickElement(page, ".buying-scheme__wrapper > div:nth-of-type(1) > span:nth-of-type(2)");
    await clickElement(page, ".acceptin-button");
    let actual = await getText(page, "p:nth-of-type(8)");
    expect(actual).toContain("Приятного просмотра!");
  }, 30000);

  test("don't re-booking a booked movie ticket", async () => {
    await clickElement(page, "[data-seance-id='93']");
    await clickElement(page, "div:nth-of-type(7) > span:nth-of-type(5)");
    let isDisabled = await page.$eval("button[disabled]", (el) => el.disabled);
    expect(isDisabled).toBe(true);
  }, 30000);
});