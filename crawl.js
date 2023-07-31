const HTMLParser = require("node-html-parser");

function normalizeURL(url) {
  const urlObj = new URL(url);
  let newUrl = `${urlObj.hostname}${urlObj.pathname}`;
  if (newUrl.length > 0 && newUrl.endsWith("/")) newUrl = newUrl.slice(0, -1);
  return newUrl;
}

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = HTMLParser.parse(htmlBody);
  const linkElements = dom.querySelectorAll("a");
  for (let link of linkElements) {
    let href = link.getAttribute("href");
    if (href.slice(0, 1) == "/") {
      //relative
      try {
        let urlObj = new URL(`${baseURL}${href}`);
        urls.push(urlObj.href);
      } catch (err) {
        console.log(`Error with relative url ${err.message}`);
      }
    } else {
      //absoulte

      try {
        let urlObj = new URL(href);
        urls.push(urlObj.href);
      } catch (err) {
        console.log(`Error with absolute url ${err.message}`);
      }
    }
  }
  return urls;
}

module.exports = { normalizeURL, getURLsFromHTML };
