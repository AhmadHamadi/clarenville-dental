/**
 * navigation.js
 * Handles universal nav enhancements, service dropdowns, mobile menu,
 * and page hero CTA normalization.
 */

const SERVICE_CATEGORIES = [
  {
    id: "general-preventive",
    label: "General",
    href: "services.html#general-preventive",
    items: [
      { href: "general-dentistry.html", label: "General Dentistry" },
      { href: "new-patient-exams.html", label: "New Patient Exams" },
      { href: "dental-cleanings.html", label: "Dental Exams and Cleanings" },
      { href: "digital-x-rays.html", label: "Digital X-Rays" },
      { href: "preventive-dentistry.html", label: "Preventive Dentistry" },
      { href: "deep-cleanings-gum-disease.html", label: "Deep Cleaning and Gum Disease Care" },
      { href: "fluoride-treatments.html", label: "Fluoride Treatments" },
      { href: "dental-sealants.html", label: "Dental Sealants" },
    ],
  },
  {
    id: "family-kids",
    label: "Family",
    href: "services.html#family-kids",
    items: [
      { href: "family-dentistry.html", label: "Family Dentistry" },
      { href: "pediatric-dentistry.html", label: "Pediatric Dentistry" },
      { href: "new-patients.html", label: "New Patients" },
      { href: "dental-insurance-clarenville.html", label: "Insurance and CDCP" },
    ],
  },
  {
    id: "emergency-surgical",
    label: "Emergency",
    href: "services.html#emergency-surgical",
    items: [
      { href: "emergency-dentist.html", label: "Emergency Dental Care" },
      { href: "tooth-extractions.html", label: "Tooth Extractions" },
      { href: "wisdom-teeth-removal.html", label: "Wisdom Teeth Extractions" },
    ],
  },
  {
    id: "restorative-implants",
    label: "Restorative",
    href: "services.html#restorative-implants",
    items: [
      { href: "tooth-colored-fillings.html", label: "Dental Fillings" },
      { href: "root-canal-treatment.html", label: "Root Canal Therapy" },
      { href: "dental-crowns-and-bridges.html", label: "Dental Crowns and Bridges" },
      { href: "dentures.html", label: "Dentures" },
      { href: "partial-dentures.html", label: "Partial Dentures" },
      { href: "dental-implants.html", label: "Dental Implants" },
      { href: "implant-restoration.html", label: "Implant Restoration" },
      { href: "implant-crowns.html", label: "Implant Crowns" },
    ],
  },
  {
    id: "cosmetic-smile",
    label: "Cosmetic",
    href: "services.html#cosmetic-smile",
    items: [
      { href: "cosmetic-dentistry.html", label: "Cosmetic Dentistry" },
      { href: "smile-makeovers.html", label: "Smile Makeovers" },
      { href: "dental-bonding.html", label: "Dental Bonding" },
      { href: "teeth-whitening.html", label: "Teeth Whitening" },
      { href: "dental-veneers.html", label: "Dental Veneers" },
      { href: "invisalign.html", label: "Invisalign" },
    ],
  },
  {
    id: "protective-appliances",
    label: "Protective",
    href: "services.html#protective-appliances",
    items: [
      { href: "night-guards.html", label: "Night Guards" },
      { href: "sports-mouth-guards.html", label: "Sports Mouth Guards" },
    ],
  },
];

const SERVICE_LINKS = [
  { href: "services.html", label: "All Services" },
  ...SERVICE_CATEGORIES.flatMap((category) => category.items),
];

export function initNavigation() {
  _ensureSiteStructuredData();
  _ensureHomeLinks();
  _enhanceServiceDropdown();
  _ensurePhoneCtas();
  _initMobileMenu();
  _initSmoothScroll();
}

