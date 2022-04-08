const fs = require('fs')

class Create {
    constructor(settigns) {
        this.settigs = settigns;
        this.title = settigns.title;
        this.text = settigns.text;
        this.slug = settigns.slug;
        this.link = settigns.link;
        this.image_path = settigns.image_path;
        this.image_name = settigns.image_name;
        this.model = settigns.model;
        this.create = async () => {
            return await new this.model({ slug: this.slug, title: this.title, text: this.text, image_path: this.image_path, image_name: this.image_name }).save();
        }

    }
}
class Delete {
    constructor(settigns) {
        this.settigs = settigns;
        this.id = settigns.id;
        this.model = settigns.model;
        this.delete = async () => {
            return await this.model.findByIdAndDelete({ _id: this.id }, function (err, data) {
                try {
                    fs.unlinkSync(`./${data.image_path}`)
                } catch (e) {
                    return e
                }
            })
        }
    }
}
class Update {
    constructor(settigns) {
        this.settigs = settigns;
        this.model = settigns.model;
        this.text = settigns.text;
        this.title = settigns.title;
        this.file = settigns.file;
        this.id = settigns.id;
        console.log(this.model);
        this.slider = this.model.findById(this.id).obj
        this.update = async () => {
            if(this.file) {
                // fs.unlinkSync(`./${this.updated().then(data => {
                //     data.image_path
                // })}`)
                return await this.model.findOneAndUpdate({_id: this.id}, {
                    title: this.title, text: this.text, image_path: this.file.path, image_name: this.file.originalname
                })
            }
            else{
               return await this.model.findOneAndUpdate({_id: this.id}, {
                    title: this.title, text: this.text
                })
            }
        }

     
    }
  
}
class List {
    constructor(settigns) {
        this.settigs = settigns;
        this.model = settigns.model;
        this.list = async () => {
            return await  this.model.find()
        }
    }

}

module.exports = { Create, Delete, Update, List }
