const { akatsuki } = require("../models/akatsuki.model");

function addAkatsuki(req, res) {
  if (!req.body.name) {
    res.status(400).json({
      error: "Can't Add Akatsuki without a Name",
    });
  } else {
    const newAkatsuki = {
      id: akatsuki.length,
      name: req.body.name,
    };
    akatsuki.push(newAkatsuki);

    res.json(newAkatsuki);
  }
}

function getAkatsuki(req, res) {
  const akatsukiId = Number(req.params.id);
  const akatsukiMember = akatsuki[akatsukiId];
  if (akatsukiMember) {
    res.send(akatsukiMember);
  } else {
    // res.sendStatus(404);
    res.status(400).json({
      error: `Akatsuki member are only ${akatsuki.length}`,
    });
  }
}

function getAllAkatsuki(req, res) {
  res.json(akatsuki);
}
module.exports = {
  addAkatsuki,
  getAkatsuki,
  getAllAkatsuki,
};
