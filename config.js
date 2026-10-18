/* Never Miss a Lead — site configuration.
   Every page reads links from here. While a Stripe link is '#', CTAs fall back to bookCallUrl.
   While demoNumber is 'DEMO_NUMBER', the "try it" demo-number block stays hidden. */
window.NMAL_CONFIG = {
  apiBase: 'https://api.bigbark.media',
  demoNumber: 'DEMO_NUMBER', // e.g. '+447700900123' once the Twilio demo line exists
  // PAUSED 18 Oct 2026 until launch (audit: no onboarding redirect, trial would start before set-up, no terms at checkout).
  // While a link is '#', its button says "Book a call" and opens bookCallUrl.
  // To switch payments back on, swap each '#' for the live link kept in LIVE_LINKS below.
  links: {
    textback_trial: '#', smart_trial: '#', ai_trial: '#',
    textback_now: '#', smart_now: '#', ai_now: '#'
  },
  bookCallUrl: 'https://calendly.com/craig-od/big-bark-media-consultation-call',
  whatsappUrl: 'https://wa.me/447822882162',
  email: 'info@bigbark.media'
};

/* Live Stripe payment links (paused, see above):
   textback_trial https://buy.stripe.com/7sYcN6c6Mg7S46v1ea9IQ0p
   smart_trial    https://buy.stripe.com/28E14o5IocVG6eDf509IQ0t
   ai_trial       https://buy.stripe.com/9B67sMc6MdZKgTh1ea9IQ0q
   textback_now   https://buy.stripe.com/8x228s6Ms7Bm0Uje0W9IQ0r
   smart_now      https://buy.stripe.com/00w00k6Ms4pa32r8GC9IQ0u
   ai_now         https://buy.stripe.com/14AeVe1s83l60Uj4qm9IQ0s */
