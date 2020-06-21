const puppeteer = require('puppeteer');
const cheerio = require("cheerio");
async function autoScroll(page) {
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;
                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}

function checkOption50($) {
    console.log($('#tableData tbody tr').length);
    if ($('#tableData tbody tr').length === 51) console.log("Test Passed for option whose value is 50");
    else console.log("Test Failed for option whose value is 50");
}

function checkOption100($) {
    console.log($('#tableData tbody tr').length);
    if ($('#tableData tbody tr').length === 101) console.log("Test Passed for option whose value is 100");
    else console.log("Test Failed for option whose value is 100");
}

function checkOption250($) {
    console.log($('#tableData tbody tr').length);
    if ($('#tableData tbody tr').length === 251) console.log("Test Passed for option whose value is 250");
    else console.log("Test Failed for option whose value is 250");
}

function checkOptionAll($) {
    console.log($('#tableData tbody tr').length);
    if ($('#tableData tbody tr').length === 301) console.log("Test Passed for option whose value is 300");
    else console.log("Test Failed for option whose value is 300");
}
(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.setViewport({
        width: 1366,
        height: 768
    });
    await page.goto('http://127.0.0.1:5500/index.html', {
        waitUntil: 'domcontentloaded'
    });
    let response = await page.content();
    let $ = cheerio.load(response);
    await page.type('#tableDiv > div > input', 'Vaibhav', {
        delay: 100
    }); // Types slower, like a user
    await page.click("#tableDiv > div > div > div:nth-child(1) > form > select", {
        delay: 20
    });
    await page.select('#tableDiv > div > div > div:nth-child(1) > form > select', '50');
    response = await page.content();
    $ = cheerio.load(response);
    checkOption50($);
    await page.click("body", {
        delay: 20
    });
    await autoScroll(page);
    await page.click("#loadMore", {
        delay: 20
    });
    await autoScroll(page);
    await page.click("#loadMore", {
        delay: 20
    });
    await autoScroll(page);
    await page.click("#loadMore", {
        delay: 20
    });
    await page.select('#tableDiv > div > div > div:nth-child(1) > form > select', '100');
    response = await page.content();
    $ = cheerio.load(response);
    checkOption100($);
    await page.click("body", {
        delay: 20
    });
    await autoScroll(page);
    await page.click("#loadMore", {
        delay: 20
    });
    await page.select('#tableDiv > div > div > div:nth-child(1) > form > select', '250');
    response = await page.content();
    $ = cheerio.load(response);
    checkOption250($);
    await page.click("body", {
        delay: 20
    });
    await autoScroll(page);
    await page.select('#tableDiv > div > div > div:nth-child(1) > form > select', 'all');
    response = await page.content();
    $ = cheerio.load(response);
    checkOptionAll($);
    await page.click("body", {
        delay: 20
    });
})();