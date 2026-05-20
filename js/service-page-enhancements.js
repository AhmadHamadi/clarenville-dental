function getPageName() {
  let name = window.location.pathname.split("/").pop();
  if (!name || name === "") return "index.html";
  if (!name.endsWith(".html")) name += ".html";
  return name;
}

function cleanHref(href) {
  if (!href) return href;
  if (
    href.startsWith('http') ||
    href.startsWith('/') ||
    href.startsWith('#') ||
    href.startsWith('tel:') ||
    href.startsWith('mailto:')
  ) {
    return href;
  }
  const withoutPages = href.replace(/^pages\//, '');
  const [path, hash] = withoutPages.split('#');
  const slug = path.replace(/\.html$/, '');
  if (!slug) return href;
  return hash ? `/${slug}#${hash}` : `/${slug}`;
}

const PAGE_CONFIG = {
  "about-us.html": {
    image: {
      src: "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1920&q=80",
      alt: "Bright modern dental treatment room ready for a patient visit",
    },
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1200&q=80",
        alt: "Bright modern dental treatment room ready for a patient visit",
      },
      {
        src: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80",
        alt: "Prepared dental chair and technology in a modern clinic",
      },
    ],
    links: [
      { href: "services.html", label: "Dental Services" },
      { href: "new-patients.html", label: "New Patients" },
      { href: "contact.html", label: "Contact the Clinic" },
      { href: "contact.html", label: "Book Appointment" },
    ],
  },
  "blog.html": {
    image: {
      src: "https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&w=1920&q=80",
      alt: "Clinical dental setting that supports patient education and everyday care guidance",
    },
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&w=1200&q=80",
        alt: "Clinical setting that matches practical dental education and patient guidance",
      },
      {
        src: "https://images.unsplash.com/photo-1625134673337-519d7b6c1181?auto=format&fit=crop&w=1200&q=80",
        alt: "Comfortable dental space that reflects everyday patient concerns and visits",
      },
    ],
    links: [
      { href: "services.html", label: "Explore Services" },
      { href: "faq.html", label: "Patient FAQ" },
      { href: "new-patients.html", label: "First Visit Info" },
      { href: "contact.html", label: "Request Appointment" },
    ],
  },
  "faq.html": {
    image: {
      src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1920&q=80",
      alt: "Dental treatment planning area with a digital workstation and clinical tools",
    },
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
        alt: "Digital dental planning setup that fits common treatment and booking questions",
      },
      {
        src: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80",
        alt: "Prepared treatment room that supports practical pre-booking dental questions",
      },
    ],
    links: [
      { href: "new-patients.html", label: "New Patient Guide" },
      { href: "services.html", label: "Services" },
      { href: "contact.html", label: "Contact Us" },
      { href: "contact.html", label: "Book Appointment" },
    ],
  },
  "new-patients.html": {
    image: {
      src: "https://images.unsplash.com/photo-1625134673337-519d7b6c1181?auto=format&fit=crop&w=1920&q=80",
      alt: "Welcoming dental operatory prepared for a new patient visit",
    },
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1625134673337-519d7b6c1181?auto=format&fit=crop&w=1200&q=80",
        alt: "Welcoming treatment room prepared for a first dental visit",
      },
      {
        src: "https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&w=1200&q=80",
        alt: "Clean treatment space that feels ready for a first dental visit",
      },
    ],
    links: [
      { href: "family-dentistry.html", label: "Family Dentistry" },
      { href: "dental-insurance-clarenville.html", label: "Insurance and CDCP" },
      { href: "faq.html", label: "FAQ" },
      { href: "contact.html", label: "Book First Visit" },
    ],
  },
  "services.html": {
    image: {
      src: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1920&q=80",
      alt: "Modern dental treatment room reflecting the clinic's full range of services",
    },
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80",
        alt: "Modern treatment room that reflects the clinic's range of dental services",
      },
      {
        src: "https://images.unsplash.com/photo-1588776813677-77aaf5595b83?auto=format&fit=crop&w=1200&q=80",
        alt: "Restorative and preventive dental setup inside the clinic",
      },
    ],
    links: [
      { href: "family-dentistry.html", label: "Family Dentistry" },
      { href: "emergency-dentist.html", label: "Emergency Dentist" },
      { href: "invisalign.html", label: "Invisalign" },
      { href: "dental-implants.html", label: "Dental Implants" },
    ],
  },
  "dental-insurance-clarenville.html": {
    image: {
      src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1920&q=80",
      alt: "Dental planning station used for reviewing treatment timing and coverage questions",
    },
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
        alt: "Digital planning area that supports estimates, scheduling, and coverage reviews",
      },
      {
        src: "https://images.unsplash.com/photo-1588776814546-ec7e7cce4f9f?auto=format&fit=crop&w=1200&q=80",
        alt: "Modern operatory that supports treatment explanations before insurance questions are finalized",
      },
    ],
    links: [
      { href: "cdcp-dentist-clarenville.html", label: "CDCP Dentist Page" },
      { href: "new-patients.html", label: "New Patient Guide" },
      { href: "contact.html", label: "Contact the Clinic" },
      { href: "contact.html", label: "Book Appointment" },
    ],
  },
  "cdcp-dentist-clarenville.html": {
    image: {
      src: "https://images.unsplash.com/photo-1588776814546-ec7e7cce4f9f?auto=format&fit=crop&w=1200&q=80",
      alt: "Modern dental operatory that supports CDCP-related treatment planning",
    },
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&w=1200&q=80",
        alt: "Prepared hygiene room for CDCP-related routine care visits",
      },
      {
        src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
        alt: "Treatment planning workstation for CDCP coverage and care discussions",
      },
    ],
    links: [
      { href: "dental-insurance-clarenville.html", label: "Insurance Information" },
      { href: "dental-cleanings.html", label: "Dental Cleanings" },
      { href: "blog-cdcp-coverage-2026.html", label: "What CDCP Covers in 2026" },
      { href: "contact.html", label: "Request Appointment" },
    ],
  },
  "cosmetic-dentistry.html": {
    image: {
      src: "https://images.unsplash.com/photo-1516549655669-df3f5d3b9d8d?auto=format&fit=crop&w=1200&q=80",
      alt: "Digital dental scanning equipment used for cosmetic smile planning",
    },
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1516549655669-df3f5d3b9d8d?auto=format&fit=crop&w=1200&q=80",
        alt: "Scanning and planning equipment used for cosmetic dentistry consultations",
      },
      {
        src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
        alt: "Digital planning area where cosmetic treatment options are reviewed",
      },
    ],
    links: [
      { href: "teeth-whitening.html", label: "Teeth Whitening" },
      { href: "invisalign.html", label: "Invisalign" },
      { href: "contact.html", label: "Contact the Clinic" },
      { href: "contact.html", label: "Book a Consultation" },
    ],
  },
  "dental-cleanings.html": {
    image: {
      src: "https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&w=1200&q=80",
      alt: "Dental hygienist preparing for a professional cleaning appointment",
    },
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1588776814546-4a0e0726a6f2?auto=format&fit=crop&w=1200&q=80",
        alt: "Preventive dental tools prepared for routine care",
      },
      {
        src: "https://images.unsplash.com/photo-1625134673337-519d7b6c1181?auto=format&fit=crop&w=1200&q=80",
        alt: "Welcoming exam room for family hygiene visits",
      },
    ],
    links: [
      { href: "preventive-dentistry.html", label: "Preventive Dentistry" },
      { href: "family-dentistry.html", label: "Family Dentistry" },
      { href: "dental-insurance-clarenville.html", label: "Insurance & CDCP" },
      { href: "contact.html", label: "Request Appointment" },
    ],
  },
  "dental-crowns-and-bridges.html": {
    image: {
      src: "https://images.unsplash.com/photo-1588776813677-77aaf5595b83?auto=format&fit=crop&w=1200&q=80",
      alt: "Dental restoration setup for crowns and bridges treatment planning",
    },
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?auto=format&fit=crop&w=1200&q=80",
        alt: "Restorative dental appointment with modern tools",
      },
      {
        src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
        alt: "Digital treatment planning for restorative care",
      },
    ],
    links: [
      { href: "dental-implants.html", label: "Dental Implants" },
      { href: "dentures.html", label: "Dentures" },
      { href: "tooth-colored-fillings.html", label: "Tooth-Colored Fillings" },
      { href: "contact.html", label: "Request Appointment" },
    ],
  },
  "dental-implants.html": {
    image: {
      src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
      alt: "Dental implant consultation with digital treatment planning",
    },
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1588776813677-77aaf5595b83?auto=format&fit=crop&w=1200&q=80",
        alt: "Restorative treatment planning station",
      },
      {
        src: "https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?auto=format&fit=crop&w=1200&q=80",
        alt: "Patient discussing tooth replacement options",
      },
    ],
    links: [
      { href: "dentures.html", label: "Dentures" },
      { href: "dental-crowns-and-bridges.html", label: "Crowns and Bridges" },
      { href: "contact.html", label: "Talk With the Clinic" },
      { href: "contact.html", label: "Book an Implant Visit" },
    ],
  },
  "dental-technology.html": {
    image: {
      src: "https://images.unsplash.com/photo-1516549655669-df3f5d3b9d8d?auto=format&fit=crop&w=1200&q=80",
      alt: "Modern dental technology and digital scanning equipment in a clinic",
    },
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80",
        alt: "Prepared treatment room with advanced dental equipment",
      },
      {
        src: "https://images.unsplash.com/photo-1588776814546-ec7e7cce4f9f?auto=format&fit=crop&w=1200&q=80",
        alt: "Modern operatory with digital screens and patient chair",
      },
    ],
    links: [
      { href: "services.html", label: "Dental Services" },
      { href: "dental-team-clarenville.html", label: "Meet the Team" },
      { href: "new-patients.html", label: "New Patients" },
      { href: "contact.html", label: "Request Appointment" },
    ],
  },
  "dentures.html": {
    image: {
      src: "https://images.unsplash.com/photo-1588776813677-77aaf5595b83?auto=format&fit=crop&w=1200&q=80",
      alt: "Restorative treatment room prepared for denture and tooth replacement planning",
    },
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
        alt: "Digital planning station for full and partial denture discussions",
      },
      {
        src: "https://images.unsplash.com/photo-1588776813677-77aaf5595b83?auto=format&fit=crop&w=1200&q=80",
        alt: "Restorative treatment room set up for tooth replacement care",
      },
    ],
    links: [
      { href: "dental-implants.html", label: "Dental Implants" },
      { href: "dental-crowns-and-bridges.html", label: "Crowns and Bridges" },
      { href: "new-patients.html", label: "New Patients" },
      { href: "contact.html", label: "Request Appointment" },
    ],
  },
  "emergency-dentist.html": {
    image: {
      src: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80",
      alt: "Emergency dental treatment room prepared for an urgent visit",
    },
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1598257006626-5b0a4c1c7345?auto=format&fit=crop&w=1200&q=80",
        alt: "Treatment room ready for urgent tooth pain care",
      },
      {
        src: "https://images.unsplash.com/photo-1588776814546-ec7e7cce4f9f?auto=format&fit=crop&w=1200&q=80",
        alt: "Modern dental chair and instruments prepared for a patient",
      },
    ],
    links: [
      { href: "blog-tooth-pain-clarenville.html", label: "When Tooth Pain Is an Emergency" },
      { href: "root-canal-treatment.html", label: "Root Canal Treatment" },
      { href: "tooth-extractions.html", label: "Tooth Extractions" },
      { href: "contact.html", label: "Call the Clinic" },
      { href: "contact.html", label: "Request Emergency Visit" },
    ],
  },
  "family-dentistry.html": {
    image: {
      src: "https://images.unsplash.com/photo-1625134673337-519d7b6c1181?auto=format&fit=crop&w=1200&q=80",
      alt: "Family dental visit with a welcoming exam room prepared for care",
    },
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&w=1200&q=80",
        alt: "Friendly dental hygiene setup for routine visits",
      },
      {
        src: "https://images.unsplash.com/photo-1588776814546-4a0e0726a6f2?auto=format&fit=crop&w=1200&q=80",
        alt: "Preventive care instruments set out in a clean clinic",
      },
    ],
    links: [
      { href: "dental-cleanings.html", label: "Dental Cleanings" },
      { href: "preventive-dentistry.html", label: "Preventive Dentistry" },
      { href: "new-patients.html", label: "New Patients" },
      { href: "contact.html", label: "Book a Family Visit" },
    ],
  },
  "invisalign.html": {
    image: {
      src: "https://images.unsplash.com/photo-1516549655669-df3f5d3b9d8d?auto=format&fit=crop&w=1200&q=80",
      alt: "Digital scanner used for Invisalign and clear aligner planning",
    },
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1516549655669-df3f5d3b9d8d?auto=format&fit=crop&w=1200&q=80",
        alt: "Intraoral scanning equipment that supports clear aligner treatment planning",
      },
      {
        src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
        alt: "Digital planning desk used to review Invisalign treatment stages",
      },
    ],
    links: [
      { href: "cosmetic-dentistry.html", label: "Cosmetic Dentistry" },
      { href: "teeth-whitening.html", label: "Teeth Whitening" },
      { href: "new-patients.html", label: "New Patients" },
      { href: "contact.html", label: "Book an Invisalign Consultation" },
    ],
  },
  "preventive-dentistry.html": {
    image: {
      src: "https://images.unsplash.com/photo-1588776814546-4a0e0726a6f2?auto=format&fit=crop&w=1200&q=80",
      alt: "Preventive dental visit setup with tools prepared for routine care",
    },
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&w=1200&q=80",
        alt: "Professional dental cleaning station",
      },
      {
        src: "https://images.unsplash.com/photo-1625134673337-519d7b6c1181?auto=format&fit=crop&w=1200&q=80",
        alt: "Comfortable exam room for family dental checkups",
      },
    ],
    links: [
      { href: "dental-cleanings.html", label: "Dental Cleanings" },
      { href: "family-dentistry.html", label: "Family Dentistry" },
      { href: "faq.html", label: "Patient FAQ" },
      { href: "contact.html", label: "Request Appointment" },
    ],
  },
  "root-canal-treatment.html": {
    image: {
      src: "https://images.unsplash.com/photo-1598257006626-5b0a4c1c7345?auto=format&fit=crop&w=1200&q=80",
      alt: "Dental treatment room ready for advanced tooth pain care",
    },
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80",
        alt: "Urgent care treatment room prepared for endodontic care",
      },
      {
        src: "https://images.unsplash.com/photo-1588776813677-77aaf5595b83?auto=format&fit=crop&w=1200&q=80",
        alt: "Restorative planning area following root canal care",
      },
    ],
    links: [
      { href: "emergency-dentist.html", label: "Emergency Dentist" },
      { href: "dental-crowns-and-bridges.html", label: "Crowns and Bridges" },
      { href: "blog-tooth-pain-clarenville.html", label: "When Tooth Pain Is an Emergency" },
      { href: "contact.html", label: "Book an Evaluation" },
    ],
  },
  "teeth-whitening.html": {
    image: {
      src: "https://images.unsplash.com/photo-1516549655669-df3f5d3b9d8d?auto=format&fit=crop&w=1200&q=80",
      alt: "Modern dental technology used to plan cosmetic teeth whitening care",
    },
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
        alt: "Treatment planning area used for professional whitening consultations",
      },
      {
        src: "https://images.unsplash.com/photo-1588776814546-ec7e7cce4f9f?auto=format&fit=crop&w=1200&q=80",
        alt: "Bright operatory prepared for cosmetic dental treatment",
      },
    ],
    links: [
      { href: "cosmetic-dentistry.html", label: "Cosmetic Dentistry" },
      { href: "invisalign.html", label: "Invisalign" },
      { href: "contact.html", label: "Contact the Clinic" },
      { href: "contact.html", label: "Book Whitening Visit" },
    ],
  },
  "tooth-colored-fillings.html": {
    image: {
      src: "https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?auto=format&fit=crop&w=1200&q=80",
      alt: "Restorative dental appointment for cavity and filling treatment",
    },
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1588776813677-77aaf5595b83?auto=format&fit=crop&w=1200&q=80",
        alt: "Dental restoration setup ready for treatment",
      },
      {
        src: "https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&w=1200&q=80",
        alt: "Clinical prep for a routine restorative appointment",
      },
    ],
    links: [
      { href: "dental-cleanings.html", label: "Dental Cleanings" },
      { href: "dental-crowns-and-bridges.html", label: "Crowns and Bridges" },
      { href: "family-dentistry.html", label: "Family Dentistry" },
      { href: "contact.html", label: "Request Appointment" },
    ],
  },
  "wisdom-teeth-removal.html": {
    image: {
      src: "https://images.unsplash.com/photo-1588776814546-ec7e7cce4f9f?auto=format&fit=crop&w=1200&q=80",
      alt: "Dental surgical consultation room prepared for wisdom teeth care",
    },
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1598257006626-5b0a4c1c7345?auto=format&fit=crop&w=1200&q=80",
        alt: "Procedure room ready for oral surgery consultation",
      },
      {
        src: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80",
        alt: "Urgent care operatory prepared for wisdom teeth concerns",
      },
    ],
    links: [
      { href: "blog-wisdom-teeth-clarenville.html", label: "Wisdom Teeth: When to Get an Assessment" },
      { href: "emergency-dentist.html", label: "Emergency Dentist" },
      { href: "tooth-extractions.html", label: "Tooth Extractions" },
      { href: "contact.html", label: "Request Appointment" },
    ],
  },
};

