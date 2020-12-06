const { bookRepository } = require("../database");

class bookController {
    async list(req, res, next) {
        try {
            let { searchText ,page,pageSize,sortKey,sortOrder} = req.query;
            const condition = {};
            console.log("Book Controller list");
            const regex = new RegExp(searchText,"gi");
            if(searchText){
                condition["$or"]=[{author: regex}, {title: regex}]
            }
            console.log("condition------------",condition);
            sortKey=sortKey||'title';
            sortOrder=sortOrder||'asc'
            let sort={};
            if(sortOrder==='asc'){
                sort[sortKey]=1
            }else{
                sort[sortKey]=-1 
            }
            const data = await bookRepository.getAll(condition,sort,page,pageSize);
            const total=await bookRepository.getCount();
            
            return res.json({data,total})
        } catch (error) {
            console.log("Book Fetch failed with error...", error);
            return res.status(500).json({message:"Operation Failed!" });
        }

    }

    async post(req, res, next) {
        try {
            console.log(req.body,req.files.logo)
            const {title, author, price, description } = req.body;
            let filePath='';
            if(req.files){
                const logo=req.files.logo;
                filePath='./public/uploads/'+logo.name;
                console.log("Book Controller post");
                try{
                    await logo.mv(filePath);
                }catch(err){
                    console.error(err);
                }
            }
            const result = await bookRepository.create({
                title,
                author,
                price,
                description,
                logo:filePath,
            });
            return res.json({data: result})
        } catch (error) {
            console.log("Book post failed with error...", error);
            return res.status(500).json({message:"Operation Failed!" });
        }

    }

    async get(req, res, next) {
        try {
            const { id } = req.params;
            console.log("Book get by id");
            const result = await bookRepository.getById(id);
            return res.json({data: result})
        } catch (error) {
            console.log("Book get by id failed with error...", error);
            return res.status(500).json({message:"Operation Failed!" });
        }

    }
}

module.exports = new bookController();
