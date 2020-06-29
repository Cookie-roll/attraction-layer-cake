const puppeteer = require('puppeteer');
const dotenv = require('dotenv');
const languages = require('./languages');
const { attractionTypes, relationshipTypes, orientationTypes } = require( './options');

dotenv.config({path: '.env'});

const getPort = function (port) {
    port = parseInt(port, 10);
    if ([0, 80, 443].includes(port)) {
        return '';
    }

    return ':' + port;
};

const baseUrl = `${process.env.SCHEME}://${process.env.DOMAIN}${getPort(process.env.PORT)}`;

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({width: 1200, height: 600});
    for (let lang in languages) {
        for (let attraction of attractionTypes.types) {
            for (let relationship of relationshipTypes.types) {
                for (let orientation of orientationTypes.types) {
                    const code = `${attraction.code}${relationship.code}${orientation.code}`;
                    console.log(`${code}-${lang}`);
                    await page.goto(`${baseUrl}/image/${code}-${lang}`);
                    await page.waitFor(300);
                    await page.screenshot({path: `./src/images/banners/${lang === 'en' ? code : `${code}-${lang}`}.jpg`, type: 'jpeg'});
                }
            }
        }
    }

    await browser.close();
})();
