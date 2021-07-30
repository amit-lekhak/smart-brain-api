const jwt = require("jsonwebtoken");
const client = require("../middlewares/authentication").client;

const loginUser = (req, res, db, bcrypt) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Fields are empty" });
  }

  db("login")
    .select()
    .where({ email })
    .then((result) => {
      if (!result.length) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      if (!bcrypt.compareSync(password, result[0]["hash"])) {
        return res.status(400).json({ error: "Invalid email or password" });
      } else {
        db("users")
          .select()
          .where({ email })
          .then((user) => {
            const { email, id } = user[0];
            const token = signToken(email);
            saveToken(token, id);
            return res.status(200).json({ id, token });
          })
          .catch((error) => {
            console.log("users db: " + error);
            return res.status(500).json({ error: "Login Database error" });
          });
      }
    })
    .catch((error) => {
      console.log("login db: " + error);
      return res.status(500).json({ error: "Login Database error" });
    });
};

const signToken = (email) => {
  return jwt.sign(email, process.env.JWT_SECRET);
};

const saveToken = (token, id) => {
  client.set(token, id);
};

const logoutUser = (req, res) => {
  const token = req.token;
  client.del(token, () => {
    return res.status(200).json({ message: "Signed out" });
  });
};

module.exports = { loginUser, signToken, saveToken, logoutUser };
