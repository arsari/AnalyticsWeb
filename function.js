/**
 * Web Analytics Implementation Playground
 *
 * Main function file with the source code of the different events and parameters
 * that are being sent to Google Analytics and Tealium.
 *
 * @author:	Arturo Santiago-Rivera (asantiago@arsari.com)
 * @license: MIT License
 */

// ================== //

/* Section element set up by getting the height of the header and adding 25px to it, and then
setting the margin-top of the section to that value. */
const headerHeight = document.querySelector('header').offsetHeight;
document.querySelector('main').style = `margin-top: ${headerHeight + 15}px`;

/* Footer labeling set up */
document.querySelector('footer').innerHTML = `<span class="env">Env->[
  <span class="prop">${tealiumEnv}</span> ] &boxV; GA4->[ <span class="prop">${ga4Prop}</span> ] &boxV; GTM->[ <span class="prop">${gtmContainer}</span> ]
  </span><span class="me">Coded with &hearts; by ARSARI &boxV; Best view in Desktop</span>`;

/**
 * It takes a boolean value, and if it's true, it adds a span to the output, and
 * then it adds a preformatted block of JSON to the output
 * @param status - true/false - whether the user is logged in or not
 */
function displayJSON(status) {
  let userLogged = '';
  if (status) {
    userLogged = '<span>User Logged In</span>';
  } else if (window.dataLayer.at(-1).event === 'logout') {
    userLogged = '<span class="alert">User Logged Out</span>';
  }

  document.querySelector('#json').innerHTML += `<p><em>dataLayer.push and utag.link [${
    window.dataLayer.length
  }]</em>${userLogged}</p><pre>${JSON.stringify(window.dataLayer.at(-1), undefined, 2)}</pre>`;

  document.querySelectorAll('pre').forEach((e) => {
    e.className = 'normal';
    e.previousElementSibling.className = 'normal';
  });

  const focusThis = document.querySelector('#json');
  focusThis.lastElementChild.scrollIntoView();
  focusThis.lastElementChild.className = 'highlight';
  focusThis.lastElementChild.previousElementSibling.classList.remove('normal');
}

/**
 * The function ecommerceModal() toggles the class 'show-modal' on the element with
 * the id 'ecommerce-modal'
 */
function ecommerceModal() {
  eModal.classList.toggle('show-modal');
  document.querySelector('#itemsSelectedRows').innerHTML = '';
  document.querySelector('.add-to-cart-wrap').classList.remove('hide');
  document.querySelector('.view-cart-wrap').classList.remove('show');
  document.querySelector('#begin_checkout').classList.remove('inactive');
  itemsSelected = [];
  itemsValue = 0;
}

/**
 * The function searchModal() toggles the class 'show-modal' on the element with
 * the id 'search-modal'
 */
function searchModal() {
  sModal.classList.toggle('show-modal');
}

/**
 * The function formModal() toggles the class 'show-modal' on the element with the
 * id 'form-modal'
 */
function formModal() {
  fModal.classList.toggle('show-modal');
  document.querySelector('.ty-message-wrap').classList.remove('show');
  document.querySelector('.form-wrap').classList.remove('hide');
  document.getElementById('fname').value = '';
  document.getElementById('profession').value = '';
}

/**
 * If the input is not a string, return an error message. Otherwise, return the
 * first letter of the string capitalized and the rest of the string lowercased.
 * @param str - The string to capitalize.
 * @returns The first letter of the string is being capitalized and the rest of the
 * string is being lowercased.
 */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Returns a string representing the current date and time in the format of the
 * ISO 8601 standard
 * @returns A string representing the current date and time in the format:
 * YYYY-MM-DD HH:mm:ss.sss UTC+/-HH:mm
 */
