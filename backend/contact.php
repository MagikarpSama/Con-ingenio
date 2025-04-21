<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = htmlspecialchars($_POST['name'] ?? '');
    $service = htmlspecialchars($_POST['service'] ?? '');
    $message = htmlspecialchars($_POST['message'] ?? '');

    // Validar los datos
    if (!empty($name) && !empty($service) && !empty($message)) {
        // Aquí puedes enviar un correo o guardar los datos en una base de datos
        echo json_encode([
            "status" => "success",
            "message" => "Gracias, $name. Tu mensaje sobre '$service' ha sido enviado correctamente."
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Por favor, completa todos los campos."
        ]);
    }
} else {
    http_response_code(405); // Método no permitido
    echo json_encode([
        "status" => "error",
        "message" => "Método no permitido."
    ]);
}
?>