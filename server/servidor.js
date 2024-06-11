const ex = require('express')
const mysqlDB = require('./db')
const cors = require('cors')

const servidor = ex()
servidor.use(cors())

servidor.get("/", (req, res) => {
    res.send({ "Ve a productos": "Nada que ver aquí" })
})

servidor.get("/ping", (req, res) => {
    res.send({ "pong": new Date() })
})

servidor.get("/productos", async (req, res) => {
    try {
        const [results, fields] = await mysqlDB.consulta("SELECT * FROM Products")
        res.send(results)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

servidor.get("/productos/:idProducto", async (req, res) => {
    try {
        const [results, fields] = await mysqlDB.consulta("SELECT * FROM Products where ProductID = ?", [req.params.idProducto])
        res.send(results)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

servidor.listen(7777, () => {
    console.log("Servidor iniciado")
})