const PAGE_TOPIC_CONTENT = {
  "cosmetic-dentistry.html": {
    intro:
      "Patients searching cosmetic dentistry in Clarenville are usually comparing more than one smile goal at once, such as alignment, whitening, bonding, veneers, or overall balance.",
    bullets: [
      "How cosmetic consultations usually sort smile goals into whitening, alignment, bonding, or broader makeover planning.",
      "Why cosmetic treatment often starts with photos, digital scans, or a practical discussion about priorities before anything is scheduled.",
    ],
  },
  "dental-cleanings.html": {
    intro:
      "People looking for dental cleanings usually want to stay ahead of plaque buildup, tartar, staining, gum irritation, and the bigger treatment needs that can follow when routine care slips.",
    bullets: [
      "How professional cleanings support fresher breath, gum health, stain management, and earlier detection of small issues.",
      "Why hygiene visits often work best when they stay connected to exams, home care guidance, and a realistic recall schedule.",
    ],
  },
  "dental-crowns-and-bridges.html": {
    intro:
      "Crowns and bridges pages usually serve patients dealing with cracked teeth, large failing fillings, missing teeth, or a bite that no longer feels stable on one side.",
    bullets: [
      "When a crown may help protect a heavily restored or weakened tooth before it breaks further.",
      "How bridges fit into tooth replacement planning when a patient is comparing them with implants or partial dentures.",
    ],
  },
  "dental-implants.html": {
    intro:
      "Implant searches usually come from patients who want a steadier long-term replacement for a missing tooth and want to understand support, function, and candidacy before they commit.",
    bullets: [
      "How implants support chewing function, jaw stability, and a more fixed replacement option for missing teeth.",
      "What an implant consultation usually reviews, including the gap itself, supporting bone, timing, and the restoration plan that follows.",
    ],
  },
  "dentures.html": {
    intro:
      "Denture-related searches usually come from patients who want clearer expectations around comfort, fit, chewing, appearance, and whether a full, partial, or implant-supported option makes the most sense.",
    bullets: [
      "How denture planning balances fit, speech, chewing comfort, and the number of teeth being replaced.",
      "Why many patients compare dentures with bridges or implants before choosing the right replacement path.",
    ],
  },
  "emergency-dentist.html": {
    intro:
      "Emergency dentist searches usually come from patients facing tooth pain, swelling, trauma, pressure, or a broken tooth and trying to decide how quickly they should call.",
    bullets: [
      "Which pain, swelling, or trauma patterns usually justify calling the clinic sooner instead of waiting.",
      "How emergency evaluations help identify whether the next step is relief, repair, extraction, root canal care, or a different urgent treatment path.",
    ],
  },
  "family-dentistry.html": {
    intro:
      "Family dentistry searches usually reflect a long-term need: one local clinic for children, adults, routine checkups, preventive care, and the everyday dental issues that come up over time.",
    bullets: [
      "How family dentistry supports children, teens, adults, and returning patients without sending them to disconnected pages for every routine need.",
      "Why a family-focused page should explain continuity of care, preventive habits, and what regular visits look like across different ages.",
    ],
  },
  "invisalign.html": {
    intro:
      "Invisalign searches usually come from patients who want a straighter smile without braces and want to know whether crowding, spacing, or bite concerns fit clear aligner treatment.",
    bullets: [
      "How Invisalign consultations usually review spacing, crowding, bite issues, and whether clear aligners match the case well.",
      "Why digital scans and step-by-step treatment planning matter before anyone can estimate aligner timing and expectations.",
    ],
  },
  "preventive-dentistry.html": {
    intro:
      "Preventive dentistry searches are usually tied to exams, cleanings, x-rays, fluoride, sealants, and the larger goal of avoiding more complex treatment later.",
    bullets: [
      "How preventive care helps catch small changes earlier and keep future treatment more manageable.",
      "Why preventive pages should connect routine visits, hygiene habits, exams, and monitoring instead of describing only one appointment.",
    ],
  },
  "root-canal-treatment.html": {
    intro:
      "Root canal searches usually come from patients dealing with deeper tooth pain, lingering sensitivity, pressure, infection concerns, or a tooth that may still be savable with the right treatment.",
    bullets: [
      "How root canal treatment can fit into a plan to relieve infection-related symptoms while preserving the tooth.",
      "Why an urgent evaluation usually comes first, especially when pain, swelling, or uncertainty makes it hard to know whether the tooth can be restored.",
    ],
  },
  "teeth-whitening.html": {
    intro:
      "Teeth whitening searches usually come from patients who want a brighter smile for daily confidence, a life event, or a cosmetic refresh and want to know what professional treatment can realistically improve.",
    bullets: [
      "How whitening visits usually focus on external staining, enamel-safe brightening, and realistic shade expectations.",
      "Why a whitening consultation may also point toward cleaning, bonding, or broader cosmetic planning when staining is not the only concern.",
    ],
  },
  "tooth-colored-fillings.html": {
    intro:
      "Filling-related searches usually come from patients with decay, a chipped edge, a worn area, or a small fracture that may be treatable before it becomes a larger restorative issue.",
    bullets: [
      "How tooth-colored fillings help restore smaller areas of damage while keeping the repair visually natural.",
      "Why some cases stay in the filling category while others need a crown or another stronger form of support.",
    ],
  },
  "wisdom-teeth-removal.html": {
    intro:
      "Wisdom teeth removal searches usually come from patients dealing with pressure, swelling, recurring irritation, infection risk, or crowding concerns related to back teeth that are not settling well.",
    bullets: [
      "How wisdom teeth evaluations help determine whether the concern is active pain, infection risk, impaction, or a planning issue for later removal.",
      "Why urgent symptoms and recurring flare-ups often matter more than waiting for the discomfort to become constant.",
    ],
  },
};

