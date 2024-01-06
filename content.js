// content.js
// Get user's hourly wage input from storage
chrome.storage.sync.get(['hourlyWage'], function (result) {
  let hourlyWage = parseFloat(result.hourlyWage);

  // Check if the hourly wage is a valid number before proceeding
  if (!isNaN(hourlyWage)) {
    // Get all price elements
    let priceElements = document.querySelectorAll('span._cDEzb_p13n-sc-price_3mJ9Z, li.a-carousel-card span.a-price, span.a-price, div.a-row.a-carousel-controls.a-carousel-row.a-carousel-has-buttons span.price, span.a-size-base.a-color-price, span#mbc-price-1.a-size-medium.a-color-price, span#mbc-price-2.a-size-medium.a-color-price, span#mbc-price-3.a-size-medium.a-color-price, span.a-size-mini.a-color-price.aok-nowrap, span.a-color-price._p13n-desktop-sims-fbt_fbt-desktop_total-amount__wLVdU');

    // Loop over each price element
    priceElements.forEach(priceElement => {
      // Get the price value
      let priceText = priceElement.textContent.trim();
      let priceValue = parseFloat(priceText.slice(1).replace(/,/g, ''));

      // Calculate the number of hours and minutes worked
      let hours = Math.floor(priceValue / hourlyWage);
      let minutes = Math.round((priceValue / hourlyWage - hours) * 60);

      // Format the output string with only hours and minutes
      let outputString = '';

      if (hours === 0 && minutes === 0) {
        outputString = '< 1 min';
      } else if (hours === 0) {
        outputString = `${minutes} min`;
      } else if (minutes === 0) {
        outputString = `${hours} hr`;
      } else {
        outputString = `${hours} hr ${minutes} min`;
      }

      // Update the price element with the new value
      priceElement.textContent = outputString;
    });
  }
});
