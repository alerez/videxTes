const puppeteer = require('puppeteer');
const { readFileSync } = require('fs');
const shortid = require('shortid');
let ejs = require('ejs');


async function renderHtml(templateName, data) {
    const template = readFileSync(`src/files/templates/${templateName}`, 'utf-8');
    return ejs.render(template, data);
}

async function makePdf(html) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const path = `src/files/${ shortid.generate() }.pdf`;

    await page.setContent(html);
    await page.pdf({
        path,
        format: 'A4'
    });
    await browser.close();

    return path;
}

module.exports = {
    renderHtml,
    makePdf,
};
