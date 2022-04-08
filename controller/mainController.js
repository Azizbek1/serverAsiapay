const Menu = require('../model/Main/Menu')
const Slider = require('../model/Main/Slider')
const CardMain = require('../model/Main/CardMain');
const { Create, Delete,  List } = require('../CRUD/CRUDSystem')
const fs = require('fs')
class Main {

    // ============ Menu ====================
    async CreateMenu(req, res, next) {
        try {
            const { name } = req.body;
            const menuCondidat = await Menu.findOne({ name });
            if (menuCondidat) {
                return res.status(400).json({ message: `${name} уже существует` });
            }
            const menu = await new Menu({ name });
            const newMenu = await menu.save();
            if (newMenu) {
                return res.status(200).json({ message: `${newMenu.name} был создон` });
            } else {
                return res.status(404).json({ message: "Ошибка гдето!" });
            }

        } catch (e) {
            res.send({ message: "Ошибка Сервера" });
        }
    }
    async DeleteMenu(req, res, next) {
        try {
            const id = req.params.id;
            const menu = await Menu.findByIdAndDelete({ _id: id })
            if (menu) {
                return res.json({ message: `${menu.name} был удалён` });
            }
            else {
                return res.json({ message: "Ошибка гдето!" });
            }
        } catch (err) {
            res.send({ message: "Ошибка Сервера" });
        }
    }
    async ListMenu(req, res, next) {
        try {
            const menu = await Menu.find();
            res.status(200).send(menu)
        } catch (error) {
            res.status(400).send(error.message)
        }
    }
    async UpdateMenu(req, res, next) {
        const { id } = req.params
        const menu = Menu.findByIdAndUpdate(
            id,
            req.body
        )
        menu.then(data => {
            if (!data)
                next({ message: `Bunaqa ID yo'q Tekshirib koring`, code: 404 })

            res.json(data);
        }).catch(err => {
            console.log(err);
        })
    }


    // ============= Slider ================
    async CreateSlider(req, res, next) {
        try {
            const { title, text } = req.body;
            await new Create({ title, text, image_path: req.file.path, image_name: req.file.originalname, model: Slider }).create().then(data => {
                return res.json({ message: `${data} был создон` });
            }).catch(e => {
                console.log(e);
            });
        } catch (err) {
            res.send({ message: "Ошибка Сервера" });
        }
    }
    async DeleteSlider(req, res, next) {
        try {
            const id = req.params.id
            await new Delete({ id, model: Slider}).delete().then(data => {
                return res.json({ message: `${data} был удалён` });
            })
        } catch (err) {
            res.json({ message: "Ochirildi" });
        }
    }
    async ListSlider(req, res, next) {
        try {
            const sliders = await new List({model: Slider}).list();
            if(sliders) {
                res.status(200).send(sliders)
            }
        } catch (error) {
            res.status(400).send(error.message)
        }
    }
    async UpdateSlider(req, res, next) {
        try {
            const file = req.file
            const { title, text } = req.body;
            if (file) {
                const sldierId = await Slider.findById(req.params.id);
                console.log(sldierId);
                fs.unlinkSync(`./${sldierId.image_path}`)
                await Slider.findOneAndUpdate({ _id: req.params.id }, {
                    title, text, image_path: req.file.path, image_name: req.file.originalname
                })
                res.json({ msg: "Updated a Slider" })
            } else {
                await Slider.findOneAndUpdate({ _id: req.params.id }, {
                    title, text
                })
                res.json({ msg: "Updated a Slider" })
            }
        } catch (e) {
            console.log(e)
            return res.status(400).json({ message: 'Upload avatar error' })
        }
    }


    // ================= Card ==============
    async CreateCard(req, res, next) {
        try {
            const { title, text, slug} = req.body;
            await new Create({ title, text, slug, image_path: req.file.path, image_name: req.file.originalname, model: CardMain }).create().then(data => {
                return res.json({ message: `${data} был создон` });
            });
        } catch (err) {
            res.send({ message: "Ошибка Сервера" });
        }
    }
    async DeleteCard(req, res, next) {
        try {
            const id = req.params.id
            await new Delete({ id, model: CardMain}).delete().then(data => {
                return res.json({ message: `${data} был удалён` });
            })

        } catch (err) {
            res.send({ message: "Ochirildi" });
        }
    }
    async ListCadr(req, res, next) {
        try {
            const card = await new List({model: CardMain}).list();
            if(card) {
                res.status(200).send(card)
            }
        } catch (error) {
            res.status(400).send(error.message)
        }
    }
    async UpdateCard(req, res, next) {
        try {
            const file = req.file
            const { title, text, link } = req.body;
            if (file) {
                const cardrId = await CardMain.findById(req.params.id);
                fs.unlinkSync(`./${cardrId.image_path}`)
                await CardMain.findOneAndUpdate({ _id: req.params.id }, {
                    link, title, text, image_path: req.file.path, image_name: req.file.originalname
                })
                res.json({ msg: "Updated a CardMain" })
            } else {
                await CardMain.findOneAndUpdate({ _id: req.params.id }, {
                    title, text, link
                })
                res.json({ msg: "Updated a CardMain" })
            }
        } catch (e) {
            console.log(e)
            return res.status(400).json({ message: 'Upload avatar error' })
        }
    }
}

module.exports = new Main()