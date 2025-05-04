const { normalizeUrl, getUrlsFromHTML} = require('./crawl.js');
const { test, expect } = require('@jest/globals');

test('normalizeUrl strip protocol', () => {
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeUrl(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
});

test('normalizeUrl strip path', () => {
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeUrl(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeUrl capitalization', () => {
    const input = 'https://BLOG.boot.dev/path/'
    const actual = normalizeUrl(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeUrl http/https', () => {
    const input = 'http://blog.boot.dev/path/'
    const actual = normalizeUrl(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('getUrlsFromHTML ', () => {
    const inputHTML = `
    <html>
        <body>
            <a href="http://blog.boot.dev/path/">
                boot.dev Blog
            </a>
        
        </body>
    </html>
    `
    const inputBaseUrl = "http://blog.boot.dev/path/"
    const actual = getUrlsFromHTML(inputHTML,inputBaseUrl)
    const expected = ["http://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
})

test('getUrlsFromHTML relative urls', () => { //make /path/the full url
    const inputHTML = `
    <html>
        <body>
            <a href="/path/">
                boot.dev Blog
            </a>
        
        </body>
    </html>
    `
    const inputBaseUrl = "http://blog.boot.dev"
    const actual = getUrlsFromHTML(inputHTML,inputBaseUrl)
    const expected = ["http://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
})