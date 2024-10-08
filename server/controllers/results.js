const Result = require("../models/Result");

async function index(req, res) {
    try {
        console.log("REEEEEEEEEE") // reaches this point
        const results = await Result.getAll();
        console.log("GOES PASS", results[0].updated_at); // doesnt reach this point. I am doing integration testing Therefore I dont need to test Result.getAll why wont it reach this point?
        res.status(200).json({ data: results });


        // if I do manual testing without the the model it works try commenting out the above code and uncomment this below code and see it.
        // const results = [{ id: 1, user_id: 1, score: 100, question_id: 1 }];
        // res.status(200).json({ data: results });

    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

async function show(req, res) {
  try {
      const id = req.params.id;
      const result = await Result.show(parseInt(id));
      res.status(200).json({ data: result });
  } catch (error) {
      res.status(404).json({ error: error.message });
  }
}

async function create(req, res) {
    try {
        const data = req.body;
        console.log("first", data)
        const newResult = await Result.create(data);
        console.log("DONE", newResult);
        res.status(201).json({ data: newResult });
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
        res.status(200).json({ data: result });
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

async function totalScore(req, res) {
    try { // user_id, subject, level, group_num, update_at
        console.log("first")
        const userId = parseInt(req.params.user_id);
        const subject = req.query.subject;
        const level = req.query.level;
        const groupNum = req.query.group_num;
        const updatedAt = req.query.updated_at;
        console.log("second", req.query)
        const result = await Result.showTotalUserScore(userId, subject, level, groupNum, updatedAt);
        console.log("third");
        res.status(200).json({ data: result })
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

module.exports = {
    index,
    show,
    create,
    update,
    destroy,
    totalScore
}