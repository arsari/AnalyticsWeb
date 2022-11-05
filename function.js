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
  });
  document.querySelector('#json').lastElementChild.scrollIntoView();
  document.querySelector('#json').lastElementChild.className = 'highlight';
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
 * Section element set up by getting the height of the header and adding 25px to it, and then setting
 * the margin-top of the section to that value.
 */
const headerHeight = document.querySelector('header').offsetHeight;
document.querySelector('main').style = `margin-top: ${headerHeight + 15}px`;

/* Footer labeling set up */
document.querySelector('footer').innerHTML = `<span class="env">TealiumIQ->[
  <span class="prop">${tealiumEnv}</span> ] &boxV; GA4->[ <span class="prop">${ga4Prop}</span> ] &boxV; GTM->[ <span class="prop">${gtmContainer}</span> ]
  </span><span class="me">Coded with &hearts; by ARSARI</span>`;

/* Button element listeners starting */
const elemClick = document.querySelectorAll('[name="action"]');
const sModal = document.querySelector('.searchModal');
const fModal = document.querySelector('.formModal');
const userID = `U-${Math.floor(Math.random() * 10000 + 1)}`;
let logged = false;
let vs = false;
let vc = true;
let vprogress = 0;
const vduration = 100;

elemClick.forEach((e) => {
  e.addEventListener('click', () => {
    let ui = logged ? userID : 'guest';

    if (e.id === 'purchase') {
      const transactionID = `T-${Math.floor(Math.random() * 10000)}`;
      const itemPrice = Math.floor(Math.random() * 100 + 1);
      const itemQty = Math.floor(Math.random() * 30 + 1);
      const itemDiscount = Number((itemPrice * 0.15).toFixed(2));
      const total = Number(((itemPrice - itemDiscount) * itemQty).toFixed(2));

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
        event_type: 'conversion',
        button_text: e.innerText,
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
        logged_in: logged,
        user_id: ui,
      });
      utag.link({
        tealium_event: e.id,
        event_type: 'conversion',
        button_text: e.innerText,
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
        logged_in: logged,
        user_id: ui,
      });
      displayJSON(logged);
    } else {
      let en;
      let cm;
      let cc;
      let val;
      let vt;
      let vp;
      let vct;
      let vd;
      let vi;
      let lu;
      let lc;
      let ol;
      let ld;
      let st;
      let fd;

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
        fd = 'consent modal';
        formModal();
      }

      if (e.id === 'form') {
        en = 'form_submit';
        cm = 'form filled';
        fd = 'Customer Service';
        cc = 'USD';
        val = 100;
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
        localStorage.userID = ui;
        en = 'internal_link';
        lu = e.href;
        const domain = new URL(lu);
        ld = domain.hostname;
        lc = e.className;
      }

      if (e.id === 'video') {
        vt = 'Walk in The Clouds';
        vp = 'video player';

        if (vc) {
          en = 'video_start';
          vs = true;
          vi = 'Play';
          vct = vprogress;
          vd = vduration;
          vc = false;
        } else {
          en = 'video_stop';
          vs = false;
          vi = 'Stop';
          vct = vprogress;
          vd = vduration;
          vc = true;
        }
      }

      // Video progress interval after video_start event
      const interval = setInterval(() => {
        if (vs) {
          vprogress += 5;

          const sendData = () => {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              event: en,
              event_type: 'content tool',
              video_interaction: vi,
              video_title: 'Walk in The Clouds',
              video_provider: 'video player',
              video_current_time: vct,
              video_percent: vct,
              video_duration: vd,
              logged_in: logged,
              user_id: ui,
            });
            utag.link({
              tealium_event: en,
              event_type: 'content tool',
              video_interaction: vi,
              video_title: 'Walk in The Clouds',
              video_provider: 'video player',
              video_current_time: vct,
              video_percent: vct,
              video_duration: vd,
              logged_in: logged,
              user_id: ui,
            });
            displayJSON(logged);
          };

          if ([10, 25, 50, 75, 90].includes(vprogress)) {
            en = `video_progress`;
            vi = `Progress ${vprogress}%`;
            vct = vprogress;
            ui = logged ? userID : 'guest';
            sendData();
          }

          if (vprogress === vduration) {
            en = 'video_complete';
            vi = 'Complete';
            vct = vprogress;
            vd = vduration;
            ui = logged ? userID : 'guest';
            vprogress = 0;
            vs = false;
            vc = true;
            clearInterval(interval);
            sendData();
          }
        }
      }, 5000);

      if (vi === 'Stop') {
        clearInterval(interval);
      }

      if (e.id === 'search-modal') {
        en = 'search_modal_opened';
        searchModal();
      }

      if (e.id === 'search') {
        st = e.previousElementSibling.value ? e.previousElementSibling.value : alert('ERROR: Search Term is blank.');

        if (st.match(/mailto:|tel:|@/gi)) {
          st = 'PII in Search Term';
        }

        e.previousElementSibling.value = '';
        searchModal();
      }

      if (e.id === 'search-close') {
        en = 'search_modal_closed';
        searchModal();
      }

      if (e.id === 'login') {
        if (logged) {
          alert("Oops! I'm sorry you already Sign In.");
          return;
        }
        logged = true;
        ui = userID;
      }

      if (e.id === 'logout') {
        if (logged) {
          logged = false;
        } else {
          alert("Oops! I'm sorry you need to Sign In first.");
          return;
        }
      }

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: en || e.id,
        event_type: en === 'generated_lead' || en === 'form_submit' ? 'conversion' : 'ui interaction',
        button_text: e.tagName === 'BUTTON' ? e.innerText : undefined,
        link_id: e.id === 'extlink' || e.id === 'intlink' || e.id === 'download' ? e.id : undefined,
        link_text: e.id === 'extlink' || e.id === 'intlink' || e.id === 'download' ? e.innerText : undefined,
        link_classes: lc,
        link_url: lu,
        link_domain: ld,
        outbound: ol,
        file_extension: e.id === 'download' ? 'pdf' : undefined,
        file_name: e.id === 'download' ? 'MyDownload' : undefined,
        video_interaction: e.id === 'video' && (vs === true || vc === true) ? vi : undefined,
        video_title: vt,
        video_provider: vp,
        video_current_time: vct,
        video_percent: vct,
        video_duration: vd,
        form_id: e.id === 'form-modal' || e.id === 'form' ? e.id : undefined,
        form_name: e.id === 'form-modal' || e.id === 'form' ? 'MyForm' : undefined,
        form_destination: fd,
        form_submit_text: e.id === 'form' ? e.innerText : undefined,
        contact_method: cm,
        currency: cc,
        value: val,
        method: e.id === 'login' ? 'Google' : undefined,
        search_term: st,
        logged_in: logged,
        user_id: ui,
      });
      utag.link({
        tealium_event: en || e.id,
        event_type: en === 'generated_lead' || en === 'form_submit' ? 'conversion' : 'ui interaction',
        button_text: e.tagName === 'BUTTON' ? e.innerText : undefined,
        link_id: e.id === 'extlink' || e.id === 'intlink' || e.id === 'download' ? e.id : undefined,
        link_text: e.id === 'extlink' || e.id === 'intlink' || e.id === 'download' ? e.innerText : undefined,
        link_classes: lc,
        link_url: lu,
        link_domain: ld,
        outbound: ol,
        file_extension: e.id === 'download' ? 'pdf' : undefined,
        file_name: e.id === 'download' ? 'MyDownload' : undefined,
        video_interaction: e.id === 'video' && (vs === true || vc === true) ? vi : undefined,
        video_title: vt,
        video_provider: vp,
        video_current_time: vct,
        video_percent: vct,
        video_duration: vd,
        form_id: e.id === 'form-modal' || e.id === 'form' ? e.id : undefined,
        form_name: e.id === 'form-modal' || e.id === 'form' ? 'MyForm' : undefined,
        form_destination: fd,
        form_submit_text: e.id === 'form' ? e.innerText : undefined,
        contact_method: cm,
        currency: cc,
        value: val,
        method: e.id === 'login' ? 'Google' : undefined,
        search_term: st,
        logged_in: logged,
        user_id: ui,
      });
      displayJSON(logged);
    }

    document.querySelectorAll('button').forEach((element) => {
      element.removeAttribute('disabled');
    });

    e.setAttribute('disabled', '');
  });
});