function timeStamp() {
  const d = new Date();
  const tzo = d.getTimezoneOffset();
  const dif = tzo >= 0 ? '-' : '+';
  const pad = (num) => {
    const norm = Math.floor(Math.abs(num));
    return (norm < 10 ? '0' : '') + norm;
  };
  const stamp = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} T${pad(d.getHours())}:${pad(
    d.getMinutes(),
  )}:${pad(d.getSeconds())}.${pad(d.getMilliseconds())} UTC${dif}${pad(tzo / 60)}:${pad(tzo % 60)}`;

  return stamp;
}

/**
 * The function handles error events by displaying an alert message, pushing data
 * to the dataLayer and sending a link event to utag, and then displaying JSON
 * data.
 * @param e - The parameter "e" represents an element object, which is used to
 * capture information about the element that triggered the error event.
 * @param m - The parameter "m" in the function errorEvent represents the error
 * message that will be displayed in the alert.
 * @param u - The parameter "u" represents the user ID.
 */
function errorEvent(e, m, ui) {
  alert(m);
  const tstamp = String(new Date().getTime());
  const cstamp = timeStamp();

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: /item/i.test(e.id) ? 'select_item_error' : `${e.id}_error`,
    event_type: 'content tool',
    button_text: /item/i.test(e.id) ? e.id : e.innerText,
    tag_name: e.tagName,
    error_message: m,
    alert_impression: true,
    event_timestamp: tstamp, // milliseconds
    custom_timestamp: cstamp, // ISO 8601
    // user properties
    logged_in: logged,
    user_id: ui,
  });

  utag.link({
    tealium_event: /item/i.test(e.id) ? 'select_item_error' : `${e.id}_error`,
    event_type: 'content tool',
    button_text: /item/i.test(e.id) ? e.id : e.innerText,
    tag_name: e.tagName,
    error_message: m,
    alert_impression: true,
    event_timestamp: tstamp, // milliseconds
    custom_timestamp: cstamp, // ISO 8601
    // user properties
    logged_in: logged,
    user_id: ui,
    custom_user_id: ui,
  });
  displayJSON(logged);
}

/**
 * The function `removeItem` is used to remove an item from the shopping cart and
 * update the cart's total value.
 * @param i - The parameter "i" in the removeItem function represents the index of
 * the item that needs to be removed from the shopping cart.
 * @param ui - The parameter `ui` represents the user ID. It is used to identify
 * the user who is performing the action of removing an item from the shopping
 * cart.
 */
function removeItem(i, ui) {
  const tstamp = String(new Date().getTime());
  const cstamp = timeStamp();
  const el = document.querySelector(`#removeItem${i}`);
  const ap = itemsSelected.length === 1 ? 0 : itemsSelected.findIndex((e) => e.index === i);
  const message = 'Product Removed from Shopping Cart';

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    ecommerce: null,
  }); // Clear the previous ecommerce object
  utag.link({
    ecommerce: null,
  }); // Clear the previous ecommerce object
  displayJSON(logged);

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'remove_from_cart',
    // event parameters
    button_text: el.innerText,
    event_type: 'ui interaction',
    tag_name: el.tagName,
    alert_message: message,
    alert_impression: true,
    ecommerce: {
      currency: 'USD',
      value: itemsSelected[ap].price,
      items: itemsSelected[ap],
    },
    event_timestamp: tstamp, // milliseconds
    custom_timestamp: cstamp, // ISO 8601
    // user properties
    logged_in: logged,
    user_id: ui,
  });

  utag.link({
    tealium_event: 'remove_from_cart',
    // event parameters
    button_text: el.innerText,
    event_type: 'ui interaction',
    tag_name: el.tagName,
    alert_message: message,
    alert_impression: true,
    ecommerce: {
      currency: 'USD',
      value: itemsSelected[ap].price,
      items: itemsSelected[ap],
    },
    event_timestamp: tstamp, // milliseconds
    custom_timestamp: cstamp, // ISO 8601
    // user properties
    logged_in: logged,
    user_id: ui,
    custom_user_id: ui,
  });
  displayJSON(logged);

  document
    .querySelector('#itemsSelectedRows')
    .removeChild(document.querySelector(`#removeItem${i}`).parentNode.parentNode);
  itemsValue -= itemsSelected[ap].price * itemsSelected[ap].quantity;
  document.querySelector('#subtotal').innerHTML = `$ ${itemsValue.toFixed(2)}`;
  itemsSelected.splice(ap, 1);
  if (itemsSelected.length === 0) {
    document.querySelector('#itemsSelectedRows').innerHTML =
      '<tr><td class="empty-cart" colspan="5">Shopping Cart is Empty</td></tr>';
    document.querySelector('#begin_checkout').classList.add('inactive');
  }
  alert(message);
}

/**
 * The function `selectItem` is used to handle the selection of an item, update the
 * data layer and perform other related actions.
 * @param i - The parameter `i` is the index of the item being selected.
 * @param ui - The parameter `ui` is the user ID. It is used to identify the user
 * who is interacting with the UI.
 * @returns The function does not explicitly return anything.
 */
