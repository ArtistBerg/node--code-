function getAllHistory(req, res) {
  return res.status(200).json({
    message: "you history here FROM BACKEND",
  });
}

module.exports = {
  getAllHistory,
};
