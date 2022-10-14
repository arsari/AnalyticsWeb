function displayJSON(a) {
  const userLogged = a ? '<span>User Logged</span>' : '';

  document.querySelector('#json').innerHTML += `<p><em>dataLayer.push and utag.link [${
    window.dataLayer.length
  }]</em>${userLogged}</p><pre>${JSON.stringify(window.dataLayer.at(-1), undefined, 2)}</pre>`;

  document.querySelectorAll('pre').forEach((e) => {
    e.className = 'normal';
  });
  document.querySelector('#json').lastElementChild.scrollIntoView();
  document.querySelector('#json').lastElementChild.className = 'highlight';
}

const checkKeyPresenceInArray = (key) => window.dataLayer.some((obj) => Object.keys(obj).includes(key));

const headerHeight = document.querySelector('header').offsetHeight;

document.querySelector('section').style = `margin-top: ${headerHeight + 25}px`;

const btnClick = document.querySelectorAll('button');
const user = `U-${Math.floor(Math.random() * 10000 + 1)}`;
const date = new Date();
let vs = false;
let vc = true;

btnClick.forEach((e) => {
  e.addEventListener('click', () => {
    const isKeyPresent = checkKeyPresenceInArray('logged_in');
    let logged = isKeyPresent ? window.dataLayer.at(-1).logged_in : false;
    let userID = logged ? user : 'guest';

    if (e.id === 'purchase') {
      const transactionID = `T-${Math.floor(Math.random() * 10000)}`;
      const itemPrice = Math.floor(Math.random() * 100 + 1);
      const itemQty = Math.floor(Math.random() * 30 + 1);
      const itemDiscount = Number((itemPrice * 0.15).toFixed(2));
      const total = Number(((itemPrice - itemDiscount) * itemQty).toFixed(2));

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
      displayJSON(logged);
      window.dataLayer.push({
        event: e.id,
        event_type: 'conversion',
        page_title: utag.data['dom.title'],
        page_location: utag.data['dom.url'],
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
        user_id: userID,
      });
      utag.link({
        event: e.id,
        event_type: 'conversion',
        page_title: utag.data['dom.title'],
        page_location: utag.data['dom.url'],
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
        user_id: userID,
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

      if (e.id === 'email' || e.id === 'phone' || e.id === 'form') {
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

      if (e.id === 'form') {
        cm = 'form filled';
        val = 100;
      }

      if (e.id === 'download') {
        en = 'file_download';
      }

      if (e.id === 'video') {
        vt = 'Stan and Friends';
        vp = 'youtube';

        if (vc) {
          en = 'video_start';
          vs = true;
          vi = 'Play';
          vct = 0;
          vd = date.getUTCMilliseconds();
          vc = false;
        } else {
          en = 'video_complete';
          vs = false;
          vi = 'Complete';
          vct = date.getMilliseconds();
          vd = date.getUTCMilliseconds();
          vc = true;
        }
      }

      if (e.id === 'link') {
        lu = e.querySelector('a').href;
      }

      if (e.id === 'login') {
        if (logged) {
          alert("Oops!\nI'm sorry you already Sign In.");
          return;
        }
        logged = true;
        userID = user;
      }

      if (e.id === 'logout') {
        if (logged) {
          logged = false;
        } else {
          alert("Oops!\nI'm sorry you need to Sign In first.");
          return;
        }
      }

      window.dataLayer.push({
        event: en || e.id,
        event_type: en === 'generated_lead' ? 'conversion' : 'ui interaction',
        page_title: utag.data['dom.title'],
        page_location: utag.data['dom.url'],
        button_text: e.innerText,
        link_url: e.id === 'link' ? lu : undefined,
        link_text: e.id === 'link' ? e.innerText : undefined,
        contact_method: cm,
        file_extension: e.id === 'download' ? 'pdf' : undefined,
        file_name: e.id === 'download' ? 'MyDownload' : undefined,
        video_interaction: e.id === 'video' && (vs === true || vc === true) ? vi : undefined,
        video_title: vt,
        video_provider: vp,
        video_current_time: vct,
        video_duration: vd,
        form_submit: e.id === 'form' ? 'MyForm' : undefined,
        currency: cc,
        value: val,
        method: e.id === 'login' ? 'Google' : undefined,
        logged_in: logged,
        user_id: userID,
      });
      utag.link({
        event: en || e.id,
        event_type: en === 'generated_lead' ? 'conversion' : 'ui interaction',
        page_title: utag.data['dom.title'],
        page_location: utag.data['dom.url'],
        button_text: e.innerText,
        link_url: e.id === 'link' ? lu : undefined,
        link_text: e.id === 'link' ? e.innerText : undefined,
        contact_method: cm,
        file_extension: e.id === 'download' ? 'pdf' : undefined,
        file_name: e.id === 'download' ? 'MyDownload' : undefined,
        video_interaction: e.id === 'video' && (vs === true || vc === true) ? vi : undefined,
        video_title: vt,
        video_provider: vp,
        video_current_time: vct,
        video_duration: vd,
        form_submit: e.id === 'form' ? 'MyForm' : undefined,
        currency: cc,
        value: val,
        method: e.id === 'login' ? 'Google' : undefined,
        logged_in: logged,
        user_id: userID,
      });
      displayJSON(logged);
    }
  });
});
