const assert = require('assert')
const Postgres = require('./../db/strategies/postgres')
const Context = require('./../db/strategies/base/contextStrategy')


const context = new Context(new Postgres())

const MOCK_HERoi_CADASTRAR = {
    nome: 'Gavião Arqueiro',
    poder: 'flechas'
}


const MOCK_HERoi_ATUALIZAR = {
    nome: 'Batman',
    poder: 'Preparo'
}


describe('Postgres Strategy', function () {
    this.timeout(Infinity)
    this.beforeAll(async function () {
        await context.connect()
        await context.delete()
        await context.create(MOCK_HERoi_ATUALIZAR)
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

    it('atualizar', async ()=>{
        const [itemAtualizar] = await context.read({ nome: MOCK_HERoi_ATUALIZAR.nome })
        const novoItem = {
            ...MOCK_HERoi_ATUALIZAR,
            nome: 'Justiceiro'
        }

        const [result] = await context.update(itemAtualizar.id, novoItem)
        const [itemAtualizado] = await context.read({ id: novoItem.id })
        assert.deepEqual(result, 1)
        assert.deepEqual(itemAtualizado.nome, novoItem.nome)
    })

    it('remover por id', async ()=>{
        const [item] = await context.read({})
        const result = await context.delete(item.id)
        assert.deepEqual(result, 1)
    })
})