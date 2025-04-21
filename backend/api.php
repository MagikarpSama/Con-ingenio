<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Authorization, Content-Type");

$method = $_SERVER['REQUEST_METHOD'];
$endpoint = $_GET['endpoint'] ?? '';

$data = json_decode(file_get_contents("php://input"), true);

// Simulación de datos actualizados
$services = [
    [
        "id" => 1,
        "titulo" => [
            "esp" => "Consultoría digital",
            "eng" => "Digital consulting"
        ],
        "descripcion" => [
            "esp" => "Identificamos las fallas y conectamos los puntos entre tu negocio y tu estrategia digital. Nuestro equipo experto cuenta con años de experiencia en la definición de estrategias y hojas de ruta en función de tus objetivos específicos.",
            "eng" => "We identify failures and connect the dots between your business and your digital strategy. Our expert team has years of experience defining strategies and roadmaps based on your specific objectives."
        ],
        "activo" => true
    ],
    [
        "id" => 2,
        "titulo" => [
            "esp" => "Soluciones multiexperiencia",
            "eng" => "Multi-experience solutions"
        ],
        "descripcion" => [
            "esp" => "Deleitamos a las personas usuarias con experiencias interconectadas a través de aplicaciones web, móviles, interfaces conversacionales, digital twin, IoT y AR. Su arquitectura puede adaptarse y evolucionar para adaptarse a los cambios de tu organización.",
            "eng" => "We delight users with interconnected experiences through web applications, mobile applications, conversational interfaces, digital twin, IoT and AR. Its architecture can adapt and evolve to adapt to changes in your organization."
        ],
        "activo" => true
    ],
    [
        "id" => 3,
        "titulo" => [
            "esp" => "Evolución de ecosistemas",
            "eng" => "Ecosystem evolution"
        ],
        "descripcion" => [
            "esp" => "Ayudamos a las empresas a evolucionar y ejecutar sus aplicaciones de forma eficiente, desplegando equipos especializados en la modernización y el mantenimiento de ecosistemas técnicos. Creando soluciones robustas en tecnologías de vanguardia.",
            "eng" => "We help companies evolve and run their applications efficiently, deploying teams specialized in the modernization and maintenance of technical ecosystems. Creating robust solutions in cutting-edge technologies."
        ],
        "activo" => true
    ],
    [
        "id" => 4,
        "titulo" => [
            "esp" => "Soluciones Low-Code",
            "eng" => "Low-Code Solutions"
        ],
        "descripcion" => [
            "esp" => "Traemos el poder de las soluciones low-code y no-code para ayudar a nuestros clientes a acelerar su salida al mercado y añadir valor. Aumentamos la productividad y la calidad, reduciendo los requisitos de cualificación de los desarrolladores.",
            "eng" => "We bring the power of low-code and no-code solutions to help our clients accelerate time to market and add value. We increase productivity and quality, reducing developer qualification requirements."
        ],
        "activo" => true
    ]
];

$aboutUs = [
    "data" => [
        [
            "titulo" => [
                "esp" => "Misión",
                "eng" => "Mission"
            ],
            "descripcion" => [
                "esp" => "Nuestra misión es ofrecer soluciones digitales innovadoras y de alta calidad que impulsen el éxito de nuestros clientes.",
                "eng" => "Our mission is to deliver high-quality, innovative digital solutions that drive our clients' success."
            ]
        ],
        [
            "titulo" => [
                "esp" => "Visión",
                "eng" => "Vision"
            ],
            "descripcion" => [
                "esp" => "Nos visualizamos como líderes en el campo de la consultoría y desarrollo de software.",
                "eng" => "We see ourselves as leaders in the field of software consulting and development."
            ]
        ],
        [
            "titulo" => [
                "esp" => "Valores",
                "eng" => "Values"
            ],
            "descripcion" => [
                "esp" => "Innovación, Compromiso, Excelencia.",
                "eng" => "Innovation, Commitment, Excellence."
            ]
        ]
    ]
];

$welcome = [
    "data" => [
        [
            "titulo" => "Innovación Tecnológica",
            "descripcion" => "Descubre cómo nuestras soluciones tecnológicas pueden transformar tu negocio."
        ],
        [
            "titulo" => "Consultoría Especializada",
            "descripcion" => "Nuestro equipo de expertos está listo para ayudarte a alcanzar tus objetivos."
        ],
        [
            "titulo" => "Soporte Continuo",
            "descripcion" => "Ofrecemos soporte técnico continuo para garantizar el éxito de tus proyectos."
        ]
    ]
];

// Manejo de endpoints
if ($endpoint === 'services') {
    if ($method === 'GET') {
        echo json_encode(["data" => $services]);
    } else {
        http_response_code(405);
        echo json_encode(["error" => "Método no permitido para este endpoint."]);
    }
} elseif ($endpoint === 'about-us') {
    if ($method === 'GET') {
        echo json_encode($aboutUs);
    } else {
        http_response_code(405);
        echo json_encode(["error" => "Método no permitido para este endpoint."]);
    }
} elseif ($endpoint === 'welcome') {
    if ($method === 'GET') {
        echo json_encode($welcome);
    } else {
        http_response_code(405);
        echo json_encode(["error" => "Método no permitido para este endpoint."]);
    }
} else {
    http_response_code(404);
    echo json_encode(["error" => "Endpoint no encontrado."]);
}
?>