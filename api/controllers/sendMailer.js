import mailer from '../controllers/nodemailerConfig.js'
import Token from '../models/Token.js';
import crypto from "crypto"


export const verifyAccount = function (userId,userEmail){
    const token = new Token({user: userId, token: crypto.randomBytes(16).toString('hex')});
    token.save()

    const emailOptions = {
            from: '3techpfinal@gmail.com',
            to: userEmail,
            subject: "3TECH - Verificación de correo electrónico",
            html: `Verifique su cuenta accediendo a <a href="${process.env.BASE_URL}/verified/tokenConfirmed/${token.token}">este</a> enlace.`
        };


    mailer.sendMail(emailOptions, (err)=>{
            if(err){return console.log(err.message)};
    
    console.log("A verification email has been sent to ", userEmail)
    
    })
};


export const resetPassword = function (userId,userEmail){
    const token = new Token({user: userId, token: crypto.randomBytes(16).toString('hex')});
    token.save()

    const emailOptions = {
            from: '3techpfinal@gmail.com',
            to: userEmail,
            subject: "3TECH - Recuperar contraseña",
            html: `Para recuperar su contraseña ingrese a <a href="${process.env.BASE_URL}/resetPassword/${userId}/${token.token}">este</a> enlace.`
        };


    mailer.sendMail(emailOptions, (err)=>{
            if(err){return console.log(err.message)};
    
    console.log("A password recovery email has been sent to ", userEmail)
    
    })
};




export const orderReceipt = function (order,user){

    const emailOptions = {
            from: `${process.env.MAIL_USER}`,
            to: user.email,
            subject: "3TECH - Confirmación orden pagada, que la disfrutes!",
            html: `<h1>Hola ${user.name} ${user.lastName}!</h1> <br />
            <h3>La orden Nº ${order._id} ha sido correctamente pagada y en los próximos días estará en camino.</h3>
            <p>Te enviaremos un email una vez que la misma haya sido despachada, con los detalles del envío.</p>
            
            <h3>Detalle de tu compra</h3>
            <h4>Nº de Orden: ${order._id}</h4>
            Para ver el resumen de tu orden ingresa a <a href="${process.env.BASE_URL}/orderpayment/${order._id}">este</a> enlace.
            `
        };


    mailer.sendMail(emailOptions, (err)=>{
            if(err){return console.log(err.message)};
    
    console.log("An order confirmation email has been sent to ", user.email)
    
    })
};