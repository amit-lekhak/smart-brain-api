const signToken = require("./login").signToken;
const saveToken = require("./login").saveToken;

exports.signupUser = (req, res, db, bcrypt) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Fields are empty" });
  }

  db("login")
    .select()
    .where({ email })
    .then((result) => {
      if (result.length) {
        return res.status(400).json({ error: "User already exists" });
      }

      const hashedPassword = bcrypt.hashSync(password);

      db.transaction((trx) => {
        trx
          .insert({ email, hash: hashedPassword })
          .into("login")
          .returning("email")
          .then((loginEmail) => {
            return trx
              .insert({ name, email: loginEmail[0], joined: new Date() })
              .into("users")
              .returning("*")
              .then((user) => {
                const { email, id } = user[0];
                const token = signToken(email);
                saveToken(token, id);
                return res
                  .status(200)
                  .json({ message: "user registered", user: user[0], token });
              });
          })
          .then(trx.commit)
          .catch(trx.rollback);
      }).catch((error) => {
        console.log("error: " + error);
        return res.status(500).json({ error: "Insert Database error" });
      });
    })
    .catch((error) => {
      console.log("db error: " + error);
      return res.status(500).json({ error: "Search Database error" });
    });
};
