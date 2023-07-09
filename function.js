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
  document.querySelector('.add-to-cart-wrap').classList.remove('hide');
  document.querySelector('.view-cart-wrap').classList.remove('show');
  document.querySelector('#item-1').checked = false;
  document.querySelector('#item-2').checked = false;
  itemsSelection = [];
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
 * "When an error occurs, send an event to Google Analytics and Tealium with the
 * error message, and the user's login status and user ID."
 *
 * The function takes four parameters:
 *
 * * `e`: the event object
 * * `m`: the error message
 * * `l`: the user's login status
 * * `u`: the user's ID
 *
 * The function uses the `window.dataLayer` object to send the event to Google
 * Analytics. The `window.dataLayer` object is a JavaScript array that stores data.
 * The `push()` method adds data to the array
 * @param e - the event object
 * @param m - error message
 * @param l - logged in
 * @param u - user id
 */
function errorEvent(e, m, l, u) {
  alert(m);
  const tstamp = String(new Date().getTime());
  const cstamp = timeStamp();

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: `${e.id}_error`,
    event_type: 'content tool',
    button_text: e.innerText,
    tag_name: e.tagName,
    error_message: m,
    alert_impression: true,
    event_timestamp: tstamp, // milliseconds
    custom_timestamp: cstamp, // ISO 8601
    // user properties
    logged_in: l,
    user_id: u,
  });

  utag.link({
    tealium_event: `${e.id}_error`,
    event_type: 'content tool',
    button_text: e.innerText,
    tag_name: e.tagName,
    error_message: m,
    alert_impression: true,
    event_timestamp: tstamp, // milliseconds
    custom_timestamp: cstamp, // ISO 8601
    // user properties
    logged_in: l,
    user_id: u,
    custom_user_id: u,
  });

  displayJSON(l);
}

/**
 * Section element set up by getting the height of the header and adding 25px to it, and then setting
 * the margin-top of the section to that value.
 */
const headerHeight = document.querySelector('header').offsetHeight;
document.querySelector('main').style = `margin-top: ${headerHeight + 15}px`;

/* Footer labeling set up */
document.querySelector('footer').innerHTML = `<span class="env">Env->[
  <span class="prop">${tealiumEnv}</span> ] &boxV; GA4->[ <span class="prop">${ga4Prop}</span> ] &boxV; GTM->[ <span class="prop">${gtmContainer}</span> ]
  </span><span class="me">Coded with &hearts; by ARSARI &boxV; Best view in Desktop</span>`;

/**
 * Element listeners start here
 */
let logged = false;
let vplay = false;
let vstop = true;
let vprogress = 0;
const vduration = 300;

const sModal = document.querySelector('.searchModal');
const fModal = document.querySelector('.formModal');
const eModal = document.querySelector('.ecommerceModal');
let itemsSelection = [];
const UUID = localStorage.UUID ? localStorage.UUID : `U-${self.crypto.getRandomValues(new Uint32Array(1))}`;