function _ensureSiteStructuredData() {
  const head = document.head;
  if (!head) return;

  const robots = document.querySelector('meta[name="robots"]')?.getAttribute("content")?.toLowerCase() ?? "";
  if (robots.includes("noindex")) return;

  if (document.getElementById("site-dentist-schema")) return;
  if (head.textContent?.includes('"@type": "Dentist"') || head.textContent?.includes('"@type":"Dentist"')) return;

  const canonicalHref =
    document.querySelector('link[rel="canonical"]')?.getAttribute("href") ||
    window.location.href;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": "https://clarenvilledental.com/#dentist",
    name: "Clarenville Dental Care",
    url: "https://clarenvilledental.com/",
    image: "https://clarenvilledental.com/assets/images/logo.webp",
    telephone: "+1-709-200-0209",
    email: "clarenville.dental@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "259 Memorial Drive, Suite 201",
      addressLocality: "Clarenville",
      addressRegion: "NL",
      postalCode: "A5A 1R4",
      addressCountry: "CA",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "15:00",
      },
    ],
    areaServed: [
      "Clarenville",
      "Shoal Harbour",
      "Milton",
      "Georges Brook",
      "Deep Bight",
      "Port Blandford",
      "Swift Current",
      "Arnold's Cove",
      "Sunnyside",
    ].map((name) => ({
      "@type": "City",
      name,
    })),
    mainEntityOfPage: canonicalHref,
  };

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = "site-dentist-schema";
  script.textContent = JSON.stringify(schema);
  head.appendChild(script);
}

function _ensureHomeLinks() {
  const isNestedPage = window.location.pathname.includes("/pages/");
  const homeHref = isNestedPage ? "../index.html" : "/";

  const desktopNav = document.querySelector(".navbar__nav");
  if (desktopNav && !desktopNav.querySelector('a[href="/"], a[href="../index.html"], a[href="index.html"]')) {
    const homeLink = document.createElement("a");
    homeLink.href = homeHref;
    homeLink.className = "navbar__link";
    homeLink.textContent = "Home";
    desktopNav.insertBefore(homeLink, desktopNav.firstElementChild);
  }

  const mobileNav = document.querySelector(".mobile-menu__nav");
  if (mobileNav && !mobileNav.querySelector('a[href="/"], a[href="../index.html"], a[href="index.html"]')) {
    const homeLink = document.createElement("a");
    homeLink.href = homeHref;
    homeLink.className = "mobile-menu__link";
    homeLink.textContent = "Home";
    mobileNav.insertBefore(homeLink, mobileNav.firstElementChild);
  }
}

function _enhanceServiceDropdown() {
  const desktopNav = document.querySelector(".navbar__nav");
  if (desktopNav) {
    _buildDesktopServicesDropdown(desktopNav);
  }

  const mobileNav = document.querySelector(".mobile-menu__nav");
  if (mobileNav) {
    _buildMobileServicesDropdown(mobileNav);
  }

  _bindDesktopDropdownBehavior();
  _bindMobileDropdownBehavior();
}

function _buildDesktopServicesDropdown(desktopNav) {
  const existingDropdown = desktopNav.querySelector(".nav-dropdown");
  if (existingDropdown) {
    _syncDesktopDropdownLinks(existingDropdown);
    return;
  }

  const servicesLink = Array.from(desktopNav.querySelectorAll("a")).find(
    (link) => link.textContent.trim().toLowerCase() === "services",
  );

  if (!servicesLink) return;

  const wrapper = document.createElement("div");
  wrapper.className = "nav-dropdown";

  const trigger = document.createElement("div");
  trigger.className = "nav-dropdown__trigger";

  servicesLink.classList.add("nav-dropdown__link");

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "nav-dropdown__toggle";
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-haspopup", "true");
  toggle.setAttribute("aria-label", "Open services menu");
  toggle.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  `;

  const menu = document.createElement("div");
  menu.className = "nav-dropdown__menu";
  menu.setAttribute("role", "menu");
  menu.setAttribute("aria-label", "Services submenu");
  menu.innerHTML = _buildDesktopServicesMenuMarkup();

  desktopNav.replaceChild(wrapper, servicesLink);
  trigger.appendChild(servicesLink);
  trigger.appendChild(toggle);
  wrapper.appendChild(trigger);
  wrapper.appendChild(menu);
}

function _buildMobileServicesDropdown(mobileNav) {
  const existingSubmenu = mobileNav.querySelector(".mobile-submenu");
  if (existingSubmenu) {
    _syncMobileDropdownLinks(existingSubmenu);
    return;
  }

  const servicesLink = Array.from(mobileNav.querySelectorAll("a")).find(
    (link) => link.textContent.trim().toLowerCase() === "services",
  );

  if (!servicesLink) return;

  const wrapper = document.createElement("div");
  wrapper.className = "mobile-submenu";

  const header = document.createElement("div");
  header.className = "mobile-submenu__header";

  servicesLink.classList.add("mobile-submenu__link");

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "mobile-submenu__toggle";
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Toggle services menu");
  toggle.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  `;

  const list = document.createElement("div");
  list.className = "mobile-submenu__panel";
  list.innerHTML = _buildMobileServicesMenuMarkup();

  mobileNav.replaceChild(wrapper, servicesLink);
  header.appendChild(servicesLink);
  header.appendChild(toggle);
  wrapper.appendChild(header);
  wrapper.appendChild(list);
}

