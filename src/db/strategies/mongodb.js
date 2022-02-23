const ICrud = require("./interfaces/interfaceCrud")
class MongoDB extends ICrud{
    constructor(){
        super()
    }

    create(item){
        console.log("Mongo")
    }
}

module.exports = MongoDB