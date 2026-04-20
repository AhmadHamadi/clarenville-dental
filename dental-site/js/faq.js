import { FAQ_CONTENT } from './faq-content.js';

export function initFAQ() {
  _renderPageFaq();

  const accordions = document.querySelectorAll('.accordion');
  if (!accordions.length) return;

  accordions.forEach((accordion) => {
    const buttons = accordion.querySelectorAll('.accordion__btn');

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => _toggleItem(btn, buttons));
      btn.addEventListener('keydown', (e) => _handleKeydown(e, btn, buttons));
    });
  });
}

function _renderPageFaq() {
  const pageName = window.location.pathname.split('/').pop();
  if (!pageName || pageName === 'privacy-policy.html' || pageName === 'terms-of-service.html') {
    return;
  }

  const config = FAQ_CONTENT[pageName] ?? _buildFallbackFaq(pageName);
  if (!config) return;

  const section = _findOrCreateFaqSection(pageName, config);
  const heading = section.querySelector('.section-header .section-heading');
  const copy = section.querySelector('.section-header .section-subheading');
  const accordion = section.querySelector('.accordion');

  if (heading) heading.textContent = config.sectionTitle;
  if (copy) copy.textContent = config.sectionSubtitle;
  if (accordion) {
    accordion.innerHTML = _buildAccordionMarkup(pageName.replace('.html', ''), config.items);
  }
}

function _buildFallbackFaq(pageName) {
  const title = document.querySelector('h1')?.textContent?.trim();
  const lede =
    document.querySelector('.page-hero__lede')?.textContent?.trim() ||
    document.querySelector('.section-subheading')?.textContent?.trim() ||
    document.querySelector('.dentist__bio')?.textContent?.trim();

  if (!title) return null;

  return {
    sectionTitle: `${title} FAQ`,
    sectionSubtitle: 'Questions patients often ask when they are deciding whether this page matches their concern and what the next step should be.',
    items: [
      {
        question: `How do I know if "${title}" fits what I am dealing with?`,
        answer: lede || 'This page is meant to help you match a real concern with the right type of visit before you book.',
      },
      {
        question: `What usually happens at a visit related to ${title.toLowerCase()}?`,
        answer: 'Most visits start with your main concern, a practical review of what is happening now, and a recommendation for the clearest next step based on urgency, symptoms, and goals.',
      },
      {
        question: `When should I call the clinic instead of waiting after reading about ${title.toLowerCase()}?`,
        answer: 'Call sooner if the issue is painful, worsening, affecting eating or sleeping, involves swelling or trauma, or simply feels more urgent than a routine question.',
      },
      {
        question: `How is this page different from the general services page?`,
        answer: 'The services page helps you choose a category. This page is more focused, so you can understand one concern or treatment path without digging through unrelated topics first.',
      },
      {
        question: `What is the best next move after reading the ${title.toLowerCase()} page?`,
        answer: 'If the page sounds like your situation, call the clinic or request an appointment. If you are still comparing options, move to the services page or FAQ hub next.',
      },
    ],
  };
}

function _findOrCreateFaqSection(pageName, config) {
  const existingAccordion = document.querySelector('.accordion');
  if (existingAccordion) {
    return existingAccordion.closest('section');
  }

  const main = document.querySelector('main');
  if (!main) return document.body;

  const section = document.createElement('section');
  section.className = 'section section--alt';
  section.setAttribute('data-faq-section', 'true');

  const prefix = pageName.replace('.html', '');
  const headingId = `${prefix}-faq-heading`;

  section.innerHTML = `
    <div class="container container--narrow">
      <div class="section-header">
        <h2 id="${headingId}" class="section-heading">${config.sectionTitle}</h2>
        <p class="section-subheading">${config.sectionSubtitle}</p>
      </div>
      <div class="accordion" role="list">
        ${_buildAccordionMarkup(prefix, config.items)}
      </div>
    </div>
  `;

  main.appendChild(section);
  return section;
}

function _buildAccordionMarkup(prefix, items) {
  return items.map((item, index) => {
    const count = index + 1;
    const buttonId = `${prefix}-faq-btn-${count}`;
    const answerId = `${prefix}-faq-answer-${count}`;

    return `
      <div class="accordion__item" role="listitem">
        <button class="accordion__btn" aria-expanded="false" aria-controls="${answerId}" id="${buttonId}">
          <span class="accordion__question">${item.question}</span>
          <svg class="accordion__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
        <div id="${answerId}" class="accordion__content" role="region" aria-labelledby="${buttonId}">
          <p class="accordion__answer">${item.answer}</p>
        </div>
      </div>
    `;
  }).join('');
}

function _toggleItem(btn, allButtons) {
  const contentId = btn.getAttribute('aria-controls');
  const content = document.getElementById(contentId);
  const icon = btn.querySelector('.accordion__icon');

  if (!content) return;

  const isOpen = content.classList.contains('is-open');
  _closeAll(allButtons);

  if (!isOpen) {
    content.classList.add('is-open');
    icon?.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
  }
}

function _closeAll(buttons) {
  buttons.forEach((button) => {
    const id = button.getAttribute('aria-controls');
    const content = document.getElementById(id);
    const icon = button.querySelector('.accordion__icon');

    content?.classList.remove('is-open');
    icon?.classList.remove('is-open');
    button.setAttribute('aria-expanded', 'false');
  });
}

function _handleKeydown(e, btn, allButtons) {
  const buttonArray = Array.from(allButtons);
  const index = buttonArray.indexOf(btn);

  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault();
      buttonArray[(index + 1) % buttonArray.length]?.focus();
      break;
    case 'ArrowUp':
      e.preventDefault();
      buttonArray[(index - 1 + buttonArray.length) % buttonArray.length]?.focus();
      break;
    case 'Home':
      e.preventDefault();
      buttonArray[0]?.focus();
      break;
    case 'End':
      e.preventDefault();
      buttonArray[buttonArray.length - 1]?.focus();
      break;
  }
}