function _syncDesktopDropdownLinks(dropdown) {
  const menu = dropdown.querySelector(".nav-dropdown__menu");
  if (menu) {
    menu.innerHTML = _buildDesktopServicesMenuMarkup();
  }

  const triggerLink = dropdown.querySelector(".nav-dropdown__link");
  if (triggerLink) {
    triggerLink.href = _resolvePageHref("services.html");
  }
}

function _syncMobileDropdownLinks(submenu) {
  const panel = submenu.querySelector(".mobile-submenu__panel");
  if (panel) {
    panel.innerHTML = _buildMobileServicesMenuMarkup();
  }

  const triggerLink = submenu.querySelector(".mobile-submenu__link");
  if (triggerLink) {
    triggerLink.href = _resolvePageHref("services.html");
  }
}

function _bindDesktopDropdownBehavior() {
  const dropdown = document.querySelector(".nav-dropdown");
  if (!dropdown) return;

  const toggle = dropdown.querySelector(".nav-dropdown__toggle");
  const menu = dropdown.querySelector(".nav-dropdown__menu");
  const categoryLinks = Array.from(dropdown.querySelectorAll(".nav-dropdown__category"));
  const panels = Array.from(dropdown.querySelectorAll(".nav-dropdown__panel"));

  const open = () => {
    dropdown.classList.add("is-open");
    toggle?.setAttribute("aria-expanded", "true");
  };

  const close = () => {
    dropdown.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
  };

  dropdown.addEventListener("mouseenter", open);
  dropdown.addEventListener("mouseleave", close);
  dropdown.addEventListener("focusin", open);
  dropdown.addEventListener("focusout", (event) => {
    if (!dropdown.contains(event.relatedTarget)) {
      close();
    }
  });

  toggle?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (dropdown.classList.contains("is-open")) {
      close();
    } else {
      open();
    }
  });

  document.addEventListener("click", (event) => {
    if (!dropdown.contains(event.target) && !menu?.contains(event.target)) {
      close();
    }
  });

  const setActiveCategory = (categoryId) => {
    categoryLinks.forEach((link) => {
      const isActive = link.dataset.category === categoryId;
      link.classList.toggle("is-active", isActive);
      link.setAttribute("aria-selected", String(isActive));
    });

    panels.forEach((panel) => {
      panel.hidden = panel.dataset.category !== categoryId;
    });
  };

  const defaultCategory = categoryLinks[0]?.dataset.category;
  if (defaultCategory) {
    setActiveCategory(defaultCategory);
  }

  categoryLinks.forEach((link) => {
    const activate = () => setActiveCategory(link.dataset.category);
    link.addEventListener("mouseenter", activate);
    link.addEventListener("focus", activate);
  });
}

