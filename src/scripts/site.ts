/**
 * Small site-wide behaviours: email address assembly, booking links, copy button,
 * mobile menu and light image-protection deterrents.
 */
import { bookingChecklist } from '../data/site';

// ---------- Email ----------
// The address is stored reversed in two data attributes so it never appears as plain text in the HTML.
const source = document.querySelector<HTMLElement>('[data-email-user]');
const reverse = (s: string) => [...s].reverse().join('');
const email = source ? `${reverse(source.dataset.emailUser ?? '')}@${reverse(source.dataset.emailDomain ?? '')}` : '';

function mailto(subject: string): string {
  const body = ['Hi Brendan,', '', ...bookingChecklist.map((q) => `${q}:`), '', 'Thanks!'].join('\n');
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

if (email) {
  document.querySelectorAll<HTMLElement>('[data-email-text]').forEach((el) => (el.textContent = email));
  document.querySelectorAll<HTMLAnchorElement>('a[data-mailto]').forEach((a) => {
    a.href = mailto(a.dataset.mailto || 'Booking enquiry');
  });
}

// ---------- Copy email ----------
document.querySelectorAll<HTMLButtonElement>('[data-copy-email]').forEach((button) => {
  const status = document.getElementById(button.getAttribute('aria-describedby') ?? '');
  const say = (message: string) => {
    if (!status) return;
    status.textContent = message;
    window.setTimeout(() => (status.textContent = ''), 3500);
  };
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(email);
      say(`Copied ${email}`);
    } catch {
      const target = document.querySelector('[data-email-text]');
      if (target) {
        const range = document.createRange();
        range.selectNodeContents(target);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
      say('Email selected. Press Ctrl+C or ⌘C to copy it.');
    }
  });
});

// ---------- Mobile menu: close after choosing a link ----------
document.querySelectorAll<HTMLDetailsElement>('[data-mobile-menu]').forEach((menu) => {
  menu.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a')) menu.open = false;
  });
});

// ---------- Image protection (deterrents only; anything on screen can still be screenshotted) ----------
document.addEventListener('contextmenu', (e) => {
  if ((e.target as HTMLElement).closest('.protect, .pswp')) e.preventDefault();
});
document.addEventListener('dragstart', (e) => {
  if ((e.target as HTMLElement).tagName === 'IMG') e.preventDefault();
});