const elemClick = document.querySelectorAll('[name="action"]');
elemClick.forEach((e) => {
  e.addEventListener('click', () => {
    let ui = logged ? UUID : 'guest';

    const bt = e.innerText; // button text
    const vp = 'Any Video Player'; // video title
    const vt = 'Walk in The Clouds'; // video provider
    const vu = '/videos/phantom'; // video url
    const vd = vduration; // video duration
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

    if (e.id === 'add_to_cart') {
      const item1 = document.querySelector('#item-1');
      const item2 = document.querySelector('#item-2');
      let itemsValue = 0;
      if (!item1.checked && !item2.checked) {
        message = 'ERROR: Please Select a Product!';
        errorEvent(e, message, logged, ui);
        return;
      }

      if (item1.checked) {
        const sku1 = `SKU_${Math.floor(Math.random() * 10000)}`;
        const prod1 = {
          item_id: sku1,
          item_name: 'Stan and Friends Tee',
          affiliation: 'Merchandise Store',
          currency: 'USD',
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
          price: 29.95,
          quantity: 1,
        };
        itemsSelection.push(prod1);
        itemsValue += prod1.price;
      }

      if (item2.checked) {
        const sku2 = `SKU_${Math.floor(Math.random() * 10000)}`;
        const prod2 = {
          item_id: sku2,
          item_name: 'Friends Pants',
          affiliation: 'Merchandise Store',
          currency: 'USD',
          index: itemsSelection.length === 0 ? 0 : 1,
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
          quantity: 1,
        };
        itemsSelection.push(prod2);
        itemsValue += prod2.price;
      }

      document.querySelector('.add-to-cart-wrap').classList.add('hide');
      document.querySelector('.view-cart-wrap').classList.add('show');

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
        event_type: 'ui interaction',
        button_text: bt,
        tag_name: e.tagName,
        ecommerce: {
          currency: 'USD',
          value: itemsValue,
          items: itemsSelection,
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
        event_type: 'ui interaction',
        button_text: bt,
        tag_name: e.tagName,
        ecommerce: {
          currency: 'USD',
          value: itemsValue,
          items: itemsSelection,
        },
        event_timestamp: tstamp, // milliseconds
        custom_timestamp: cstamp, // ISO 8601
        // user properties
        logged_in: logged,
        user_id: ui,
        custom_user_id: ui,
      });
      displayJSON(logged);
      ecommerceModal();
    } else if (e.id === 'purchase') {
      if (logged) {
        const transactionID = `T-${Math.floor(Math.random() * 10000)}`;
        const sku1 = `SKU_${Math.floor(Math.random() * 10000)}`;
        const sku2 = `SKU_${Math.floor(Math.random() * 10000 + 1)}`;
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
          event_type: 'conversion',
          button_text: bt,
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
          event_type: 'conversion',
          button_text: bt,
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
        errorEvent(e, message, logged, ui);
        return;
      }
    } else {
      if (e.id === 'ecommerce-modal') {
        if (logged) {
          en = 'ecommerce_modal_opened';
          ecommerceModal();
        } else {
          message = 'ERROR: Please Sign In!';
          errorEvent(e, message, logged, ui);
          return;
        }
      }

      if (e.id === 'ecommerce-close') {
        en = 'ecommerce_modal_closed';
        ecommerceModal();
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
            errorEvent(e, message, logged, ui);
            document.getElementById('fname').value = '';
            return;
          }
          if (userProf.match(/mailto:|tel:|^[\w\-.]+@[\w\-.]+|@/i)) {
            message = 'ERROR: PII or special characters not allowed in Profession input.';
            errorEvent(e, message, logged, ui);
            document.getElementById('profession').value = '';
            return;
          }
          up = capitalize(userProf);
        } else {
          message = "ERROR: Form inputs can't be blank.";
          errorEvent(e, message, logged, ui);
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
          errorEvent(e, message, logged, ui);
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
          errorEvent(e, message, logged, ui);
          return;
        }
      }

      if (e.id === 'search') {
        if (e.previousElementSibling.value.trim()) {
          const verify = e.previousElementSibling.value.trim();
          if (verify.match(/mailto:|tel:|^[\w\-.]+@[\w\-.]+|@/i)) {
            message = 'ERROR: PII or special characters not allowed as Search Term.';
            errorEvent(e, message, logged, ui);
            e.previousElementSibling.value = '';
            return;
          }
          st = capitalize(verify);
          e.previousElementSibling.value = '';
        } else {
          message = "ERROR: Search term can't be blank.";
          errorEvent(e, message, logged, ui);
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
          errorEvent(e, message, logged, ui);
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
          errorEvent(e, message, logged, ui);
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
        event_type: /generate_lead|form_submit|ecommerce_start/.test(en) ? 'conversion' : 'ui interaction',
        file_extension: e.id === 'download' ? 'pdf' : undefined,
        file_name: e.id === 'download' ? 'PDF_to_Download' : undefined,
        form_destination: fd,
        form_id: e.id.includes('form') ? e.id : undefined,
        form_name: e.id.includes('form') ? 'User Profession Survey' : undefined,
        form_submit_text: e.id === 'form' ? fst : undefined,
        link_domain: ld,
        link_classes: lc,
        link_id: /extlink|intlink|download|banner/.test(e.id) ? e.id : undefined,
        link_url: lu,
        link_text: /extlink|intlink|download|banner/.test(e.id) ? bt : undefined,
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
        event_type: /generate_lead|form_submit|ecommerce_start/.test(en) ? 'conversion' : 'ui interaction',
        file_extension: e.id === 'download' ? 'pdf' : undefined,
        file_name: e.id === 'download' ? 'PDF_to_Download' : undefined,
        form_destination: fd,
        form_id: e.id.includes('form') ? e.id : undefined,
        form_name: e.id.includes('form') ? 'User Profession Survey' : undefined,
        form_submit_text: e.id === 'form' ? fst : undefined,
        link_domain: ld,
        link_classes: lc,
        link_id: /extlink|intlink|download|banner/.test(e.id) ? e.id : undefined,
        link_url: lu,
        link_text: /extlink|intlink|download|banner/.test(e.id) ? bt : undefined,
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

    document.querySelectorAll('.button').forEach((element) => {
      element.removeAttribute('disabled');
    });

    if (!e.id.match(/close/i)) {
      e.setAttribute('disabled', '');
    }
  });
});
