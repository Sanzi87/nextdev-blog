import nodemailer from 'nodemailer'

const [host, port, user, pass] = [process.env.NODEMAILER_HOST, process.env.NODEMAILER_PORT, process.env.NODEMAILER_USR, process.env.NODEMAILER_PASS]

export const transporter = nodemailer.createTransport({
    service: 'Gmail',
            host,
            port,
            secure: true,
            auth: {
                user,
                pass
            }
} as nodemailer.TransportOptions)
