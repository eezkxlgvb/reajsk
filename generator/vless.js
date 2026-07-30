const { v4: uuidv4 } = require('uuid');

function generateVless(domain = 'example.com', port = 443) {
  const id = uuidv4();
  const path = `/vless-${uuidv4().slice(0, 8)}`;

  const config = {
    v: "2",
    ps: `REZA-VLESS-${domain}`,
    add: domain,
    port: port || 443,
    id: id,
    aid: 0,
    scy: "auto",
    net: "ws",
    type: "none",
    host: domain,
    path: path,
    tls: "tls",
    sni: domain,
    alpn: "h2,http/1.1",
    fp: "chrome"
  };

  const link = `vless://${id}@${domain}:${port}?path=${path}&security=tls&encryption=none&alpn=h2,http/1.1&fp=chrome&type=ws&sni=${domain}#REZA-VLESS-${domain}`;

  return { link, config };
}

module.exports = { generateVless };
