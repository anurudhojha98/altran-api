const bookModel = require("./model")

class BookRepository{
    constructor(){
        this.model = bookModel;
    }

    async addMultiple(query, options = {}){
        console.log("BookRepository:::::addMultiple");
        return this.model.insertMany(query, options)
    }

    async create(query){
        console.log("BookRepository:::::create");
        return this.model.create(query);
    }

    async getAll(query,sortObj,page,pageSize){
        console.log("BookRepository:::::getAll");
        return this.model.find(query).sort(sortObj)
       .skip(pageSize * page)
       .limit(parseInt(pageSize));
    }

    async getById(id){
        console.log("BookRepository:::::getAll");
        return this.model.findById(id);
    }

    async getCount(){
        return this.model.countDocuments({});
    }

    async update(query){
        const { id, ...rest} = query;
        console.log("BookRepository:::::getAll",id);
        return this.model.updateOne({_id:id}, {$set: rest});
    }

    async delete(query){
        const { id } = query;
        console.log("BookRepository:::::getAll",id);
        return this.model.deleteOne({_id:id});
    }
}

module.exports = new BookRepository();
