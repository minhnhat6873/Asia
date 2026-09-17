export default async function run(page) {
  const readChips = () =>
    page.evaluate(() =>
      [...document.querySelectorAll('[aria-label="Danh mục tin tức"] button')].map((b) => ({
        chip: b.innerText.split("\n")[0].trim(),
        badge: b.innerText.split("\n").slice(1).join(" ").trim() || null,
        selected: b.getAttribute("aria-pressed") === "true",
      }))
    );

  const steps = {};

  // 1. Default: only "Tất cả" shows a number.
  steps.default = await readChips();

  // 2. Pick a category: that chip shows its number, "Tất cả" loses its number.
  await page.getByRole("button", { name: /^Tin tức/ }).click();
  await page.waitForTimeout(300);
  steps.afterPickTinTuc = await readChips();

  // 3. Search while on that category: the badge becomes the search result count.
  await page.getByLabel("Từ khóa tin tức").fill("Á Châu");
  await page.waitForTimeout(400);
  steps.searchInsideTinTuc = await readChips();
  steps.searchInsideTinTuc_cards = await page.locator(".news-overlay").count();

  // 4. Search while on "Tất cả": the number lands on the "Tất cả" chip.
  await page.getByRole("button", { name: /^Tất cả/ }).click();
  await page.waitForTimeout(300);
  steps.searchInsideTatCa = await readChips();
  steps.searchInsideTatCa_cards = await page.locator(".news-overlay").count();

  // 5. Clear everything: back to only "Tất cả" numbered.
  await page.getByRole("button", { name: /Xóa bộ lọc/ }).click();
  await page.waitForTimeout(400);
  steps.afterClear = await readChips();

  return steps;
}
