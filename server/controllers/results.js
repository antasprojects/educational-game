const Result = require("../models/Result");

async function index(req, res) {
    try {
        console.log("REEEEEEEEEE") // reaches this point
        const results = await Result.getAll();
        console.log("GOES PASS"); // doesnt reach this point. I am doing integration testing Therefore I dont need to test Result.getAll why wont it reach this point?
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
        const newResult = await Result.create(data);
        res.status(201).json({ data: newResult });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function update(req, res) {
    try {
        const id = req.params.id;
        const data = req.body;
        const result = await Result.show(parseInt(id));
        const updateResult = await result.update(data);
        res.status(200).json({ data: updateResult });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function destroy(req, res) {
    try {
        const id = req.params.id;
        const result = await Result.show(parseInt(id));
        await result.destroy();
        res.sendStatus(204);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}


async function showGroupListing(req, res) {
    try {
        const id = parseInt(req.params.id);
        const level = req.query.level;
        const subject = req.query.subject;
        const user_id = req.query.user_id;
        const group_num = req.query.group_num;

        const result = await Result.showResultAssociateQuestionBank(id, subject, level, group_num, user_id);
        res.status(200).json({ data: result });
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
    showGroupListing
}