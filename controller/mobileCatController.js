const MobileCategory = require("../model/Category/mobile/MobileCategory");
const Number = require("../model/Category/mobile/Number");
const Summ = require("../model/Category/mobile/Summ");


class Category {


    // MobileCat CRUD
    async mobileCat (req, res, next) {
        try{
            const { title } = req.body;
            const mobile = await new MobileCategory({ title });
            const newmobile = await mobile.save();
            if (newmobile) {
                return res.json({ message: `${newmobile.title} был создон` });
            } else {
                return res.json({ message: "Ошибка гдето!" });
            }
        }catch(e){
            res.send({ message: "Ошибка Сервера" });
        }
    }
    // Summ CRUD
    async paymetAdd(req, res, next) {
        try {
            const { name } = req.body;
            const summ = await new Summ({ name });
            const newsumm = await summ.save();
            if (newsumm) {
                return res.json({ message: `${newsumm.name} был создон` });
            } else {
                return res.json({ message: "Ошибка гдето!" });
            }
        } catch (e) {
            res.send({ message: "Ошибка Сервера" });
        }
    }
    // Phone CRUD
    async numberAdd(req, res, next) {
        try {
            const { name } = req.body;
            const number = await new Number({ name });
            const newnumber = await number.save();
            if (newnumber) {
                return res.json({ message: `${newnumber.name} был создон` });
            } else {
                return res.json({ message: "Ошибка гдето!" });
            }
        } catch (e) {
            res.send({ message: "Ошибка Сервера" });
        }
    }

}

module.exports = new Category()