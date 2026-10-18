/* Never Miss a Lead — site configuration.
   Every page reads links from here. While a Stripe link is '#', CTAs fall back to bookCallUrl.
   While demoNumber is 'DEMO_NUMBER', the "try it" demo-number block stays hidden. */
window.NMAL_CONFIG = {
  apiBase: 'https://api.bigbark.media',
  demoNumber: 'DEMO_NUMBER', // e.g. '+447700900123' once the Twilio demo line exists
  links: {
    textback_trial: 'https://buy.stripe.com/7sYcN6c6Mg7S46v1ea9IQ0p', // Text-Back, 14-day trial, no setup fee, card up front
    ai_trial: 'https://buy.stripe.com/9B67sMc6MdZKgTh1ea9IQ0q',       // AI Receptionist, 14-day trial, no setup fee
    textback_now: 'https://buy.stripe.com/8x228s6Ms7Bm0Uje0W9IQ0r',   // Text-Back £49/mo + £99 setup
    ai_now: 'https://buy.stripe.com/14AeVe1s83l60Uj4qm9IQ0s'          // AI Receptionist £149/mo + £249 setup
  },
  bookCallUrl: 'https://calendly.com/craig-od/big-bark-media-consultation-call',
  whatsappUrl: 'https://wa.me/447822882162',
  email: 'info@bigbark.media'
};
