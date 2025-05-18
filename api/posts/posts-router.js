// implement your posts router here
const express = require('express');
const Post = require('./posts-model');
 
const router = express.Router();

router.get('/', (req, res) => {
    Post.find(req.query)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'Error retrieving the posts' });
        })
});

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const possiblePost = await Post.findById(id)
    if (!possiblePost) {
        res.status(404).json({ message: 'does not exist' });
    }
    else {
        res.status(200).json(possiblePost);
    }
 
});

router.post('/', async (req, res) => {
    try {
        const { title, contents } = req.body
        if (!title || !contents) {
            res.status(400).json({
                message: 'provide title and contents'
            })
        } else {
            const newPost = {
                title,
                contents
            }
            const addNewPost = await Post.insert(newPost)
            if (addNewPost) {
                res.status(201).json({ id: addNewPost, ...newPost });
            } else {
                res.status(404).json({ message: 'does not exist' });
            }
        }
    }
    catch (err) {
        res.status(500).json({
            message: `Error creating post: ${err.message}`,
        })
    }
 
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const possiblePost = await Post.findById(id)
    if (!possiblePost) {
        res.status(404).json({ message: 'does not exist' });
    }
    else {
        try {
            const { title, contents } = req.body
            if (!title || !contents) {
                res.status(400).json({
                    message: 'provide title and contents'
                })
            } else {
                const updatePost = {
                    title,
                    contents
                }
                const updatedPost = await Post.update(id, updatePost)
                if (updatedPost) {
                    res.status(200).json({ id: updatedPost, ...updatePost });
                } else {
                    res.status(404).json({ message: 'does not exist' });
                }
            }
        } catch (err) {
            res.status(500).json({
                message: `Error creating post: ${err.message}`,
            })
        }
    }
});

router.delete('/:id', async (req, res) => {
 
    const { id } = req.params
    const possiblePost = await Post.findById(id)
    if (!possiblePost) {
        res.status(404).json({ message: 'does not exist' });
    }
    else {
        Post.remove(id)
            .then(count => {
                if (count > 0) {
                    res.status(200).json(possiblePost);
                } else {
                    res.status(404).json({ message: 'does not exist' });
                }
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ message: 'Error removing the post' });
            });
    }
 
});

router.get('/:id/comments', async (req, res) => {
 
    const { id } = req.params
 
    const posstiblePost = await Post.findById(id)
 
    if (!posstiblePost) {
        res.status(404).json({ message: 'does not exist' });
    }
    else {
        const possiblePost = await Post.findPostComments(id)
        if (possiblePost) {
            res.status(200).json(possiblePost);
        } else {
            res.status(404).json({ message: 'does not exist' });
        }
 
    }
});

module.exports = router;