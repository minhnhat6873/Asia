export default async function run(page, ui) {
  const result = {};
  const panelTitle = () =>
    page.locator("aside h3").first().innerText().catch(() => "(no panel)");

  // Case 1: filter by category, then click a card -> panel should show.
  await page.getByRole("button", { name: /^Thông báo/ }).click();
  await page.waitForTimeout(300);
  result.categoryFilterInitialPanel = await panelTitle();

  // Case 2: the reported bug — search while still on "Tất cả", then click a card.
  await page.getByRole("button", { name: /^Tất cả/ }).click();
  await page.waitForTimeout(200);
  await page.getByLabel("Từ khóa tin tức").fill("dừa");
  await page.waitForTimeout(400);
  result.searchStatus = await page.getByRole("status").first().innerText();
  result.afterSearchPanelVisible = await page.locator("aside").count();
  result.afterSearchPanelTitle = await panelTitle();

  // Clear then search something that matches several posts, click the 2nd card.
  await page.getByLabel("Từ khóa tin tức").fill("Á Châu");
  await page.waitForTimeout(400);
  const cards = page.locator(".news-overlay").locator("..");
  result.cardCountWhenSearching = await cards.count();
  if ((await cards.count()) > 1) {
    await cards.nth(1).click();
    await page.waitForTimeout(400);
    result.afterClickingSecondCardPanel = await panelTitle();
  }

  // Make sure the normal "no search" hero layout is untouched.
  await page.getByRole("button", { name: /Xóa bộ lọc/ }).click();
  await page.waitForTimeout(300);
  result.afterClearAsideCount = await page.locator("aside").count();
  result.afterClearHasHero = await page.getByText("Team Building 2026").count();

  return result;
}
