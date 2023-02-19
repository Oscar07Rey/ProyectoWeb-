const router = require('express').Router()
const conexion = require('./config/conexion')


//rutas

//get nombres
router.get('/',(req, res)=>{
    let sql = 'select * from persona'
    conexion.query(sql,(err, rows, fields)=>{

        if(err) throw err;
        else{
            res.json(rows)
            }
        })
    })

//get una persona

router.get('/:id',(req, res)=>{
    const{id} = req.params
    let sql = 'select * from persona where id = ?'
    conexion.query(sql,[id],(err, rows, fields)=>{

        if(err) throw err;
        else{
            res.json(rows)
            }
        })
    })

//agregar una persona
router.post('/',(req, res)=>{
    const{nombre, apellido, idTipoDoc, documento, idCiudad, fechaNacimiento, email, telefono, usuario, contrasena} = req.body

    let sql = `insert into persona(nombre, apellido, idTipoDoc, documento, idCiudad, fechaNacimiento, email, telefono, usuario, contrasena) values('${nombre}','${apellido}','${idTipoDoc}','${documento}','${idCiudad}','${fechaNacimiento}','${email}','${telefono}','${usuario}','${contrasena}')`
    conexion.query(sql, (err, rows, fields)=>{
        if(err) throw err
        else{
            res.json({status:  'persona agregada'})
        }
    })
})

//eliminar

router.delete('/:id',(req, res)=>{
    const{id}=req.params
    let sql = `delete from persona where id = '${id}'`
    conexion.query(sql, (err, rows, fields)=>{
        if(err) throw err
        else{
            res.json({status:  'persona eliminada'})
        }
    })
    
});

//modificar

router.put('/:id',(req, res)=>{
    const{id}=req.params
    const{nombre, apellido, idTipoDoc, documento, idCiudad, fechaNacimiento, email, telefono, usuario, contrasena} = req.body

    let sql = `update persona set
                nombre = '${nombre}',
                apellido = '${apellido}',
                idTipoDoc = '${idTipoDoc}',
                documento = '${documento}',
                idCiudad = '${idCiudad}',
                fechaNacimiento = '${fechaNacimiento}',
                email = '${email}',
                telefono = '${telefono}',
                usuario = '${usuario}',
                contrasena = '${contrasena}'
                where id = '${id}'`
    
                conexion.query(sql, (err, rows, fields)=>{
                    if(err) throw err
                    else{
                        res.json({status:  'persona modificada'})
                    }
                })

})

module.exports= router;