function selectItem(i, ui) {
  const tstamp = String(new Date().getTime());
  const cstamp = timeStamp();
  const el = document.querySelector(`#Item${i}`);
  const qty = parseInt(document.querySelector(`#qty${i}`).value);
  if (qty === 0) {
    el.checked = false;
    const message = 'ERROR: Selected Item Quantity is Zero!';
    errorEvent(el, message, ui);
    return;
  }
  itemsList[i].index = itemsSelected.length * 1;
  itemsList[i].quantity = qty;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    ecommerce: null,
  }); // Clear the previous ecommerce object
  utag.link({
    ecommerce: null,
  }); // Clear the previous ecommerce object
  displayJSON(logged);

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'select_item',
    // event parameters
    button_text: el.id,
    event_type: 'ui interaction',
    tag_name: el.tagName,
    ecommerce: {
      item_list_id: 'related_products',
      item_list_name: 'Related products',
      items: itemsList[i],
    },
    event_timestamp: tstamp, // milliseconds
    custom_timestamp: cstamp, // ISO 8601
    // user properties
    logged_in: logged,
    user_id: ui,
  });

  utag.link({
    tealium_event: 'select_item',
    // event parameters
    button_text: el.innerText,
    event_type: 'ui interaction',
    tag_name: el.tagName,
    ecommerce: {
      item_list_id: 'related_products',
      item_list_name: 'Related products',
      items: itemsList[i],
    },
    event_timestamp: tstamp, // milliseconds
    custom_timestamp: cstamp, // ISO 8601
    // user properties
    logged_in: logged,
    user_id: ui,
    custom_user_id: ui,
  });
  displayJSON(logged);
  itemsSelected.push(itemsList[i]);
  itemsValue = itemsList[i].price;
  el.setAttribute('disabled', '');
}

/**
 * The function `chgQTY` is used to update the quantity of an item and calculate
 * the total price based on the quantity.
 * @param i - The parameter `i` represents the index of the item. It is used to
 * identify the specific item in the HTML document.
 * @param q - The parameter `q` is a string that represents the action to be
 * performed. It can have two possible values: 'plus' or any other value. If `q` is
 * 'plus', it means that the quantity should be increased by 1. If `q` is any other
 * value,
 */
function chgQTY(i, q) {
  let v = parseInt(document.querySelector(`#qty${i}`).value);
  const t = document.querySelector(`#total${i}`) ?? null;

  if (q === 'plus') {
    v += 1;
  } else {
    v = v === 0 ? 0 : v - 1;
  }

  document.querySelector(`#qty${i}`).value = v;

  if (t !== null) {
    t.innerHTML = `$${(itemsSelected[itemsSelected.findIndex((e) => e.index === i)].price * v).toFixed(2)}`;
    itemsSelected[itemsSelected.findIndex((e) => e.index === i)].quantity = v;
    itemsValue = 0;
    for (let j = 0; j < itemsSelected.length; j++) {
      itemsValue += itemsSelected[j].price * itemsSelected[j].quantity;
    }
    document.querySelector('#subtotal').innerHTML = `$ ${itemsValue.toFixed(2)}`;
  }
}

/**
 * Element listeners and global variables dependency start here
 */
let logged = false;
let vplay = false;
let vstop = true;
let vprogress = 0;
const vduration = 300;
const sModal = document.querySelector('.searchModal');
const fModal = document.querySelector('.formModal');
const eModal = document.querySelector('.ecommerceModal');
let storeEnable = false;
let itemsSelected = [];
let itemsValue = 0;
const sku = Math.floor(Math.random() * 10000);
const itemsList = [
  {
    item_name: 'Stan and Friends Tee',
    affiliation: 'Merchandise Store',
    currency: 'USD',
    item_brand: 'MyCollection',
    item_category: 'Apparel',
    item_category2: 'Adult',
    item_category3: 'Shirts',
    item_category4: 'Crew',
    item_category5: 'Short sleeve',
    item_list_id: 'related_products',
    item_list_name: 'Related Products',
    item_variant: 'green',
    location_id: 'ChIJIQBpAG2ahYAR_6128GcTUEo',
    price: 29.95,
  },
  {
    item_name: 'Friends Pants',
    affiliation: 'Merchandise Store',
    currency: 'USD',
    item_brand: 'MyCollection',
    item_category: 'Apparel',
    item_category2: 'Adult',
    item_category3: 'Pants',
    item_category4: 'Crew',
    item_category5: 'Regular Fit',
    item_list_id: 'related_products',
    item_list_name: 'Related Products',
    item_variant: 'blue',
    location_id: 'ChIJIQBpAG2ahYAR_6128GcTUEo',
    price: 39.95,
  },
  {
    item_name: 'Canyonlands Full-Zip Hoodie',
    affiliation: 'Merchandise Store',
    currency: 'USD',
    item_brand: 'MyCollection',
    item_category: 'Apparel',
    item_category2: 'Adult',
    item_category3: 'Jackets',
    item_category4: 'Crew',
    item_category5: 'Long sleeve',
    item_list_id: 'related_products',
    item_list_name: 'Related Products',
    item_variant: 'black',
    location_id: 'ChIJIQBpAG2ahYAR_6128GcTUEo',
    price: 99.0,
  },
];