function enhanceHero(config) {
  if (!config?.image) return;

  const hero = document.querySelector(".page-hero");
  if (!hero) return;

  hero.style.setProperty("--page-hero-image", `url("${config.image.src}")`);
  hero.setAttribute("data-hero-image-alt", config.image.alt);
}

function enhanceRelatedLinks(config) {
  if (!config?.links?.length) return;

  const linksContainer = document.querySelector(".related-links");
  if (!linksContainer) return;

  linksContainer.innerHTML = "";

  config.links.forEach((link) => {
    const anchor = document.createElement("a");
    anchor.href = cleanHref(link.href);
    anchor.className = "related-link-pill";
    anchor.textContent = link.label;
    linksContainer.appendChild(anchor);
  });
}

function buildDetailCopy(config, context, family = "general", pageName = "") {
  if (config?.details) return config.details;

  const familyCopyByType = {
    emergency: {
      eyebrow: "When It Feels Urgent",
      title: `What patients usually need to know about ${context.label.toLowerCase()} before they call`,
      introParagraphs: [
        `Emergency-focused pages are usually visited by people trying to decide whether pain, swelling, a broken tooth, or another sudden concern can wait. The page should quickly help them understand that timing matters more than perfect certainty.`,
        `For local search in Clarenville, emergency intent is especially high value because patients are often looking for practical next-step guidance, not just a treatment definition.`,
        `Strong emergency copy works best when it answers urgency, symptoms, and what to do next without sounding alarmist or generic.`,
      ],
      bullets: [
        "What symptoms often make a call more important than waiting.",
        "How the clinic can assess pain, swelling, trauma, cracks, or infection-related concerns.",
        "Why the first step is often an evaluation before the final treatment path is confirmed.",
        "Which related urgent pages may fit if the issue is tooth pain, a broken tooth, or wisdom teeth pressure.",
      ],
      supportTitle: "Built to reduce hesitation when something feels wrong",
      supportBody: [
        "A good emergency page should help a patient stop second-guessing whether the concern is worth contacting the clinic about.",
        "That is why these pages focus on practical urgency signals, realistic next steps, and fast internal links to the most relevant emergency-related topics.",
        "This approach also supports stronger local SEO because the page speaks to the exact intent people often have when they search in pain.",
      ],
    },
    preventive: {
      eyebrow: "Routine Care Questions",
      title: `What patients usually want to know about ${context.label.toLowerCase()} for ongoing oral health`,
      introParagraphs: [
        `Preventive and family pages are often the first stop for patients who are not in pain but want consistent, reliable dental care close to home.`,
        `People searching these pages are usually comparing convenience, trust, scheduling, cleanings, exams, and what regular care will actually look like over time.`,
        `That means the page should feel reassuring, practical, and clearly connected to long-term oral health rather than one isolated procedure.`,
      ],
      bullets: [
        "Who this type of routine care usually fits best, including families, adults, and returning patients.",
        "How exams, cleanings, and preventive reviews help catch issues earlier and keep treatment simpler.",
        "What a regular visit may include before any additional treatment is discussed.",
        "Which nearby pages help if the patient also has CDCP, insurance, or first-visit questions.",
      ],
      supportTitle: "Designed for patients who want consistency, not guesswork",
      supportBody: [
        "Preventive pages should make it easy to understand how regular care supports comfort, convenience, and long-term savings.",
        "They also help the site rank for the kind of local search intent people use when they want a family dentist, a cleaning, or a regular exam in Clarenville.",
        "The stronger and more specific the page is, the easier it becomes for patients to trust the next booking step.",
      ],
    },
    restorative: {
      eyebrow: "Repair And Replacement Questions",
      title: `What patients usually want to know about ${context.label.toLowerCase()} before treatment planning`,
      introParagraphs: [
        `Restorative pages usually attract people who already know something is damaged, missing, weak, or no longer working the way it should.`,
        `They are often comparing options, trying to understand how serious the problem is, and wondering whether a smaller repair or a larger rebuilding plan makes more sense.`,
        `That is why these pages need enough depth to explain function, durability, comfort, and next-step planning without becoming overly technical.`,
      ],
      bullets: [
        "How this treatment can protect function, chewing comfort, and the long-term stability of the smile.",
        "Why some cases call for a simpler repair while others need stronger support or replacement.",
        "What an evaluation usually clarifies before the final restorative plan is chosen.",
        "Which related restorative pages are worth comparing before a patient books.",
      ],
      supportTitle: "Helpful for patients deciding how far treatment needs to go",
      supportBody: [
        "A thin restorative page leaves too many open questions. Patients usually want to know how the treatment fits into the bigger picture of saving, strengthening, or replacing teeth.",
        "Pages with stronger treatment context also perform better in search because they reflect the real questions patients ask when they compare restorative options.",
        "That combination of practical explanation and local intent makes the page more useful for both readers and search visibility.",
      ],
    },
    cosmetic: {
      eyebrow: "Smile Goal Questions",
      title: `What patients usually want to know about ${context.label.toLowerCase()} before a cosmetic consultation`,
      introParagraphs: [
        `Cosmetic pages are often visited by patients who have a clear outcome in mind but are still deciding which treatment path best matches that goal.`,
        `They may be thinking about straightness, brightness, balance, confidence, or an overall smile refresh, even if they do not yet know the exact treatment name.`,
        `Strong cosmetic pages should feel aspirational but still grounded. They need to explain possibilities, planning, and realistic next steps without sounding exaggerated.`,
      ],
      bullets: [
        "Which smile goals this type of page usually speaks to most clearly.",
        "How cosmetic care can overlap with alignment, whitening, or broader restorative planning.",
        "What a consultation is meant to clarify before treatment begins.",
        "Which nearby cosmetic pages a patient may want to compare before they book.",
      ],
      supportTitle: "Written for patients who want clarity before a smile upgrade",
      supportBody: [
        "Patients exploring cosmetic care usually need confidence, not pressure. The page should help them understand what the consultation is for and what options may come out of it.",
        "That makes the page stronger as both a conversion tool and an SEO asset because it reflects how cosmetic-intent searchers actually think and compare.",
        "The result is a page that feels more useful, more trustworthy, and more likely to lead to the right consultation request.",
      ],
    },
    support: {
      eyebrow: "Practical Questions",
      title: `What patients usually want to know about ${context.label.toLowerCase()} before they book`,
      introParagraphs: [
        `Support pages work best when they remove friction around the visit instead of trying to act like treatment pages.`,
        `People landing here are often trying to sort out insurance, CDCP, first-visit preparation, scheduling, or how one practical question connects to the dental concern they actually want addressed.`,
        `That means the page should help people move forward with confidence instead of leaving them in research mode.`,
      ],
      bullets: [
        "What practical information matters most before the visit.",
        "How this support topic connects back to a real appointment path.",
        "What to have ready when calling or booking.",
        "Which related pages will help the patient continue toward the right next step.",
      ],
      supportTitle: "Built to lower friction before the patient reaches out",
      supportBody: [
        "Support pages do their best work when they simplify the process around care rather than competing with treatment pages.",
        "That makes them valuable for conversion and for SEO, because they answer the practical search queries people often use before they book a dentist in Clarenville.",
        "Clearer support content creates trust, reduces hesitation, and helps patients connect logistics with care.",
      ],
    },
  };

  const topicContent = PAGE_TOPIC_CONTENT[pageName];
  const mergeTopicContent = (baseCopy) => {
    if (!topicContent) return baseCopy;

    return {
      ...baseCopy,
      introParagraphs: [topicContent.intro, ...(baseCopy.introParagraphs || [])].filter(Boolean),
      bullets: [...(topicContent.bullets || []), ...(baseCopy.bullets || [])],
    };
  };

  const familyCopy = familyCopyByType[family];
  if (familyCopy) {
    return mergeTopicContent({
      ...familyCopy,
      imageTitle: `A closer look at ${context.label.toLowerCase()}`,
      imageCaption:
        `The same treatment image used in the hero also appears here so the page feels more cohesive and gives the service explanation a stronger visual anchor.`,
      imageBody: [
        `When a patient scans a page, seeing the treatment context beside the written explanation helps the page feel easier to understand and more complete.`,
        `This layout also creates stronger page depth for both readers and search engines, which matters when the goal is building visibility around local dental services in Clarenville.`,
      ],
    });
  }

  return mergeTopicContent({
    eyebrow: "Before You Book",
    title: `What people usually want to know about ${context.label.toLowerCase()}`,
    introParagraphs: [
      `Most patients do not arrive on this page ready to book instantly. They usually want to understand whether ${context.label.toLowerCase()} fits their situation, what kind of appointment makes sense, and whether the clinic handles this concern regularly.`,
      `In practical terms, people are often trying to compare symptoms, timing, comfort, cost questions, and the likely next step. A stronger service page should help answer those early questions clearly enough that a patient can decide whether they need a routine visit, a consultation, or a faster appointment.`,
      `That is especially important for local search. Patients looking for a dentist in Clarenville are usually trying to find both clinical information and a clinic they can trust, so each page needs enough real detail to be useful rather than feeling like a placeholder.`,
    ],
    bullets: [
      `Who this kind of visit usually fits best and what questions tend to come up first when someone is comparing treatment options.`,
      `How ${context.label.toLowerCase()} connects with routine care, urgent care, prevention, cosmetic goals, or longer restorative planning.`,
      `What the first appointment usually focuses on, including evaluation, imaging when needed, and a clear explanation of next steps.`,
      `Which related services a patient may also want to review before booking if their needs overlap with comfort, function, appearance, or long-term maintenance.`,
    ],
    supportTitle: "How this page helps you move forward",
    supportBody: [
      `The goal is to make this page more useful than a thin summary. Patients searching in Clarenville often want enough detail to feel confident before they commit to a visit, especially if they are comparing clinics, treatments, insurance questions, or timing.`,
      `That is why these pages now work more like practical guides. They point toward related treatment paths, show realistic clinic imagery, and make it easier to understand whether the right next step is a routine visit, a consultation, or a more urgent appointment.`,
      `Stronger page depth also helps search visibility by giving each service page more topical relevance, more helpful supporting language, and more internal connection to nearby services that patients frequently explore together.`,
    ],
    imageTitle: `A closer look at ${context.label.toLowerCase()}`,
    imageCaption:
      `The same treatment image used in the hero also appears here so the page feels more cohesive and gives the service explanation a stronger visual anchor.`,
    imageBody: [
      `When a patient scans a service page, seeing the treatment context beside the written explanation helps the page feel easier to understand. Instead of a large hero followed by generic text, the image continues the story and supports the details on the page.`,
      `This layout also creates a more complete service section for readers and for search engines, which is useful when the goal is to build visibility around specific dental services in Clarenville and surrounding areas.`,
    ],
  });
}

