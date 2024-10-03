import express from 'express';
import pool from '../db.js';

const router = express.Router();

//Blog posting route
router.post('/blogs', async (req, res) => {
  const { title,subtitle, content, imageUrl, tags } = req.body;

  if (req.isAuthenticated()){
      try {
        await pool.query(
          'INSERT INTO blogs (title,subtitle, content, image_url, tags, author_id) VALUES ($1, $2, $3, $4, $5, $6)',
          [title, subtitle, content, imageUrl, tags, req.user.id] // Assuming user is authenticated
        );
        res.status(201).send('Blog post created');
      } catch (error) {
        console.error('Error creating blog post:', error);
        res.status(500).send('Server error');
      }
  } else {
    console.log("unauthorized access");
    res.status(500).send('Login First');
  }
});

//Fetch blogs for logged in user's route
router.get("/profile/blogs",async (req,res) => {
  console.log(req.user);
  
  const id = req.user.id;
  if (req.isAuthenticated) {
    try {
      const query = "select author_id, title, subtitle, blogs.created_at, blogs.id, users.username from blogs inner join users on users.id = blogs.author_id where users.id = $1 ORDER BY blogs.created_at DESC limit 10;"
      const result =await pool.query(query,[id]);
      res.json(result.rows);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error retriving details')
    }
  } else {
    res.send("User not logged in")
  }
})

//Fetch a single blog for full view
router.get('/read/:id' || '/profile/:id', async (req, res) => {
  let {id} = req.query || req.params;
  id = parseInt(id.substring(1));
  try {
      const result = await pool.query('SELECT blogs.id, author_id ,subtitle, blogs.created_at, tags, users.username, title, image_url, users.profile_photo,content FROM blogs inner join users on blogs.author_id = users.id WHERE blogs.id = $1', [id]);
      res.json(result.rows[0]);
  } catch (err) {
      console.error('Error fetching blog:', err);
      res.status(500).send('Server error');
  }
});

//Delete blog route
router.delete('/delete/:id', async (req, res) => {
  let { id } = req.params;
  id = parseInt(id.substring(1));

  if (req.isAuthenticated()) {
    try {
      await pool.query('DELETE FROM blogs WHERE id = $1', [id]);
      res.status(200).send('Blog deleted');
    } catch (error) {
      console.error('Error deleting blog:', error);
      res.status(500).send('Server error');
    }
  } else {
    res.status(500).send('Login First');
  }
});

//Update blog route
router.put('/update/:id', async (req, res) => {
  let { id } = req.params;
  id = parseInt(id.substring(1));
  const { title, subtitle, content, imageUrl, tags } = req.body;

  if (req.isAuthenticated()) {
    try {
      await pool.query(
        'UPDATE blogs SET title = $1, subtitle = $2, content = $3, image_url = $4, tags = $5 WHERE id = $6',
        [title, subtitle, content, imageUrl, tags, id]
      );
      res.status(200).send('Blog updated');
    } catch (error) {
      console.error('Error updating blog:', error);
      res.status(500).send('Server error');
    }
  } else {
    res.status(500).send('Login First');
  }
});

export default router;
