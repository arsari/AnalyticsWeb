const btnClick = document.querySelectorAll('button');

btnClick.forEach((e) => {
  e.addEventListener('click', () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: e.id,
      event_type: 'ui interaction',
      page_name: utag.data['dom.title'],
    });
    utag.link({
      event: e.id,
      event_type: 'ui interaction',
      page_name: utag.data['dom.title'],
    });

    document.querySelector('#json').innerHTML += `<p><em>dataLayer.push and utag.link ${
      window.dataLayer.length
    }</em></p><pre>${JSON.stringify(window.dataLayer.at(-1), undefined, 2)}</pre>`;
  });
});
