const sql = {
    insert(CollectionName,insertData){
        return new Promise((resolve,reject) => {
            CollectionName.insertMany(insertData,(err) =>{
                if(err) throw err;
                resolve() 
            })
        })
    },
    delete (CollectionName,deleteData,deleteType) {
        deleteType = deleteType || "deleteOne"
        return new Promise((resolve,reject) =>{
            CollectionName[deleteType](deleteData,(err) =>{
                if(err) throw err;
                resolve()
            })
        })
    },
    update(CollectionName,whereObj,updateObj,updateType){
        updateType = updateType || 'updateOne'
        return new Promise((resolve,reject) =>{
            CollectionName[updateType](whereObj,updateObj,(err) => {
                if(err) throw err;
                resolve()
            })
        })
    },
    find(CollectionName,whereObj,showObj){
        return new Promise((resolve,reject) =>{
            CollectionName.find(whereObj,showObj).exec((err,data)=>{
                if(err) throw err;
                resolve(data)
            })
        })
    },
    paging(CollectionName,whereObj, showObj, limitNum, pageCode) {
        return new Promise((resolve,reject) => {
            CollectionName.find(whereObj, showObj).limit(limitNum).skip(limitNum * pageCode).exec((err, data) => {
                if(err) throw err;
                resolve(data)
            })
        })
    },
    distinct(CollectionName, name) {
        return new Promise((resolve,reject) => {
            CollectionName.distinct(name).exec((err,data) => {
                if (err) throw err;
                resolve(data)
            })
        })
    }

}
module.exports = sql