/* The follow code is checking if there is a value stored in the Universally Unique Identifier (UUID)
key of the localStorage object. If there is a value, it assigns that value to the constant UUID. If
there is no value, it generates a new UUID using the crypto.getRandomValues method and assigns it to
the constant UUID. */
const UUID = localStorage.UUID ? localStorage.UUID : `U-${self.crypto.getRandomValues(new Uint32Array(1))}`;

const elemClick = document.querySelectorAll('[name="action"]');
elemClick.forEach((e) => {
  e.addEventListener('click', () => {
    let ui = logged ? UUID : 'guest';
    const sku1 = `SKU_1-${sku}`;
    const sku2 = `SKU_2-${sku + 7}`;

    const vp = 'Any Video Player'; // video title
    const vt = 'Walk in The Clouds'; // video provider
    const vu = '/videos/phantom'; // video url
    const vd = vduration; // video duration
    const bt = e.innerText; // button text
    let en; // event name
    let cm; // contact method
    let cc; // country currency
    let ev; // event value
    let vct; // video current time
    let milestone; // video progress milestone
    let vpct; // video progress percent
    let vs; // video status
    let lu; // link url
    let lc; // link classes
    let ol; // outbound link true/false
    let ld; // link domain
    let st; // search term
    let fd; // form destination
    let fst; // form submission text
    let up; // user profession
    let message; // alert message
    let tstamp; // event timestamp
    let cstamp; // custom timestamp

    if (storeEnable) {
      tstamp = String(new Date().getTime());
      cstamp = timeStamp();
      let tag;
      let et;

      const ecommerceSent = () => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          ecommerce: null,
        }); // Clear the previous ecommerce object
        utag.link({
          ecommerce: null,
        }); // Clear the previous ecommerce object
        displayJSON(logged);
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: en,
          // event parameters
          button_text: bt,
          event_type: et ?? 'ui interaction',
          tag_name: tag,
          ecommerce:
            en === 'ecommerce_modal_closed'
              ? null
              : {
                  currency: 'USD',
                  value: itemsValue,
                  items: itemsSelected,
                },
          event_timestamp: tstamp, // milliseconds
          custom_timestamp: cstamp, // ISO 8601
          // user properties
          logged_in: logged,
          user_id: ui,
        });

        utag.link({
          tealium_event: en,
          // event parameters
          button_text: bt,
          event_type: et ?? 'ui interaction',
          tag_name: tag,
          ecommerce:
            en === 'ecommerce_modal_closed'
              ? null
              : {
                  currency: 'USD',
                  value: itemsValue,
                  items: itemsSelected,
                },
          event_timestamp: tstamp, // milliseconds
          custom_timestamp: cstamp, // ISO 8601
          // user properties
          logged_in: logged,
          user_id: ui,
          custom_user_id: ui,
        });
        displayJSON(logged);
      };

      if (e.id === 'add_to_cart') {
        itemsValue = 0;

        if (itemsSelected.length === 0) {
          message = 'ERROR: Please Select a Product!';
          errorEvent(e, message, ui);
          return;
        }

        en = e.id;
        tag = e.tagName;
        for (let i = 0; i < itemsSelected.length; i++) {
          itemsValue += itemsSelected[i].price * itemsSelected[i].quantity;
        }
        ecommerceSent();

        /* view_cart event */
        document.querySelector('.add-to-cart-wrap').classList.add('hide');
        document.querySelector('#itemsListRows').innerHTML = '';
        document.querySelector('.view-cart-wrap').classList.add('show');

        for (const element of itemsSelected) {
          const row = document.createElement('tr');
          const keys = [
            element.item_id,
            element.item_name,
            element.price.toFixed(2),
            element.quantity,
            (element.price * element.quantity).toFixed(2),
          ];
          for (const key in keys) {
            const column = document.createElement('td');
            if (key === '0') {
              column.insertAdjacentHTML(
                'afterbegin',
                `<button id="removeItem${element.index}" type="submit" onclick=removeItem(${element.index},"${ui}")>remove</button><span style="margin-left:15px">${keys[key]}</span>`,
              );
            } else if (key === '3') {
              column.insertAdjacentHTML(
                'afterbegin',
                `<button onclick=chgQTY(${element.index},"minus")>-</button><input id="qty${element.index}" class="qty" type="text" value="${keys[key]}"><button onclick=chgQTY(${element.index},"plus")>+</button>`,
              );
            } else if (key === '4') {
              column.insertAdjacentHTML('afterbegin', `<span id="total${element.index}">$${keys[key]}</span>`);
            } else {
              column.appendChild(document.createTextNode(keys[key]));
            }
            row.appendChild(column);
            document.querySelector('#itemsSelectedRows').appendChild(row);
          }
        }
        document.querySelector('#subtotal').innerHTML = `$ ${itemsValue.toFixed(2)}`;

        en = 'view_cart';
        et = 'content tool';
        tag = e.tagName;
        ecommerceSent();
      }

      if (e.id === 'begin_checkout') {
        ecommerceModal();
        document.querySelector('#itemsSelectedRows').innerHTML = '';
        storeEnable = false;
      }

      if (e.id === 'ecommerce-close') {
        en = 'ecommerce_modal_closed';
        tag = e.tagName;
        ecommerceSent();
        storeEnable = false;
        ecommerceModal();
      }
    } else if (e.id === 'purchase') {
      if (logged) {
        const transactionID = `T-${Math.floor(Math.random() * 10000)}`;
        const itemPrice = Math.floor(Math.random() * 200 + 1);
        const itemQty = Math.floor(Math.random() * 30 + 1);
        const itemDiscount = Number((itemPrice * 0.15).toFixed(2));
        const subtotal = Number(((itemPrice - itemDiscount) * itemQty * 2).toFixed(2));
        tstamp = String(new Date().getTime());
        cstamp = timeStamp();

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          ecommerce: null,
        }); // Clear the previous ecommerce object
        utag.link({
          ecommerce: null,
        }); // Clear the previous ecommerce object
        displayJSON(logged);
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: e.id,
          // event parameters
          button_text: bt,
          event_type: 'conversion',
          tag_name: e.tagName,
          ecommerce: {
            transaction_id: transactionID,
            affiliation: 'Merchandise Store',
            coupon: 'SUMMER_SALE',
            currency: 'USD',
            shipping: Number((subtotal * 0.12).toFixed(2)),
            tax: Number((subtotal * 0.07).toFixed(2)),
            value: subtotal,
            items: [
              {
                item_id: sku1,
                item_name: 'Stan and Friends Tee',
                affiliation: 'Merchandise Store',
                coupon: 'SUMMER_FUN',
                currency: 'USD',
                discount: itemDiscount,
                index: 0,
                item_brand: 'MyCollection',
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
              {
                item_id: sku2,
                item_name: 'Friends Pants',
                affiliation: 'Merchandise Store',
                coupon: 'SUMMER_FUN',
                currency: 'USD',
                discount: itemDiscount,
                index: 1,
                item_brand: 'MyCollection',
                item_category: 'Apparel',
                item_category2: 'Adult',
                item_category3: 'Pants',
                item_category4: 'Crew',
                item_category5: 'Regular Fit',
                item_list_id: 'related_products',
                item_list_name: 'Related Products',
                item_variant: 'blue',
                location_id: 'ChIJIQBpAG2ahYAR_6128GcTUEo',
                price: itemPrice,
                quantity: itemQty,
              },
            ],
          },
          event_timestamp: tstamp, // milliseconds
          custom_timestamp: cstamp, // ISO 8601
          // user properties
          logged_in: logged,
          user_id: ui,
        });

        utag.link({
          tealium_event: e.id,
          // event parameters
          button_text: bt,
          event_type: 'conversion',
          tag_name: e.tagName,
          ecommerce: {
            transaction_id: transactionID,
            affiliation: 'Merchandise Store',
            coupon: 'SUMMER_SALE',
            currency: 'USD',
            shipping: Number((subtotal * 0.12).toFixed(2)),
            tax: Number((subtotal * 0.07).toFixed(2)),
            value: subtotal,
            items: [
              {
                item_id: sku1,
                item_name: 'Stan and Friends Tee',
                affiliation: 'Merchandise Store',
                coupon: 'SUMMER_FUN',
                currency: 'USD',
                discount: itemDiscount,
                index: 0,
                item_brand: 'MyCollection',
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
              {
                item_id: sku2,
                item_name: 'Friends Pants',
                affiliation: 'Merchandise Store',
                coupon: 'SUMMER_FUN',
                currency: 'USD',
                discount: itemDiscount,
                index: 1,
                item_brand: 'MyCollection',
                item_category: 'Apparel',
                item_category2: 'Adult',
                item_category3: 'Pants',
                item_category4: 'Crew',
                item_category5: 'Regular Fit',
                item_list_id: 'related_products',
                item_list_name: 'Related Products',
                item_variant: 'blue',
                location_id: 'ChIJIQBpAG2ahYAR_6128GcTUEo',
                price: itemPrice,
                quantity: itemQty,
              },
            ],
          },
          event_timestamp: tstamp, // milliseconds
          custom_timestamp: cstamp, // ISO 8601
          // user properties
          logged_in: logged,
          user_id: ui,
          custom_user_id: ui,
        });
        displayJSON(logged);
      } else {
        message = 'ERROR: Please Sign In!';
        errorEvent(e, message, ui);
        return;
      }
    } else {
      if (e.id === 'ecommerce-modal') {
        if (logged) {
          ecommerceModal();
          for (const element of itemsList) {
            const row = document.createElement('tr');
            const itemSKU = Math.floor(Math.random() * 10000);
            element.item_id = `SKU_${itemSKU}`;
            element.quantity = 0;
            const keys = [
              element.item_id,
              element.item_brand,
              element.item_name,
              element.item_variant,
              `$${element.price.toFixed(2)}`,
              element.quantity,
            ];
            for (const key in keys) {
              const column = document.createElement('td');
              if (key === '0') {
                column.insertAdjacentHTML(
                  'afterbegin',
                  `<input id="Item${itemsList.indexOf(element)}" type="checkbox" onclick=selectItem(${itemsList.indexOf(
                    element,
                  )},"${ui}")><span style="margin-left:15px">${keys[key]}</span>`,
                );
              } else if (key === '2') {
                column.insertAdjacentHTML(
                  'afterbegin',
                  `${element.item_name}<br>${element.item_category2} ${element.item_category3} ${element.item_category5}`,
                );
              } else if (key === '5') {
                column.insertAdjacentHTML(
                  'afterbegin',
                  `<button onclick=chgQTY(${itemsList.indexOf(
                    element,
                  )},"minus")>-</button><input id="qty${itemsList.indexOf(element)}" class="qty" type="text" value="${
                    keys[key]
                  }"><button onclick=chgQTY(${itemsList.indexOf(element)},"plus")>+</button>`,
                );
              } else {
                column.appendChild(document.createTextNode(keys[key]));
              }
              row.appendChild(column);
              document.querySelector('#itemsListRows').appendChild(row);
            }
          }
          en = 'view_item_list';

          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            ecommerce: null,
          }); // Clear the previous ecommerce object
          utag.link({
            ecommerce: null,
          }); // Clear the previous ecommerce object
          displayJSON(logged);
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: en,
            // event parameters
            button_text: `${bt} [modal open]`,
            event_type: 'ui interaction',
            tag_name: e.tagName,
            ecommerce: {
              item_list_id: 'related_products',
              item_list_name: 'Related products',
              items: itemsList,
            },
            event_timestamp: tstamp, // milliseconds
            custom_timestamp: cstamp, // ISO 8601
            // user properties
            logged_in: logged,
            user_id: ui,
          });

          utag.link({
            tealium_event: en,
            // event parameters
            button_text: `${bt} [modal open]`,
            event_type: 'ui interaction',
            tag_name: e.tagName,
            ecommerce: {
              item_list_id: 'related_products',
              item_list_name: 'Related products',
              items: itemsList,
            },
            event_timestamp: tstamp, // milliseconds
            custom_timestamp: cstamp, // ISO 8601
            // user properties
            logged_in: logged,
            user_id: ui,
            custom_user_id: ui,
          });
          storeEnable = true;
          displayJSON(logged);
          return;
        }
        message = 'ERROR: Please Sign In!';
        errorEvent(e, message, ui);
        return;
      }

      if (e.id === 'email' || e.id === 'phone') {
        en = 'generate_lead';
        cc = 'USD';

        if (e.id === 'email') {
          cm = 'email';
          ev = 50;
        } else {
          cm = 'phone';
          ev = 25;
        }
      }

      if (e.id === 'form-modal') {
        en = 'form_start';
        fd = 'form modal open';
        formModal();
      }

      if (e.id === 'form') {
        const userName = document.getElementById('fname').value;
        const userProf = document.getElementById('profession').value;
        if (userName.trim() && userProf.trim()) {
          if (userName.match(/mailto:|tel:|^[\w\-.]+@[\w\-.]+|@/i)) {
            message = 'ERROR: PII or special characters not allowed in Full Name input.';
            errorEvent(e, message, ui);
            document.getElementById('fname').value = '';
            return;
          }
          if (userProf.match(/mailto:|tel:|^[\w\-.]+@[\w\-.]+|@/i)) {
            message = 'ERROR: PII or special characters not allowed in Profession input.';
            errorEvent(e, message, ui);
            document.getElementById('profession').value = '';
            return;
          }
          up = capitalize(userProf);
        } else {
          message = "ERROR: Form inputs can't be blank.";
          errorEvent(e, message, ui);
          return;
        }

        en = 'form_submit';
        cm = 'form filled';
        fd = 'customer service';
        fst = `Thank you for your submission, ${capitalize(userName)}! We will be in touch shortly.`;
        cc = 'USD';

        document.querySelector('.form-wrap').classList.add('hide');
        document.querySelector('.ty-message-wrap').classList.add('show');
        document.querySelector('#thank-you-message').innerHTML = fst;
        setTimeout(formModal, 5000);
      }

      if (e.id === 'form-close') {
        en = 'form_modal_closed';
        formModal();
      }

      if (e.id === 'download') {
        if (logged) {
          en = 'file_download';
          ld = window.location.hostname;
          lc = e.className;
        } else {
          message = 'ERROR: Please Sign In!';
          errorEvent(e, message, ui);
          return;
        }
      }

      if (e.id === 'extlink' || e.id === 'github') {
        en = 'outbound_link';
        lu = e.href;
        const domain = new URL(lu);
        ld = domain.hostname;
        lc = e.className ? e.className : undefined;
        ol = true;
      }

      if (e.id === 'intlink') {
        en = 'internal_link';
        lu = e.href;
        const domain = new URL(lu);
        ld = domain.hostname;
        lc = e.className;
      }

      if (e.id === 'video') {
        if (vstop) {
          document.querySelector('#video .text').classList.add('playing');
          document.querySelector('#video').style = 'background-color: red;';
          en = 'video_start';
          vplay = true;
          vstop = false;
          vs = 'Play';
        } else {
          document.querySelector('#video .text').classList.remove('playing');
          document.querySelector('#video').style = 'background-color: #4caf50;';
          en = 'video_stop';
          vplay = false;
          vstop = true;
          vs = 'Stop';
        }
        vct = vprogress;
        vpct = `${Number(((vprogress / vduration) * 100).toFixed(1))}%`;
      }

      // Video progress interval after video_start event
      const interval = setInterval(() => {
        ui = logged ? UUID : 'guest';

        if (vplay) {
          vprogress += 1;
          tstamp = String(new Date().getTime());
          cstamp = timeStamp();

          const sendData = () => {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              event: en,
              event_type: 'content tool',
              video_duration: vd,
              video_current_time: vct,
              video_percent: vpct,
              video_status: vs,
              video_provider: vp,
              video_title: vt,
              video_url: vu,
              event_timestamp: tstamp, // milliseconds
              custom_timestamp: cstamp, // ISO 8601
              // user properties
              logged_in: logged,
              user_id: ui,
            });
            utag.link({
              tealium_event: en,
              event_type: 'content tool',
              video_duration: vd,
              video_current_time: vct,
              video_percent: vpct,
              video_status: vs,
              video_provider: vp,
              video_title: vt,
              video_url: vu,
              event_timestamp: tstamp, // milliseconds
              custom_timestamp: cstamp, // ISO 8601
              // user properties
              logged_in: logged,
              user_id: ui,
              custom_user_id: ui,
            });
            displayJSON(logged);
          };

          milestone = Number(((vprogress / vduration) * 100).toFixed(1));

          if ([10, 25, 50, 75, 90].includes(milestone)) {
            en = 'video_progress';
            vct = vprogress;
            vpct = `${milestone}%`;
            vs = `Progress ${milestone}%`;
            sendData();
          }

          if (vprogress === vduration) {
            document.querySelector('#video .text').classList.remove('playing');
            document.querySelector('#video').style = 'background-color: #4caf50;';
            en = 'video_complete';
            vct = vprogress;
            vpct = `${milestone}%`;
            vs = 'Complete';
            vprogress = 0;
            vplay = false;
            vstop = true;
            clearInterval(interval);
            sendData();
          }
        }
      }, 1000);

      if (vs === 'Stop') {
        clearInterval(interval);
      }

      if (e.id === 'search-modal') {
        if (logged) {
          en = 'search_modal_opened';
          searchModal();
        } else {
          message = 'ERROR: Please Sign In!';
          errorEvent(e, message, ui);
          return;
        }
      }

      if (e.id === 'search') {
        if (e.previousElementSibling.value.trim()) {
          const verify = e.previousElementSibling.value.trim();
          if (verify.match(/mailto:|tel:|^[\w\-.]+@[\w\-.]+|@/i)) {
            message = 'ERROR: PII or special characters not allowed as Search Term.';
            errorEvent(e, message, ui);
            e.previousElementSibling.value = '';
            return;
          }
          st = capitalize(verify);
          e.previousElementSibling.value = '';
        } else {
          message = "ERROR: Search term can't be blank.";
          errorEvent(e, message, ui);
          return;
        }
        searchModal();
      }

      if (e.id === 'search-close') {
        en = 'search_modal_closed';
        searchModal();
      }

      if (e.id === 'login') {
        if (logged) {
          message = "ERROR: Oops! I'm sorry you already Sign In.";
          errorEvent(e, message, ui);
          return;
        }
        logged = true;
        ui = UUID;
        localStorage.logged = logged;
        localStorage.UUID = ui;
      }

      if (e.id === 'logout') {
        if (logged) {
          logged = false;
          localStorage.logged = logged;
        } else {
          message = "ERROR: Oops! I'm sorry you already Sign Out.";
          errorEvent(e, message, ui);
          return;
        }
      }

      tstamp = String(new Date().getTime());
      cstamp = timeStamp();

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: en || e.id,
        // event parameters
        button_text: e.tagName === 'BUTTON' && bt !== '' ? bt : undefined,
        contact_method: cm,
        currency: cc,
        event_type: /generate_lead|form_submit|ecommerce_start/i.test(en) ? 'conversion' : 'ui interaction',
        file_extension: e.id === 'download' ? 'pdf' : undefined,
        file_name: e.id === 'download' ? 'PDF_to_Download' : undefined,
        form_destination: fd,
        form_id: e.id.includes('form') ? e.id : undefined,
        form_name: e.id.includes('form') ? 'User Profession Survey' : undefined,
        form_submit_text: e.id === 'form' ? fst : undefined,
        link_domain: ld,
        link_classes: lc,
        link_id: /extlink|intlink|download|banner/i.test(e.id) ? e.id : undefined,
        link_url: lu,
        link_text: /extlink|intlink|download|banner/i.test(e.id) ? bt : undefined,
        method: e.id === 'login' ? 'Google' : undefined,
        outbound: ol,
        search_term: st,
        tag_name: e.tagName,
        value: ev,
        video_duration: e.id.includes('video') && (vplay === true || vstop === true) ? vd : undefined,
        video_current_time: e.id.includes('video') && (vplay === true || vstop === true) ? vct : undefined,
        video_percent: e.id.includes('video') && (vplay === true || vstop === true) ? vpct : undefined,
        video_status: e.id.includes('video') && (vplay === true || vstop === true) ? vs : undefined,
        video_provider: e.id.includes('video') && (vplay === true || vstop === true) ? vp : undefined,
        video_title: e.id.includes('video') && (vplay === true || vstop === true) ? vt : undefined,
        video_url: e.id.includes('video') && (vplay === true || vstop === true) ? vu : undefined,
        event_timestamp: tstamp, // milliseconds
        custom_timestamp: cstamp, // ISO 8601
        // user properties
        logged_in: logged,
        user_id: ui,
        user_profession: up,
      });

      utag.link({
        tealium_event: en || e.id,
        // event parameters
        button_text: e.tagName === 'BUTTON' && bt !== '' ? bt : undefined,
        contact_method: cm,
        currency: cc,
        event_type: /generate_lead|form_submit|ecommerce_start/i.test(en) ? 'conversion' : 'ui interaction',
        file_extension: e.id === 'download' ? 'pdf' : undefined,
        file_name: e.id === 'download' ? 'PDF_to_Download' : undefined,
        form_destination: fd,
        form_id: e.id.includes('form') ? e.id : undefined,
        form_name: e.id.includes('form') ? 'User Profession Survey' : undefined,
        form_submit_text: e.id === 'form' ? fst : undefined,
        link_domain: ld,
        link_classes: lc,
        link_id: /extlink|intlink|download|banner/i.test(e.id) ? e.id : undefined,
        link_url: lu,
        link_text: /extlink|intlink|download|banner/i.test(e.id) ? bt : undefined,
        method: e.id === 'login' ? 'Google' : undefined,
        outbound: ol,
        search_term: st,
        tag_name: e.tagName,
        value: ev,
        video_duration: e.id.includes('video') && (vplay === true || vstop === true) ? vd : undefined,
        video_current_time: e.id.includes('video') && (vplay === true || vstop === true) ? vct : undefined,
        video_percent: e.id.includes('video') && (vplay === true || vstop === true) ? vpct : undefined,
        video_status: e.id.includes('video') && (vplay === true || vstop === true) ? vs : undefined,
        video_provider: e.id.includes('video') && (vplay === true || vstop === true) ? vp : undefined,
        video_title: e.id.includes('video') && (vplay === true || vstop === true) ? vt : undefined,
        video_url: e.id.includes('video') && (vplay === true || vstop === true) ? vu : undefined,
        event_timestamp: tstamp, // milliseconds
        custom_timestamp: cstamp, // ISO 8601
        // user properties
        logged_in: logged,
        user_id: ui,
        custom_user_id: ui,
        user_profession: up,
      });

      displayJSON(logged);
    }

    document.querySelectorAll('[name = "action"]').forEach((element) => {
      element.removeAttribute('disabled');
    });

    if (!e.id.match(/close/i)) {
      e.setAttribute('disabled', '');
    }
  });
});
