const packagePrice = document.querySelector('[data-package-price]');
const priceText = packagePrice.dataset.packagePrice.trim();

const price = Number(priceText.replace(',', '.'));

if (/^\d+(?:[.,]\d{1,2})?$/.test(priceText) && Number.isFinite(price) && price > 0) {
  packagePrice.querySelector('strong').textContent = new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    minimumFractionDigits: Number.isInteger(price) ? 0 : 2
  }).format(price);
  packagePrice.hidden = false;
  document.querySelector('#package-cta').textContent = 'Zapytaj o pakiet';
}

const form = document.querySelector('#contact-form');
const service = form.querySelector('#service');
const webFields = form.querySelector('#web-fields');
const appFields = form.querySelector('#app-fields');
const automationFields = form.querySelector('#automation-fields');
const status = form.querySelector('#form-status');
const submit = form.querySelector('button[type="submit"]');
const webServices = new Set(['one-page', 'custom-web']);

function updateFields() {
  const isWeb = webServices.has(service.value);
  const isAutomation = service.value === 'automation';
  const isApp = Boolean(service.value) && !isWeb && !isAutomation;

  webFields.hidden = webFields.disabled = !isWeb;
  appFields.hidden = appFields.disabled = !isApp;
  automationFields.hidden = automationFields.disabled = !isAutomation;
}

service.addEventListener('change', updateFields);
updateFields();
window.addEventListener('pageshow', updateFields);

document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    service.value = link.dataset.service;
    updateFields();
    service.focus({ preventScroll: true });
  });
});

form.addEventListener('submit', async event => {
  event.preventDefault();
  if (submit.disabled) return;

  const data = new FormData(form);
  data.set(service.name, service.selectedOptions[0].textContent.trim());

  submit.disabled = true;
  submit.textContent = 'Wysyłam…';
  status.textContent = '';
  status.removeAttribute('data-error');

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' }
    });

    if (!response.ok) throw new Error('Formspree rejected the submission');

    form.reset();
    updateFields();
    status.textContent = 'Wiadomość wysłana. Odpowiem na podany adres.';
  } catch {
    status.setAttribute('data-error', '');
    status.textContent = 'Nie udało się wysłać wiadomości. Spróbuj ponownie lub skorzystaj z adresu e-mail obok formularza.';
  } finally {
    submit.disabled = false;
    submit.textContent = 'Wyślij wiadomość';
  }
});

const showcaseControls = document.querySelector('.showcase-controls');
const showcaseButtons = [...showcaseControls.querySelectorAll('button')];

for (const button of showcaseButtons) {
  button.addEventListener('click', () => {
    for (const option of showcaseButtons) {
      const selected = option === button;
      option.setAttribute('aria-pressed', String(selected));
      document.getElementById(option.getAttribute('aria-controls')).hidden = !selected;
    }
  });
}

showcaseControls.hidden = false;

if ('IntersectionObserver' in window && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  const reveal = new IntersectionObserver(entries => {
    for (const { target, isIntersecting } of entries) {
      if (!isIntersecting) continue;

      target.classList.add('has-entered');
      reveal.unobserve(target);
    }
  }, { threshold: 0.12 });

  document.querySelectorAll('.project, .app-project').forEach(card => reveal.observe(card));
}
