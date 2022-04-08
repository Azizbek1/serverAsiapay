const VakanceModel = require('../model/Vakansi/Vakance.js');


class Vakance {
    async addVakancee(title, text, title_top, slug) {
        const vakan = await new VakanceModel({ title, text, title_top, slug });
        const newvakan = await vakan.save();
        return newvakan
    }

    async vakanceDelete(id) {
        const vakance = await VakanceModel.findByIdAndDelete({ _id: id })
        return vakance
    }
    async vakanceUpdate(id, body) {
        const vakance = VakanceModel.findByIdAndUpdate(
            id,
            body
        )
        return vakance
    }
}


module.exports = new Vakance();