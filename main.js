const { crawlPage } = require("./crawl");

async function main() {
  let args = process.argv;
  if (args.length < 3) {
    console.log("No website provided");
    process.exit();
  }
  if (args.length > 3) {
    console.log("Too many args");
    process.exit();
  }
  const url = args[2];
  console.log(`Starting crawl of - "${url}"`);
  const pages = await crawlPage(url, url, {});
  for (let page of Object.entries(pages)) console.log(page);
}
main();
