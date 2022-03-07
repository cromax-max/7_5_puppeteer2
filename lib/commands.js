module.exports = {
  getText: async function (page, selector) {
    try {
      await page.waitForSelector(selector, {
        timeout: 4000
      });
      return await page.$eval(selector, (el) => el.textContent);
    } catch (err) {
      throw new Error(`Text is not available for selector: ${selector}`);
    }
  },

  clickElement: async function (page, selector) {
    try {
      await page.waitForSelector(selector, {timeout: 4000});
      await page.click(selector);
    } catch (error) {
      throw new Error(`Selector is not clickable: ${selector}`);
    }
  },
}
