const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set("authorization", `Key ${process.env.CLARIFAI_API_KEY}`);

exports.detectface = (req, res) => {
  const { imageUrl } = req.body;

  if (!imageUrl) {
    return res.status(400).json({ error: "No image present" });
  }

  stub.PostModelOutputs(
    {
      // This is the model ID of a publicly available Face model.
      model_id: "f76196b43bbd45c99b4f3cd8e8b40a8a",
      inputs: [{ data: { image: { url: imageUrl } } }],
    },
    metadata,
    (err, response) => {
      if (err) {
        console.log("Face Detect Error: " + err);
        return res.status(500).json({ error: "Image Detection Error" });
      }

      if (response.status.code !== 10000) {
        console.log(
          "Received failed status: " +
            response.status.description +
            "\n" +
            response.status.details
        );
        return res
          .status(500)
          .json({ error: "Image Detection Error. Check url?" });
      }

      return res.status(200).json({ data: response.outputs[0].data.regions });
    }
  );
};

exports.updateEntriesCount = (req, res, db) => {
  const { id } = req.body;

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
