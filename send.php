
<?php
//Variáveis

$nome = $_POST['nome'];
$emailCliente = $_POST["email"];
$assunto = $_POST['assunto'];
$tel = $_POST["tel"];
$mensagem = $_POST["msg"];
$data_envio = date('d/m/Y');
$hora_envio = date('H:i:s'); // Compo E-mail
$arquivo = "
<style type='text/css'>
body {
margin:0px;
font-family:Verdane;
font-size:12px;
color: #666666;
}
a{
color: #666666;
text-decoration: none;
}
a:hover {
color: #FF0000;
text-decoration: none;
}
</style>
<html>
<table width='510' border='1' cellpadding='1' cellspacing='1' bgcolor='#CCCCCC'>
  <tr>
    <td>
  <tr>
    <td width='500'>Nome:$nome</td>
  </tr>
  <tr>
    <td width='320'>Email:$emailCliente</td>
  </tr>
  </td>
  </tr>
  <tr>
    <td width='500'>Assunto:$assunto</td>
  </tr>
  <tr>
    <td width='320'>Telefone:$tel</td>
  </tr>
  <tr>
    <td width='320'>Mensagem:$mensagem</td>
  </tr>
  </td>
  </tr>
  <tr>
    <td>Este e-mail foi enviado em <b>$data_envio</b> às <b>$hora_envio</b></td>
  </tr>
</table>

</html>
  ";
//enviar

// emails para quem será enviado o formulário
$emailenviar = "contato@retratossami.com.br";
$destino = $emailenviar;
$assunto = "Site - " . $assunto ;
// É necessário indicar que o formato do e-mail é html
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=UTF-8' . "\r\n";
$headers .= 'From: Site '. $assunto . '? <$email>';
//$headers .= "Bcc: $EmailPadrao\r\n";

$enviaremail = mail($destino, $assunto, $arquivo, $headers);
if ($enviaremail) {
  $mgm = "E-MAIL ENVIADO COM SUCESSO! <br> O link será enviado para o e-mail fornecido no formulário";
  // echo " <meta http-equiv='refresh' content='10;URL=contato.php'>";
} else {
  $mgm = "ERRO AO ENVIAR E-MAIL!";
  echo "";
}
?>