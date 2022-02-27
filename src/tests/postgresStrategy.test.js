const assert = require('assert')
const Postgres = require('./../db/strategies/postgres')
const Context = require('./../db/strategies/base/contextStrategy')


const context = new Context(new Postgres())

const MOCK_HERoi_CADASTRAR = {
    nome: 'Gavião Arqueiro',
    poder: 'flechas'
}


describe('Postgres Strategy', function () {
    this.timeout(Infinity)
    this.beforeAll(async function () {
        await context.connect()
    })
    it('PostgresSQL Connection', async () => {
        const result = await context.isConnected()

        assert.equal(result, true)
    })

    it('Cadastrar', async () => {
        const result = await context.create(MOCK_HERoi_CADASTRAR)
        delete result.id
        assert.deepEqual(result, MOCK_HERoi_CADASTRAR)
    })

    it('listar', async () => {
        const [result] = await context.read({ nome: MOCK_HERoi_CADASTRAR.nome })
        delete result.id
        assert.deepEqual(result, MOCK_HERoi_CADASTRAR)
    })
})