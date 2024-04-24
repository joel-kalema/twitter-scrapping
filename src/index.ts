import * as puppeteer from "puppeteer";
import { username, password } from "./secrets";

const randomInFromInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
}

let sleep_for = async (page: puppeteer.Page, min: number, max: number) => {
    let sleep_duration = randomInFromInterval(min, max);
    console.log('waiting for', sleep_duration / 1000, 'seconds'); // Corrected the calculation
    await page.waitForTimeout(sleep_duration);
}

let navigateToPage = async (page: puppeteer.Page, URL: string) => {
    await page.goto(URL, {waitUntil: 'networkidle2'});
    await sleep_for(page, 1000, 2000);
}

let authenticate = async (page: puppeteer.Page) => {
    try{
        const username_inputs = await page.$x(`//input[@name="session[username_or_email]"]`)
        if(username_inputs.length>0){
            await username_inputs[0].focus();
            await page.keyboard.type(username)
        } 


        const password_inputs = await page.$x(`//input[@name="session[password]"]`)
        if(password_inputs.length>0){
            await password_inputs[0].focus();
            await password_inputs.type(username)
        } 

        const buttons = await page.$x(`//div[@role='button']//span[text()='Log in']`)
        if(buttons.length>0){
            await buttons[0].focus();
        }

    } catch (e) {
        console.log("Error in auth:", e);
    }
}

let main_actual = async () => {
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        const URL = 'https://twitter.com/login'
        await page.setViewport({
            width: 1280, height: 800,
            deviceScaleFactor: 1,
        });

        await page.goto(URL, { waitUntil: 'networkidle2' });
        await sleep_for(page, 1000, 2000);
        await authenticate(page);
        await sleep_for(page, 500, 1000);
        await navigateToPage(page, 'https://twitter.com/CoinDesk/status/1782137373377134931');
    } catch (e) {
        console.log(e);
    }
}

let main = async () => {
    await main_actual();
}

main();