exports.updateEntriesCount = (req, res, db) => {
  const { id } = req.params;

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

exports.getProfile = (req, res, db) => {};
