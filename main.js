const { crawlPage } = require("./crawl");

function main() {
  let args = process.argv;
  if (args.length < 3) {
    console.log("No website provided");
    process.exit();
  }
  if (args.length > 3) {
    console.log("Too many args");
    process.exit();
  }
  const url = new URL(args[2]);
  console.log(`Starting crawl of - "${url.href}"`);
  crawlPage(url.href);
}
main();
