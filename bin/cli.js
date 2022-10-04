#!/usr/bin/env node
'use strict'

const { JSDOM } = require('jsdom');
const url = process.argv[2] || "https://www.amazon.com";

const traverseDOMBFS = window => {

    const { document } = window;
    const queue = [];
    queue.push(document.querySelector('body'));

    while (queue.length) {
        const node = queue.shift();
        try {
            const color = window.getComputedStyle(node).backgroundColor;
            process.stdout.write(rgba2hex(color) + ', ')
            
        } catch (e) {
            process.stdout.write(', ')
        }

        for (let i = 0; i < node.children.length; i++) {
            queue.push(node.children[i]);
        }
    }
};

const rgba2hex = (rgba) => `#${rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1).map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('')}`



JSDOM.fromURL(url).then((dom) => {
    traverseDOMBFS(dom.window);
});