function buildPathwayCopy(config, context) {
  if (config?.pathways) return config.pathways;

  const cards = (config?.links || []).slice(0, 3).map((link) => ({
    title: link.label,
    text: `If your questions overlap with ${link.label.toLowerCase()}, this is one of the most useful follow-up pages to review before booking.`,
    href: cleanHref(link.href),
  }));

  if (!cards.length) {
    cards.push(
      {
        title: "Dental Services",
        text: "Browse the service hub if you are still deciding which appointment type best matches your concern.",
        href: "services.html",
      },
      {
        title: "Patient FAQ",
        text: "Use the FAQ page for broader booking, treatment, insurance, and first-visit questions.",
        href: "faq.html",
      },
      {
        title: "Book Appointment",
        text: "When you are ready to move from research to action, request a visit directly online.",
        href: "contact.html",
      },
    );
  }

  return {
    eyebrow: "Helpful Next Steps",
    title: `Related pages that support ${context.label.toLowerCase()} questions`,
    intro:
      "Patients often look at more than one page before choosing an appointment. These links make that path clearer and help reduce guesswork.",
    cards,
  };
}

const PAGE_TEMPLATE_FAMILIES = {
  "blog.html": "editorial",
  "cdcp-dentist-clarenville.html": "support",
  "cosmetic-dentistry.html": "cosmetic",
  "dental-cleanings.html": "preventive",
  "dental-crowns-and-bridges.html": "restorative",
  "dental-implants.html": "restorative",
  "dental-insurance-clarenville.html": "support",
  "dental-technology.html": "support",
  "dentures.html": "restorative",
  "emergency-dentist.html": "emergency",
  "family-dentistry.html": "preventive",
    "faq.html": "faq-hub",
    "invisalign.html": "cosmetic",
    "new-patients.html": "onboarding",
  "preventive-dentistry.html": "preventive",
  "root-canal-treatment.html": "emergency",
  "teeth-whitening.html": "cosmetic",
  "tooth-colored-fillings.html": "restorative",
  "wisdom-teeth-removal.html": "emergency",
};

const CUSTOM_STATIC_PAGES = new Set(["about-us.html", "faq.html", "dental-insurance-clarenville.html", "cdcp-dentist-clarenville.html"]);

function getTemplateFamily(pageName) {
  return PAGE_TEMPLATE_FAMILIES[pageName] || "general";
}

function removeGenericIntroSection() {
  const sections = Array.from(document.querySelectorAll("main > section"));
  sections.forEach((section) => {
    const heading = section.querySelector(".section-heading")?.textContent?.trim();
    const label = section.querySelector(".section-label")?.textContent?.trim();
    if (
      heading === "A practical local starting point" ||
      heading === "Keep the next step simple" ||
      label === "What To Expect" ||
      label === "Related Paths"
    ) {
      section.remove();
    }
  });
}

function removeFaqExtraSections() {
  const pageName = getPageName();
  if (pageName !== "faq.html") return;

  const sections = Array.from(document.querySelectorAll("main > section"));
  sections.forEach((section) => {
    const heading = section.querySelector(".section-heading")?.textContent?.trim();
    const label = section.querySelector(".section-label")?.textContent?.trim();

    if (
      heading === "How this page helps you move forward" ||
      label === "How This Page Supports Booking" ||
      section.querySelector(".service-detail-media__figure")
    ) {
      section.remove();
    }
  });
}

function removeGenericPageFaqSection() {
  const pageName = getPageName();
  if (pageName === "faq.html" || CUSTOM_STATIC_PAGES.has(pageName)) return;

  const sections = Array.from(document.querySelectorAll("main > section"));
  sections.forEach((section) => {
    const heading = section.querySelector(".section-heading")?.textContent?.trim();
    const subheading = section.querySelector(".section-subheading")?.textContent?.trim();

    if (heading === "Page FAQ" && subheading === "Quick answers to common questions before booking.") {
      section.remove();
    }
  });
}

