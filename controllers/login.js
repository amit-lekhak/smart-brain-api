exports.loginUser = (req, res, db, bcrypt) => {
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
            return res.status(200).json({ user: user[0] });
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
