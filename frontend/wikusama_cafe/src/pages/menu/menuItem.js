import React from 'react'

export default function MenuItem(props) {
    return (
        <div className='w-100 m-2 border rounded-2' style={{background:"#FDF4F5"}} >
            <img src={props.img} alt="img-menu"
                className='w-100 img-fluid rounded-2'
                style={{ height: `250px` }} />

            <div className='w-100 mt-2 p-2'>
                <h4 className='mb-1' style={{color: '#FC2947', fontFamily:"patua-one"}}>
                    <b>{props.nama_menu}</b>
                </h4>
                <h6 className='fw-normal mb-1'>
                    {props.jenis}
                </h6>
                <p>
                    {props.deskripsi}
                </p>
                <h5 style={{color: '#FFB84C'}}>
                    Rp {props.harga}
                </h5>
            </div>
            <div className='w-100 p-2'>
                <button
                    className='btn'
                    style={{backgroundColor: '#FFD93D'}}
                    onClick={() => props.onEdit()}
                >
                    Edit
                </button>
                <button
                    className='btn btn-danger mx-1'
                    onClick={() => props.onDelete()}>
                    Hapus
                </button>
            </div>
        </div>
    )
}