function buildLinkPills(links) {
  return (links || [])
      .slice(0, 4)
      .map((link) => `<a href="${cleanHref(link.href)}" class="related-link-pill">${link.label}</a>`)
      .join("");
}

function buildServiceIntroSection(config, context, family, pageName) {
  const copy = buildDetailCopy(config, context, family, pageName);
  const introParagraphs = Array.isArray(copy.introParagraphs)
    ? copy.introParagraphs
    : [copy.intro].filter(Boolean);
  const imageSrc = config?.image?.src;
  const imageAlt =
    config?.image?.alt || `Treatment image that supports ${context.label.toLowerCase()} information`;
  const linksMarkup = buildLinkPills(config?.links);
  const section = document.createElement("section");
  section.className = "section section--alt service-intro-band";

  section.innerHTML = `
    <div class="container">
      <div class="service-intro">
        <div class="service-intro__grid">
          <div class="service-intro__copy">
            <a href="/services" class="service-intro__back" aria-label="Back to services">
              <span aria-hidden="true">&larr;</span>
              <span>Back to services</span>
            </a>
            <span class="section-label">${copy.eyebrow || "Treatment Overview"}</span>
            <h2 class="section-heading">${context.label}</h2>
            <div class="service-detail-copy">
              ${introParagraphs.slice(0, 3).map((paragraph) => `<p class="dentist__bio">${paragraph}</p>`).join("")}
            </div>
            <ul class="check-list">
              ${copy.bullets.slice(0, 4).map((bullet) => `<li>${bullet}</li>`).join("")}
            </ul>
            <div class="related-links">${linksMarkup}</div>
          </div>
          ${
            imageSrc
              ? `
                <figure class="service-intro__media service-detail-media__figure">
                  <img class="service-detail-media__image" src="${imageSrc}" alt="${imageAlt}" width="1200" height="900" loading="lazy" />
                  <figcaption class="service-detail-media__caption">${copy.imageCaption || imageAlt}</figcaption>
                </figure>
              `
              : ""
          }
        </div>
      </div>
    </div>
  `;

  return section;
}

function buildExpectationCards(context, family) {
  const familyCards = {
    emergency: [
      {
        title: "When to call quickly",
        text: `If ${context.label.toLowerCase()} is connected to worsening pain, swelling, pressure, trauma, or difficulty eating, the fastest next step is usually to contact the clinic instead of waiting for certainty.`,
      },
      {
        title: "What the first visit does",
        text: "The first visit usually focuses on relief, diagnosis, and deciding whether the next step is repair, infection management, extraction, or another urgent treatment path.",
      },
      {
        title: "Why this page goes deeper",
        text: "Urgent pages work better when they help patients judge timing, understand common scenarios, and move from panic to a practical next decision.",
      },
    ],
    preventive: [
      {
        title: "Who this visit is for",
        text: `Patients exploring ${context.label.toLowerCase()} are often trying to stay consistent with routine care, keep problems small, and choose a local clinic they can return to over time.`,
      },
      {
        title: "What the first visit covers",
        text: "A routine preventive visit usually includes a review of oral health, the right hygiene or exam steps for the patient, and guidance on what to monitor next.",
      },
      {
        title: "Why the page needs more detail",
        text: "Preventive pages should do more than say 'book now.' They should explain how regular care supports comfort, confidence, and fewer surprises later.",
      },
    ],
    restorative: [
      {
        title: "What patients are comparing",
        text: `People reading about ${context.label.toLowerCase()} are often comparing repair versus replacement, short-term relief versus long-term durability, and what kind of restoration best fits their situation.`,
      },
      {
        title: "What the assessment usually clarifies",
        text: "The first appointment usually confirms the condition of the tooth or teeth involved, supporting structures, expected function, and whether additional planning is needed.",
      },
      {
        title: "Why stronger copy matters",
        text: "Restorative pages need enough substance to answer real concerns about chewing, comfort, appearance, timing, and how treatment fits into a larger plan.",
      },
    ],
    cosmetic: [
      {
        title: "What patients usually want",
        text: `Patients looking into ${context.label.toLowerCase()} are often trying to improve colour, alignment, balance, or overall smile confidence without guessing which cosmetic path makes the most sense.`,
      },
      {
        title: "What the consultation focuses on",
        text: "A cosmetic consultation usually reviews goals, current tooth condition, realistic options, and the right order for treatment if more than one improvement is being considered.",
      },
      {
        title: "Why this page should feel richer",
        text: "Cosmetic pages should help patients picture outcomes, compare options, and understand the logic behind treatment planning rather than showing only a short sales paragraph.",
      },
    ],
    support: [
      {
        title: "What this page helps with",
        text: `Patients reading about ${context.label.toLowerCase()} are usually looking for clarity around logistics, eligibility, timing, coverage, or how to move forward without getting lost in clinic process.`,
      },
      {
        title: "What to expect next",
        text: "These support pages should explain the practical next step, which related page matters most, and how the clinic conversation usually starts.",
      },
      {
        title: "Why this page matters for trust",
        text: "Good support pages reduce hesitation because they answer the questions people often have before they are ready to commit to a phone call or appointment request.",
      },
    ],
    general: [
      {
        title: "Why patients land here",
        text: `Most people searching for ${context.label.toLowerCase()} are trying to decide whether the page matches their concern and whether they are looking at the right appointment type.`,
      },
      {
        title: "What the first visit usually does",
        text: "The first visit usually focuses on assessment, practical questions, and clear next-step guidance instead of jumping straight to treatment assumptions.",
      },
      {
        title: "Why more page depth matters",
        text: "A better service page should help readers understand fit, timing, related options, and what happens next so the content feels genuinely helpful.",
      },
    ],
  };

  return familyCards[family] || familyCards.general;
}

function buildServiceDepthSection(config, context, family) {
  const cards = buildExpectationCards(context, family);
  const section = document.createElement("section");
  section.className = "section service-depth-band";
  section.innerHTML = `
    <div class="container">
      <div class="section-header service-depth-band__header">
        <span class="section-label">What This Service Page Should Explain</span>
        <h2 class="section-heading">A clearer treatment page for patients comparing real next steps</h2>
        <p class="section-subheading">Instead of stopping at a short summary, this section adds practical context around fit, planning, and what usually happens once you contact the clinic.</p>
      </div>
      <div class="service-depth-grid">
        ${cards
          .map(
            (card) => `
              <article class="service-depth-card">
                <h3 class="service-depth-card__title">${card.title}</h3>
                <p class="service-depth-card__text">${card.text}</p>
              </article>
            `,
          )
          .join("")}
      </div>
    </div>
  `;
  return section;
}

function buildServicePlanningSection(context, family) {
  const planningByFamily = {
    emergency: {
      title: "What an urgent appointment usually helps clarify",
      points: [
        "Whether the problem mainly needs pain relief, infection management, protective repair, or a larger treatment decision.",
        "How quickly the issue should be addressed based on swelling, trauma, cracking, pressure, or worsening symptoms.",
        "Which related page to review next if the concern overlaps with root canal care, broken tooth repair, or wisdom teeth pain.",
      ],
    },
    preventive: {
      title: "What routine care usually helps you stay ahead of",
      points: [
        "Plaque buildup, tartar, staining, gum irritation, and the small issues that are easier to manage early.",
        "Questions about recall timing, cleanings, exams, family scheduling, and how to keep care consistent over time.",
        "Related steps like first-visit planning, insurance questions, or a broader preventive strategy if more support is needed.",
      ],
    },
    restorative: {
      title: "What restorative planning usually helps you compare",
      points: [
        "Whether the better next step is preserving what can be repaired or moving toward a stronger replacement option.",
        "How comfort, chewing function, long-term durability, and appearance affect the treatment recommendation.",
        "Which related restorative pages matter most if you are weighing fillings, crowns, bridges, dentures, or implants together.",
      ],
    },
    cosmetic: {
      title: "What a cosmetic consultation usually helps organize",
      points: [
        "Which smile goals are mainly about colour, alignment, shape, or broader overall smile balance.",
        "Whether the most efficient path starts with whitening, aligners, bonding-style work, or a larger cosmetic plan.",
        "How cosmetic goals connect with existing oral health needs so treatment is sequenced in a practical order.",
      ],
    },
    support: {
      title: "What this kind of planning page should make easier",
      points: [
        "Understanding the process, the related service page, and the clinic conversation that usually comes next.",
        "Reducing confusion around coverage, timing, patient status, or what information to bring to the visit.",
        "Moving from research to action with a clearer sense of which appointment request makes the most sense.",
      ],
    },
    general: {
      title: `What patients usually want to know about ${context.label.toLowerCase()}`,
      points: [
        "Whether the page really matches their concern and what the first useful step usually looks like.",
        "How the topic connects with related services if the situation turns out to be broader than one quick question.",
        "What kind of visit usually makes sense before anyone assumes a treatment recommendation.",
      ],
    },
  };

  const planning = planningByFamily[family] || planningByFamily.general;
  const section = document.createElement("section");
  section.className = "section section--alt service-planning-band";
  section.innerHTML = `
    <div class="container">
      <div class="service-planning">
        <div class="service-planning__content">
          <span class="section-label">Treatment Planning</span>
          <h2 class="section-heading">${planning.title}</h2>
          <ul class="check-list">
            ${planning.points.map((point) => `<li>${point}</li>`).join("")}
          </ul>
        </div>
        <div class="service-planning__callout">
          <h3 class="service-detail-media__title">Why this matters for local search</h3>
          <p class="dentist__bio">Patients searching in Clarenville are rarely looking for a one-line definition. They are comparing symptoms, timelines, comfort, appearance, and whether a clinic feels trustworthy enough to contact.</p>
          <p class="dentist__bio">That is why a stronger treatment page needs more structure, more useful explanation, and clearer connections to the next page or appointment that usually matters most.</p>
        </div>
      </div>
    </div>
  `;
  return section;
}

