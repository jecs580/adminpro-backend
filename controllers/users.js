const getUser = (req, res) => {
  res.status(200).json({
    ok: true,
    users: [
      {
        id: 123,
        name: "Brandom",
      },
    ],
  });
};


module.exports = {
    getUser
}