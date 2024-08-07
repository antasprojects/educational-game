const Result = require("../models/Result");

async function index(req, res) {
    try {
        console.log("first LANDED")
        const results = await Result.getAll();
        res.status(200).json(results);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

async function show(req, res) {
  try {
      const id = req.params.id;
      const result = await Result.show(parseInt(id));
      res.status(200).json(result);
  } catch (error) {
      res.status(404).json({ error: error.message });
  }
}

async function create(req, res) {
    try {
        const data = req.body;
        const newResult = await Result.create(data);
        res.status(201).send(newResult);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function update(req, res) {
    try {
        const id = req.params.id;
        const data = req.body;
        const user = await Result.show(parseInt(id));
        const result = await user.update(data);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function destroy(req, res) {
    try {
        const id = req.params.id;
        const user = await Result.show(parseInt(id));
        await user.destroy();
        res.sendStatus(204);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}



module.exports = {
    index,
    show,
    create,
    update,
    destroy
}