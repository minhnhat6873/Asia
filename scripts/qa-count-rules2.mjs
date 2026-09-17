export default async function run(page) {
  const readChips = () =>
    page.evaluate(() => {
      const group = document.querySelector('[aria-label="Danh mục tin tức"]');
      return [...group.querySelectorAll("button")].map((b) => {
        const badgeEl = b.querySelector("span[aria-label]");
        return {
          chip: [...b.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join("").trim(),
          badge: badgeEl ? badgeEl.textContent.trim() : null,
          selected: b.getAttribute("aria-pressed") === "true",
        };
      });
    });

  const clickChip = async (label) => {
    await page.locator(`[aria-label="Danh mục tin tức"] button`).filter({ hasText: new RegExp(`^\\s*${label}`) }).first().click();
    await page.waitForTimeout(300);
  };

  const steps = {};
  steps["1_default"] = await readChips();

  await clickChip("Tin tức");
  steps["2_pick_TinTuc"] = await readChips();

  await page.getByLabel("Từ khóa tin tức").fill("Á Châu");
  await page.waitForTimeout(400);
  steps["3_search_Á Châu_in_TinTuc"] = await readChips();
  steps["3_cards"] = await page.locator(".news-overlay").count();

  await page.getByLabel("Từ khóa tin tức").fill("mở rộng");
  await page.waitForTimeout(400);
  steps["4_search_mở rộng_in_TinTuc"] = await readChips();
  steps["4_cards"] = await page.locator(".news-overlay").count();

  await clickChip("Tất cả");
  steps["5_search_mở rộng_in_TatCa"] = await readChips();
  steps["5_cards"] = await page.locator(".news-overlay").count();

  await page.getByLabel("Từ khóa tin tức").fill("");
  await page.waitForTimeout(400);
  steps["6_cleared"] = await readChips();

  return steps;
}
