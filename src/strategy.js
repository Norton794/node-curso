class NotImplementedException extends Error{
    constructor(){
        super("Not Implemented Exception")
    }
}

class ICrud {

    create(item){
        throw new NotImplementedException()
    }

    read(query){
        throw new NotImplementedException()
    }

    update(id, item){
        throw new NotImplementedException()
    }

    delete(id){
        throw new NotImplementedException()
    }
}


class MongoDB extends ICrud{
    constructor(){
        super()
    }

    create(item){
        console.log("Mongo")
    }
}

class Postgres extends ICrud{
    constructor(){
        super()
    }

    create(item){
        console.log("Postgres")
    }
}


class ContextStrategy {
    constructor(strategy){
        this._database = strategy
    }

    create(item){
        return this._database.create(item)
    }

    read(item){
        return this._database.read(item)
    }

    update(id, item){
        return this._database.update(id, item)
    }

    delete(id){
        return this._database.delete(id)
    }
}

const contextMongo = new ContextStrategy(new MongoDB())
const contextPostgres = new ContextStrategy(new Postgres())

contextMongo.create()
contextPostgres.create()