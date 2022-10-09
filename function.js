window.dataLayer = window.dataLayer || [];

function displayJSON() {
  document.querySelector('#json').innerHTML += `<p><em>dataLayer.push and utag.link ${
    window.dataLayer.length
  }</em></p><pre>${JSON.stringify(window.dataLayer.at(-1), undefined, 2)}</pre>`;
}

const btnClick = document.querySelectorAll('button');

btnClick.forEach((e) => {
  e.addEventListener('click', () => {
    if (e.id === 'purchase') {
      window.dataLayer.push({
        event: 'clear_ecommerce',
        event_type: 'content tool',
        ecommerce: null,
      }); // Clear the previous ecommerce object
      utag.link({
        event: 'clear_ecommerce',
        event_type: 'content tool',
        ecommerce: null,
      }); // Clear the previous ecommerce object
      displayJSON();
      window.dataLayer.push({
        event: e.id,
        event_type: 'conversion',
        page_title: utag.data['dom.title'],
        page_location: utag.data['dom.url'],
        ecommerce: {
          transaction_id: 'T_12345',
          affiliation: 'Google Merchandise Store',
          value: 25.42,
          tax: 4.9,
          shipping: 5.99,
          currency: 'USD',
          coupon: 'SUMMER_SALE',
          items: [
            {
              item_id: 'SKU_12345',
              item_name: 'Stan and Friends Tee',
              affiliation: 'Google Merchandise Store',
              coupon: 'SUMMER_FUN',
              currency: 'USD',
              discount: 2.22,
              index: 0,
              item_brand: 'Google',
              item_category: 'Apparel',
              item_category2: 'Adult',
              item_category3: 'Shirts',
              item_category4: 'Crew',
              item_category5: 'Short sleeve',
              item_list_id: 'related_products',
              item_list_name: 'Related Products',
              item_variant: 'green',
              location_id: 'ChIJIQBpAG2ahYAR_6128GcTUEo',
              price: 9.99,
              quantity: 1,
            },
          ],
        },
      });
      utag.link({
        event: e.id,
        event_type: 'conversion',
        page_title: utag.data['dom.title'],
        page_location: utag.data['dom.url'],
        ecommerce: {
          transaction_id: 'T_12345',
          affiliation: 'Google Merchandise Store',
          value: 25.42,
          tax: 4.9,
          shipping: 5.99,
          currency: 'USD',
          coupon: 'SUMMER_SALE',
          items: [
            {
              item_id: 'SKU_12345',
              item_name: 'Stan and Friends Tee',
              affiliation: 'Google Merchandise Store',
              coupon: 'SUMMER_FUN',
              currency: 'USD',
              discount: 2.22,
              index: 0,
              item_brand: 'Google',
              item_category: 'Apparel',
              item_category2: 'Adult',
              item_category3: 'Shirts',
              item_category4: 'Crew',
              item_category5: 'Short sleeve',
              item_list_id: 'related_products',
              item_list_name: 'Related Products',
              item_variant: 'green',
              location_id: 'ChIJIQBpAG2ahYAR_6128GcTUEo',
              price: 9.99,
              quantity: 1,
            },
          ],
        },
      });
      displayJSON();
    } else {
      window.dataLayer.push({
        event: e.id,
        event_type: 'ui interaction',
        page_title: utag.data['dom.title'],
        page_location: utag.data['dom.url'],
      });
      utag.link({
        event: e.id,
        event_type: 'ui interaction',
        page_title: utag.data['dom.title'],
        page_location: utag.data['dom.url'],
      });
      displayJSON();
    }
  });
});
