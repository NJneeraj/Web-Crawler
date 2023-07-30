const { JSDOM } = require("jsdom");

function normalizeURL(url) {
  const urlObj = new URL(url);
  let newUrl = `${urlObj.hostname}${urlObj.pathname}`;
  if (newUrl.length > 0 && newUrl.endsWith("/")) newUrl = newUrl.slice(0, -1);
  return newUrl;
}

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a");
  for (let link of linkElements) urls.push(link.href);
  return urls;
}

module.exports = { normalizeURL, getURLsFromHTML };
