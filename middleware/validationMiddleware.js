module.exports = (req, res, next) => {
    //makes the title and image fields required
    if (req.files == null || req.body.title == null) {
        return res.redirect('/posts/new')
    }
    next()
};