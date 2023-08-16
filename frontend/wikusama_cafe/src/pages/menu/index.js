import React from 'react'
import MenuItem from './menuItem'
import { useState, useEffect } from 'react'
import { Modal } from 'bootstrap' // modal : tampilan pop up 

/** axios: lib for conect to another server */
import axios from "axios"
const baseURL = "http://localhost:8000"
const header = { 
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
}

export default function Menu() {
  /** define state(variabel) for store menu */
  const [menus, setMenus] = useState([])

  /** define state to store prop of menu */
  const [id_menu, setIDMenu] = useState(0) // 0 -> idMenu bertipe number
  const [nama_menu, setNamaMenu] = useState("") // "" -> nama_menu bertipe string
  const [jenis, setJenis] = useState("") // "" -> jenis bertipe string
  const [deskripsi, setDeskripsi] = useState("") // "" -> deskripsi bertipe string
  const [harga, setHarga] = useState(0) // 0 -> harga bertipe number
  const [gambar, setGambar] = useState(undefined)

  /** define state to store modal */
  const [modal, setModal] = useState(undefined)

  /** define state to store status of edit */
  const [isEdit, setIsEdit] = useState(true) // true -> boolean

  const [keyword, setKeyword] = useState("")

  // variabel, function (proses pegisian data)
  async function getMenu() {
    try {
      let url = `${baseURL}/menu`
      let { data } = await axios.get(url, header)
      setMenus(data.data)

    } catch (error) {
      console.log(error);
    }
  }

  async function searching(e) {
    try {
      /** jika menekan tombol enter(13) */
      if (e.keyCode == 13) {
        let url = `${baseURL}/menu/find`
        let dataSearch ={
          keyword: keyword
        }
        let { data } = await axios.post(url, dataSearch, header)
        setMenus(data.data)

      }
    } catch (error) {
      console.log(error);
    }
  }

  async function addMenu() {
    /** show modal */
    modal.show()
    /** reset state of menu */
    setIDMenu(0)
    setNamaMenu("")
    setDeskripsi("")
    setHarga(0)
    setJenis("")
    setGambar(undefined)
    setIsEdit(false)
  }

  async function edit(menu) {
    /** open modal */
    modal.show()
    setIsEdit(true)
    setIDMenu(menu.id_menu)
    setNamaMenu(menu.nama_menu)
    setDeskripsi(menu.deskripsi)
    setHarga(menu.harga)
    setJenis(menu.jenis)
    setGambar(undefined)
  }

  async function saveMenu(e) {
    try {
      e.preventDefault()
      /** close the modal */
      modal.hide()
      if (isEdit) {
        /** ini untuk edit */
        let form = new FormData() // karena ada gambar yang mau diupload
        // key,     value
        form.append("nama_menu", nama_menu)
        form.append("deskripsi", deskripsi)
        form.append("harga", harga)
        form.append("jenis", jenis)

        if (gambar != undefined) {
          form.append("gambar", gambar)
        }

        /** send to backend */
        let url = `${baseURL}/menu/${id_menu}`
        let result = await axios.put(
          url, form, header
        )
        if (result.data.status == true) {
          /** refresh data menu */
          getMenu()
        }
        window.alert(result.data.message)
      } else {
        /** ini untuk tambah */
        let form = new FormData() // karena ada gambar yang mau diupload
        // key,     value
        form.append("nama_menu", nama_menu)
        form.append("deskripsi", deskripsi)
        form.append("harga", harga)
        form.append("jenis", jenis)
        form.append("gambar", gambar)

        /** send to backend */
        let url = `${baseURL}/menu`
        let result = await axios.post(
          url, form, header
        )
        if (result.data.status == true) {
          /** refresh data menu */
          getMenu()
        }
        window.alert(result.data.message)
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function drop(menu) {
    try {
      if (window.confirm(`Apakah Anda yakin menghapus ${menu.nama_menu}?`)) {
        let url = `${baseURL}/menu/${menu.id_menu}`
        axios.delete(url, header)
          .then(result => {
            if (result.data.status == true) {
              window.alert(result.data.message)
            }
            /** refresh data */
            getMenu()
          })
          .catch(error => {
            console.log(error);
          })
      }
    } catch (error) {
      console.log(error);
    }
  }

  /** useEffect menjalankan aksi saat komponen ini dimuat */
  useEffect(() => {
    /** initializing modal */
    setModal(new Modal(`#modalMenu`))
    getMenu()
  }, [])

  return (
    <div className='container-fluid'  >
      <h2 className="text-center" style={{background:"#FC2947", color:"#ffff"}}>
        {/* <i className='bi bi-justify'></i> */}
        Daftar Menu
        </h2>
      <hr />
      <button className='btn'
      style={{background: "#FFDEB9", color: "#FC2947"}}
        onClick={() => addMenu()}>
        Tambah Menu
      </button>
      <input type="text"
        className='form-control my-2'
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        onKeyUp={e => searching(e)}
      />
      <div className='row'>
        {menus.map(menu => (
          <div key={`menu${menu.id_menu}`}
            className="col-md-6 col-lg-4">
            <MenuItem
              img={`${baseURL}/menu_image/${menu.gambar}`}
              nama_menu={menu.nama_menu}
              deskripsi={menu.deskripsi}
              harga={menu.harga}
              jenis={menu.jenis}
              onEdit={() => edit(menu)}
              onDelete={() => drop(menu)} />
          </div>
        ))}
      </div>

      {/* create div of modal */}
      <div className='modal fade' id='modalMenu'>
        <div className='modal-dialog modal-md'>
          <div className='modal-content'>
            <form onSubmit={e => saveMenu(e)}>
              <div className='modal-header'
                style={{ background: `#FFDEB9` }}>
                <h4 style={{color: '#FC2947'}}>Form Menu</h4>
              </div>

              <div className='modal-body'>
                <small>Nama Menu</small>
                <input
                  required={true}
                  type='text'
                  className='form-control mb-2'
                  value={nama_menu}
                  onChange={e => setNamaMenu(e.target.value)}
                />

                <small>Deskripsi</small>
                <input
                  required={true}
                  type='text'
                  className='form-control mb-2'
                  value={deskripsi}
                  onChange={e => setDeskripsi(e.target.value)}
                />

                <small>Harga</small>
                <input
                  required={true}
                  type='number'
                  className='form-control mb-2'
                  value={harga}
                  onChange={e => setHarga(e.target.value)}
                />

                <small>Gambar</small>
                <input type='file'
                  accept='image/*'
                  className='form-control mb-2'
                  onChange={e => setGambar(e.target.files[0])}
                />

                <small>Jenis Menu</small>
                <select
                  required={true}
                  className='form-control mb-2'
                  value={jenis}
                  onChange={e => setJenis(e.target.value)}>
                  <option value="">--Pilih Jenis Makanan</option>
                  <option value="makanan">Makanan</option>
                  <option value="minuman">Minuman</option>
                </select>
              </div>
              <div className='modal-footer'>
                <button type='submit'
                  className='w-100 btn'
                  style={{backgroundColor: '#FFD93D'}}>
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