function buildServiceFaqSection(context, family) {
  const faqsByFamily = {
    emergency: [
      {
        question: `How do I know if ${context.label.toLowerCase()} is urgent?`,
        answer: "Pain that is escalating, swelling, trauma, a broken tooth, or symptoms affecting sleep, eating, or daily function usually justify contacting the clinic sooner rather than waiting.",
      },
      {
        question: "Will the clinic know the final treatment right away?",
        answer: "Not always. The first urgent visit often focuses on diagnosis and relief first, then confirms whether the next step is repair, root canal care, extraction, or another treatment path.",
      },
      {
        question: "Should I still book if I am not fully sure what is wrong?",
        answer: "Yes. Many patients contact the clinic because they know something feels wrong even if they cannot name the exact treatment they need yet.",
      },
    ],
    preventive: [
      {
        question: `What does a ${context.label.toLowerCase()} visit usually help prevent?`,
        answer: "Routine care helps manage plaque, tartar, gum irritation, staining, and small changes that are easier to address before they turn into larger treatment needs.",
      },
      {
        question: "Is this kind of page mainly for new patients or returning patients?",
        answer: "Usually both. New patients want to know how routine care starts, while returning patients often want a consistent local clinic for long-term maintenance.",
      },
      {
        question: "Can this page also help with family scheduling questions?",
        answer: "Yes. Preventive and family-focused pages should make it easier to understand how regular visits fit into a practical care routine for different ages.",
      },
    ],
    restorative: [
      {
        question: `What makes someone start researching ${context.label.toLowerCase()}?`,
        answer: "Most patients reach these pages when a tooth feels weak, damaged, missing, uncomfortable, or no longer reliable enough for normal chewing and daily use.",
      },
      {
        question: "Will the clinic explain related options as well?",
        answer: "A strong restorative visit usually includes discussion of the most relevant alternatives, especially when repair, reinforcement, or replacement all need to be considered together.",
      },
      {
        question: "Does the first appointment usually decide everything?",
        answer: "The first visit often clarifies the condition involved and the best direction, but some cases need more planning before the final treatment sequence is confirmed.",
      },
    ],
    cosmetic: [
      {
        question: `What are patients usually hoping to improve with ${context.label.toLowerCase()}?`,
        answer: "Most cosmetic patients are looking at colour, alignment, symmetry, shape, or a more polished overall smile rather than one isolated concern.",
      },
      {
        question: "Can cosmetic care overlap with general or restorative care?",
        answer: "Yes. Cosmetic goals often work best when they are planned alongside oral health, tooth condition, and any restorative needs that affect the final result.",
      },
      {
        question: "Why should a cosmetic page include more explanation instead of just before-and-after language?",
        answer: "Patients usually want to understand options and planning logic before they book, especially when they are comparing more than one possible cosmetic path.",
      },
    ],
    support: [
      {
        question: `Why would someone read a page about ${context.label.toLowerCase()} before contacting the clinic?`,
        answer: "Support pages are often where patients look for clarity around process, eligibility, first steps, or which page they should open next before they are ready to reach out.",
      },
      {
        question: "Should this page connect to other service pages too?",
        answer: "Yes. Support content works best when it clearly points people toward the clinical page or booking action that fits their question.",
      },
      {
        question: "Why is this kind of page important for trust?",
        answer: "Clear process information helps patients feel less lost, which makes the clinic seem more organized, more transparent, and easier to approach.",
      },
    ],
    general: [
      {
        question: `What is this page trying to help me understand about ${context.label.toLowerCase()}?`,
        answer: "The goal is to explain whether this topic matches your situation, what a first visit usually focuses on, and what related pages are worth reviewing before you book.",
      },
      {
        question: "Why does a stronger service page matter before I contact the clinic?",
        answer: "A richer page gives you more confidence because it explains practical next steps, not just a short treatment summary.",
      },
      {
        question: "If I still have questions after reading, what should I do next?",
        answer: "The most useful next step is usually to request an appointment or contact the clinic directly so your situation can be reviewed in context.",
      },
    ],
  };

  const faqs = faqsByFamily[family] || faqsByFamily.general;
  const section = document.createElement("section");
  section.className = "section service-faq-band";
  section.innerHTML = `
    <div class="container">
      <div class="section-header">
        <span class="section-label">Common Questions</span>
        <h2 class="section-heading">Questions patients often ask before booking</h2>
        <p class="section-subheading">These answers are here to make the page feel more complete and help patients move forward with a clearer sense of fit, timing, and next steps.</p>
      </div>
      <div class="accordion" role="list">
        ${faqs
          .map(
            (faq, index) => `
              <div class="accordion__item" role="listitem">
                <button class="accordion__btn" aria-expanded="false" aria-controls="service-faq-${family}-${index}" id="service-faq-btn-${family}-${index}">
                  <span class="accordion__question">${faq.question}</span>
                  <svg class="accordion__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </button>
                <div id="service-faq-${family}-${index}" class="accordion__content" role="region" aria-labelledby="service-faq-btn-${family}-${index}">
                  <p class="accordion__answer">${faq.answer}</p>
                </div>
              </div>
            `,
          )
          .join("")}
      </div>
    </div>
  `;
  return section;
}

