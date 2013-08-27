exports.data = function (req, res) {
  res.json({
    firstName: 'John',
    lastName: 'Smith'
  });
};

exports.view = function (req, res) {
    res.render('index');
};