exports.updateEntriesCount = (req, res, db) => {
  const id = req.id;

  if (!id) {
    return res.status(400).json({ error: "No id found" });
  }

  db("users")
    .where({ id })
    .increment({ entries: 1 })
    .returning("entries")
    .then((entries) => {
      if (!entries.length) {
        return res.status(400).json({ error: "Check the id" });
      }
      return res.status(200).json({ entries: entries[0] });
    })
    .catch((error) => {
      console.log("User entries error" + error);
      return res.status(500).json({ error: "Database error" });
    });
};

exports.getProfile = (req, res, db) => {
  const id = req.id;

  if (!id) {
    return res.status(400).json({ error: "No id found" });
  }

  db("users")
    .select("*")
    .where({ id })
    .then((results) => {
      if (!results.length) {
        return res.status(400).json({ error: "Check the id" });
      }
      return res.status(200).json({ user: results[0] });
    })
    .catch((error) => {
      console.log("User access error" + error);
      return res.status(500).json({ error: "Database error" });
    });
};

exports.updateProfile = (req, res, db) => {
  const id = req.id;

  if (!id) {
    return res.status(400).json({ error: "No id found" });
  }

  const { name, age, pet } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name field is empty" });
  }

  db("users")
    .where({ id })
    .update({ name, age, pet })
    .returning("*")
    .then((results) => {
      if (!results.length) {
        return res.status(400).json({ error: "Check the data" });
      }
      return res.status(200).json({ user: results[0] });
    })
    .catch((error) => {
      console.log("User update error" + error);
      return res.status(500).json({ error: "Database error" });
    });
};