function buildFamilySection(config, context, family, pageName) {
  const copy = buildDetailCopy(config, context, family, pageName);
  const introParagraphs = Array.isArray(copy.introParagraphs)
    ? copy.introParagraphs
    : [copy.intro].filter(Boolean);
  const supportBody = Array.isArray(copy.supportBody)
    ? copy.supportBody
    : [copy.supportBody].filter(Boolean);
  const imageBody = Array.isArray(copy.imageBody)
    ? copy.imageBody
    : [copy.imageBody].filter(Boolean);
  const imageTitle = copy.imageTitle || "Why the image belongs in the page content";
  const imageCaption =
    copy.imageCaption ||
    config?.image?.alt ||
    `Visual context that supports ${context.label.toLowerCase()} information`;
  const imageSrc = config?.image?.src;
  const imageAlt = config?.image?.alt || imageCaption;
  const linksMarkup = buildLinkPills(config?.links);
  const section = document.createElement("section");
  section.className = `section page-family-band page-family-band--${family}`;

  if (family === "emergency") {
    section.innerHTML = `
      <div class="container">
        <div class="page-family-emergency">
          <div class="page-family-emergency__lead">
            <span class="section-label">Urgent Care Focus</span>
            <h2 class="section-heading">What to do when ${context.label.toLowerCase()} may need fast attention</h2>
            <div class="service-detail-copy">
              ${introParagraphs.slice(0, 2).map((paragraph) => `<p class="dentist__bio">${paragraph}</p>`).join("")}
            </div>
            <ul class="check-list">
              ${copy.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}
            </ul>
          </div>
          <div class="page-family-emergency__aside">
            <article class="page-family-emergency__alert">
              <h3 class="service-detail-media__title">Call sooner when you notice</h3>
              <ul class="check-list">
                <li>Strong pain, swelling, pressure, or an injury that is getting worse.</li>
                <li>A broken tooth, cracked restoration, or a problem affecting eating or sleeping.</li>
                <li>Symptoms that feel too urgent for a routine visit even if you are unsure what treatment you need.</li>
              </ul>
            </article>
            <div class="related-links">${linksMarkup}</div>
          </div>
        </div>
        <div class="page-family-story">
          ${
            imageSrc
              ? `
                <figure class="service-detail-media__figure">
                  <img class="service-detail-media__image" src="${imageSrc}" alt="${imageAlt}" width="1200" height="900" loading="lazy" />
                  <figcaption class="service-detail-media__caption">${imageCaption}</figcaption>
                </figure>
              `
              : ""
          }
          <div class="service-detail-media__body">
            <span class="section-label">During The Visit</span>
            <h2 class="section-heading">${copy.supportTitle}</h2>
            ${supportBody.map((paragraph) => `<p class="dentist__bio">${paragraph}</p>`).join("")}
            <h3 class="service-detail-media__title">${imageTitle}</h3>
            ${imageBody.map((paragraph) => `<p class="dentist__bio">${paragraph}</p>`).join("")}
          </div>
        </div>
      </div>
    `;
    return section;
  }

  if (family === "cosmetic") {
    section.innerHTML = `
      <div class="container">
        <div class="page-family-showcase page-family-showcase--cosmetic">
          <div class="page-family-showcase__content">
            <span class="section-label">Smile Goals</span>
            <h2 class="section-heading">${copy.title}</h2>
            <div class="service-detail-copy">
              ${introParagraphs.map((paragraph) => `<p class="dentist__bio">${paragraph}</p>`).join("")}
            </div>
          </div>
          <div class="page-family-showcase__cards">
            <article class="page-family-card">
              <h3 class="service-detail-media__title">Common goals</h3>
              <p class="dentist__bio">Patients usually arrive here thinking about confidence, symmetry, brightness, alignment, or an overall smile refresh rather than a single technical treatment name.</p>
            </article>
            <article class="page-family-card">
              <h3 class="service-detail-media__title">Consultation flow</h3>
              <p class="dentist__bio">A strong cosmetic page should help patients understand what can realistically change, what may be combined, and how a consultation leads into the right treatment plan.</p>
            </article>
            <article class="page-family-card">
              <h3 class="service-detail-media__title">Related options</h3>
              <div class="related-links">${linksMarkup}</div>
            </article>
          </div>
        </div>
        <div class="page-family-story">
          ${
            imageSrc
              ? `
                <figure class="service-detail-media__figure">
                  <img class="service-detail-media__image" src="${imageSrc}" alt="${imageAlt}" width="1200" height="900" loading="lazy" />
                  <figcaption class="service-detail-media__caption">${imageCaption}</figcaption>
                </figure>
              `
              : ""
          }
          <div class="service-detail-media__body">
            <span class="section-label">Planning The Result</span>
            <h2 class="section-heading">${copy.supportTitle}</h2>
            ${supportBody.map((paragraph) => `<p class="dentist__bio">${paragraph}</p>`).join("")}
            <ul class="check-list">
              ${copy.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}
            </ul>
          </div>
        </div>
      </div>
    `;
    return section;
  }

  if (family === "restorative") {
    section.innerHTML = `
      <div class="container">
        <div class="page-family-split page-family-split--restorative">
          <div class="content-panel content-panel--teal">
            <span class="section-label">Repair And Replacement</span>
            <h2 class="section-heading">${copy.title}</h2>
            <div class="service-detail-copy">
              ${introParagraphs.map((paragraph) => `<p class="dentist__bio">${paragraph}</p>`).join("")}
            </div>
            <ul class="check-list">
              ${copy.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}
            </ul>
          </div>
          <div class="page-family-steps">
            <article class="page-family-step">
              <span class="page-family-step__number">01</span>
              <h3 class="service-detail-media__title">Protect what can be saved</h3>
              <p class="dentist__bio">Restorative pages work best when they explain how treatment protects comfort, bite function, and long-term stability instead of sounding like isolated procedures.</p>
            </article>
            <article class="page-family-step">
              <span class="page-family-step__number">02</span>
              <h3 class="service-detail-media__title">Choose the right level of care</h3>
              <p class="dentist__bio">Some patients need a smaller repair, while others need stronger protection or replacement. The page should guide that decision clearly.</p>
            </article>
            <article class="page-family-step">
              <span class="page-family-step__number">03</span>
              <h3 class="service-detail-media__title">Follow the related path</h3>
              <div class="related-links">${linksMarkup}</div>
            </article>
          </div>
        </div>
        <div class="page-family-story">
          ${
            imageSrc
              ? `
                <figure class="service-detail-media__figure">
                  <img class="service-detail-media__image" src="${imageSrc}" alt="${imageAlt}" width="1200" height="900" loading="lazy" />
                  <figcaption class="service-detail-media__caption">${imageCaption}</figcaption>
                </figure>
              `
              : ""
          }
          <div class="service-detail-media__body">
            <span class="section-label">Why This Matters</span>
            <h2 class="section-heading">${copy.supportTitle}</h2>
            ${supportBody.map((paragraph) => `<p class="dentist__bio">${paragraph}</p>`).join("")}
            <h3 class="service-detail-media__title">${imageTitle}</h3>
            ${imageBody.map((paragraph) => `<p class="dentist__bio">${paragraph}</p>`).join("")}
          </div>
        </div>
      </div>
    `;
    return section;
  }

  if (family === "preventive") {
    section.innerHTML = `
      <div class="container">
        <div class="page-family-preventive">
          <div class="page-family-preventive__intro">
            <span class="section-label">Routine Care Rhythm</span>
            <h2 class="section-heading">${copy.title}</h2>
            <div class="service-detail-copy">
              ${introParagraphs.map((paragraph) => `<p class="dentist__bio">${paragraph}</p>`).join("")}
            </div>
          </div>
          <div class="page-family-preventive__timeline">
            <article class="page-family-card">
              <h3 class="service-detail-media__title">Before the visit</h3>
              <p class="dentist__bio">Patients usually want reassurance, scheduling clarity, and a sense of whether the page matches ongoing maintenance or a new concern.</p>
            </article>
            <article class="page-family-card">
              <h3 class="service-detail-media__title">During the visit</h3>
              <p class="dentist__bio">Preventive pages should set expectations around exams, hygiene, early findings, and how regular care helps avoid more complex treatment later.</p>
            </article>
            <article class="page-family-card">
              <h3 class="service-detail-media__title">After the visit</h3>
              <div class="related-links">${linksMarkup}</div>
            </article>
          </div>
        </div>
        <div class="page-family-story">
          ${
            imageSrc
              ? `
                <figure class="service-detail-media__figure">
                  <img class="service-detail-media__image" src="${imageSrc}" alt="${imageAlt}" width="1200" height="900" loading="lazy" />
                  <figcaption class="service-detail-media__caption">${imageCaption}</figcaption>
                </figure>
              `
              : ""
          }
          <div class="service-detail-media__body">
            <span class="section-label">Why Ongoing Care Works</span>
            <h2 class="section-heading">${copy.supportTitle}</h2>
            ${supportBody.map((paragraph) => `<p class="dentist__bio">${paragraph}</p>`).join("")}
            <ul class="check-list">
              ${copy.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}
            </ul>
          </div>
        </div>
      </div>
    `;
    return section;
  }

  if (family === "support") {
    section.innerHTML = `
      <div class="container">
        <div class="page-family-support">
          <div class="content-panel content-panel--teal">
            <span class="section-label">Patient Guidance</span>
            <h2 class="section-heading">${copy.title}</h2>
            <div class="service-detail-copy">
              ${introParagraphs.map((paragraph) => `<p class="dentist__bio">${paragraph}</p>`).join("")}
            </div>
          </div>
          <div class="page-family-support__rail">
            <article class="page-family-step">
              <span class="page-family-step__number">01</span>
              <h3 class="service-detail-media__title">Know what to bring</h3>
              <p class="dentist__bio">Support pages should lower friction by helping patients understand documents, preparation steps, timing, and who to contact.</p>
            </article>
            <article class="page-family-step">
              <span class="page-family-step__number">02</span>
              <h3 class="service-detail-media__title">See how it connects</h3>
              <p class="dentist__bio">These pages work best when they connect insurance, CDCP, first visits, or technology questions back to the actual appointment path a patient needs.</p>
            </article>
            <article class="page-family-step">
              <span class="page-family-step__number">03</span>
              <h3 class="service-detail-media__title">Use the right next page</h3>
              <div class="related-links">${linksMarkup}</div>
            </article>
          </div>
        </div>
        <div class="page-family-story">
          ${
            imageSrc
              ? `
                <figure class="service-detail-media__figure">
                  <img class="service-detail-media__image" src="${imageSrc}" alt="${imageAlt}" width="1200" height="900" loading="lazy" />
                  <figcaption class="service-detail-media__caption">${imageCaption}</figcaption>
                </figure>
              `
              : ""
          }
          <div class="service-detail-media__body">
            <span class="section-label">How This Page Supports Booking</span>
            <h2 class="section-heading">${copy.supportTitle}</h2>
            ${supportBody.map((paragraph) => `<p class="dentist__bio">${paragraph}</p>`).join("")}
            <h3 class="service-detail-media__title">${imageTitle}</h3>
            ${imageBody.map((paragraph) => `<p class="dentist__bio">${paragraph}</p>`).join("")}
          </div>
        </div>
      </div>
    `;
    return section;
  }

  if (family === "onboarding") {
    section.innerHTML = `
      <div class="container">
        <div class="page-family-onboarding">
          <div class="page-family-onboarding__lead content-panel content-panel--teal">
            <span class="section-label">First Visit Roadmap</span>
            <h2 class="section-heading">${copy.title}</h2>
            <div class="service-detail-copy">
              ${introParagraphs.map((paragraph) => `<p class="dentist__bio">${paragraph}</p>`).join("")}
            </div>
          </div>
          <div class="page-family-onboarding__steps">
            <article class="page-family-step">
              <span class="page-family-step__number">01</span>
              <h3 class="service-detail-media__title">Book the right visit</h3>
              <p class="dentist__bio">If the concern is routine, book normally. If pain or swelling is involved, call the clinic so urgency can be handled properly.</p>
            </article>
            <article class="page-family-step">
              <span class="page-family-step__number">02</span>
              <h3 class="service-detail-media__title">Bring what matters</h3>
              <p class="dentist__bio">Insurance or CDCP details, a summary of your concern, and anything relevant from your medical history help the first visit run more smoothly.</p>
            </article>
            <article class="page-family-step">
              <span class="page-family-step__number">03</span>
              <h3 class="service-detail-media__title">Use these support pages</h3>
              <div class="related-links">${linksMarkup}</div>
            </article>
          </div>
        </div>
        <div class="page-family-story">
          ${
            imageSrc
              ? `
                <figure class="service-detail-media__figure">
                  <img class="service-detail-media__image" src="${imageSrc}" alt="${imageAlt}" width="1200" height="900" loading="lazy" />
                  <figcaption class="service-detail-media__caption">${imageCaption}</figcaption>
                </figure>
              `
              : ""
          }
          <div class="service-detail-media__body">
            <span class="section-label">Make The First Visit Easier</span>
            <h2 class="section-heading">${copy.supportTitle}</h2>
            ${supportBody.map((paragraph) => `<p class="dentist__bio">${paragraph}</p>`).join("")}
            <ul class="check-list">
              ${copy.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}
            </ul>
          </div>
        </div>
      </div>
    `;
    return section;
  }

  if (family === "faq-hub") {
    section.innerHTML = `
      <div class="container">
        <div class="page-family-faqhub">
          <div class="page-family-faqhub__intro">
            <span class="section-label">Question Categories</span>
            <h2 class="section-heading">${copy.title}</h2>
            <div class="service-detail-copy">
              ${introParagraphs.map((paragraph) => `<p class="dentist__bio">${paragraph}</p>`).join("")}
            </div>
          </div>
          <div class="page-family-faqhub__clusters">
            <article class="page-family-card">
              <h3 class="service-detail-media__title">Booking and first visits</h3>
              <p class="dentist__bio">Questions around what to bring, where to start, how to book, and whether a concern sounds routine or urgent.</p>
            </article>
            <article class="page-family-card">
              <h3 class="service-detail-media__title">Pain and emergencies</h3>
              <p class="dentist__bio">Questions about tooth pain, broken teeth, swelling, timing, and when calling is better than waiting.</p>
            </article>
            <article class="page-family-card">
              <h3 class="service-detail-media__title">Treatment and coverage</h3>
              <p class="dentist__bio">Questions around cleanings, fillings, crowns, Invisalign, implants, insurance, and CDCP support.</p>
            </article>
          </div>
        </div>
      </div>
    `;
    return section;
  }

  if (family === "editorial") {
    section.innerHTML = `
      <div class="container">
        <div class="page-family-editorial">
          <div class="page-family-editorial__lead">
            <span class="section-label">Editorial Strategy</span>
            <h2 class="section-heading">${copy.title}</h2>
            <div class="service-detail-copy">
              ${introParagraphs.map((paragraph) => `<p class="dentist__bio">${paragraph}</p>`).join("")}
            </div>
          </div>
          <div class="page-family-editorial__stats">
            <article class="page-family-card">
              <h3 class="service-detail-media__title">High-intent topics</h3>
              <p class="dentist__bio">Emergency pain, CDCP questions, wisdom teeth, broken teeth, and first-visit planning are the strongest local article themes.</p>
            </article>
            <article class="page-family-card">
              <h3 class="service-detail-media__title">Article job</h3>
              <p class="dentist__bio">A blog post should answer the search query clearly, then hand the reader to the right service or support page instead of trapping them in content.</p>
            </article>
            <article class="page-family-card">
              <h3 class="service-detail-media__title">Best next links</h3>
              <div class="related-links">${linksMarkup}</div>
            </article>
          </div>
        </div>
        <div class="page-family-story">
          ${
            imageSrc
              ? `
                <figure class="service-detail-media__figure">
                  <img class="service-detail-media__image" src="${imageSrc}" alt="${imageAlt}" width="1200" height="900" loading="lazy" />
                  <figcaption class="service-detail-media__caption">${imageCaption}</figcaption>
                </figure>
              `
              : ""
          }
          <div class="service-detail-media__body">
            <span class="section-label">Why This Content Exists</span>
            <h2 class="section-heading">${copy.supportTitle}</h2>
            ${supportBody.map((paragraph) => `<p class="dentist__bio">${paragraph}</p>`).join("")}
            <ul class="check-list">
              ${copy.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}
            </ul>
          </div>
        </div>
      </div>
    `;
    return section;
  }

  section.innerHTML = `
    <div class="container">
      <div class="content-split">
        <div class="content-panel content-panel--teal">
          <span class="section-label">${copy.eyebrow}</span>
          <h2 class="section-heading">${copy.title}</h2>
          <div class="service-detail-copy">
            ${introParagraphs.map((paragraph) => `<p class="dentist__bio">${paragraph}</p>`).join("")}
          </div>
          <ul class="check-list">
            ${copy.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}
          </ul>
        </div>
        <div class="content-panel service-detail-media">
          ${
            imageSrc
              ? `
                <figure class="service-detail-media__figure">
                  <img class="service-detail-media__image" src="${imageSrc}" alt="${imageAlt}" width="1200" height="900" loading="lazy" />
                  <figcaption class="service-detail-media__caption">${imageCaption}</figcaption>
                </figure>
              `
              : ""
          }
          <div class="service-detail-media__body">
            <span class="section-label">Why This Matters</span>
            <h2 class="section-heading">${copy.supportTitle}</h2>
            ${supportBody.map((paragraph) => `<p class="dentist__bio">${paragraph}</p>`).join("")}
          </div>
        </div>
      </div>
    </div>
  `;
  return section;
}

