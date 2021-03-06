const router = require('express').Router();
const { Blog, User } = require('../models')
const withAuth = require('../utils/auth')

//render dashboard
router.get('/', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            where: {
                user_id: req.session.user_id,
            },
            attributes: ["id", "title", "description", "createdAt"],
            include: [
                {
                    model: User,
                    attributes: ["name"]
                },
            ]
        })

        // console.log(blogData)
        if (!blogData) {
            res.status(404).json({
                message: "No post found with this id"
            });
            return;
        }

        const blogs = blogData.map((blog) => blog.get({ plain: true }));
        //    console.log(blogs)

        res.render('dashboard', {
            blogs,
            loggedIn: req.session.logged_in
        })

    } catch (err) {
        res.status(500).json(err)
    }
})

//render new post page
router.get("/newpost", withAuth, async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('newpost', {
    loggedIn: req.session.logged_in
  });
})

//render update post page
router.get("/updatepost:id", withAuth, async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('updatepost:id', {
    loggedIn: req.session.logged_in
  });
})

router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog post found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
