exports.createTask = function (req, res) {
    var newTask = new Task();

    newTask.save(function (err, data) {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/task/' + data._id);
        }
    });

    User.update({ _id: req.session.passport.user}, {
        $push: {tasks: newTask._id}
    }, function(err, user) {
        if (err) {
            console.log(err);
            res.render('error');
        }
    })

};

exports.getTask = function (req, res) {
    if (req.isAuthenticated()) {
        if (req.params.id) {
            Task.findOne({ _id: req.params.id }, function (err, data) {
                if (err) {
                    console.log(err);
                    res.render('error');
                }
                if (data) {
                    res.render('task', { content: data.content, roomId: data.id });
                } else {
                    res.render('error');
                }
            });
        } else {
            res.render('error');
        }
    } else {
        res.render('error');
    }
}