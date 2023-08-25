const service = require("../services/permissionService");

function getPermission(req, res) {
  service
    .getPermission(req.body)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
}

module.exports = {
  getPermission,
};
