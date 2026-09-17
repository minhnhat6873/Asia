export default async function run(page, ui) {
  const result = {};

  const cards = () => page.locator(".news-overlay");

  // Nothing here should be broken before we touch it.
  result.categoryButtons = await page.getByRole("group", { name: "Danh mục tin tức" }).getByRole("button").allInnerTexts();
  result.statusNodesOnLoad = await page.getByRole("status").count();
  result.cardsOnLoad = await cards().count();
  result.sortLabel = await page.getByRole("button", { name: /Sắp xếp theo ngày đăng/ }).getAttribute("aria-label");

  // Search still filters as before (counts now come from the cards).
  await page.getByLabel("Từ khóa tin tức").fill("dừa");
  await page.waitForTimeout(300);
  result.cardsAfterSearch = await cards().count();

  // Clear button restores everything.
  await page.getByRole("button", { name: /Xóa bộ lọc/ }).click();
  await page.waitForTimeout(300);
  result.cardsAfterClear = await cards().count();

  // Category button switches + shows the detail panel.
  await page.getByRole("button", { name: /^Thông báo/ }).click();
  await page.waitForTimeout(300);
  result.cardsAfterCategory = await cards().count();
  result.afterCategoryPressed = await page.getByRole("button", { name: /^Thông báo/ }).getAttribute("aria-pressed");

  // Sorting still toggles.
  await page.getByRole("button", { name: /Sắp xếp theo ngày đăng/ }).click();
  await page.waitForTimeout(200);
  result.afterSortLabel = await page.getByRole("button", { name: /Sắp xếp theo ngày đăng/ }).getAttribute("aria-label");

  return result;
}
