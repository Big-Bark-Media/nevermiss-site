/* Never Miss a Lead — site configuration.
   Every page reads links from here. While a Stripe link is '#', CTAs fall back to WhatsApp (whatsappUrl).
   While demoNumber is 'DEMO_NUMBER', the "try it" demo-number block stays hidden. */
window.NMAL_CONFIG = {
  // api.bigbark.media isn't set up (no DNS), so the form and widget use the Worker's own address (20 Oct 2026).
  apiBase: 'https://never-miss-a-lead-api.dbgs-dashboard.workers.dev',
  demoNumber: 'DEMO_NUMBER', // e.g. '+447700900123' once the Twilio demo line exists
  // Live since 20 Oct 2026: each link requires accepting the terms and redirects to onboarding.html?plan=<plan>&paid=1.
  // To pause sign-ups again, set a link to '#': its button then says "WhatsApp us" and opens whatsappUrl.
  links: {
    textback_trial: 'https://buy.stripe.com/9B68wQ7QwbRCeL92ie9IQ0y',
    smart_trial: 'https://buy.stripe.com/bJe4gAfiY2h27iHf509IQ0z',
    ai_trial: 'https://buy.stripe.com/9B67sMc6MdZKgTh1ea9IQ0q',
    textback_now: 'https://buy.stripe.com/8x228s6Ms7Bm0Uje0W9IQ0r',
    smart_now: 'https://buy.stripe.com/00w00k6Ms4pa32r8GC9IQ0u',
    ai_now: 'https://buy.stripe.com/14AeVe1s83l60Uj4qm9IQ0s'
  },
  // Pilot page (pilot.html, unlisted): pilot-only links with NO trial (pilots pay half price from sign-up).
  // The page adds ?prefilled_promo_code=<pilotPromoCode>&client_reference_id=pilot. '#' = WhatsApp instead.
  pilotLinks: {
    textback: 'https://buy.stripe.com/eVq14ob2I7BmgTh0a69IQ0A',
    smart: 'https://buy.stripe.com/9B614o3Ag1cYauTf509IQ0B',
    ai: 'https://buy.stripe.com/aFa00keeU5te6eD8GC9IQ0C'
  },
  pilotPromoCode: 'MENTEEPILOT',
  // Round 2 list sign-ups (pilot page form) go to the Big Bark Media CRM.
  interestUrl: 'https://bbm-crm.dbgs-dashboard.workers.dev/api/public/nmal-interest',
  whatsappUrl: 'https://wa.me/447822882162',
  email: 'info@bigbark.media'
};
