const ContactModel = require('../model/Contact/Contact');
const fs = require('fs')
class Contact {
    async contactAdd(req, res, next) {
        try {
            const { contactPhone, contactAdress, cotnactTime, cotnactMap, slug } = req.body;
            const contact = await new ContactModel({ contactPhone, contactAdress, cotnactTime, cotnactMap, slug, image_path: req.file.path, image_name: req.file.originalname });
            const newContact = await contact.save();
            if (newContact) {
                return res.json({ message: `${newContact} был создон` });
            } else {
                return res.json({ message: "Ошибка гдето!" });
            }
        } catch (err) {
            res.send({ message: "Ошибка Сервера" });
        }
    }
    async contactDelete(req, res, next) {
        try {
            const id = req.params.id
            await ContactModel.findByIdAndDelete({ _id: id }, function (err, data) {
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
    async contactList(req, res, next) {
        try {
            const contact = await ContactModel.find();
            res.status(200).send(contact)
        } catch (error) {
            res.status(400).send(error.message)
        }
    }
    async contactUpdate(req, res, next) {
        try {
            const file = req.file
            const { contactPhone, contactAdress, cotnactTime, cotnactMap, slug} = req.body;
            if (file) {
                const contactId = await ContactModel.findById(req.params.id);
                fs.unlinkSync(`./${contactId.image_path}`)
                await ContactModel.findOneAndUpdate({ _id: req.params.id }, {
                    contactPhone, contactAdress, cotnactTime, cotnactMap, slug, image_path: req.file.path, image_name: req.file.originalname
                })
                res.json({ msg: "Updated a Slider" })
            } else {
                await ContactModel.findOneAndUpdate({ _id: req.params.id }, {
                    contactPhone, contactAdress, cotnactTime, cotnactMap, slug
                })
                res.json({ msg: "Updated a Slider" })
            }
        } catch (e) {
            console.log(e)
            return res.status(400).json({ message: 'Upload avatar error' })
        }
    }
}

module.exports = new Contact();