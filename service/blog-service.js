const Card = require("../model/Blog/Card");
const Title = require("../model/Blog/Title");


class BlogService {
    async CreateTitle(name) {
        const menuTitle = await Title.findOne({ name });
        if (menuTitle) {
            return res.status(400).json({ message: `${name} уже существует` });
        }
        const title = await new Title({ name });
        const newtitle = await title.save();
        return newtitle
    }

    async DeleteTitle(id) {
        const title = await Title.findByIdAndDelete({ _id: id })
        return title
    }
    async UpdateTitle(id, body) {
        const title = Title.findByIdAndUpdate(
            id,
            body
        )
        return title
    }


    // ========== Blog Card ===========
    async CreateCard(title, text, slug, req) {
        const card = await new Card({ title, text, slug, image_path: req.file.path, image_name: req.file.originalname });
        const newCard = await card.save();
        return newCard
    }
}


module.exports = new BlogService();