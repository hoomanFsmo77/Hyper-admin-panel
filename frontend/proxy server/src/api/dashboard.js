const fetch=require('node-fetch');
const express=require('express');
const router=express.Router();


router.get('/server',(req,res)=>{
    const token=req.headers.token
    fetch(process.env.API_BASE+'resource-usage',{
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`
        }
    }).then(response=>response.json()).then(response=>{
        if(response.detail){
            res.status(200).send(JSON.stringify(false)).end()
        }else{
            const uploadSpeed=response[1]['Upload Speed']
            const downloadSpeed=response[1]['Download Speed']
            const download=response[1]['Download']
            const upload=response[1]['Upload']
            res.status(200).send(JSON.stringify({
                cpu:response[0].cpu,
                ram:response[0].mem,
                disk:response[0].hdd,
                bandWidth:{
                    download:Number(download.slice(0,download.length-2)) ,
                    upload: Number(upload.slice(0,upload.length-2)) ,
                    downloadSpeed:Number(downloadSpeed.slice(0,downloadSpeed.length-2)),
                    uploadSpeed:Number(uploadSpeed.slice(0,uploadSpeed.length-2)),
                    speedUnit:downloadSpeed.slice(downloadSpeed.length-2),
                }
            })).end()
        }
    }).catch(err=>{
        console.log(err)
        res.status(400).send('error in connecting to api').end()
    })


})
router.get('/users-status',(req,res)=>{
    const token=req.headers.token

    fetch(process.env.API_BASE+'status-clients',{
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`
        }
    }).then(response=>response.json()).then(response=>{
        res.status(200).send(JSON.stringify([
            {
                title:'All Users', number:response.all_users,theme:'indigo'
            },{
                title:'Active Users', number:response.active_users, theme:'green'
            },{
                title:'Online Users', number:response.active_users, theme:'blue'
            },{
                title:'Blocked Users', number:response.disabled_users,theme:'red'
            },
        ]) ).end()
    }).catch(err=>{
        res.status(400).send('error in connecting to api').end()
    })
})


module.exports=router