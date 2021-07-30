const redis = require("redis");
const client = redis.createClient(process.env.REDIS_URI);

const authentication = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ error: "Not Authorized" });
  }

  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Not Authorized" });
  }

  client.get(token, (err, reply) => {
    if (err || !reply) {
      return res.status(401).json({ error: "Not Authorized" });
    }

    req.id = reply;
    req.token = token;
    next();
  });
};

module.exports = { authentication, client };
