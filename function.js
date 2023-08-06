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
  const si = /item/i.test(e.id) ? 'yes' : e.id;
  let en;
  let bt;
  let sh;
  switch (si) {
    case 'yes':
      en = 'select_item';
      bt = e.id;
      sh = e.parentNode.parentNode.parentNode.parentNode.parentNode.previousElementSibling.innerText;
      break;
    case 'checkout2':
      en = 'add_shipping_info';
      bt = 'Add Shipping Info';
      break;
    case 'checkout3':
      en = 'add_payment_info';
      bt = 'Add Payment Info';
      break;
    default:
      en = e.id;
      bt = e.innerText;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: `${en}_error`,
    event_type: 'content tool',
    button_text: bt,
    tag_name: e.tagName,
    step: step.at(-1),
    section_heading: sh ?? undefined,
    error_message: m,
    alert_impression: true,
    event_timestamp: tstamp, // milliseconds
    custom_timestamp: cstamp, // ISO 8601
    // user properties
    logged_in: logged,
    user_id: ui,
  });

  utag.link({
    event: `${en}_error`,
    event_type: 'content tool',
    button_text: bt,
    tag_name: e.tagName,
    step: step.at(-1),
    section_heading: sh ?? undefined,
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
 * The function `removeItem` is used to remove an item from a shopping cart and
 * update the cart's total value.
 * @param i - The parameter `i` in the `removeItem` function represents the index
 * of the item that needs to be removed from the shopping cart.
 * @param ui - The parameter `ui` is the user ID. It is used to identify the user
 * who performed the action of removing an item from the shopping cart.
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
    step: step.at(-1),
    section_heading: itemsSelected[ap].item_category.toUpperCase(),
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
    step: step.at(-1),
    section_heading: itemsSelected[ap].item_category.toUpperCase(),
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
    document.querySelector('#checkout1').classList.add('inactive');
    document.querySelector('#coupon').classList.add('ghost');
  }
  alert(message);
}

/**
 * The `selectItem` function is used to handle the selection of an item and trigger
 * various tracking events and actions.
 * @param i - The parameter `i` represents the index of the selected item in the
 * `itemsList` array.
 * @param ui - The parameter `ui` is the user ID. It is used to identify the user
 * who is interacting with the UI.
 * @returns The function does not explicitly return a value.
 */
