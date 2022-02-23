const ContextStrategy = require("./db/strategies/base/contextStrategy")
const MongoDB = require("./db/strategies/mongodb")
const Postgres = require("./db/strategies/postgres")

const contextMongo = new ContextStrategy(new MongoDB())
const contextPostgres = new ContextStrategy(new Postgres())

contextMongo.create()
contextPostgres.create()