function buildPathwaysSection(config, context) {
  const copy = buildPathwayCopy(config, context);
  const section = document.createElement("section");
  section.className = "section section--alt page-pathways";
  section.innerHTML = `
    <div class="container">
      <div class="section-header">
        <span class="section-label">${copy.eyebrow}</span>
        <h2 class="section-heading">${copy.title}</h2>
        <p class="section-subheading">${copy.intro}</p>
      </div>
      <div class="resource-grid">
        ${copy.cards
          .map(
            (card) => `
              <article class="resource-card">
                <span class="jump-card__eyebrow">Related Page</span>
                <h3 class="jump-card__title">${card.title}</h3>
                <p class="resource-card__text">${card.text}</p>
                <a href="${cleanHref(card.href)}" class="resource-card__link">Open page</a>
              </article>
            `,
          )
          .join("")}
      </div>
    </div>
  `;
  return section;
}

function enhanceGallery(config) {
  return null;

  const gallery = document.createElement("section");
  gallery.className = "service-gallery";
  gallery.setAttribute("aria-label", "Page photo gallery");

  gallery.innerHTML = `
    <div class="container">
      <div class="service-gallery__header">
        <span class="section-label">Inside The Visit</span>
        <h2 class="section-heading">Images that make the page feel more complete</h2>
        <p class="section-subheading">Helpful visuals give patients a better feel for the clinic, the treatment context, and the kind of visit they may be booking.</p>
      </div>
      <div class="service-gallery__grid"></div>
    </div>
  `;

  const grid = gallery.querySelector(".service-gallery__grid");

  config.gallery.forEach((image) => {
    const figure = document.createElement("figure");
    figure.className = "service-gallery__card";
    figure.innerHTML = `
      <img
        class="service-gallery__image"
        src="${image.src}"
        alt="${image.alt}"
        width="1200"
        height="900"
        loading="lazy"
      />
      <figcaption class="service-gallery__caption">${image.alt}</figcaption>
    `;
    grid.appendChild(figure);
  });

  return gallery;
}

function getPageContext() {
  const hero = document.querySelector(".page-hero");
  const label = hero?.querySelector(".section-label")?.textContent.trim() || "this visit";
  const heading = hero?.querySelector(".section-heading")?.textContent.trim() || "this page";

  return { label, heading };
}

function insertEnhancementSections(config, context, pageName) {
  const hero = document.querySelector(".page-hero");
  if (!hero || document.querySelector(".page-family-band, .page-detail-band")) return;
  if (CUSTOM_STATIC_PAGES.has(pageName)) return;
  removeGenericIntroSection();
  removeFaqExtraSections();
  removeGenericPageFaqSection();
  const family = getTemplateFamily(pageName);

  const introSection = buildServiceIntroSection(config, context, family, pageName);
  const detailSection = buildFamilySection(config, context, family, pageName);
  const depthSection = buildServiceDepthSection(config, context, family);
  const planningSection = buildServicePlanningSection(context, family);
  const gallerySection = enhanceGallery(config);
  const faqSection = buildServiceFaqSection(context, family);
  const pathwaysSection = buildPathwaysSection(config, context);

  let anchor = hero;
  [introSection, detailSection, depthSection, planningSection, gallerySection, faqSection, pathwaysSection].forEach((section) => {
    if (!section) return;
    anchor.insertAdjacentElement("afterend", section);
    anchor = section;
  });
}

function createFallbackConfig(pageName) {
  if (!document.querySelector(".page-hero")) return null;

  return {
    image: {
      src: "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1920&q=80",
      alt: "Modern dental clinic treatment room",
    },
    links: [
      { href: "services.html", label: "Services" },
      { href: "faq.html", label: "Patient FAQ" },
      { href: "contact.html", label: "Contact the Clinic" },
      { href: "contact.html", label: "Book Appointment" },
    ],
    details: {
      eyebrow: "What This Page Covers",
      title: `A more useful guide for people researching ${pageName.replace(".html", "").replace(/-/g, " ")}`,
      introParagraphs: [
        "Thin pages rarely answer enough for real patients. This added section gives more context, more practical guidance, and a clearer path from searching to booking.",
        "It also gives the page enough depth to explain what the service is for, who usually needs it, and what a patient can expect before they contact the clinic.",
      ],
      bullets: [
        "Common reasons someone lands on this page in the first place.",
        "How this topic connects with related visits and broader treatment planning.",
        "What to review next if you are still narrowing down the right appointment.",
      ],
      supportTitle: "Built to answer more than one quick question",
      supportBody: [
        "Many patients compare a few pages before they contact a clinic. Adding more content helps each page stand on its own instead of feeling like a placeholder.",
        "That extra detail also improves internal linking, page depth, and user trust, which matters for both search visibility and real appointment intent.",
      ],
      imageTitle: "Why the visual matters on the page",
      imageBody: [
        "Keeping the page image beside the written explanation makes the service section feel more complete and easier to scan.",
        "That combination of stronger copy, clearer structure, and supporting imagery gives the page more substance for both visitors and search engines.",
      ],
    },
  };
}

export function initServicePageEnhancements() {
  return;
}