function selectItem(i, ui) {
  const tstamp = String(new Date().getTime());
  const cstamp = timeStamp();
  const el = document.querySelector(`#Item${i}`);
  const sh = el.parentNode.parentNode.parentNode.parentNode.parentNode.previousElementSibling.innerText;
  const qty = parseInt(document.querySelector(`#qty${i}`).value);
  if (qty === 0) {
    el.checked = false;
    const message = 'ERROR: Selected item has zero quantity!';
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
    step: step.at(-1),
    section_heading: sh ?? undefined,
    ecommerce: {
      item_list_id: itemsList[i].item_list_id,
      item_list_name: itemsList[i].item_list_name,
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
    button_text: el.id,
    event_type: 'ui interaction',
    tag_name: el.tagName,
    step: step.at(-1),
    section_heading: sh ?? undefined,
    ecommerce: {
      item_list_id: itemsList[i].item_list_id,
      item_list_name: itemsList[i].item_list_name,
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
  document.querySelector(`#qty${i}`).previousElementSibling.setAttribute('disabled', '');
  document.querySelector(`#qty${i}`).nextElementSibling.setAttribute('disabled', '');
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
    for (const element of itemsSelected) {
      itemsValue += Number((element.price * element.quantity).toFixed(2));
    }
    document.querySelector('#subtotal').innerHTML = `$ ${itemsValue.toFixed(2)}`;
  }
}

/**
 * The function `chgSHIPPING` calculates the shipping cost and updates the total
 * cost based on the selected shipping option.
 */
function chgSHIPPING() {
  const s = document.querySelector('#chgSHIPP').value;
  let c = shipping;

  switch (s) {
    case 'express':
      c = Number((itemsValue * 0.12).toFixed(2)) + 10;
      break;
    case 'overnight':
      c = Number((itemsValue * 0.12).toFixed(2)) + 20;
      break;
    case 'standard':
      c = Number((itemsValue * 0.12).toFixed(2));
      break;
    default:
      c = shipping;
  }

  document.querySelector('#shippingCost').innerHTML = `$ ${c.toFixed(2)}`;
  document.querySelector('#total').innerHTML = `$ ${(itemsValue + tax + c).toFixed(2)}`;
  customerInfo.shipping = s;
}

/**
 * The function `creditCardType` checks the inputted credit card number and
 * displays the corresponding credit card logo based on the card type.
 * @returns the HTML code for the corresponding credit card logo based on the input
 * card number. If the card number matches any of the specified patterns, the
 * function inserts the corresponding logo image into the HTML element with the id
 * "cclogo". If the card number does not match any of the patterns, the function
 * sets the innerHTML of the "cclogo" element to "Invalid Card Number".
 */
function creditCardType() {
  const cc = document.querySelector('#cardnum').value;
  document.querySelector('#cclogo').innerHTML = '';

  if (/^(?:2131|1800|35\d{3})\d{11}$/.test(cc)) {
    return document
      .querySelector('#cclogo')
      .insertAdjacentHTML(
        'afterbegin',
        '<img src="https://www.global.jcb/en/about-us/brand-concept/images/index/pic_jcbcard_02.png" alt="JCB"/>',
      );
  }
  if (/^3[47][0-9]{13}$/.test(cc)) {
    return document
      .querySelector('#cclogo')
      .insertAdjacentHTML(
        'afterbegin',
        '<img src="https://www.aexp-static.com/cdaas/one/statics/axp-static-assets/1.8.0/package/dist/img/logos/dls-logo-bluebox-solid.svg" alt="American Express"/>',
      );
  }
  if (/^3(?:0[0-5]|[68][0-9])[0-9]{11}$/.test(cc)) {
    return document
      .querySelector('#cclogo')
      .insertAdjacentHTML(
        'afterbegin',
        '<img src="https://www.dinersclub.com/content/experience-fragments/diners-club/home-header-xf/master/_jcr_content/root/header/image.coreimg.svg/1627886360030/dci-logo-default.svg" alt="DinersClub"/>',
      );
  }
  if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(cc)) {
    return document
      .querySelector('#cclogo')
      .insertAdjacentHTML(
        'afterbegin',
        '<img src="https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png" alt="Visa"/>',
      );
  }
  if (/^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/.test(cc)) {
    return document
      .querySelector('#cclogo')
      .insertAdjacentHTML(
        'afterbegin',
        '<img src="https://www.mastercard.us/content/dam/public/mastercardcom/na/us/en/homepage/Home/mc-logo-52.svg" alt="MasterCard"/>',
      );
  }
  if (/^6(?:011|5[0-9]{2})[0-9]{12}$/.test(cc)) {
    return document
      .querySelector('#cclogo')
      .insertAdjacentHTML(
        'afterbegin',
        '<img src="https://www.discover.com/content/dam/discover/en_us/global/logos/discover-logo.svg" alt="Discover"/>',
      );
  }
  return (document.querySelector('#cclogo').innerHTML = 'Invalid Card Number');
}

/**
 * The function `maskNumber` takes a number as input and replaces all digits
 * between the third and third-to-last positions with asterisks.
 * @param n - The parameter `n` is a number that needs to be masked.
 * @returns the masked version of the input number.
 */
function maskNumber(n) {
  let m = n.slice(0, 2);
  m += '*'.repeat(n.length - 4);
  m += n.slice(-4);
  return m;
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
let itemsSelected = []; // list of all items selected by user
let itemsList = []; // list of all list items view by user
let tempList; // temporary list for view_item_list
let panelFilled = [];
let itemsValue = 0;
let tax = 0; // tax
let shipping = 0; // shipping
let userCoupon; // coupon
let discountTotal = 0;
let step = []; // funnel step
const customerInfo = {};
const productList_1 = [
  {
    item_name: 'Stan and Friends Tee',
    affiliation: 'Merchandise Store',
    item_brand: 'MyCollection',
    item_category: 'Clothing',
    item_category2: 'Adult',
    item_category3: 'Shirts',
    item_category4: 'Crew',
    item_category5: 'Short Sleeve',
    item_list_id: 'adult_clothing',
    item_list_name: 'Adult Clothing',
    item_variant: 'green',
    location_id: 'ChIJIQBpAG2ahYAR_6128GcTUEo',
    price: 29.95,
  },
  {
    item_name: 'Friends Pants',
    affiliation: 'Merchandise Store',
    item_brand: 'MyCollection',
    item_category: 'Clothing',
    item_category2: 'Kids',
    item_category3: 'Pants',
    item_category4: 'Crew',
    item_category5: 'Regular Fit',
    item_list_id: 'kids_clothing',
    item_list_name: 'Kids Clothing',
    item_variant: 'blue',
    location_id: 'ChIJIQBpAG2ahYAR_6128GcTUEo',
    price: 59.99,
  },
  {
    item_name: 'Canyonlands Full-Zip Hoodie',
    affiliation: 'Merchandise Store',
    item_brand: 'MyCollection',
    item_category: 'Clothing',
    item_category2: 'Adult',
    item_category3: 'Jackets',
    item_category4: 'Crew',
    item_category5: 'Long Sleeve',
    item_list_id: 'adult_clothing',
    item_list_name: 'Adult Clothing',
    item_variant: 'black',
    location_id: 'ChIJIQBpAG2ahYAR_6128GcTUEo',
    price: 99.0,
  },
];
const productList_2 = [
  {
    item_name: 'GreenStride Motion 6 Mid Hiker',
    affiliation: 'Merchandise Store',
    item_brand: 'MyCollection',
    item_category: 'Footwear',
    item_category2: 'Mens',
    item_category3: 'GreenStride',
    item_category4: 'Waterproof',
    item_category5: 'Mid Hiker',
    item_list_id: 'mens_footwear',
    item_list_name: 'Mens Footwear',
    item_variant: 'leather/black',
    location_id: 'ChIJIQBpAG2ahYAR_6128GcTUEo',
    price: 119.95,
  },
  {
    item_name: 'Stone Street Premiun Platform',
    affiliation: 'Merchandise Store',
    item_brand: 'MyCollection',
    item_category: 'Footwear',
    item_category2: 'Womens',
    item_category3: 'Chukka',
    item_category4: 'Waterproof',
    item_category5: 'Platform',
    item_list_id: 'womens_footwear',
    item_list_name: 'Womens Footwear',
    item_variant: 'black',
    location_id: 'ChIJIQBpAG2ahYAR_6128GcTUEo',
    price: 140.0,
  },
  {
    item_name: 'Classic 6 Boot',
    affiliation: 'Merchandise Store',
    item_brand: 'MyCollection',
    item_category: 'Footwear',
    item_category2: 'Kids',
    item_category3: 'Classic',
    item_category4: 'Waterproof',
    item_category5: 'Boot',
    item_list_id: 'kids_footwear',
    item_list_name: 'Kids Footwear',
    item_variant: 'leather',
    location_id: 'ChIJIQBpAG2ahYAR_6128GcTUEo',
    price: 100.0,
  },
];

/* The follow code is checking if there is a value stored in the Universally Unique Identifier (UUID)
key of the localStorage object. If there is a value, it assigns that value to the constant UUID. If
there is no value, it generates a new UUID using the crypto.getRandomValues method and assigns it to
the constant UUID. */
const UUID = `U-${self.crypto.getRandomValues(new Uint32Array(1))}`;

/* Start of principal function */
const elemClick = document.querySelectorAll('[name="action"]');
elemClick.forEach((e) => {
  e.addEventListener('click', () => {
    let ui = localStorage.UUID;

    const vp = 'Any Video Player'; // video title
    const vt = 'Walk in The Clouds'; // video provider
    const vu = '/videos/phantom'; // video url
    const vd = vduration; // video duration
    const bt = e.innerText; // button text
    let en; // event name
    let cm; // contact method
    let cc; // country currency
    let ev; // event value
    let sh; // section heading
    let list; // section list
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
      let userShipping;
      let userCCBrand;
      let et = 'ui interaction';
      let transactionID; // transaction ID
      let discount = 0; // discount

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
          event_type: et,
          tag_name: e.tagName,
          step: step.at(-1),
          section_heading: sh ?? undefined,
          ecommerce:
            en === 'ecommerce_modal_closed' || en === 'ecommerce_funnel_complete'
              ? undefined
              : {
                  transaction_id: transactionID ?? undefined,
                  value: itemsValue === 0 ? undefined : itemsValue,
                  tax: tax === 0 ? undefined : tax,
                  shipping: shipping === 0 ? undefined : shipping,
                  currency: itemsValue === 0 ? undefined : 'USD',
                  coupon: userCoupon ?? undefined,
                  shipping_tier: userShipping ?? undefined,
                  payment_type: userCCBrand ?? undefined,
                  item_list_id: /productList/i.test(e.id) ? `${list.toLowerCase()}_products` : undefined,
                  item_list_name: /productList/i.test(e.id) ? `${list} Products` : undefined,
                  items: /productList/i.test(e.id) ? tempList : itemsSelected,
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
          event_type: et,
          tag_name: e.tagName,
          step: step.at(-1),
          section_heading: sh ?? undefined,
          ecommerce:
            en === 'ecommerce_modal_closed' || en === 'ecommerce_funnel_complete'
              ? undefined
              : {
                  transaction_id: transactionID ?? undefined,
                  value: itemsValue === 0 ? undefined : itemsValue,
                  tax: tax === 0 ? undefined : tax,
                  shipping: shipping === 0 ? undefined : shipping,
                  currency: itemsValue === 0 ? undefined : 'USD',
                  coupon: userCoupon ?? undefined,
                  shipping_tier: userShipping ?? undefined,
                  payment_type: userCCBrand ?? undefined,
                  item_list_id: /productList/i.test(e.id) ? tempList[0].item_list_id : undefined,
                  item_list_name: /productList/i.test(e.id) ? tempList[0].item_list_name : undefined,
                  items: /productList/i.test(e.id) ? tempList : itemsSelected,
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

      const togglePanel = (p) => {
        p.classList.toggle('active');
        const panel = p.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
          panel.style.paddingBottom = null;
        } else {
          panel.style.maxHeight = `${panel.scrollHeight}px`;
          panel.style.paddingBottom = '18px';
        }
      };

      const makeList = (l, arr) => {
        tempList = arr;
        itemsList = itemsList.concat(arr);
        for (const element of tempList) {
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
                )},"${ui}") title="Click to Select Item"><span>${keys[key]}</span>`,
              );
            } else if (key === '2') {
              column.insertAdjacentHTML(
                'afterbegin',
                `${element.item_name}<br>${element.item_category2} ${element.item_category3} ${element.item_category5}`,
              );
            } else if (key === '5') {
              column.insertAdjacentHTML(
                'afterbegin',
                `<div class="container"><button onclick=chgQTY(${itemsList.indexOf(
                  element,
                )},"minus")>-</button><input id="qty${itemsList.indexOf(element)}" class="qty" type="text" value="${
                  keys[key]
                }" readonly><button onclick=chgQTY(${itemsList.indexOf(element)},"plus")>+</button></div>`,
              );
            } else {
              column.appendChild(document.createTextNode(keys[key]));
            }
            row.appendChild(column);
            document.querySelector(`#itemsList-${l}`).appendChild(row);
          }
        }
        en = 'view_item_list';
        et = 'ui interaction';
        step.push('funnel-1');
        sh = tempList[0].item_category.toUpperCase();
        list = document.querySelector(`#productList-${l}`).innerText;
        list = list.charAt(0).toUpperCase() + list.slice(1).toLowerCase();
        ecommerceSent();
        tempList = undefined; // reset tempList
        panelFilled.push(l);
      };

      if (e.id === 'productList-1') {
        if (!panelFilled.includes(1)) {
          makeList(1, productList_1);
        }
        togglePanel(e);
      }

      if (e.id === 'productList-2') {
        if (!panelFilled.includes(2)) {
          makeList(2, productList_2);
        }
        togglePanel(e);
      }

      if (e.id === 'add_to_cart') {
        itemsValue = 0;

        if (itemsSelected.length === 0) {
          message = 'ERROR: Please Select a Product!';
          errorEvent(e, message, ui);
          return;
        }

        en = e.id;
        step.push('funnel-1');
        for (const element of itemsSelected) {
          itemsValue += Number((element.price * element.quantity).toFixed(2));
        }
        ecommerceSent();

        /* view_cart event */
        document.querySelector('.add-to-cart-wrap').classList.add('hide');
        for (const cel of document.querySelectorAll('[name="itemsList"]')) {
          cel.innerHTML = '';
        }
        for (const cel of document.querySelectorAll('.accordion')) {
          if (cel.classList.contains('active')) {
            togglePanel(cel);
          } else {
            null;
          }
        }
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
                `<button id="removeItem${element.index}" type="submit" onclick=removeItem(${element.index},"${ui}")>remove</button><span style="margin-left:5px">${keys[key]}</span>`,
              );
            } else if (key === '1') {
              column.insertAdjacentHTML(
                'afterbegin',
                `${element.item_name}<br>Color: ${element.item_variant.toUpperCase()}<br>${element.item_brand}`,
              );
            } else if (key === '3') {
              column.insertAdjacentHTML(
                'afterbegin',
                `<div class="container"><button onclick=chgQTY(${element.index},"minus")>-</button><input id="qty${element.index}" class="qty" type="text" value="${keys[key]}" readonly><button onclick=chgQTY(${element.index},"plus")>+</button></div>`,
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
        step.push('funnel-2');
        ecommerceSent();
      }

      if (e.id === 'checkout1') {
        document.querySelector('.view-cart-wrap').classList.remove('show');
        document.querySelector('#itemsSelectedRows').innerHTML = '';
        document.querySelector('.checkout2-wrap').classList.add('show');

        en = 'begin_checkout';
        step.push('checkout-1');
        userCoupon = /summer sale/i.test(document.querySelector('#couponField').value) ? 'SUMMER SALE' : undefined;
        if (userCoupon !== undefined) {
          discountTotal = 0;
          itemsValue = 0;
          tax = 0;
          shipping = 0;
          for (const element of itemsSelected) {
            element.coupon = userCoupon;
            discount = Number((element.price * 0.15).toFixed(2));
            element.discount = discount;
            itemsValue += Number(((element.price - element.discount) * element.quantity).toFixed(2));
            discountTotal += Number((element.discount * element.quantity).toFixed(2));
          }
        }
        document.querySelector('#couponField').value = '';
        ecommerceSent();
        step.push('checkout-2');
      }

      if (e.id === 'checkout2') {
        customerInfo.name = document.querySelector('#sname').value.trim();
        customerInfo.email = document.querySelector('#semail').value.trim();
        customerInfo.address = document.querySelector('#saddress').value.trim();
        customerInfo.city = document.querySelector('#scity').value.trim();
        customerInfo.state = document.querySelector('#sstate').value.trim();
        customerInfo.zip = document.querySelector('#szip').value.trim();
        customerInfo.phone = document.querySelector('#sphone').value.trim();
        customerInfo.shipping = document.querySelector('#shipping').value;

        if (
          customerInfo.name === '' ||
          customerInfo.email === '' ||
          customerInfo.address === '' ||
          customerInfo.city === '' ||
          customerInfo.state === '' ||
          customerInfo.zip === '' ||
          customerInfo.phone === ''
        ) {
          message = "ERROR: Input fields can't be blank.";
          errorEvent(e, message, ui);
          return;
        }

        document.querySelector('.checkout2-wrap').classList.remove('show');
        document.querySelector('#customerAddress').reset();
        document.querySelector('.checkout3-wrap').classList.add('show');

        en = 'add_shipping_info';
        userShipping = customerInfo.shipping;
        ecommerceSent();
        step.push('checkout-3');
      }

      if (e.id === 'checkout3') {
        const ccnumber = document.querySelector('#cardnum').value.trim();
        customerInfo.ccexpiration = document.querySelector('#cardexp').value.trim();
        customerInfo.cccvv = document.querySelector('#cardcvv').value.trim();
        customerInfo.ccname = document.querySelector('#cardname').value.trim();

        if (
          ccnumber === '' ||
          customerInfo.ccexpiration === '' ||
          customerInfo.cccvv === '' ||
          customerInfo.ccname === ''
        ) {
          message = "ERROR: Input fields can't be blank.";
          errorEvent(e, message, ui);
          return;
        }
        customerInfo.ccnumber = maskNumber(ccnumber);
        customerInfo.cclogo = document.querySelector('#cclogo').innerHTML;
        customerInfo.ccbrand = document.querySelector('#cclogo').firstElementChild.alt;

        document.querySelector('.checkout3-wrap').classList.remove('show');
        document.querySelector('#customerPayment').reset();
        document.querySelector('#cclogo').innerHTML = '';
        document.querySelector('.summary-wrap').classList.add('show');

        en = 'add_payment_info';
        userCCBrand = customerInfo.ccbrand;
        ecommerceSent();
        step.push('checkout-4');

        // order summary
        tax = Number((itemsValue * 0.07).toFixed(2));
        shipping = Number((itemsValue * 0.12).toFixed(2));
        switch (customerInfo.shipping) {
          case 'express':
            shipping += 10;
            break;
          case 'overnight':
            shipping += 20;
            break;
          default:
            shipping += 0;
        }

        document.querySelector('#sbname').innerHTML = customerInfo.name;
        document.querySelector('#sbaddress').innerHTML = customerInfo.address;
        document.querySelector('#sbemail').innerHTML = customerInfo.email;
        document.querySelector('#sbcity').innerHTML = `${customerInfo.city}, ${customerInfo.state} ${customerInfo.zip}`;
        document.querySelector('#sbphone').innerHTML = customerInfo.phone;

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
            if (key === '1') {
              column.insertAdjacentHTML(
                'afterbegin',
                `${element.item_name}<br>Color: ${element.item_variant.toUpperCase()}<br>${element.item_category2} ${
                  element.item_category3
                } ${element.item_category5}`,
              );
            } else if (key === '3') {
              column.style.cssText = 'text-align: center;';
              column.appendChild(document.createTextNode(keys[key]));
            } else {
              column.appendChild(document.createTextNode(keys[key]));
            }
            row.appendChild(column);
            document.querySelector('#productRows').appendChild(row);
          }
        }

        document.querySelector('#productsSubtotal').innerHTML = `$ ${(itemsValue + discountTotal).toFixed(2)}`;
        document.querySelector('#uCoupon').innerHTML = userCoupon === undefined ? '' : `: ${userCoupon}`;
        document.querySelector('#discountTotal').innerHTML = `($ ${discountTotal.toFixed(2)})`;
        document.querySelector('#taxes').innerHTML = `$ ${tax.toFixed(2)}`;
        document
          .querySelector('#uShipping')
          .insertAdjacentHTML(
            'afterbegin',
            `<form class="shipp"><select id="chgSHIPP" class="formInput" onchange="chgSHIPPING()"><option value="">${customerInfo.shipping}</option><option value="standard">Standard</option><option value="express">Express</option><option value="overnight">Overnight</option></select></form>`,
          );
        document.querySelector('#shippingCost').innerHTML = `$ ${shipping.toFixed(2)}`;
        document.querySelector('#total').innerHTML = `$ ${(itemsValue + tax + shipping).toFixed(2)}`;

        document.querySelector('#cctype').innerHTML = customerInfo.cclogo;
        document.querySelector('#ccbrand').innerHTML = customerInfo.ccbrand;
        document.querySelector('#ccnumber').innerHTML = customerInfo.ccnumber;
        document.querySelector('#ccexp').innerHTML = customerInfo.ccexpiration;
      }

      if (e.id === 'purchase') {
        document.querySelector('.summary-wrap').classList.remove('show');
        document.querySelector('#uShipping').innerHTML = '';
        document.querySelector('.purchase-wrap').classList.add('show');

        transactionID = `T-${Math.floor(Math.random() * 10000)}`;
        en = e.id;
        et = 'conversion';
        step.push('checkout-end');
        shipping = document.querySelector('#shippingCost').innerHTML.slice(2) * 1;
        userShipping = customerInfo.shipping;
        ecommerceSent();
        step.push('confirmation');

        document.querySelector('#ocname').innerHTML = customerInfo.name;
        document.querySelector('#ocemail').innerHTML = customerInfo.email;
        document.querySelector('#ocaddress').innerHTML = customerInfo.address;
        document.querySelector('#occity').innerHTML = `${customerInfo.city}, ${customerInfo.state} ${customerInfo.zip}`;
        document.querySelector('#ocphone').innerHTML = customerInfo.phone;
        document.querySelector('#ocorderID').innerHTML = `Order Number ${transactionID}`;
        document.querySelector('#occustomerID').innerHTML = `Customer Number: ${ui}`;
        const d = new Date();
        document.querySelector(
          '#ocdate',
        ).innerHTML = `Date: ${d.toDateString()} / ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
        document.querySelector('#ocshipping').innerHTML = `Shipping Method: ${customerInfo.shipping.toUpperCase()}`;

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
            if (key === '1') {
              column.insertAdjacentHTML(
                'afterbegin',
                `${element.item_name}<br>Color: ${element.item_variant.toUpperCase()}<br>${element.item_category2} ${
                  element.item_category3
                } ${element.item_category5}`,
              );
            } else if (key === '3') {
              column.style.cssText = 'text-align: center;';
              column.appendChild(document.createTextNode(keys[key]));
            } else {
              column.appendChild(document.createTextNode(keys[key]));
            }
            row.appendChild(column);
            document.querySelector('#ocproductRows').appendChild(row);
          }
        }

        document.querySelector('#ocproductsSubtotal').innerHTML = `$ ${(itemsValue + discountTotal).toFixed(2)}`;
        document.querySelector('#ocCoupon').innerHTML = userCoupon === undefined ? '' : `: ${userCoupon}`;
        document.querySelector('#ocdiscountTotal').innerHTML = `($ ${discountTotal.toFixed(2)})`;
        document.querySelector('#octaxes').innerHTML = `$ ${tax.toFixed(2)}`;
        document.querySelector('#ocShipping').innerHTML = `: ${customerInfo.shipping.toUpperCase()}`;
        document.querySelector('#ocshippingCost').innerHTML = `$ ${shipping.toFixed(2)}`;
        document.querySelector('#octotal').innerHTML = `$ ${(itemsValue + tax + shipping).toFixed(2)}`;

        document.querySelector('#occtype').innerHTML = customerInfo.cclogo;
        document.querySelector('#occbrand').innerHTML = customerInfo.ccbrand;
        document.querySelector('#occnumber').innerHTML = customerInfo.ccnumber;
        document.querySelector('#occexp').innerHTML = customerInfo.ccexpiration;
        document.querySelector('#occname').innerHTML = customerInfo.ccname;
      }

      if (e.id === 'ecommerce-cancel' || e.id === 'ecommerce-end') {
        en = e.id === 'ecommerce-cancel' ? 'ecommerce_modal_closed' : 'ecommerce_funnel_complete';
        ecommerceSent();
        ecommerceModal();
        storeEnable = false;
        for (const cel of document.querySelectorAll('[name="itemsList"]')) {
          cel.innerHTML = '';
        }
        for (const cel of document.querySelectorAll('.accordion')) {
          if (cel.classList.contains('active')) {
            togglePanel(cel);
          } else {
            null;
          }
        }
        document.querySelector('#itemsSelectedRows').innerHTML = '';
        document.querySelector('#productRows').innerHTML = '';
        document.querySelector('#ocproductRows').innerHTML = '';
        document.querySelector('.add-to-cart-wrap').classList.remove('hide');
        document.querySelector('.view-cart-wrap').classList.remove('show');
        document.querySelector('#checkout1').classList.remove('inactive');
        document.querySelector('#coupon').classList.remove('ghost');
        document.querySelector('.checkout2-wrap').classList.remove('show');
        document.querySelector('.checkout3-wrap').classList.remove('show');
        document.querySelector('.summary-wrap').classList.remove('show');
        document.querySelector('.purchase-wrap').classList.remove('show');
        panelFilled = [];
        itemsList = [];
        itemsSelected = [];
        itemsValue = 0;
        userCoupon = undefined;
        step = [];
        tax = 0;
        shipping = 0;
        discountTotal = 0;
      }
    } else {
      if (e.id === 'ecommerce-modal') {
        if (logged) {
          en = 'ecommerce_modal_opened';
          ecommerceModal();
          storeEnable = true;
        } else {
          message = 'ERROR: Please Sign In!';
          errorEvent(e, message, ui);
          return;
        }
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
            message = 'ERROR: PII or special characters not allowed in First Name input!';
            errorEvent(e, message, ui);
            document.getElementById('fname').value = '';
            return;
          }
          if (userProf.match(/mailto:|tel:|^[\w\-.]+@[\w\-.]+|@/i)) {
            message = 'ERROR: PII or special characters not allowed in Profession input!';
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
        ui = localStorage.UUID === undefined || localStorage.UUID === 'guest' ? UUID : localStorage.UUID;
        localStorage.logged = logged;
        localStorage.UUID = ui;
        localStorage.customID = ui;
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
        event_type: /generate_lead|form_submit/i.test(en) ? 'conversion' : 'ui interaction',
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
        event_type: /generate_lead|form_submit/i.test(en) ? 'conversion' : 'ui interaction',
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

    if (!e.id.match(/close/i) && !/productList/i.test(e.id)) {
      e.setAttribute('disabled', '');
    }
  });
});
