import os, re

pages_dir = 'C:/Users/ahmad/OneDrive/Desktop/WEBSITES/NovaScotia/dental-site/pages'

PAGES = {
"emergency-dentist.html": {
"s1_label": "When to Come In",
"s1_heading": "What counts as a dental emergency",
"s1_p1": "A dental emergency is any situation where pain, damage, or infection cannot reasonably wait for a routine appointment. The most important thing is not to second-guess — if it feels urgent, call the clinic.",
"s1_p2": "Same-day assessment is available for urgent concerns. Describing your symptoms clearly when you call helps us prepare for the right kind of visit.",
"s1_checks": ["Severe or worsening tooth pain", "Swelling in the jaw, gum, or face", "Knocked-out or broken tooth", "Abscess or signs of infection", "Dental trauma or injury"],
"s1_img": "background1.jpg", "s1_alt": "Emergency dental care in Clarenville",
"s2_label": "What to Do First",
"s2_heading": "Steps to take before you arrive",
"s2_p1": "For a knocked-out tooth, keep it moist — place it back in the socket if possible, or store it in milk. For pain and swelling, avoid heat and do not take aspirin directly on the gum. Call us as soon as you can.",
"s2_p2": "Most dental emergencies are treatable, and acting quickly almost always leads to better outcomes. The longer an infection or trauma goes untreated, the more complex the care tends to become.",
"s2_img": "background2.avif", "s2_alt": "Urgent dental visit in Clarenville",
"band_heading": "Pain that keeps you up at night is not something to wait out until Monday.",
"band_body": "Dental infections can spread. A tooth that could have been saved becomes harder to treat with every day of delay. If something feels wrong, call us — we set aside time for urgent patients every day.",
"related": [("blog-tooth-pain-clarenville.html","When Tooth Pain Is an Emergency"), ("root-canal-treatment.html","Root Canal"), ("tooth-extractions.html","Tooth Extractions"), ("contact.html","Call the Clinic"), ("appointment-request.html","Book Appointment")],
},
"family-dentistry.html": {
"s1_label": "For Every Age",
"s1_heading": "Dental care for every member of your family",
"s1_p1": "Family dentistry means one clinic handles care for children, teens, adults, and seniors — all in one place. That continuity makes it easier to track oral health over time and keep care consistent without juggling multiple providers.",
"s1_p2": "Whether it is a child's first visit, a routine adult checkup, or ongoing care for an older family member, the approach is the same: thorough, unhurried, and focused on the individual.",
"s1_checks": ["Children's exams and first visits", "Routine checkups and cleanings", "Fillings and basic restorative care", "Gum health monitoring", "Referrals when specialist care is needed"],
"s1_img": "background2.avif", "s1_alt": "Family dentistry in Clarenville",
"s2_label": "Long-Term Care",
"s2_heading": "Why having one family dentist makes a difference",
"s2_p1": "When you see the same dental team over years, they know your history. They catch patterns, remember what has worked, and recognise changes early. That familiarity makes appointments easier — especially for patients who feel anxious.",
"s2_p2": "Clarenville Dental Care is currently accepting new patients for family dentistry, including children and adults new to the area or looking for a change.",
"s2_img": "background3.jpg", "s2_alt": "Friendly dental team in Clarenville",
"band_heading": "The best time to establish a dentist is before something goes wrong.",
"band_body": "Regular family dental visits reduce the likelihood of unexpected problems and keep treatment simpler over time. Booking a routine checkup for the whole family is one of the most practical things you can do for long-term oral health.",
"related": [("dental-cleanings.html","Dental Cleanings"), ("preventive-dentistry.html","Preventive Dentistry"), ("new-patients.html","New Patients"), ("cdcp-dentist-clarenville.html","CDCP Coverage"), ("appointment-request.html","Book Appointment")],
},
"dental-implants.html": {
"s1_label": "Permanent Tooth Replacement",
"s1_heading": "How dental implants work",
"s1_p1": "A dental implant replaces the root of a missing tooth with a small titanium post placed in the jawbone. Once integrated, a crown is attached on top — giving you a stable, natural-looking tooth that does not rely on surrounding teeth for support.",
"s1_p2": "Implants are the only tooth replacement option that preserves jawbone. Without a root in place, bone gradually resorbs — implants prevent that process.",
"s1_checks": ["Replaces one or more missing teeth", "Looks and functions like a natural tooth", "Does not affect adjacent teeth", "Preserves jawbone over time", "Designed to last many years with proper care"],
"s1_img": "background3.jpg", "s1_alt": "Dental implant consultation in Clarenville",
"s2_label": "Are You a Candidate?",
"s2_heading": "What affects implant eligibility",
"s2_p1": "Most adults with good general health and adequate bone are candidates for implants. Smokers, patients with uncontrolled diabetes, or those with significant bone loss may require additional assessment or preparatory treatment.",
"s2_p2": "The only reliable way to confirm candidacy is with an exam and imaging. If implants are not the right fit, the clinic will discuss what alternatives — like bridges or dentures — might serve you better.",
"s2_img": "background1.jpg", "s2_alt": "Dental implant result in Clarenville",
"band_heading": "A dental implant is not just a cosmetic choice — it is a structural one.",
"band_body": "Missing teeth affect how you chew, how you speak, and how surrounding teeth shift over time. Implants address all of it with a single permanent solution. The earlier a missing tooth is replaced, the easier the treatment tends to be.",
"related": [("dental-crowns-and-bridges.html","Crowns and Bridges"), ("dentures.html","Dentures"), ("cosmetic-dentistry.html","Cosmetic Dentistry"), ("services.html","All Services"), ("appointment-request.html","Book Appointment")],
},
"preventive-dentistry.html": {
"s1_label": "Prevention First",
"s1_heading": "What preventive dentistry includes",
"s1_p1": "Preventive dentistry covers everything designed to keep problems from starting or worsening. It is the foundation of good oral health — and the most cost-effective form of dental care available.",
"s1_p2": "Routine preventive visits typically include a clinical exam, professional cleaning, X-rays when indicated, and personalised guidance on home care habits that matter for your specific situation.",
"s1_checks": ["Routine exams and oral health screening", "Professional cleanings and scaling", "Digital X-rays to detect hidden decay", "Fluoride treatments when appropriate", "Sealants to protect back teeth", "Home care coaching"],
"s1_img": "background1.jpg", "s1_alt": "Preventive dental care in Clarenville",
"s2_label": "The Bigger Picture",
"s2_heading": "Prevention is less expensive than treatment — always",
"s2_p1": "A cavity caught at a routine exam is a filling. Left alone, it becomes a root canal, a crown, or eventually an extraction. The difference in cost, time, and discomfort is significant. Consistent preventive care is how patients avoid that progression.",
"s2_p2": "If you have not had a checkup recently, now is a good time to book. Most dental insurance plans and CDCP cover preventive visits, often in full.",
"s2_img": "background2.avif", "s2_alt": "Dental exam and prevention in Clarenville",
"band_heading": "You do not have to wait until something hurts to see a dentist.",
"band_body": "Preventive dentistry is about staying ahead. The patients with the fewest dental problems over their lifetimes are almost always the ones who show up consistently — not just when something goes wrong.",
"related": [("dental-cleanings.html","Dental Cleanings"), ("family-dentistry.html","Family Dentistry"), ("cdcp-dentist-clarenville.html","CDCP Coverage"), ("new-patients.html","New Patients"), ("appointment-request.html","Book Appointment")],
},
"invisalign.html": {
"s1_label": "Clear Aligner Treatment",
"s1_heading": "How Invisalign straightens your teeth",
"s1_p1": "Invisalign uses a series of custom-made clear plastic aligners to move teeth gradually into the correct position. Each aligner is worn for one to two weeks, then replaced with the next in the sequence.",
"s1_p2": "Because the aligners are removable, you can eat normally and brush and floss without working around brackets or wires. Most patients wear them 20 to 22 hours per day for best results.",
"s1_checks": ["Custom aligners made from digital scans", "Removable for eating and oral hygiene", "Virtually invisible when worn", "Treats crowding, spacing, and mild bite issues", "Progress tracked at periodic check-in visits"],
"s1_img": "background2.avif", "s1_alt": "Invisalign clear aligner treatment in Clarenville",
"s2_label": "Is Invisalign Right for You?",
"s2_heading": "Who Invisalign works well for",
"s2_p1": "Invisalign is effective for a wide range of alignment concerns in teens and adults, including crowding, spacing, overbite, underbite, and crossbite. Cases with significant skeletal misalignment may require a different approach.",
"s2_p2": "A consultation is the only way to know for certain whether Invisalign fits your situation. We will take scans, review your bite, and walk you through what the treatment process would look like.",
"s2_img": "background3.jpg", "s2_alt": "Invisalign results in Clarenville",
"band_heading": "Straighter teeth are not just about appearance — alignment affects how you bite, chew, and clean your teeth.",
"band_body": "Misaligned teeth are harder to clean thoroughly, which increases the risk of decay and gum disease over time. Invisalign fixes that problem discreetly, without the look or feel of traditional braces.",
"related": [("cosmetic-dentistry.html","Cosmetic Dentistry"), ("teeth-whitening.html","Teeth Whitening"), ("new-patients.html","New Patients"), ("faq.html","Patient FAQ"), ("appointment-request.html","Book Appointment")],
},
"cosmetic-dentistry.html": {
"s1_label": "Smile Improvement",
"s1_heading": "Cosmetic dental treatments available in Clarenville",
"s1_p1": "Cosmetic dentistry covers a range of treatments designed to improve the appearance of your teeth and smile — from subtle changes like whitening to more involved work like veneers or bonding.",
"s1_p2": "Every cosmetic plan starts with a consultation. We review what you want to change, what the realistic outcomes are, and which treatments — alone or in combination — will give you the best result.",
"s1_checks": ["Teeth whitening", "Composite bonding for chips or gaps", "Porcelain veneers", "Invisalign for alignment", "Smile consultations and planning"],
"s1_img": "background3.jpg", "s1_alt": "Cosmetic dentistry consultation in Clarenville",
"s2_label": "Starting with a Consultation",
"s2_heading": "How cosmetic treatment planning works",
"s2_p1": "Most cosmetic changes are irreversible, which means it is worth taking time to understand your options before committing. A good cosmetic consultation walks you through what each treatment involves, what the limitations are, and what the result will look like.",
"s2_p2": "Some patients come in with one specific concern. Others want a complete smile refresh. Either way, the conversation starts the same way — with your goals and what is actually achievable.",
"s2_img": "background1.jpg", "s2_alt": "Cosmetic dental treatment in Clarenville",
"band_heading": "A small cosmetic change can make a significant difference in how comfortable you feel about your smile.",
"band_body": "Whether it is a chip you have been covering up for years or teeth that have yellowed over time, cosmetic dentistry offers practical solutions. Many treatments are quicker and more affordable than patients expect.",
"related": [("teeth-whitening.html","Teeth Whitening"), ("invisalign.html","Invisalign"), ("dental-implants.html","Dental Implants"), ("services.html","All Services"), ("appointment-request.html","Book Appointment")],
},
"root-canal-treatment.html": {
"s1_label": "Saving the Natural Tooth",
"s1_heading": "When root canal treatment is needed",
"s1_p1": "Root canal treatment is needed when the pulp inside a tooth — the soft tissue containing nerves and blood vessels — becomes infected or inflamed. This can happen from deep decay, a crack, or trauma to the tooth.",
"s1_p2": "The goal of the procedure is to remove the infected tissue, clean and shape the root canals, and seal the tooth to prevent reinfection. In most cases, a crown is placed afterward to protect the treated tooth.",
"s1_checks": ["Severe toothache or pressure sensitivity", "Prolonged sensitivity to heat or cold", "Darkening of the tooth", "Swelling or tenderness in nearby gums", "A persistent pimple on the gum"],
"s1_img": "background1.jpg", "s1_alt": "Root canal treatment in Clarenville",
"s2_label": "What to Expect",
"s2_heading": "Root canal treatment is more manageable than its reputation suggests",
"s2_p1": "Most patients report that the procedure itself — done under local anaesthesia — is no more uncomfortable than having a filling. The tooth is numb throughout, and any post-treatment soreness typically resolves within a few days.",
"s2_p2": "Leaving an infected tooth untreated is almost always worse. The infection does not resolve on its own and can spread to surrounding bone and tissue. Root canal treatment stops that process and keeps the tooth functional.",
"s2_img": "background3.jpg", "s2_alt": "Endodontic treatment at Clarenville Dental Care",
"band_heading": "Saving a natural tooth is almost always better than replacing it.",
"band_body": "A treated and restored tooth can last a lifetime with proper care. Root canal treatment is one of the most effective ways to eliminate pain, clear infection, and keep the tooth in place — avoiding the cost and complexity of extraction and replacement.",
"related": [("emergency-dentist.html","Emergency Dentist"), ("dental-crowns-and-bridges.html","Crowns and Bridges"), ("blog-tooth-pain-clarenville.html","When Tooth Pain Is an Emergency"), ("appointment-request.html","Book Appointment")],
},
"wisdom-teeth-removal.html": {
"s1_label": "Assessment and Removal",
"s1_heading": "Signs your wisdom teeth may need attention",
"s1_p1": "Wisdom teeth do not always require removal, but when they are impacted, partially erupted, or causing repeat infections, the situation rarely improves without treatment.",
"s1_p2": "An X-ray and clinical exam are the only reliable way to know whether your wisdom teeth need to come out. If the assessment finds no problem, nothing needs to happen. If it finds an issue, you will understand exactly what it is and what the options are.",
"s1_checks": ["Pain or pressure in the back of the mouth", "Swelling or tenderness in the jaw", "Repeated infections around the back tooth", "Difficulty cleaning the area properly", "Crowding of adjacent teeth"],
"s1_img": "background2.avif", "s1_alt": "Wisdom teeth assessment in Clarenville",
"s2_label": "What Removal Involves",
"s2_heading": "Recovery is usually faster than expected",
"s2_p1": "Wisdom tooth removal is done under local anaesthesia. Depending on how the teeth are positioned, the procedure can take anywhere from a few minutes to slightly longer for more complex extractions.",
"s2_p2": "Most patients feel significantly better within three to five days. Swelling peaks around day two and gradually reduces. Following post-procedure instructions closely — especially during the first 24 hours — has the most impact on how smoothly recovery goes.",
"s2_img": "background1.jpg", "s2_alt": "Post-wisdom tooth removal recovery",
"band_heading": "Earlier assessment leads to simpler treatment — almost without exception.",
"band_body": "Wisdom teeth removed in the late teens or early twenties typically involve shorter procedures and faster recovery than when removal is delayed until problems become severe. If you have been experiencing back-tooth pain or recurring swelling, it is worth getting checked.",
"related": [("emergency-dentist.html","Emergency Dentist"), ("blog-wisdom-teeth-clarenville.html","Wisdom Teeth: When to Get an Assessment"), ("tooth-extractions.html","Tooth Extractions"), ("appointment-request.html","Book Appointment"), ("faq.html","Patient FAQ")],
},
"dental-crowns-and-bridges.html": {
"s1_label": "Restoring Damaged Teeth",
"s1_heading": "When a crown or bridge is the right choice",
"s1_p1": "A crown covers and protects an entire tooth that is too damaged for a filling — due to a large crack, decay that has spread too far, or a tooth that has had root canal treatment and needs structural protection.",
"s1_p2": "A dental bridge fills the space left by a missing tooth by anchoring a false tooth between two crowns placed on the adjacent teeth. It is a fixed, non-removable option for replacing one or two missing teeth.",
"s1_checks": ["Tooth cracked or broken significantly", "Decay too large for a filling alone", "Tooth treated with a root canal", "One or two missing teeth needing replacement", "Worn down teeth requiring full coverage"],
"s1_img": "background3.jpg", "s1_alt": "Dental crown and bridge in Clarenville",
"s2_label": "The Process",
"s2_heading": "What to expect across your appointments",
"s2_p1": "Most crown and bridge work is completed in two visits. The first involves preparing the tooth, taking impressions, and placing a temporary restoration. The second involves fitting and cementing the final restoration.",
"s2_p2": "Modern dental ceramics are strong, natural-looking, and designed to last many years. Your dentist will match the shade to your surrounding teeth so the restoration blends in naturally.",
"s2_img": "background2.avif", "s2_alt": "Crown fitting at Clarenville Dental Care",
"band_heading": "A well-made crown can protect a damaged tooth for a decade or more.",
"band_body": "Leaving a cracked or heavily decayed tooth untreated usually leads to extraction — which then creates the separate challenge of replacement. A crown placed at the right time prevents that progression and keeps the natural tooth in service.",
"related": [("dental-implants.html","Dental Implants"), ("root-canal-treatment.html","Root Canal"), ("tooth-colored-fillings.html","Tooth-Coloured Fillings"), ("appointment-request.html","Book Appointment")],
},
"tooth-colored-fillings.html": {
"s1_label": "Composite Fillings",
"s1_heading": "What tooth-coloured fillings are",
"s1_p1": "Tooth-coloured fillings are made from composite resin — a durable plastic material that bonds directly to the tooth. They are matched to the shade of your existing teeth, making them invisible after placement.",
"s1_p2": "Unlike older amalgam fillings, composite resin requires removing less healthy tooth structure and does not contain mercury. It is the standard material for most cavity repairs at this clinic.",
"s1_checks": ["Matched to your natural tooth colour", "Bonds directly to tooth structure", "Less removal of healthy tooth required", "Suitable for front and back teeth", "Repairs chips and minor damage as well as cavities"],
"s1_img": "background2.avif", "s1_alt": "Tooth-coloured filling in Clarenville",
"s2_label": "What to Expect",
"s2_heading": "The filling appointment is straightforward",
"s2_p1": "The area is numbed with local anaesthesia before treatment begins. The decay is removed, the composite is applied in layers and cured with a light, then the bite is checked and adjusted. Most appointments take 30 to 60 minutes.",
"s2_p2": "Some mild sensitivity to temperature or pressure is normal for a few days. If sensitivity is sharp, increasing, or persists beyond a week, call the clinic so the bite and margins can be reviewed.",
"s2_img": "background3.jpg", "s2_alt": "Restorative dental care in Clarenville",
"band_heading": "Most cavities are caught at routine exams — before they cause any pain.",
"band_body": "A small filling is straightforward and quick. Left untreated, the same cavity can grow to the point where a crown or root canal becomes necessary. Regular checkups combined with prompt treatment are the most effective way to keep restorative work minimal.",
"related": [("dental-cleanings.html","Dental Cleanings"), ("preventive-dentistry.html","Preventive Dentistry"), ("dental-crowns-and-bridges.html","Crowns and Bridges"), ("appointment-request.html","Book Appointment")],
},
"dentures.html": {
"s1_label": "Full and Partial Dentures",
"s1_heading": "Denture options for replacing missing teeth",
"s1_p1": "Dentures replace missing teeth with a removable prosthetic that restores appearance, chewing function, and support for the facial structure. Modern dentures are more comfortable and natural-looking than older designs.",
"s1_p2": "Full dentures replace an entire arch of missing teeth. Partial dentures fill in specific gaps while resting on remaining natural teeth. Both are custom-made to fit your mouth and match the appearance of natural teeth.",
"s1_checks": ["Custom fit to your mouth", "Full dentures for complete tooth loss", "Partial dentures to fill specific gaps", "Implant-retained options for added stability", "Adjustments available as fit changes over time"],
"s1_img": "background1.jpg", "s1_alt": "Dentures in Clarenville",
"s2_label": "Adjusting to Dentures",
"s2_heading": "What the transition period looks like",
"s2_p1": "New dentures take time to feel natural. Speaking and eating may feel awkward at first, and minor soreness in the first weeks is common as the tissue adjusts. These issues typically resolve as you adapt to the new fit.",
"s2_p2": "Regular follow-up visits are important — as the bone and gum tissue changes over time, the denture fit may need adjustment. Patients who attend regular checkups find their dentures remain comfortable and functional for much longer.",
"s2_img": "background3.jpg", "s2_alt": "Denture fitting at Clarenville Dental Care",
"band_heading": "Tooth loss does not have to mean a permanent change to how you eat, speak, or feel in social situations.",
"band_body": "Well-fitted dentures restore a great deal of everyday function and confidence. If you are currently managing with missing teeth or an ill-fitting existing denture, a consultation can show you what a better fit would mean for your daily life.",
"related": [("dental-implants.html","Dental Implants"), ("dental-crowns-and-bridges.html","Crowns and Bridges"), ("new-patients.html","New Patients"), ("appointment-request.html","Book Appointment")],
},
"teeth-whitening.html": {
"s1_label": "Professional Whitening",
"s1_heading": "Why professional whitening outperforms store-bought",
"s1_p1": "Professional whitening uses prescription-strength bleaching agents that are not available in store products. The result is noticeably brighter — typically several shades — achieved in a controlled, safe process.",
"s1_p2": "Take-home professional trays give you custom-fitted trays with professional-grade gel. Results develop over one to two weeks of regular use, and the trays can be reused for touch-ups as needed.",
"s1_checks": ["Custom-fitted trays for even coverage", "Professional-strength whitening gel", "Minimal sensitivity protocol", "Results typically last one to three years", "Touch-up trays available for maintenance"],
"s1_img": "background3.jpg", "s1_alt": "Teeth whitening in Clarenville",
"s2_label": "What to Expect",
"s2_heading": "Realistic results and how to maintain them",
"s2_p1": "Most patients achieve several shades of improvement. Results depend on the original shade of your teeth and what is causing the discolouration — certain stains respond less predictably.",
"s2_p2": "Whitening results are not permanent. Coffee, tea, red wine, and tobacco gradually restain teeth over time. Touch-up treatments every year or two help maintain the result, and the custom trays make this straightforward.",
"s2_img": "background1.jpg", "s2_alt": "Bright smile after professional whitening",
"band_heading": "Professional whitening is one of the simplest, most affordable ways to improve how your smile looks.",
"band_body": "If you have been considering whitening but have put it off, it is worth knowing how quick and comfortable the process actually is. A consultation takes only a few minutes, and the improvement is often more significant than patients expect.",
"related": [("cosmetic-dentistry.html","Cosmetic Dentistry"), ("invisalign.html","Invisalign"), ("dental-cleanings.html","Dental Cleanings"), ("appointment-request.html","Book Appointment")],
},
"dental-technology.html": {
"s1_label": "Modern Dental Care",
"s1_heading": "Technology that makes your visit better",
"s1_p1": "Modern dental technology is not about complexity for its own sake — it is about finding problems more accurately, treating them more precisely, and making the experience more comfortable.",
"s1_p2": "The equipment at Clarenville Dental Care is selected to improve clinical outcomes and patient experience. Less radiation, sharper images, more accurate impressions, and more predictable treatment results all come from having the right tools.",
"s1_checks": ["Digital X-rays with reduced radiation", "Intraoral cameras for patient education", "Digital impressions where applicable", "Modern sterilisation and infection control", "Comfortable, up-to-date treatment chairs"],
"s1_img": "background2.avif", "s1_alt": "Modern dental technology in Clarenville",
"s2_label": "Why It Matters",
"s2_heading": "Better technology means better diagnosis",
"s2_p1": "Digital X-rays detect decay and bone changes that are not visible to the naked eye, often years before they become symptomatic. Catching a problem early consistently leads to simpler treatment and better outcomes.",
"s2_p2": "Intraoral cameras allow patients to see what their dentist sees — which makes treatment recommendations easier to understand and decisions easier to make with confidence.",
"s2_img": "background1.jpg", "s2_alt": "Dental technology at Clarenville Dental Care",
"band_heading": "The tools your dental team uses directly affect the quality of your diagnosis and treatment.",
"band_body": "Technology in dentistry has advanced significantly. Patients who visit modern, well-equipped clinics benefit from earlier detection, more accurate treatment planning, and a more comfortable experience overall.",
"related": [("services.html","All Services"), ("about-us.html","About Us"), ("new-patients.html","New Patients"), ("appointment-request.html","Book Appointment")],
},
}

