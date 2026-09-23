# samarahealth.in — Samara Health Care LLP public website

Static website (no build step needed to publish). English + Tamil (button at the top right).

| Page | File |
|---|---|
| Home | `index.html` |
| About Us | `about.html` |
| Our Care | `services.html` |
| Careers | `careers.html` |
| Contact & enquiry form | `contact.html` |
| Privacy Notice | `privacy.html` |

- Styles: `css/site.css` · Behaviour (language, menu, form): `js/site.js` · Settings: `js/config.js`
- All English and Tamil text: `js/i18n.js` (generated from `source/content.py`).
- The enquiry form saves into the ERP (**Enquiries** page) through the Supabase function
  `website_submit_enquiry` (ERP SQL `138_public_website_enquiry.sql`). If saving fails, the visitor is
  offered WhatsApp with their details already filled in.
- `CNAME` = samarahealth.in. `.nojekyll` tells GitHub Pages to publish files as they are.

## Changing text

Easiest: ask Claude, naming the page and the sentence. (Text lives in `source/content.py`; running
`python3 source/build.py` regenerates every page and `js/i18n.js`.)

This is a separate site from the ERP (app.samaraassistedliving.com) and from samaraassistedliving.com.
It must never contain patient information.
