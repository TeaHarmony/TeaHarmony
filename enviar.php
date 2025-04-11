<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $nombre = htmlspecialchars($_POST["nombre"]);
  $email = htmlspecialchars($_POST["email"]);
  $mensaje = htmlspecialchars($_POST["mensaje"]);

  $para = "tucorreo@ejemplo.com"; // CAMBIÁ ESTO POR TU CORREO REAL
  $asunto = "Nuevo mensaje de contacto desde Herboluz";
  $contenido = "Nombre: $nombre\nCorreo: $email\nMensaje:\n$mensaje";
  $cabeceras = "From: $email";

  if (mail($para, $asunto, $contenido, $cabeceras)) {
    echo "Mensaje enviado con éxito.";
  } else {
    echo "Hubo un error al enviar el mensaje.";
  }
} else {
  echo "Acceso no permitido.";
}
?>