const axios = require("axios");
const HTMLParser = require("node-html-parser");

async function crawlPage(baseURL, currentURL, pages) {
  const currentUrlObj = new URL(currentURL);
  const baseUrlObj = new URL(baseURL);
  if (currentUrlObj.hostname !== baseUrlObj.hostname) {
    return pages;
  }

  const normalizedURL = normalizeURL(currentURL);

  // if we've already visited this page
  // just increase the count and don't repeat
  // the http request
  if (pages[normalizedURL] > 0) {
    pages[normalizedURL]++;
    return pages;
  }

  // initialize this page in the map
  // since it doesn't exist yet
  pages[normalizedURL] = 1;

  // fetch and parse the html of the currentURL
  console.log(`crawling ${currentURL}`);
  let htmlBody = "";
  try {
    const resp = await axios.get(currentURL);
    if (resp.status > 399) {
      console.log(`Got HTTP error, status code: ${resp.status}`);
      return pages;
    }
    const contentType = resp.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(`Got non-html response: ${contentType}`);
      return pages;
    }
    htmlBody = await resp.data;
  } catch (err) {
    console.log(err.message);
  }

  const nextURLs = getURLsFromHTML(htmlBody, baseURL);
  for (const nextURL of nextURLs) {
    pages = await crawlPage(baseURL, nextURL, pages);
  }

  return pages;
}

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

module.exports = { normalizeURL, getURLsFromHTML, crawlPage };
