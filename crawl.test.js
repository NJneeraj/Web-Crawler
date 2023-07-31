const { normalizeURL, getURLsFromHTML } = require("./crawl");
const { test, expect } = require("@jest/globals");

test("normalizeUrl path", () => {
  const input = "https://boot.dev/v1";
  const actualResult = normalizeURL(input);
  const expextedResult = "boot.dev/v1";
  expect(actualResult).toEqual(expextedResult);
});

test("normalizeUrl trailing slash", () => {
  const input = "https://boot.dev/v1/";
  const actualResult = normalizeURL(input);
  const expextedResult = "boot.dev/v1";
  expect(actualResult).toEqual(expextedResult);
});

test("normalizeUrl caseInsensitive", () => {
  const input = "https://Boot.dEv/v1/";
  const actualResult = normalizeURL(input);
  const expextedResult = "boot.dev/v1";
  expect(actualResult).toEqual(expextedResult);
});

test("normalizeUrl https", () => {
  const input = "http://Boot.dEv/v1/";
  const actualResult = normalizeURL(input);
  const expextedResult = "boot.dev/v1";
  expect(actualResult).toEqual(expextedResult);
});

test("getURLsFromHTML absolute", () => {
  const inputHTMLBody = `
  <html>
    <body>
        <a href="https://boot.dev/v1"></a>
        <a href="/locations/"></a>
    </body>
  </html>`;
  const inputURL = "https://boot.dev/v1";
  const actualResult = getURLsFromHTML(inputHTMLBody, inputURL);
  const expextedResult = [
    "https://boot.dev/v1",
    "https://boot.dev/v1/locations/",
  ];
  expect(actualResult).toEqual(expextedResult);
});
test("getURLsFromHTML relative", () => {
  const inputHTMLBody = `
  <html>
    <body>
        <a href="invalid Url"></a>
    </body>
  </html>`;
  const inputURL = "https://boot.dev/v1";
  const actualResult = getURLsFromHTML(inputHTMLBody, inputURL);
  const expextedResult = [];
  expect(actualResult).toEqual(expextedResult);
});
