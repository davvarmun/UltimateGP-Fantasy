const puppeteer = require('puppeteer');

async function scrapeRiders() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://www.motogp.com/es/riders/motogp');

  // Esperamos que los datos estén cargados
  await page.waitForSelector('.rider-card');

  // Extraemos los datos de cada piloto
  const riders = await page.evaluate(() => {
    const riderCards = document.querySelectorAll('.rider-card');
    const ridersData = [];

    riderCards.forEach(card => {
      const name = card.querySelector('.rider-card__name')?.textContent || 'No disponible';
      const bikeNumber = card.querySelector('.rider-card__number')?.textContent || 'N/A';
      const team = card.querySelector('.rider-card__team')?.textContent || 'Equipo no asignado';
      const nationality = card.querySelector('.rider-card__flag')?.getAttribute('alt') || 'Desconocido';

      ridersData.push({
        name,
        bikeNumber,
        team,
        nationality,
      });
    });

    return ridersData;
  });

  await browser.close();
  return riders;
}

scrapeRiders().then(riders => {
  console.log(JSON.stringify(riders));  // Salida de los datos en formato JSON
}).catch(err => {
  console.error(err);
  process.exit(1);
});
