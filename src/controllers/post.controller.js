const postModel = require("../models/post.model")
const generateCaption = require("../services/ai.service")
const uploadfile = require("../services/storage.service")
const {v4 : uuidv4} = require('uuid')

async function createPostController(req,res) {
    const file = req.file
    const base64ImageFile =Buffer.from(file.buffer).toString('base64')
    const caption = await generateCaption(base64ImageFile)
    const result = await uploadfile(file.buffer,`${uuidv4()}`)
    const post = await postModel({
        caption : caption,
        image : result.url,
        user : req.user._id
    })

    res.status(201).json({
        message : "Post created successfully",
        post
    })

}

module.exports = {createPostController}