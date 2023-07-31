const axios = require("axios");
const HTMLParser = require("node-html-parser");
async function crawlPage(currentURL) {
  console.log(`actively crawling ${currentURL}`);
  try {
    const resp = await axios.get(currentURL);
    if (resp.status > 399) {
      console.log(
        `Error of status code :${resp.status} ,On Page :${currentURL}`
      );
      return;
    }
    const responseType = resp.headers.get("content-type");
    if (!responseType.includes("text/html")) {
      console.log(`Non HTML response :${responseType} ,On Page :${currentURL}`);
      return;
    }
    console.log(await resp.data);
  } catch (err) {
    console.log(`Error in fetch : ${err.message}, On page :${currentURL}`);
  }
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
