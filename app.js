require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

// Função para obter horóscopo
async function getHoroscope() {
    try {
        const { data } = await axios.get('https://joaobidu.com.br/horoscopo-do-dia/horoscopo-do-dia-para-cancer/');
        const $ = cheerio.load(data);

        const paragrafos = $('div.col-12.my-4.content-text p')
            .map((i, el) => $(el).text().trim())
            .get();

        const previsao = paragrafos.join('\n\n');

        return {
            signo: 'Câncer',
            previsao: previsao || 'Previsão não encontrada.'
        };

    } catch (error) {
        console.error('❌ Erro ao fazer scraping:', error);
        return { previsao: 'Erro ao acessar o site.' };
    }
}

// ✅ Função para enviar email
async function sendEmail(horoscopo) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const message = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_TO,
        subject: `🔮 Horóscopo Diário - ${horoscopo.signo}`,
        text: `Bom dia!\n\nA previsão de hoje para o signo de ${horoscopo.signo} é:\n\n${horoscopo.previsao}\n\nTenha um dia iluminado! ✨`
    };

    try {
        await transporter.sendMail(message);
        console.log('✅ Email enviado com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao enviar email:', error);
    }
}

// Rota de envio
app.get('/send-horoscope', async (req, res) => {
    const horoscopo = await getHoroscope();

    if (horoscopo) {
        await sendEmail(horoscopo);
        res.json({ status: 'Email enviado com sucesso!', horoscopo });
    } else {
        res.status(500).json({ status: 'Erro ao obter previsão do horóscopo' });
    }
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
