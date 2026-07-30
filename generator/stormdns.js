const { v4: uuidv4 } = require('uuid');

function generateStormDNS(domain = 'storm-dns.example.com') {
  const authKey = uuidv4().replace(/-/g, '').toUpperCase();
  const subDomain = `s${uuidv4().slice(0, 6)}`;

  const config = {
    name: "StormDNS Ultra",
    endpoint: `https://${domain}/dns-query`,
    method: "POST",
    auth: {
      type: "bearer",
      key: authKey
    },
    subdomain: subDomain,
    resolution: {
      mode: "secure",
      protocol: "DNS-over-HTTPS",
      blockAds: true,
      blockTrackers: true,
      dnssec: true
    },
    routing: {
      primary: "cloudflare",
      fallback: "google",
      timeout: 5000
    }
  };

  const link = `stormdns://${authKey}@${domain}?sub=${subDomain}&method=doht&block=ads,trackers&dnssec=true#REZA-STORMDNS-${domain}`;

  return { link, config };
}

module.exports = { generateStormDNS };
