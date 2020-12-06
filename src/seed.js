const {bookRepository} = require("../src/database");
const bookData = require("./data");

async function seedInitials(){
    try {
        const booksInDB = await bookRepository.getAll();
        if(!booksInDB.length){
            await bookRepository.addMultiple(bookData);
        }
        return;
    } catch (error) {
        return console("Seeding failed with error....",error);
    }

}

module.exports = seedInitials;