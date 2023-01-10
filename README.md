# Web Analytic Implementation Playground

Playground of analytic implementation for a web data stream that allows to explore the implementation of:

- dataLayer objects through GTM and analyzing the data in GA4,
- utag.link() data objects through Tealium IQ tag manager and analyzing the data in Adobe Analytics.
- Setting of Adobe Launch rules to be analyzed in Adobe Analytics.

Each individual page of implementation included an initial data set composed of:

```html
<!-- dataLayers init -->
<script type="text/javascript">
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "initData",
    content_type: "Playground",
    content_group: "Implementation",
    author_email: "asantiago@arsari.com",
    language_code: "en-US",
    page_author: "Arturo Santiago-Rivera",
    page_name: "Web Analytics Implementation - Home Page",
    page_title: document.querySelector("title").innerText,
    logged_in: localStorage.logged,
    user_id: localStorage.userID,
  });
</script>
<!-- END: dataLayers init -->

<!-- utag data object init -->
<script type="text/javascript">
  const utag_data = {
    content_type: "Playground",
    content_group: "Implementation",
    author_email: "asantiago@arsari.com",
    language_code: "en-US",
    page_author: "Arturo Santiago-Rivera",
    page_name: "Web Analytics Implementation - Home Page",
    page_title: document.querySelector("title").innerText,
    logged_in: localStorage.logged,
    user_id: localStorage.userID,
  };
</script>
<!-- END: utag data object init -->
```

