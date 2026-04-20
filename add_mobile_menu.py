"""Add mobile hamburger toggle + mobile-menu div to pages that are missing them."""
import os
import re

PAGES_DIR = r"C:\Users\ahmad\OneDrive\Desktop\WEBSITES\NovaScotia\dental-site\pages"

TOGGLE_BTN = '<button id="navbar-toggle" class="navbar__toggle" aria-label="Open navigation menu" aria-expanded="false" aria-controls="mobile-menu"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg></button>'

MOBILE_MENU = '<div id="mobile-menu" class="mobile-menu"><nav class="mobile-menu__nav"><a href="../index.html" class="mobile-menu__link">Home</a><a href="about-us.html" class="mobile-menu__link">About Us</a><a href="services.html" class="mobile-menu__link">Services</a><a href="faq.html" class="mobile-menu__link">FAQ</a><a href="new-patients.html" class="mobile-menu__link">New Patients</a><a href="blog.html" class="mobile-menu__link">Blog</a><a href="contact.html" class="mobile-menu__link">Contact</a><a href="appointment-request.html" class="btn btn--primary mobile-menu__cta">Book Appointment</a></nav></div>'

fixed = 0
skipped = 0

for fname in os.listdir(PAGES_DIR):
    if not fname.endswith(".html"):
        continue
    fpath = os.path.join(PAGES_DIR, fname)
    with open(fpath, "r", encoding="utf-8") as f:
        content = f.read()

    if "navbar-toggle" in content:
        skipped += 1
        continue

    # Add toggle button before closing </div> of navbar__inner
    # Pattern: find the last </nav> inside the navbar (before </div></div></header>)
    # Insert toggle button after the </nav> that's inside navbar__inner
    new_content = re.sub(
        r'(</nav>\s*)(</div>\s*</div>\s*</header>)',
        lambda m: m.group(1) + "\n        " + TOGGLE_BTN + "\n      " + m.group(2),
        content,
        count=1
    )

    if new_content == content:
        print(f"  WARNING: could not inject toggle for {fname}")
        skipped += 1
        continue

    # Add mobile-menu div after </header>
    new_content = new_content.replace(
        "</header>\n\n  <main>",
        "</header>\n  " + MOBILE_MENU + "\n\n  <main>",
        1
    )
    if "</header>\n  " + MOBILE_MENU not in new_content:
        # Try alternate whitespace
        new_content = new_content.replace(
            "</header>\n  <main>",
            "</header>\n  " + MOBILE_MENU + "\n  <main>",
            1
        )

    with open(fpath, "w", encoding="utf-8") as f:
        f.write(new_content)
    print(f"  Fixed: {fname}")
    fixed += 1

print(f"\nDone. Fixed {fixed} pages, skipped {skipped}.")
