import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'

let transporter: Mail | null

const initializeWithTestAccount = async () => {
  let testAccount = await nodemailer.createTestAccount()

  transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  })
}
initializeWithTestAccount()

const send = async (text: string): Promise<boolean> => {
  try {
    let info = await transporter!.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: "bar@example.com, baz@example.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text, // plain text body
    })

    console.log("Message sent: %s", info.messageId)
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}

export default {
  send
}