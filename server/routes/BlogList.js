import express from 'express';
import pool from '../db.js';

const router = express.Router();

//blogs limited info fetching route for infinite scroll
router.get('/blogs', async (req, res) => {
  const { limit = 5, offset = 0 } = req.query;  // Default limit to 5 and offset to 0 if not provided

  try {
      // Make sure you're ordering the blogs, applying the limit and offset
      const result = await pool.query(
          'SELECT blogs.id, tags, users.username, title, image_url, users.profile_photo, subtitle, blogs.created_at FROM blogs inner join users on blogs.author_id = users.id order by blogs.created_at DESC LIMIT $1 OFFSET $2',
          [parseInt(limit), parseInt(offset)]  // Parse the limit and offset to integers
      );
      res.json(result.rows);  // Return the resulting blogs to the frontend
  } catch (err) {
      console.error('Error fetching blogs:', err);
      res.status(500).send('Server error');
  }
});

//Search blogs by tags route
// Search blogs by tags route
router.get('/searchByTags', async (req, res) => {
  const { tags } = req.query;  // Get the tags from the query parameters

  // Convert tags to an array and trim whitespace
  const tagArray = tags.split(',').map(tag => tag.trim());

  try {
    // Query to match any of the tags
    const result = await pool.query(
      `SELECT blogs.id,tags, users.username,title,image_url,users.profile_photo,subtitle,blogs.created_at::date FROM blogs inner join users on blogs.author_id = users.id
       WHERE EXISTS (
           SELECT 1
           FROM unnest(tags) AS tag
           WHERE LOWER(tag) = ANY ($1::text[])
       )
       ORDER BY created_at DESC`,
      [tagArray]  // Use && operator to match any tags in the array
    );

    res.json(result.rows);  // Return the resulting blogs
  } catch (err) {
    console.error('Error searching blogs by tags:', err);
    res.status(500).send('Server error');
  }
});

export default router;