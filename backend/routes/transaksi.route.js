/** load express library */
const express = require(`express`)
const app = express()

/** load controller of transaksi */
const transaksiController = require(`../controllers/transaksi.controller`)

/** call authorization method */
const { authorization } = require(`../controllers/auth.controller`)

/** allow to read json o body request */
app.use(express.json())

/** create route to get all transaksi */
app.get(`/transaksi`, authorization(["kasir", "manajer"]), transaksiController.getTransaksi)

/** create route to add transaksi */
app.post(`/transaksi`, authorization(["kasir"]), transaksiController.addTransaksi)

/** create route to add transaksi */
app.post(`/transaksi/find`, authorization(["kasir","manajer"]), transaksiController.findTransaksi)

/** create route to edit transaksi */
app.put(`/transaksi/:id_transaksi`, authorization(["kasir"]), transaksiController.updateTransaksi)

/** create route to find transaksi */
// app.get(`/transaksi/find`, authorization(["kasir"]), transaksiController.)

/** create route to delete transaksi */
app.delete(`/transaksi/:id_transaksi`, authorization(["kasir"]), transaksiController.deleteTransaksi)

/** export app */
module.exports = app