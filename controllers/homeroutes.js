const router = require('express').Router();
const { Blog, User } = require('../models');
const Comment = require('../models/Comment');
// const withAuth = require('../utils/auth')

//show all blog posts with all comments
router.get('/', async (req, res) => {
  try {
    // Get all blogs and JOIN with user data and comment data
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['text', 'user_id', 'createdAt'],
          include: {
            model: User, attributes: ['name'],
          }
        },
      ],
    });

    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    const comments = blogData.map((comment) => comment.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      blogs,
      comments,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


//get blog post by ID
router.get('/blogs/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const blog = blogData.get({ plain: true });

    res.render('blogs', {
      ...blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


//login route. If already logged in, redirect to dashboard
router.get('/login', (req, res) => {

  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

//signup route. If already logged in, redirect to dashboard
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('signup');
});

router.get('/logout', (req, res) => {
  res.render('logout', {
    loggedIn: req.session.logged_in
  });
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


    module.exports = router;
