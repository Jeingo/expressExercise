const db = require('.\\db')

class PostController {
    async create(req, res) {
        try {
            console.log(req.files)
            const  {author, title, content, picture} = req.body
            const newPost = await db.query('INSERT INTO post(author, title, content, picture) VALUES($1, $2, $3, $4) RETURNING *', [author, title, content, picture])
            res.json(newPost.rows[0])
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getAll(req, res) {
        try {
            const posts = await db.query('SELECT * FROM post')
            return res.json(posts.rows)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getOne(req, res) {
        try {
            const {id}  = req.params
            if (!id) {
                res.status(400).json({message: 'Id dont use'})
            }
            const post = await db.query('SELECT * FROM post WHERE id = $1', [id])
            return res.json(post.rows[0])
        } catch (e) {
            res.status(500).json(e)
        } 
    }

    async update(req, res) {
        try {
            const {id, author, title, content, picture} = req.body
            if(!id) {
                res.status(400).json({message: "Id dont use"})
            }
            const updatedPost = await db.query('UPDATE post set author = $1, title = $2, content = $3, picture = $4 RETURNING *', [author, title, content, picture])
            res.json(updatedPost.rows[0])
        } catch (e) {
            res.status(500).json(e)
        } 
    }

    async delete(req, res) {
        try {
            const {id}  = req.params
            if (!id) {
                res.status(400).json({message: 'Id dont use'})
            }
            const post = await db.query('DELETE FROM post WHERE id = $1 RETURNING *', [id])
            return res.json(post.rows[0])
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

module.exports = new PostController()