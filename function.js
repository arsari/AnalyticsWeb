function displayJSON() {
  document.querySelector('#json').innerHTML += `<p><em>dataLayer.push and utag.link [${
    window.dataLayer.length
  }]</em></p><pre>${JSON.stringify(window.dataLayer.at(-1), undefined, 2)}</pre>`;

  document.querySelectorAll('pre').forEach((e) => {
    e.style = 'background-color: #f1f1f1; border: 1px solid #ccc; border-radius: 10px;';
  });

  document.querySelector('#json').lastElementChild.scrollIntoView();
  document.querySelector('#json').lastElementChild.style =
    'background-color: lightyellow; border: 2px solid red; border-radius: 15px;';
}

const headerHeight = document.querySelector('header').offsetHeight;

document.querySelector('section').style = `margin-top: ${headerHeight + 25}px`;

const btnClick = document.querySelectorAll('button');

btnClick.forEach((e) => {
  e.addEventListener('click', () => {
    if (e.id === 'purchase') {
      const transactionID = `T-${Math.floor(Math.random() * 10000)}`;
      const itemPrice = Math.floor(Math.random() * 100 + 1);
      const itemQty = Math.floor(Math.random() * 30 + 1);
      const itemDiscount = Number((itemPrice * 0.15).toFixed(2));
      const total = (itemPrice - itemDiscount) * itemQty;

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
        button_clicked: e.innerText,
        ecommerce: {
          transaction_id: transactionID,
          affiliation: 'Merchandise Store',
          value: total,
          tax: Number((total * 0.07).toFixed(2)),
          shipping: Number((total * 0.12).toFixed(2)),
          currency: 'USD',
          coupon: 'SUMMER_SALE',
          items: [
            {
              item_id: 'SKU_12345',
              item_name: 'Stan and Friends Tee',
              affiliation: 'Merchandise Store',
              coupon: 'SUMMER_FUN',
              currency: 'USD',
              discount: itemDiscount,
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
              price: itemPrice,
              quantity: itemQty,
            },
          ],
        },
      });
      utag.link({
        event: e.id,
        event_type: 'conversion',
        page_title: utag.data['dom.title'],
        page_location: utag.data['dom.url'],
        button_clicked: e.innerText,
        ecommerce: {
          transaction_id: transactionID,
          affiliation: 'Merchandise Store',
          value: total,
          tax: Number((total * 0.07).toFixed(2)),
          shipping: Number((total * 0.12).toFixed(2)),
          currency: 'USD',
          coupon: 'SUMMER_SALE',
          items: [
            {
              item_id: 'SKU_12345',
              item_name: 'Stan and Friends Tee',
              affiliation: 'Merchandise Store',
              coupon: 'SUMMER_FUN',
              currency: 'USD',
              discount: itemDiscount,
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
              price: itemPrice,
              quantity: itemQty,
            },
          ],
        },
      });
      displayJSON();
    } else {
      let contactMethod;

      if (e.id === 'email') {
        contactMethod = 'email';
      } else if (e.id === 'phone') {
        contactMethod = 'phone';
      }

      window.dataLayer.push({
        event: e.id,
        event_type: e.id === 'generated_lead' ? 'conversion' : 'ui interaction',
        page_title: utag.data['dom.title'],
        page_location: utag.data['dom.url'],
        button_clicked: e.innerText,
        contact_method: contactMethod,
        file_type: e.id === 'download' ? 'pdf' : undefined,
        video_title: e.id === 'video_watched' ? 'Stan and Friends' : undefined,
        currency: e.id === 'generated_lead' ? 'USD' : undefined,
        value: e.id === 'generated_lead' ? 50 : undefined,
      });
      utag.link({
        event: e.id,
        event_type: e.id === 'generated_lead' ? 'conversion' : 'ui interaction',
        page_title: utag.data['dom.title'],
        page_location: utag.data['dom.url'],
        button_clicked: e.innerText,
        contact_method: contactMethod,
        file_type: e.id === 'download' ? 'pdf' : undefined,
        video_title: e.id === 'video_watched' ? 'Stan and Friends' : undefined,
        currency: e.id === 'generated_lead' ? 'USD' : undefined,
        value: e.id === 'generated_lead' ? 50 : undefined,
      });
      displayJSON();
    }
  });
});
