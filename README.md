# 🔮 AstroPrevisões - Envio Diário de Horóscopo por Email

Este é um sistema em Node.js que realiza web scraping do site [joaobidu.com.br](https://joaobidu.com.br/) para extrair a previsão diária do signo de Câncer e envia automaticamente essa previsão por email.

## 🚀 Funcionalidades

- Scraping da previsão do dia do signo de Câncer.
- Envio automático da previsão para um email configurado.
- Servidor HTTP com rota para envio manual.
- Pode ser agendado para execução automática com cron.

## 🛠️ Tecnologias utilizadas

- Node.js
- Express
- Axios
- Cheerio
- Nodemailer
- Dotenv

## 📁 Estrutura do Projeto

```
AstroPrevisoes/
│
├── .env              # Arquivo com variáveis de ambiente
├── index.js          # Código principal do servidor
├── package.json      # Dependências do projeto
└── README.md         # Documentação
```

## ⚙️ Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seuusuario/astroprevisoes.git
   cd astroprevisoes
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie o arquivo `.env` com as seguintes variáveis:

   ```env
   EMAIL_USER=seuemail@gmail.com
   EMAIL_PASS=sua_senha_de_app
   EMAIL_TO=destinatario@gmail.com
   ```

   > ⚠️ Dica: use [senhas de app do Gmail](https://support.google.com/accounts/answer/185833?hl=pt-BR) para permitir o envio de emails com segurança.

4. Inicie o servidor:
   ```bash
   node index.js
   ```

5. Acesse no navegador:
   ```
   http://localhost:3000/send-horoscope
   ```

## ⏰ Agendamento (opcional)

Para enviar automaticamente todo dia, use o pacote `node-cron`:

```bash
npm install node-cron
```

E adicione isso no seu código:

```js
const cron = require('node-cron');
cron.schedule('0 8 * * *', async () => {
    const horoscopo = await getHoroscope();
    await sendEmail(horoscopo);
});
```

## ✅ Exemplo de saída no terminal

```
Servidor rodando em http://localhost:3000
✅ Email enviado com sucesso!
```

## 📌 Observações

- Este projeto é apenas para fins educacionais.
- A estrutura de scraping pode mudar se o site do João Bidu alterar seu layout.
- Não envie spam! Use com responsabilidade.

## 👩‍💻 Autor

Juliana Kássia Rodrigues Reis  
Desenvolvedora em formação