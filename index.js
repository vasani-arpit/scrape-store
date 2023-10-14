// const puppeteer = require('puppeteer');
import gplay from "google-play-scraper";
import { json2csv } from 'json-2-csv';
import { writeFileSync } from "fs";
import {setTimeout} from 'node:timers/promises'
import _ from "lodash";


(async () => {
    // Launch the browser and open a new blank page
    // const browser = await puppeteer.launch({
    //     headless: false,
    //     defaultViewport: null
    // });
    // const page = await browser.newPage();

    // // Navigate the page to a URL
    // await page.goto('https://google.com/search?q=site:play.google.com/store/apps/details');

    // await page.waitForNetworkIdle()

    // await page.click('[value="Google Search"]')

    for (const key in gplay.category) {
        if (Object.hasOwnProperty.call(gplay.category, key)) {
            const category = gplay.category[key];
            for (const property in gplay.collection) {
                if (Object.hasOwnProperty.call(gplay.collection, property)) {
                    const collectionType = gplay.collection[property];
                    console.log(category, collectionType)
                    let topList = await gplay.list({
                        category: category,
                        collection: collectionType,
                        country: 'in',
                        num: 1000,
                        age: gplay.age.NINE_UP,
                        fullDetail: true
                    })

                    topList = _.map(topList, a => _.omit(a, ["description", 'descriptionHTML', 'histogram']))

                    writeFileSync(`${category}_${collectionType}.csv`, await json2csv(topList, { delimiter: { field: '❗' } }))
                    await setTimeout(5000);
                }
            }
        }
    }

    // let topList = await gplay.list({
    //     category: gplay.category.APPLICATION,
    //     collection: gplay.collection.TOP_PAID,
    //     country: 'in',
    //     num: 1000,
    //     age: gplay.age.NINE_UP,
    //     fullDetail: true
    // })

    // topList = _.map(topList, a => _.omit(a, ["description", 'descriptionHTML', 'histogram']))

    // writeFileSync('Application_topPaid.csv', await json2csv(topList, { delimiter: { field: '❗' } }))

    // const developers = await gplay.developer({ devId: "", country: 'in' })
    // console.log(developers)


})();