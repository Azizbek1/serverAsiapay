const Title = require('../model/Blog/Title')
const Card = require('../model/Blog/Card')
const blogService = require('../service/blog-service')
const fs = require('fs')
class Blog {
    // ========== Blog title =============
    async CreateTitle(req, res, next) {
        try {
            const { name } = req.body;
            const blogTitle = await blogService.CreateTitle(name);
            if (blogTitle) {
                return res.status(200).send({ message: `${blogTitle.name} был создон` });
            } else {
                return  res.status(401).send({ message: "Ошибка гдето!" });
            }
        } catch (e) {
            res.status(401).send({ message: "Ошибка Сервера" });
        }
    }
    async DeleteTitle(req, res, next) {
        try {
            const id = req.params.id;
            const title = await blogService.DeleteTitle(id);
            if (title) {
                return res.json({ message: `${title.name} был удалён` });
            }
            else {
                return res.json({ message: "Ошибка гдето!" });
            }
        } catch (err) {
            res.send({ message: "Ошибка Сервера" });
        }
    }
    async ListTitle(req, res, next) {
        try {
            const title = await Title.find();
            res.status(200).send(title)
        } catch (error) {
            res.status(400).send(error.message)
        }
    }
    async UpdateTitle(req, res, next) {
        const { id } = req.params
        await blogService.UpdateTitle(id, req.body).then(data => {
            if (!data)
                next({ message: `Bunaqa ID yo'q Tekshirib koring`, code: 404 })

            else {
                res.json(data);
            }
        }).catch(err => {
            console.log(err);
        })
    }

    // ========== Blog Card ===========
    async CreateCard(req, res, next) {
        try {
            const { title, text, slug } = req.body;
            const card = await blogService.CreateCard(title, text, slug, req);
            res.json({ message: `${card} был создон` });
        } catch (err) {
            res.send({ message: "Ошибка Сервера" });
        }
    }
    async DeleteCard(req, res, next) {
        try {
            const id = req.params.id
            await Card.findByIdAndDelete({ _id: id }, function (err, data) {
                if (!err) {
                    fs.unlinkSync(`./${data.image_path}`)
                } else {
                    console.log(err);
                }
            })
        } catch (err) {
            res.json({ message: "Ochirildi" });
        }
    }
    async ListCard(req, res, next) {
        try {
            const card = await Card.find();
            res.status(200).send(card)
        } catch (error) {
            res.status(400).send(error.message)
        }
    }
    async UpdateBlog(req, res, next) {
        try {
            const file = req.file
            const { title, text, id } = req.body;
            if (file) {
                const sldierId = await Card.findById(req.params.id);
                console.log(sldierId);
                fs.unlinkSync(`./${sldierId.image_path}`)
                await Card.findOneAndUpdate({ _id: req.params.id }, {
                    title, text, image_path: req.file.path, image_name: req.file.originalname
                })
                res.json({ msg: "Updated a CardBlog" })
            } else {
                await Card.findOneAndUpdate({ _id: req.params.id }, {
                    title, text
                })
                res.json({ msg: "Updated a CardBlog" })
            }
        } catch (e) {
            console.log(e)
            return res.status(400).json({ message: 'Upload avatar error' })
        }
    }

}


module.exports = new Blog()