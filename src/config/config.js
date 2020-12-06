const mongoUserName='anurudhojha98';
const mongoPassword='anurudh@123';
const dbName='library' 
const uri= `mongodb+srv://${mongoUserName}:${mongoPassword}@cluster0.ly9oc.mongodb.net/${dbName}?retryWrites=true&w=majority`;
module.exports=uri;