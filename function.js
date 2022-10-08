function myFunction(e) {
  window.dataLayer = window.dataLayer || [];

  if (e === 'purchase') {
    window.dataLayer.push({
      event: e,
      ecommerce: {
        purchase: {
          actionField: {
            id: 'T12345',
            affiliation: 'Online Store',
            value: 15.25 + 33.75,
            tax: 4.9,
            shipping: 5.99,
            coupon: 'SUMMER_SALE',
          },
          products: [
            {
              name: 'Triblend Android T-Shirt',
              id: '12345',
              price: 15.25,
              brand: 'Google',
              category: 'Apparel',
              variant: 'Gray',
              quantity: 1,
            },
            {
              name: 'Donut Friday Scented T-Shirt',
              id: '67890',
              price: 33.75,
              brand: 'Google',
              category: 'Apparel',
              variant: 'Black',
              quantity: 1,
            },
          ],
        },
      },
    });
  }

  if (e === 'download') {
    window.dataLayer.push({
      event: e,
    });
  }

  document.querySelector('#datalayer').innerHTML += `<pre>${JSON.stringify(
    window.dataLayer.at(-1),
    undefined,
    2,
  )}</pre>`;
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') module.exports = myFunction;
else window.myFunction = myFunction;
