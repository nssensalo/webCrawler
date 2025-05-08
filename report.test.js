const { sortPages } = require('./report.js');
const { test, expect } = require('@jest/globals');

test('sortPages for 2 pages', () => {
    const input = {
        'https://wagslane.dev/path': 1,
        'https://wagslane.dev': 3
    }
    const actual = sortPages(input)
    const expected = [
        [ 'https://wagslane.dev',3],
        [ 'https://wagslane.dev/path',1]

    ]
    expect(actual).toEqual(expected)
});

test('sortPages for 5 pages', () => {
    const input = {
        'https://wagslane.dev/path': 1,
        'https://wagslane.dev': 3,
        'https://wagslane.dev/pather': 6,
        'https://wagslane.dev/pathers': 21,
        'https://wagslane.dev/pathy': 8
    }
    const actual = sortPages(input)
    const expected = [
        [ 'https://wagslane.dev/pathers',21],
        [ 'https://wagslane.dev/pathy',8],
       ['https://wagslane.dev/pather', 6],
        [ 'https://wagslane.dev',3],
        [ 'https://wagslane.dev/path',1]

    ]
    expect(actual).toEqual(expected)
});