The _dataLayer_ object is based on [Google Analytics 4](https://support.google.com/analytics/answer/9322688?hl=en) events recommendations and [Google Tag Manager dataLayer](https://developers.google.com/tag-manager/devguide#datalayer).

The events dataLayer implemented is composed of:

```js
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: en || e.id,
  // events parameters
  button_text:
    e.tagName === "BUTTON" && e.innerText !== "" ? e.innerText : undefined,
  contact_method: cm,
  currency: cc,
  event_type:
    en === "generated_lead" || en === "form_submit"
      ? "conversion"
      : "ui interaction",
  file_extension: e.id === "download" ? "pdf" : undefined,
  file_name: e.id === "download" ? "PDF_to_Download" : undefined,
  form_destination: fd,
  form_id: e.id.includes("form") ? e.id : undefined,
  form_name: e.id.includes("form") ? "User Profession Survey" : undefined,
  form_submit_text: e.id === "form" ? e.innerText : undefined,
  link_domain: ld,
  link_classes: lc,
  link_id:
    e.id === "extlink" || e.id === "intlink" || e.id === "download"
      ? e.id
      : undefined,
  link_url: lu,
  link_text:
    e.id === "extlink" || e.id === "intlink" || e.id === "download"
      ? e.innerText
      : undefined,
  method: e.id === "login" ? "Google" : undefined,
  outbound: ol,
  search_term: st,
  tag_name: e.tagName,
  value: val,
  video_current_time: vct,
  video_duration: vd,
  video_percent: vpct,
  video_provider: vp,
  video_status:
    e.id === "video" && (vplay === true || vstop === true) ? vs : undefined,
  video_title: vt,
  // user properties
  logged_in: logged,
  user_id: ui,
  user_profession: fi,
});
```

The purchase event datalayer implemented is composed of:

```js
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  ecommerce: null,
}); // Clear the previous ecommerce object

window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: e.id,
  button_text: e.innerText,
  event_type: "conversion",
  tag_name: e.tagName,
  ecommerce: {
    transaction_id: transactionID,
    affiliation: "Merchandise Store",
    coupon: "SUMMER_SALE",
    currency: "USD",
    shipping: Number((total * 0.12).toFixed(2)),
    tax: Number((total * 0.07).toFixed(2)),
    value: total,
    items: [
      {
        item_id: sku,
        item_name: "Stan and Friends Tee",
        affiliation: "Merchandise Store",
        coupon: "SUMMER_FUN",
        currency: "USD",
        discount: itemDiscount,
        index: 0,
        item_brand: "Google",
        item_category: "Apparel",
        item_category2: "Adult",
        item_category3: "Shirts",
        item_category4: "Crew",
        item_category5: "Short sleeve",
        item_list_id: "related_products",
        item_list_name: "Related Products",
        item_variant: "green",
        location_id: "ChIJIQBpAG2ahYAR_6128GcTUEo",
        price: itemPrice,
        quantity: itemQty,
      },
    ],
  },
  logged_in: logged,
  user_id: ui,
});
```

The _utag.link()_ data object is based on the [Tealium utag.link](https://community.tealiumiq.com/t5/Tealium-iQ-Tag-Management/utag-link-Reference/ta-p/1009) and [Adobe Analytics](https://marketing.adobe.com/resources/help/en_US/sc/implement/link-tracking.html) objects.

The events _utag.link()_ implemented is composed of:

```js
utag.link({
  tealium_event: en || e.id,
  // events parameters
  button_text:
    e.tagName === "BUTTON" && e.innerText !== "" ? e.innerText : undefined,
  contact_method: cm,
  currency: cc,
  event_type:
    en === "generated_lead" || en === "form_submit"
      ? "conversion"
      : "ui interaction",
  file_extension: e.id === "download" ? "pdf" : undefined,
  file_name: e.id === "download" ? "PDF_to_Download" : undefined,
  form_destination: fd,
  form_id: e.id.includes("form") ? e.id : undefined,
  form_name: e.id.includes("form") ? "User Profession Survey" : undefined,
  form_submit_text: e.id === "form" ? e.innerText : undefined,
  link_domain: ld,
  link_classes: lc,
  link_id:
    e.id === "extlink" || e.id === "intlink" || e.id === "download"
      ? e.id
      : undefined,
  link_url: lu,
  link_text:
    e.id === "extlink" || e.id === "intlink" || e.id === "download"
      ? e.innerText
      : undefined,
  method: e.id === "login" ? "Google" : undefined,
  outbound: ol,
  search_term: st,
  tag_name: e.tagName,
  value: val,
  video_current_time: vct,
  video_duration: vd,
  video_percent: vpct,
  video_provider: vp,
  video_status:
    e.id === "video" && (vplay === true || vstop === true) ? vs : undefined,
  video_title: vt,
  // user properties
  logged_in: logged,
  user_id: ui,
  user_profession: fi,
});
```

The purchase event _utag.link()_ implemented is composed of:

```js
utag.link({
  ecommerce: null,
}); // Clear the previous ecommerce object

utag.link({
  tealium_event: e.id,
  button_text: e.innerText,
  event_type: "conversion",
  tag_name: e.tagName,
  ecommerce: {
    transaction_id: transactionID,
    affiliation: "Merchandise Store",
    coupon: "SUMMER_SALE",
    currency: "USD",
    shipping: Number((total * 0.12).toFixed(2)),
    tax: Number((total * 0.07).toFixed(2)),
    value: total,
    items: [
      {
        item_id: sku,
        item_name: "Stan and Friends Tee",
        affiliation: "Merchandise Store",
        coupon: "SUMMER_FUN",
        currency: "USD",
        discount: itemDiscount,
        index: 0,
        item_brand: "Google",
        item_category: "Apparel",
        item_category2: "Adult",
        item_category3: "Shirts",
        item_category4: "Crew",
        item_category5: "Short sleeve",
        item_list_id: "related_products",
        item_list_name: "Related Products",
        item_variant: "green",
        location_id: "ChIJIQBpAG2ahYAR_6128GcTUEo",
        price: itemPrice,
        quantity: itemQty,
      },
    ],
  },
  logged_in: logged,
  user_id: ui,
});
```

=====

Copyright 2022-2023 | Arturo Santiago-Rivera | [MIT License](LICENSE)
