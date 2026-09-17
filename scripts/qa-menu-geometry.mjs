export default async function run(page) {
  const geometry = await page.evaluate(() => {
    const group = document.querySelector('[aria-label="Danh mục tin tức"]');
    const chips = [...group.querySelectorAll("button")].map((el) => ({
      text: el.innerText.split("\n")[0],
      top: Math.round(el.getBoundingClientRect().top),
      left: Math.round(el.getBoundingClientRect().left),
    }));
    const sortBtn = document.querySelector('[aria-label^="Sắp xếp theo ngày đăng"]');
    const sortRect = sortBtn.getBoundingClientRect();
    const sort = { top: Math.round(sortRect.top), left: Math.round(sortRect.left) };
    return {
      chipTops: [...new Set(chips.map((c) => c.top))],
      sortTop: sort.top,
      sameRowAsChips: chips.some((c) => Math.abs(c.top - sort.top) <= 2),
      lastChipText: chips[chips.length - 1].text,
      lastChipRight: Math.round(
        group.querySelectorAll("button")[chips.length - 1].getBoundingClientRect().right
      ),
      sortLeft: sort.left,
      sortIsDirectlyAfterLastChip: sort.left >= Math.round(
        group.querySelectorAll("button")[chips.length - 1].getBoundingClientRect().right
      ) - 2,
      filterRowCount: group.parentElement.querySelectorAll(":scope > div").length,
    };
  });

  const afterFilter = await page.evaluate(async () => {
    document.querySelector('[aria-label^="Sắp xếp theo ngày đăng"]').click();
    await new Promise((r) => setTimeout(r, 300));
    const group = document.querySelector('[aria-label="Danh mục tin tức"]');
    const all = [...group.querySelectorAll("button")];
    return {
      rowChildren: [...group.children].map((el) => el.tagName + ":" + el.innerText.split("\n")[0]),
      buttonCount: all.length,
      singleRow: new Set(all.map((b) => Math.round(b.getBoundingClientRect().top))).size === 1,
      sortText: all[all.length - (all.length > 6 ? 2 : 1)]?.innerText,
    };
  });

  return { geometry, afterFilter };
}
