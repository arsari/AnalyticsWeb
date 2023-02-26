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
 * When the search button or modal 'X' is clicked, the search modal is toggled
 */
function searchModal() {
  sModal.classList.toggle('show-modal');
}

/**
 * When the search button or modal 'X' is clicked, the search modal is toggled
 */
function formModal() {
  fModal.classList.toggle('show-modal');
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
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: `${e.id}_error`,
    event_timestamp: new Date().getTime(), // milliseconds
    custom_timestamp: timeStamp(), // ISO 8601
    event_type: 'content tool',
    button_text: e.innerText,
    tag_name: e.tagName,
    error_message: m,
    alert_impression: true,
    // user properties
    logged_in: l,
    user_id: u,
  });
  utag.link({
    tealium_event: `${e.id}_error`,
    event_timestamp: new Date().getTime(), // milliseconds
    custom_timestamp: timeStamp(), // ISO 8601
    event_type: 'content tool',
    button_text: e.innerText,
    tag_name: e.tagName,
    error_message: m,
    alert_impression: true,
    // user properties
    logged_in: l,
    user_id: u,
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
const UUID = `U-${self.crypto.getRandomValues(new Uint32Array(1))}`;

const elemClick = document.querySelectorAll('[name="action"]');
elemClick.forEach((e) => {
  e.addEventListener('click', () => {
    let ui = logged ? UUID : 'guest';

    if (e.id === 'purchase') {
      const transactionID = `T-${Math.floor(Math.random() * 10000)}`;
      const sku = `SKU_${Math.floor(Math.random() * 10000)}`;
      const itemPrice = Math.floor(Math.random() * 200 + 1);
      const itemQty = Math.floor(Math.random() * 30 + 1);
      const itemDiscount = Number((itemPrice * 0.15).toFixed(2));
      const subtotal = Number(((itemPrice - itemDiscount) * itemQty).toFixed(2));

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
        event_timestamp: new Date().getTime(), // milliseconds
        custom_timestamp: timeStamp(), // ISO 8601
        event_type: 'conversion',
        button_text: e.innerText,
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
              item_id: sku,
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
          ],
        },
        // user properties
        logged_in: logged,
        user_id: ui,
      });
      utag.link({
        tealium_event: e.id,
        // event parameters
        event_timestamp: new Date().getTime(), // milliseconds
        custom_timestamp: timeStamp(), // ISO 8601
        event_type: 'conversion',
        button_text: e.innerText,
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
              item_id: sku,
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
          ],
        },
        // user properties
        logged_in: logged,
        user_id: ui,
      });
      displayJSON(logged);
    } else {
      let en; // event name
      let cm; // contact method
      let cc; // country currency
      let val; // value
      let vt; // video title
      let vp; // video provider
      let vct; // video current time
      let vd; // video duration
      let milestone; // video progress milestone
      let vs; // video status
      let vpct; // video percent
      let lu; // link url
      let lc; // link classes
      let ol; // outbound link true/false
      let ld; // link domain
      let st; // search term
      let fd; // form destination
      let fi; // form input
      let message; // alert message

      if (e.id === 'email' || e.id === 'phone') {
        en = 'generated_lead';
        cc = 'USD';
      }

      if (e.id === 'email') {
        cm = 'email';
        val = 50;
      }

      if (e.id === 'phone') {
        cm = 'phone';
        val = 25;
      }

      if (e.id === 'form-modal') {
        en = 'form_start';
        fd = 'form modal open';
        formModal();
      }

      if (e.id === 'form') {
        if (e.previousElementSibling.value.trim()) {
          const verify = e.previousElementSibling.value.trim();
          if (verify.match(/mailto:|tel:|^[\w\-.]+@[\w\-.]+/gi)) {
            message = 'ERROR: PII not allowed in form input.';
            errorEvent(e, message, logged, ui);
            e.previousElementSibling.value = '';
            return;
          }
          fi = capitalize(verify);
          e.previousElementSibling.value = '';
        } else {
          message = "ERROR: Form input can't be blank.";
          errorEvent(e, message, logged, ui);
          return;
        }
        en = 'form_submit';
        cm = 'form filled';
        fd = 'customer service';
        cc = 'USD';
        val = 100;
        formModal();
      }

      if (e.id === 'form-close') {
        en = 'form_modal_closed';
        formModal();
      }

      if (e.id === 'download') {
        en = 'file_download';
        ld = window.location.hostname;
        lc = e.className;
      }

      if (e.id === 'extlink') {
        en = 'outbound_link';
        lu = e.href;
        const domain = new URL(lu);
        ld = domain.hostname;
        lc = e.className;
        ol = true;
      }

      if (e.id === 'intlink') {
        localStorage.logged = logged;
        localStorage.UUID = ui;
        en = 'internal_link';
        lu = e.href;
        const domain = new URL(lu);
        ld = domain.hostname;
        lc = e.className;
      }

      if (e.id === 'video') {
        vt = 'Walk in The Clouds';
        vp = 'Any Video Player';

        if (vstop) {
          document.querySelector('#video .text').classList.add('playing');
          en = 'video_start';
          vplay = true;
          vs = 'Play';
          vct = vprogress;
          vd = vduration;
          vpct = Number(((vprogress / vduration) * 100).toFixed(1));
          vstop = false;
        } else {
          document.querySelector('#video .text').classList.remove('playing');
          en = 'video_stop';
          vplay = false;
          vs = 'Stop';
          vct = vprogress;
          vd = vduration;
          vpct = Number(((vprogress / vduration) * 100).toFixed(1));
          vstop = true;
        }
      }

      // Video progress interval after video_start event
      const interval = setInterval(() => {
        vp = 'Any Video Player';
        vt = 'Walk in The Clouds';
        ui = logged ? UUID : 'guest';

        if (vplay) {
          vprogress += 1;

          const sendData = () => {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              event: en,
              event_timestamp: new Date().getTime(), // milliseconds
              custom_timestamp: timeStamp(), // ISO 8601
              button_text: null,
              tag_name: null,
              event_type: 'content tool',
              video_current_time: vct,
              video_duration: vduration,
              video_percent: milestone,
              video_provider: vp,
              video_status: vs,
              video_title: vt,
              logged_in: logged,
              user_id: ui,
            });
            utag.link({
              tealium_event: en,
              event_timestamp: new Date().getTime(), // milliseconds
              custom_timestamp: timeStamp(), // ISO 8601
              event_type: 'content tool',
              button_text: null,
              tag_name: null,
              video_current_time: vct,
              video_duration: vduration,
              video_percent: milestone,
              video_provider: vp,
              video_status: vs,
              video_title: vt,
              logged_in: logged,
              user_id: ui,
            });
            displayJSON(logged);
          };

          milestone = Number(((vprogress / vduration) * 100).toFixed(1));

          if ([10, 25, 50, 75, 90].includes(milestone)) {
            en = 'video_progress';
            vct = vprogress;
            vs = `Progress ${milestone}%`;
            sendData();
          }

          if (vprogress === vduration) {
            document.querySelector('#video .text').classList.remove('playing');
            en = 'video_complete';
            vct = vprogress;
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
        en = 'search_modal_opened';
        searchModal();
      }

      if (e.id === 'search') {
        if (e.previousElementSibling.value.trim()) {
          const verify = e.previousElementSibling.value.trim();
          if (verify.match(/mailto:|tel:|^[\w\-.]+@[\w\-.]+/gi)) {
            message = 'ERROR: PII not allowed as search term.';
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
      }

      if (e.id === 'logout') {
        if (logged) {
          logged = false;
        } else {
          message = "ERROR: Oops! I'm sorry you need to Sign In first.";
          errorEvent(e, message, logged, ui);
          return;
        }
      }

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: en || e.id,
        // event parameters
        event_timestamp: new Date().getTime(), // milliseconds
        custom_timestamp: timeStamp(), // ISO 8601
        button_text: e.tagName === 'BUTTON' && e.innerText !== '' ? e.innerText : undefined,
        contact_method: cm,
        currency: cc,
        event_type: en === 'generated_lead' || en === 'form_submit' ? 'conversion' : 'ui interaction',
        file_extension: e.id === 'download' ? 'pdf' : undefined,
        file_name: e.id === 'download' ? 'PDF_to_Download' : undefined,
        form_destination: fd,
        form_id: e.id.includes('form') ? e.id : undefined,
        form_name: e.id.includes('form') ? 'User Profession Survey' : undefined,
        form_submit_text: e.id === 'form' ? e.innerText : undefined,
        link_domain: ld,
        link_classes: lc,
        link_id: e.id === 'extlink' || e.id === 'intlink' || e.id === 'download' ? e.id : undefined,
        link_url: lu,
        link_text: e.id === 'extlink' || e.id === 'intlink' || e.id === 'download' ? e.innerText : undefined,
        method: e.id === 'login' ? 'Google' : undefined,
        outbound: ol,
        search_term: st,
        tag_name: e.tagName,
        value: val,
        video_current_time: vct,
        video_duration: vd,
        video_percent: vpct,
        video_provider: vp,
        video_status: e.id === 'video' && (vplay === true || vstop === true) ? vs : undefined,
        video_title: vt,
        // user properties
        logged_in: logged,
        user_id: ui,
        user_profession: fi,
      });
      utag.link({
        tealium_event: en || e.id,
        // event parameters
        event_timestamp: new Date().getTime(), // milliseconds
        custom_timestamp: timeStamp(), // ISO 8601
        button_text: e.tagName === 'BUTTON' && e.innerText !== '' ? e.innerText : undefined,
        contact_method: cm,
        currency: cc,
        event_type: en === 'generated_lead' || en === 'form_submit' ? 'conversion' : 'ui interaction',
        file_extension: e.id === 'download' ? 'pdf' : undefined,
        file_name: e.id === 'download' ? 'PDF_to_Download' : undefined,
        form_destination: fd,
        form_id: e.id.includes('form') ? e.id : undefined,
        form_name: e.id.includes('form') ? 'User Profession Survey' : undefined,
        form_submit_text: e.id === 'form' ? e.innerText : undefined,
        link_domain: ld,
        link_classes: lc,
        link_id: e.id === 'extlink' || e.id === 'intlink' || e.id === 'download' ? e.id : undefined,
        link_url: lu,
        link_text: e.id === 'extlink' || e.id === 'intlink' || e.id === 'download' ? e.innerText : undefined,
        method: e.id === 'login' ? 'Google' : undefined,
        outbound: ol,
        search_term: st,
        tag_name: e.tagName,
        value: val,
        video_current_time: vct,
        video_duration: vd,
        video_percent: vpct,
        video_provider: vp,
        video_status: e.id === 'video' && (vplay === true || vstop === true) ? vs : undefined,
        video_title: vt,
        // user properties
        logged_in: logged,
        user_id: ui,
        user_profession: fi,
      });
      displayJSON(logged);
    }

    document.querySelectorAll('.button').forEach((element) => {
      element.removeAttribute('disabled');
    });

    e.setAttribute('disabled', '');
  });
});
