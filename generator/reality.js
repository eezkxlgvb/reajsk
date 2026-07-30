const { v4: uuidv4 } = require('uuid');

function generateReality(domain = 'yahoo.com') {
  const id = uuidv4();
  const shortId = uuidv4().slice(0, 8);
  const publicKey = "REZA_G_ROOTZ_PUB_" + uuidv4().slice(0, 12).toUpperCase();

  const config = {
    protocol: "vless",
    id: id,
    flow: "xtls-rprx-vision",
    encryption: "none",
    network: "tcp",
    reality: {
      enabled: true,
      serverName: domain,
      publicKey: publicKey,
      shortId: shortId,
      spiderX: "/"
    },
    tls: "reality",
    fingerprint: "chrome"
  };

  const link = `vless://${id}@${domain}:443?flow=xtls-rprx-vision&encryption=none&security=reality&sni=${domain}&fp=chrome&pbk=${publicKey}&sid=${shortId}&type=tcp&headerType=none#REZA-REALITY-${domain}`;

  return { link, config };
}

module.exports = { generateReality };
