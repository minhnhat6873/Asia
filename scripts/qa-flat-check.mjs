export default async function run(page) {
  const walk = await page.evaluate(() => {
    const box = document.querySelector('[aria-label="Tìm kiếm tin tức"]');
    const chain = [];
    let el = box;
    while (el && el.tagName !== "SECTION") {
      chain.push(el.tagName + " > " + (typeof el.className === "string" ? el.className : ""));
      el = el.parentElement;
    }
    const group = document.querySelector('[aria-label="Danh mục tin tức"]');
    const buttons = group ? [...group.querySelectorAll("button")] : [];
    return {
      searchBoxAncestors: chain,
      hasRoundedBoxWrapper: !!document.querySelector(".rounded-3xl.overflow-hidden"),
      hasGradientBox: !!document.querySelector(".bg-gradient-to-br"),
      hasDiscoveryHeading: document.body.innerText.includes("Khám phá tin tức"),
      groupParentClass: group ? group.parentElement.className : null,
      buttonTops: buttons.map((b) => Math.round(b.getBoundingClientRect().top)),
      uniqueRows: new Set(buttons.map((b) => Math.round(b.getBoundingClientRect().top))).size,
    };
  });

  return walk;
}
