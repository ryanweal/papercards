'use strict';

const localURL = 'http://localhost:80';
const canadaWeatherURL = 'https://meteo.gc.ca/city/pages/qc-14_metric_f.html';

const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({headless: true, width: 128, height: 250, executablePath: '/usr/bin/chromium-browser'});
  const page = await browser.newPage();

  await Promise.all([
    page.waitForNavigation(),
    page.goto(canadaWeatherURL),
  ]);

  // locale
  let loc_el = await page.$('dl.mrgn-bttm-0 > dd:nth-child(2)');
  const locale = await page.evaluate(loc_el => loc_el.textContent, loc_el);

  // humidex
  let hdx_el = await page.$('div.col-sm-4:nth-child(3) > dl:nth-child(1) > dd:nth-child(5)');
  const humidex = await page.evaluate(hdx_el => hdx_el.textContent, hdx_el);

  // wind
  let vnt_el = await page.$('div.col-sm-4:nth-child(3) > dl:nth-child(1) > dd:nth-child(2)');
  const vent = await page.evaluate(vnt_el => vnt_el.textContent, vnt_el);

  // humidity
  let hum_el = await page.$('div.brdr-rght-city:nth-child(2) > dl:nth-child(1) > dd:nth-child(8)');
  const humidity = await page.evaluate(hum_el => hum_el.textContent.split('%')[0], hum_el);

  // temperature with decimal
  //let el = await page.$('#mainContent > section:nth-child(1) > details.panel.panel-default.hidden-xs > div.row.no-gutters.wb-eqht.hidden-print.wb-init > div.col-sm-10.text-center > div > div:nth-child(2) > dl > dd:nth-child(2)');

  // temperature with rounded numbers
  let el = await page.$('div.wb-eqht:nth-child(3) > div:nth-child(1) > div:nth-child(3) > p:nth-child(1) > span:nth-child(1)');
  const temp = await page.evaluate(el => el.textContent, el);

  // date
  let date_el = await page.$('#mainContent > section:nth-child(1) > details.panel.panel-default.hidden-xs > div.row.no-gutters.wb-eqht.hidden-print.wb-init > div.col-sm-10.text-center > dl > dd:nth-child(4)');
  const date = await page.evaluate(date_el => date_el.textContent, date_el);

  //prediction
  let pre_el = await page.$('#mainContent > section:nth-child(1) > details.panel.panel-default.hidden-xs > div.row.no-gutters.wb-eqht.hidden-print.wb-init > div.col-sm-10.text-center > div > div:nth-child(1) > dl > dd:nth-child(2)');
  const pre = await page.evaluate(pre_el => pre_el.textContent, pre_el);

  // sunrise
  let sun_el = await page.$('#mainContent > section.hidden-xs.mrgn-tp-lg > details > table > tbody > tr > td:nth-child(4)');
  const sun = await page.evaluate(sun_el => sun_el.textContent, sun_el);

  // sunset
  let moon_el = await page.$('#mainContent > section.hidden-xs.mrgn-tp-lg > details > table > tbody > tr > td:nth-child(6)');
  const moon = await page.evaluate(moon_el => moon_el.textContent, moon_el);

  // render this thing!
  const renderURL = localURL + '/weather?temp=' + temp + '&locale=' + locale + '&prediction=' + pre + '&date=' + date + '&sun=' + sun  + '&moon=' + moon + '&humidex=' + humidex + '&wind=' + vent + '&humidity=' + humidity;
  console.log('Rendering', renderURL);

  await page.goto(renderURL);
  await page.screenshot({path: 'output/weather.png', clip: { x:0, y:0, width: 128, height: 250} });
  await browser.close();

})();
