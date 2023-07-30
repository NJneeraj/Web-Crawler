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

test("getURLsFromHTML ", () => {
  const inputHTMLBody = `
  <html>
    <body>
        <a href="https://boot.dev/v1></a>
    </body>
  </html>`;
  const inputURL = "http://boot.dev/v1/";
  const actualResult = getURLsFromHTML(inputHTMLBody, inputURL);
  const expextedResult = ["http://boot.dev/v1"];
  expect(actualResult).toEqual(expextedResult);
});
