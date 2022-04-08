const VakanceModel = require('../model/Vakansi/Vakance');
const VakanceService = require('../service/vakamci-sevice')
class Vakance {

    
    // Vakance 
    async vakanceAdd(req, res, next) {
        try {
            const { title, text, title_top, slug } = req.body;
            const vakance = await VakanceService.addVakancee(title, text, title_top, slug)
            res.json({ message: `${vakance.title} был создон` });

        } catch (e) {
            res.send({ message: "Ошибка Сервера" });
        }
    }
    async vakanceDelete(req, res, next) {
        try {
            const id = req.params.id;
            const vakance = await VakanceService.vakanceDelete(id)
            if (vakance) {
                return res.json({ message: `${vakance.title} был удалён` });
            }
            else {
                return res.json({ message: "Ошибка гдето!" });
            }
        } catch (e) {
            res.send({ message: "Ошибка Сервера" });
        }
    }
    async vakanceUpdate(req, res, next) {
        const { id } = req.params
        const vakance = VakanceModel.findByIdAndUpdate(
            id,
            req.body
        )
        vakance.then(data => {
            if (!data)
                next({ message: `Bunaqa ID yo'q Tekshirib koring`, code: 404 })
            res.json({ msg: `${data.title} o'zgardi`});
        }).catch(err => {
            console.log(err);
        })
    }
    async vakanceList(req, res, next) {
        try {
            const card = await VakanceModel.find();
            res.status(200).send(card)
        } catch (error) {
            res.status(400).send(error.message)
        }
    }
}

module.exports = new Vakance()