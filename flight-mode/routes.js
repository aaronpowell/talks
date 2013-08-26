'use strict';

exports['flight-mode'] = function (req, res) {
    console.log(req.body);

    res.json({
        saved: true
    });
};