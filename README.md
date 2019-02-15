# Papercards

Use Vue.js to make beautiful e-ink displays. Powered by puppeteer and Raspberry Pi.

There are a lot of moving parts to this.

It started over at this repo (skip the first one about pi-hole, the rest are all foundational to this): https://github.com/ryanweal/raspberry-pi-recipes

## The cards folder has a Nuxt instance.

Run `npm i` in that folder, and then `npm run generate` to create the cards/dist folder.

## The render folder has a Puppeteer script.

This gathers some data, scraping some public websites, and then turns those
values into a querystring, which is then run against the Vue.js/Nuxt templates
that were pre-generated in the earlier step.

Run `npm i` in this folder before you start as well!

## Have low expectations.

The webserver doesn't even start automatically! You can use whatever you want to do that.

## Is this crazy?

Sorta!

Logically I would have used Python to make best use of the library... but I
do Vue.js and Nuxt, and I want component-based layouts that quickly roll off
my fingertips and onto the display. It is going to make it easy to re-use
chunks on larger displays when I have time for more building... in a language
I know better than Python (although I really don't mind Python at all, it is
very nice in general).
