import puppeteer from 'puppeteer';

describe('filter events by city', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: true,
            slowMo: 250,
            timeout: 0
        });
        page = await browser.newPage();
        await page.goto('http://localhost:5173/');
        await page.waitForSelector('#city-search');
    });

    afterAll(async () => {
        await browser.close();
    });

    test('User can see the city search input', async () => {
        const citySearch = await page.$('#city-search');
        expect(citySearch).toBeDefined();
    });

    test('User can type a city name and see suggestions', async () => {
        const cityInput = await page.$('.city');
        await cityInput.focus();
        await cityInput.type('Berlin', { delay: 100 });
        await page.waitForSelector('.suggestions', { timeout: 5000 });
        const suggestions = await page.$('.suggestions');
        expect(suggestions).toBeDefined();
    }, 15000);

    test('User can select a city from suggestions', async () => {
        await page.click('.suggestions li:last-child');
        const eventItems = await page.$$('.event');
        expect(eventItems.length).toBeGreaterThan(0);
    });
});

describe('show/hide an event details', () => {
    let browser;
    let page;
    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: true,
            slowMo: 250,
            timeout: 0
        });
        page = await browser.newPage();
        await page.goto('http://localhost:5173/');
        await page.waitForSelector('.event');
    });

    afterAll(() => {
        browser.close();
    });

    test('An event element is collapsed by default', async () => {
        const eventDetails = await page.$('.event-details');
        expect(eventDetails).toBeNull();
    });

    test('User can expand an event to see its details', async () => {
        await page.click('.details-toggle');
        const eventDetails = await page.$('.event-details');
        expect(eventDetails).toBeDefined();
    });

    test('User can collapse an event to hide details', async () => {
        await page.click('.details-toggle');
        const eventDetails = await page.$('.event-details');
        expect(eventDetails).toBeNull();
    });
});