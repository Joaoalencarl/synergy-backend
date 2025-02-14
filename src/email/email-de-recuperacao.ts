const emailDeRecuperacaoHtml = (confirmationLink: string) => ` 

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .email-container {
            max-width: 600px;
            margin: 30px auto;
            background: #ffffff;
            border: 1px solid #dddddd;
            border-radius: 8px;
            overflow: hidden;
        }
        .email-header {
            background: #f5f2ff !important;
            text-align: center;
            padding: 20px;
            color: #ffffff;
        }
        .email-header img {
            max-width: 180px;
        }
        .email-body {
            padding: 20px;
        }
        .email-body h2 {
            color: #262E5F;
            margin-bottom: 20px;
        }
        .email-body p {
            margin: 15px 0;
            line-height: 1.6;
            color: #333;
        }
        .email-body ul {
            margin: 10px 0;
            padding-left: 20px;
            color: #333;
        }
        .email-body ul li {
            margin-bottom: 10px;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #e5ecf8;
            color: #436BB6;
            text-decoration: none;
            border-radius: 4px;
            margin-top: 20px;
        }
        .button:hover {
            background-color:#262E5F;
            color:#fff;
        }
        .email-footer {
            background: #f4f4f4;
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #888888;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <img src="https://ambulante.synergytecnologia.com.br/assets/logo.png" alt="Ambulante+">
        </div>
        <div class="email-body">
            <h2>Redefina sua senha no Ambulante+</h2>
            <p>Recebemos uma solicitação para redefinir sua senha no Ambulante+. Para criar uma nova senha, clique no link abaixo:</p>
                         <p><a href="${confirmationLink}">${confirmationLink}</a></p>
            </p>
            <p>Ou, se preferir, copie e cole este link no seu navegador:</p>
            <p>Se precisar de ajuda, estamos à disposição!<br>
                Atenciosamente,<br>
                Equipe Ambulante+</p>
            <hr>
            <p>Se você não solicitou essa alteração, pode ignorar este e-mail. Sua conta permanecerá segura.</p>
        </div>
        <div class="email-footer">
            <p>© 2025 Ambulante+ | Prefeitura de Maceió. Todos os direitos reservados.</p>
        </div>
    </div>
</body>
</html>
`;

export default emailDeRecuperacaoHtml;
