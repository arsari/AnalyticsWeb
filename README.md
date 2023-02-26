# AnalyticsWeb

## Web Analytic Implementation Playground

### Table of Contents

- [AnalyticsWeb](#analyticsweb)
  - [Web Analytic Implementation Playground](#web-analytic-implementation-playground)
    - [Table of Contents](#table-of-contents)
    - [Introduction](#introduction)
    - [General Events](#general-events)
    - [Purchase Event](#purchase-event)
    - [Video Events](#video-events)
    - [Error Events](#error-events)

### Introduction

Playground of analytic implementation for a web data stream that allows to explore the implementation of:

- dataLayer objects managed through GTM and analyzing the data in GA4,
- utag.link() data objects managed through Tealium IQ tag manager and analyzing the data in Adobe Analytics.
- Setting of Adobe Launch rules to be analyzed in Adobe Analytics.

![Playground Screenshot](230224-playground_screenshot.png)

The implementation add an initial `dataLayer` array-object and a `utag_data` object variable on each web page.

The initial `dataLayer` array-object should be located inside the `<head>...</head>` tag of the web page before the GTM snippet.

```html
<!-- dataLayers init -->
<script type="text/javascript">
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "initData",
    author_email: "asantiago@arsari.com",
    content_group: "Implementation",
    content_type: "Playground",
    language_code: "en-US",
    page_author: "Arturo Santiago-Rivera",
    page_name: "Web Analytics Implementation - Home Page",
    page_title: document.querySelector("title").innerText,
    // user properties
    logged_in: localStorage.logged,
    user_id: localStorage.UUID,
  });
</script>
<!-- END: dataLayers init -->
```

The initial `utag_data` object variable should be located inside the `<body>...</body>` tag of the web page before the Tealium IQ snippet.

```html
<!-- utag_data object init -->
<script type="text/javascript">
  const utag_data = {
    author_email: "asantiago@arsari.com",
    content_group: "Implementation",
    content_type: "Playground",
    language_code: "en-US",
    page_author: "Arturo Santiago-Rivera",
    page_name: "Web Analytics Implementation - Home Page",
    page_title: document.querySelector("title").innerText,
    // user properties
    logged_in: localStorage.logged,
    user_id: localStorage.UUID,
  };
</script>
<!-- END: utag data object init -->
```

The implementation consider the followings user interactions based on element click `[name="action"]` and a `addEventListener()` method to fire the corresponding **events**:

| UI Interaction          | Event               | Parameters                                                                                     |
| ----------------------- | ------------------- | ---------------------------------------------------------------------------------------------- |
| Sign In                 | login               | method                                                                                         |
| Sign In                 | login_error         | error_message, alert_impression                                                                |
| Outbound Link           | outbound_link       | link_domain, link_classes, link_id, link_url, link_text, outbound                              |
| Internal Link           | internal_link       | link_domain, link_classes, link_id, link_url, link_text                                        |
| Download                | file_download       | file_name, file_extension, link_domain, link_classes, link_id, link_text                       |
| Video                   | video_start         | video_current_time, video_title, video_provider, video_duration, video_status, video_percent   |
|                         | video_progress      | video_current_time, video_title, video_provider, video_duration, video_status, video_percent   |
|                         | video_complete      | video_current_time, video_title, video_provider, video_duration, video_status, video_percent   |
| Video playing           | video_stop          | video_current_time, video_title, video_provider, video_duration, video_status, video_percent   |
| Email                   | generated_lead      | contact_method, currency, value                                                                |
| Phone                   | generated_lead      | contact_method, currency, value                                                                |
| Form                    | form_start          | form_destination, form_id, form_name                                                           |
| \* _Submit Button_      | form_submit         | contact_method, form_destination, form_id, form_name, form_submit_text, value, user_profession |
| \* _`X`_ (close form)   | form_modal_closed   | form_id, form_name                                                                             |
| Form                    | form_error          | error_message, alert_impression                                                                |
| Purchase                | purchase            | ecommerce.transaction_id, ecommerce.value, ecommerce.tax, ecommerce.shipping, ecommerce.items  |
| Search                  | search_modal_opened |                                                                                                |
| \* _Magnified Glass_    | search              | search_term                                                                                    |
| \* _`X`_ (close search) | search_modal_closed |                                                                                                |
| Search                  | search_error        | error_message, alert_impression                                                                |
| Sign Out                | logout              |                                                                                                |
| Sign Out                | logout_error        | error_message, alert_impression                                                                |

Ths following global parameters apply to to the majority of the above **events**:

| Global Parameters              |
| ------------------------------ |
| event_timestamp (milliseconds) |
| custom_timestamp (ISO 8601)    |
| button_text                    |
| event_type                     |
| tag_name                       |
| logged_in (user property)      |
| user_id (user property)        |

The events `dataLayer` array-object is based on [Google Analytics 4](https://support.google.com/analytics/answer/9322688?hl=en) events recommendations and [Google Tag Manager dataLayer](https://developers.google.com/tag-manager/devguide#datalayer). The `utag.link` data object is based on the [Tealium utag.link](https://community.tealiumiq.com/t5/Tealium-iQ-Tag-Management/utag-link-Reference/ta-p/1009) and [Adobe Analytics](https://marketing.adobe.com/resources/help/en_US/sc/implement/link-tracking.html) objects.

The implementation of the `dataLayer` array-object and utag.link() data has been worked out using four main event objects:

- A [General Events](#general-events) `dataLayer` array-object and `utag.link` data object;
- A [Purchase Event](#purchase-event) `dataLayer` array-object and `utag.link` data object;
- A [Video Events](#video-events) `dataLayer` array-object and `utag.link` data object;
- An [Error Events](#error-events) `dataLayer` array-object and `utag.link` data object.

The `dataLayer` array-object for this four main event objects has been setup in GTM with individual tags and triggers after discovering that using a unique `dataLayer` array-object with multiple events was not working as expected.

![GTM Screenshot](230226-gtm_tags-screenshot.png)

### General Events

The implemented _general events_ `dataLayer` array-object and `utag.link` data object is composed of:

```js
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: en || e.id,
  // event parameters
  event_timestamp: new Date().getTime(), // milliseconds
  custom_timestamp: timeStamp(), // ISO 8601
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

utag.link({
  tealium_event: en || e.id,
  // event parameters
  event_timestamp: new Date().getTime(), // milliseconds
  custom_timestamp: timeStamp(), // ISO 8601
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

### Purchase Event

The implemented _purchase event_ `dataLayer` array-object and `utag.link` data object is composed of:

```js
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  ecommerce: null,
}); // Clear the previous ecommerce object

window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: e.id,
  // event parameters
  event_timestamp: new Date().getTime(), // milliseconds
  custom_timestamp: timeStamp(), // ISO 8601
  event_type: "conversion",
  button_text: e.innerText,
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
        item_brand: "MyCollection",
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
  // user properties
  logged_in: logged,
  user_id: ui,
});

utag.link({
  ecommerce: null,
}); // Clear the previous ecommerce object

utag.link({
  tealium_event: e.id,
  // event parameters
  event_timestamp: new Date().getTime(), // milliseconds
  custom_timestamp: timeStamp(), // ISO 8601
  event_type: "conversion",
  button_text: e.innerText,
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
        item_brand: "MyCollection",
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
  // user properties
  logged_in: logged,
  user_id: ui,
});
```

### Video Events

The _video events_ use the _general events_ `dataLayer` array-object and `utag.link` data object excluding the _video progress event_ which use a unique `dataLayer` array-object and `utag.link` data object.

Using `setInterval()` function we implement the _video progress event_.

The implemented _video progress event_ `datalayer` array-object and `utag.link` data object is composed of:

```js
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: en,
  event_timestamp: new Date().getTime(), // milliseconds
  custom_timestamp: timeStamp(), // ISO 8601
  button_text: null,
  tag_name: null,
  event_type: "content tool",
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
  button_text: null,
  tag_name: null,
  event_type: "content tool",
  video_current_time: vct,
  video_duration: vduration,
  video_percent: milestone,
  video_provider: vp,
  video_status: vs,
  video_title: vt,
  logged_in: logged,
  user_id: ui,
});
```

### Error Events

The error events is a function that is called when errors occurs for Search event, Form event, Sing In event, and Sign Out event.

The implemented _error events_ `datalayer` array-object and `utag.link` data object is composed of:

```js
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: `${e.id}_error`,
  event_timestamp: new Date().getTime(), // milliseconds
  custom_timestamp: timeStamp(), // ISO 8601
  event_type: "content tool",
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
  event_type: "content tool",
  button_text: e.innerText,
  tag_name: e.tagName,
  error_message: m,
  alert_impression: true,
  // user properties
  logged_in: l,
  user_id: u,
});
```

=====

Copyright 2022-2023 | Arturo Santiago-Rivera | [MIT License](LICENSE)