function _bindMobileDropdownBehavior() {
  const submenu = document.querySelector(".mobile-submenu");
  if (!submenu) return;

  const toggle = submenu.querySelector(".mobile-submenu__toggle");
  if (!toggle) return;

  toggle.addEventListener("click", () => {
    const isOpen = submenu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

function _resolvePageHref(pageHref) {
  const isNestedPage = window.location.pathname.includes("/pages/");
  return isNestedPage ? pageHref : `pages/${pageHref}`;
}

function _buildDesktopServicesMenuMarkup() {
  const categoriesMarkup = SERVICE_CATEGORIES.map((category, index) => (
    `<a href="${_resolvePageHref(category.href)}" class="nav-dropdown__category${index === 0 ? " is-active" : ""}" data-category="${category.id}" role="tab" aria-selected="${index === 0 ? "true" : "false"}">${category.label}</a>`
  )).join("");

  const panelsMarkup = SERVICE_CATEGORIES.map((category, index) => (
    `<div class="nav-dropdown__panel" data-category="${category.id}" role="tabpanel"${index === 0 ? "" : " hidden"}>
      <div class="nav-dropdown__panel-head">
        <span class="nav-dropdown__panel-label">${category.label} Services</span>
        <a href="${_resolvePageHref(category.href)}" class="nav-dropdown__panel-link">View Category</a>
      </div>
      <div class="nav-dropdown__panel-list">
        ${category.items.map((service) => `<a href="${_resolvePageHref(service.href)}" class="nav-dropdown__item">${service.label}</a>`).join("")}
      </div>
    </div>`
  )).join("");

  return `
    <div class="nav-dropdown__layout">
      <div class="nav-dropdown__sidebar">
        <a href="${_resolvePageHref("services.html")}" class="nav-dropdown__all">All Services</a>
        <div class="nav-dropdown__categories" role="tablist" aria-label="Service categories">${categoriesMarkup}</div>
      </div>
      <div class="nav-dropdown__content">${panelsMarkup}</div>
    </div>
  `;
}

function _buildMobileServicesMenuMarkup() {
  return `
    <a href="${_resolvePageHref("services.html")}" class="mobile-submenu__item mobile-submenu__item--all">All Services</a>
    ${SERVICE_CATEGORIES.map((category) => `
      <div class="mobile-submenu__group">
        <a href="${_resolvePageHref(category.href)}" class="mobile-submenu__group-title">${category.label}</a>
        <div class="mobile-submenu__group-list">
          ${category.items.map((service) => `<a href="${_resolvePageHref(service.href)}" class="mobile-submenu__item">${service.label}</a>`).join("")}
        </div>
      </div>
    `).join("")}
  `;
}

function _ensurePhoneCtas() {
  const phoneHref = "tel:+17092000209";
  const phoneLabel = "(709) 200-0209";

  document.querySelectorAll(".page-hero__actions").forEach((actions) => {
    const appointmentBtn = actions.querySelector('a[href*="appointment-request"]');
    if (!appointmentBtn) return;

    const existingPhoneBtn = actions.querySelector(`a[href="${phoneHref}"]`);
    if (existingPhoneBtn) {
      existingPhoneBtn.textContent = phoneLabel;
      existingPhoneBtn.classList.add("btn", "btn--secondary", "btn--phone");
      return;
    }

    const secondaryBtn = Array.from(actions.querySelectorAll("a")).find((link) => link !== appointmentBtn);
    if (secondaryBtn) {
      secondaryBtn.href = phoneHref;
      secondaryBtn.textContent = phoneLabel;
      secondaryBtn.className = "btn btn--secondary btn--phone";
      secondaryBtn.setAttribute("aria-label", `Call Clarenville Dental Care at ${phoneLabel}`);
      return;
    }

    const phoneBtn = document.createElement("a");
    phoneBtn.href = phoneHref;
    phoneBtn.className = "btn btn--secondary btn--phone";
    phoneBtn.textContent = phoneLabel;
    phoneBtn.setAttribute("aria-label", `Call Clarenville Dental Care at ${phoneLabel}`);
    actions.appendChild(phoneBtn);
  });
}

function _initMobileMenu() {
  const toggleBtn = document.getElementById("navbar-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  if (!toggleBtn || !mobileMenu) return;

  toggleBtn.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.contains("is-open");

    mobileMenu.classList.toggle("is-open");
    toggleBtn.setAttribute("aria-expanded", String(!isOpen));
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("is-open");
      toggleBtn.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (event) => {
    const navbar = document.querySelector(".navbar");
    if (navbar && !navbar.contains(event.target)) {
      mobileMenu.classList.remove("is-open");
      toggleBtn.setAttribute("aria-expanded", "false");
    }
  });
}

function _initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");
      if (targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();

      const navHeight = document.querySelector(".navbar")?.offsetHeight ?? 64;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({ top: targetTop, behavior: "smooth" });
    });
  });
}
