const ICrud = require("./interfaces/interfaceCrud")

const Sequelize = require('sequelize')


class Postgres extends ICrud {
    constructor() {
        super()
        this._driver = null
        this._herois = null
        //this._connect()
    }

    async defineModel() {
        this._herois = this._driver.define('herois', {
            id: {
                type: Sequelize.INTEGER,
                required: true,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: Sequelize.STRING,
                required: true,
            },
            poder: {
                type: Sequelize.STRING,
                required: true,
            },
        }, {
            tableName: 'TB_HEROIS',
            freezeTableName: false,
            timestamps: false
        })

        await this._herois.sync()
    }

    async isConnected() {
        try{
            await this._driver.authenticate()
            return true
        }catch(error){
            console.log('fail', error)
            return false
        }
    }

    async connect() {
        this._driver = new Sequelize(
            'heroes',
            'norton',
            'root',
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
                operatorsAliases: 0
            }
        )

        await this.defineModel()
    }

    async create(item) {
        const {dataValues} = await this._herois.create(item, {raw: true})
        return dataValues
    }

    async read(item = {}){
        const result = this._herois.findAll({where: item, raw: true})
        return result
    }
}

module.exports = Postgres