def build_main(d):
    checks = "\n".join(f'              <li>{c}</li>' for c in d["s1_checks"])
    related = "\n".join(f'            <a href="{h}" class="related-link-pill">{l}</a>' for h, l in d["related"])
    return f'''
    <section class="section" aria-labelledby="sec1-heading">
      <div class="container">
        <div class="page-family-story">
          <div class="page-family-story__body">
            <span class="section-label">{d["s1_label"]}</span>
            <h2 id="sec1-heading" class="section-heading">{d["s1_heading"]}</h2>
            <p>{d["s1_p1"]}</p>
            <p>{d["s1_p2"]}</p>
            <ul class="check-list">
{checks}
            </ul>
          </div>
          <div class="page-family-story__aside">
            <figure class="service-detail-media__figure">
              <img src="../assets/images/{d["s1_img"]}" alt="{d["s1_alt"]}" class="service-detail-media__image" loading="lazy" />
            </figure>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--alt" aria-labelledby="sec2-heading">
      <div class="container">
        <div class="page-family-story page-family-story--reverse">
          <div class="page-family-story__body">
            <span class="section-label">{d["s2_label"]}</span>
            <h2 id="sec2-heading" class="section-heading">{d["s2_heading"]}</h2>
            <p>{d["s2_p1"]}</p>
            <p>{d["s2_p2"]}</p>
            <div class="btn-group mt-6">
              <a href="appointment-request.html" class="btn btn--primary">Book Appointment</a>
              <a href="tel:+17092000209" class="btn btn--secondary">Call (709) 200-0209</a>
            </div>
          </div>
          <div class="page-family-story__aside">
            <figure class="service-detail-media__figure">
              <img src="../assets/images/{d["s2_img"]}" alt="{d["s2_alt"]}" class="service-detail-media__image" loading="lazy" />
            </figure>
          </div>
        </div>
      </div>
    </section>

    <section class="section text-band">
      <div class="container">
        <div class="text-band__inner">
          <h2 class="text-band__heading">{d["band_heading"]}</h2>
          <p class="text-band__body">{d["band_body"]}</p>
        </div>
      </div>
    </section>

    <section class="section section--alt">
      <div class="container">
        <div class="related-pages">
          <h2 class="related-pages__heading">Related pages</h2>
          <div class="related-pages__links">
{related}
          </div>
        </div>
      </div>
    </section>'''

modified = 0
for filename, data in PAGES.items():
    filepath = os.path.join(pages_dir, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    main_start = content.find('<main>')
    first_section_end = content.find('</section>', main_start) + len('</section>')
    main_end = content.find('</main>', first_section_end)

    new_sections = build_main(data)
    new_content = content[:first_section_end] + new_sections + '\n  </main>' + content[main_end + len('</main>'):]

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    modified += 1
    print(f'Done: {filename}')

print(f'\nTotal: {modified} pages updated.')
