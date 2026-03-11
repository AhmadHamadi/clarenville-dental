/**
 * faq.js
 * Accordion functionality for the FAQ section.
 * Follows ARIA best practices for disclosure widgets.
 * Hamilton Care Dental
 */

export function initFAQ() {
  const accordion = document.querySelector('.accordion');
  if (!accordion) return;

  const buttons = accordion.querySelectorAll('.accordion__btn');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => _toggleItem(btn, buttons));
    btn.addEventListener('keydown', e => _handleKeydown(e, btn, buttons));
  });
}

function _toggleItem(btn, allButtons) {
  const contentId = btn.getAttribute('aria-controls');
  const content   = document.getElementById(contentId);
  const icon      = btn.querySelector('.accordion__icon');

  if (!content) return;

  const isOpen = content.classList.contains('is-open');

  // Close all items first
  _closeAll(allButtons);

  // If it was closed, open it
  if (!isOpen) {
    content.classList.add('is-open');
    icon?.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
  }
}

function _closeAll(buttons) {
  buttons.forEach(b => {
    const id      = b.getAttribute('aria-controls');
    const content = document.getElementById(id);
    const icon    = b.querySelector('.accordion__icon');

    content?.classList.remove('is-open');
    icon?.classList.remove('is-open');
    b.setAttribute('aria-expanded', 'false');
  });
}

function _handleKeydown(e, btn, allButtons) {
  const btnsArray = Array.from(allButtons);
  const idx       = btnsArray.indexOf(btn);

  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault();
      btnsArray[(idx + 1) % btnsArray.length]?.focus();
      break;
    case 'ArrowUp':
      e.preventDefault();
      btnsArray[(idx - 1 + btnsArray.length) % btnsArray.length]?.focus();
      break;
    case 'Home':
      e.preventDefault();
      btnsArray[0]?.focus();
      break;
    case 'End':
      e.preventDefault();
      btnsArray[btnsArray.length - 1]?.focus();
      break;
  }
}
