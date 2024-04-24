/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Retrieve saved posts with pagination
 *     description: Retrieve a list of saved posts with pagination
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number to retrieve (default: 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The number of posts per page (default: 10)
 *     responses:
 *       '200':
 *         description: A list of saved posts
 */
async function getPosts(req, res) {
    try {
      const page = req.query.page || 1;
      const limit = req.query.limit || 10;
      const offset = (page - 1) * limit;
  
      const { rows } = await db.query('SELECT * FROM posts LIMIT $1 OFFSET $2', [limit, offset]);
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  module.exports = { getPosts };