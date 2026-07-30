const { v4: uuidv4 } = require('uuid');

function generateTrojan(domain = 'example.com', port = 443) {
  const password = uuidv4().replace(/-/g, '').slice(0, 32);
  const path = `/trojan-${uuidv4().slice(0, 8)}`;

  const config = {
    run_type: "client",
    local_addr: "127.0.0.1",
    local_port: 1080,
    remote_addr: domain,
    remote_port: port || 443,
    password: password,
    ssl: {
      verify: true,
      verify_hostname: true,
      cert: "",
      sni: domain,
      alpn: ["h2", "http/1.1"],
      reuse_session: true,
      session_ticket: false,
      curves: ""
    },
    tcp: {
      no_delay: true,
      keep_alive: true,
      fast_open: false,
      fast_open_qlen: 20
    }
  };

  const link = `trojan://${password}@${domain}:${port}?security=tls&sni=${domain}&alpn=h2,http/1.1&type=tcp&headerType=none#REZA-TROJAN-${domain}`;

  return { link, config };
}

module.exports = { generateTrojan };
