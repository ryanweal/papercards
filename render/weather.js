'use strict';

const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({headless: true, width: 128, height: 250, executablePath: '/usr/bin/chromium-browser'});
  const page = await browser.newPage();

  await Promise.all([
    page.waitForNavigation(),
    page.goto('https://meteo.gc.ca/city/pages/qc-147_metric_f.html'),
  ]);

  // temperature
  // #mainContent > section:nth-child(1) > details.panel.panel-default.hidden-xs > div.row.no-gutters.wb-eqht.hidden-print.wb-init > div.col-sm-10.text-center > div > div:nth-child(2) > dl > dd:nth-child(2)
  // let el = await page.$('#wb-auto-1 > div.col-sm-2.brdr-rght.text-center > div > p.text-center.mrgn-tp-md.mrgn-bttm-sm.lead.hidden-xs > span.wxo-metric-hide');
  let el = await page.$('#mainContent > section:nth-child(1) > details.panel.panel-default.hidden-xs > div.row.no-gutters.wb-eqht.hidden-print.wb-init > div.col-sm-10.text-center > div > div:nth-child(2) > dl > dd:nth-child(2)');
  const temp = await page.evaluate(el => el.textContent, el);

  // date
  //let date_el = await page.$('#wb-auto-1 > div.col-sm-10.text-center > dl > dd:nth-child(4)');
  let date_el = await page.$('#mainContent > section:nth-child(1) > details.panel.panel-default.hidden-xs > div.row.no-gutters.wb-eqht.hidden-print.wb-init > div.col-sm-10.text-center > dl > dd:nth-child(4)');
  const date = await page.evaluate(date_el => date_el.textContent, date_el);

  //prediction
  //let pre_el = await page.$('#mainContent > section.hidden-xs.mrgn-tp-lg > details > div > div:nth-child(1) > a > div > p:nth-child(4)');
  let pre_el = await page.$('#mainContent > section:nth-child(1) > details.panel.panel-default.hidden-xs > div.row.no-gutters.wb-eqht.hidden-print.wb-init > div.col-sm-10.text-center > div > div:nth-child(1) > dl > dd:nth-child(2)');
  const pre = await page.evaluate(pre_el => pre_el.textContent, pre_el);

  // sunrise
  let sun_el = await page.$('#mainContent > section.hidden-xs.mrgn-tp-lg > details > table > tbody > tr > td:nth-child(4)');
  const sun = await page.evaluate(sun_el => sun_el.textContent, sun_el);

  // sunset
  // #mainContent > section.hidden-xs.mrgn-tp-lg > details > table > tbody > tr > td:nth-child(6)
  let moon_el = await page.$('#mainContent > section.hidden-xs.mrgn-tp-lg > details > table > tbody > tr > td:nth-child(6)');
  const moon = await page.evaluate(moon_el => moon_el.textContent, moon_el);

  // render this thing!
  await page.goto('http://localhost:3082/weather?temp=' + temp + '&locale=Montr%C3%A9al&prediction=' + pre + '&date=' + date + '&sun=' + sun  + '&moon=' + moon);
  await page.screenshot({path: 'output/weather.png', clip: { x:0, y:0, width: 128, height: 250} });
  await browser.close();

})();
