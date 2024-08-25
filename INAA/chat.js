function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    if (chatWindow.style.display === 'none' || chatWindow.style.display === '') {
        chatWindow.style.display = 'flex';
    } else {
        chatWindow.style.display = 'none';
    }
}

function sendMessage() {
    const chatBody = document.getElementById('chatBody');
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value;
    if (message.trim() !== '') {
        const userMessageElement = document.createElement('div');
        userMessageElement.textContent = message;
        userMessageElement.className = 'message user-message';
        chatBody.appendChild(userMessageElement);
        chatInput.value = '';
        chatBody.scrollTop = chatBody.scrollHeight;

        setTimeout(() => {
            const botMessageElement = document.createElement('div');
            const response = getBotResponse(message);
            botMessageElement.innerHTML = response.message;
            botMessageElement.className = 'message bot-message';
            chatBody.appendChild(botMessageElement);
            chatBody.scrollTop = chatBody.scrollHeight;

            if (response.map) {
                showIframeMap(response.map.url);
            }
        }, 1000);
    }
}

function getBotResponse(message) {
    const lowerCaseMessage = message.toLowerCase();
    const responses = [
        {
            pattern: /^(hola|buenos días|buenas tardes|buenas noches|buenos dias|Hola|Buenos dias|Buenos días)$/,
            message: `¡Hola! ¿Cómo puedo ayudarte? Aquí tienes algunas opciones que puedes preguntar:
            <br>
            <div style="margin-top: 10px;">
                <span style="display: inline-block; margin-right: 15px;">- "ubicación"</span>
                <span style="display: inline-block; margin-right: 15px;">- "bachilleratos"</span>
                <span style="display: inline-block; margin-right: 15px;">- "teléfono"</span>
                <span style="display: inline-block; margin-right: 15px;">- "correo electrónico"</span>
                <span style="display: inline-block;">- "horario de atención"</span>
            </div>`
        },
        
        { pattern: /^(gracias|gracias por tu ayuda|Gracias|Gracias por tu ayuda)$/, message: "¡De nada! ¿Hay algo más en lo que pueda ayudarte?" },
        { pattern: /^(adios|hasta luego|nos vemos|Adios)$/, message: "¡Hasta luego! Que tengas un buen día." },
        { pattern: /^(ubicación|donde están ubicados|dirección|Ubicación|Dirección|ubicacion|Ubicacion)$/, message: "La ubicación del Instituto Nacional de Apopa es la siguiente:<br>Dirección: RR39+MCC, Calle “A”, Col. Madre Tierra., Apopa", 
            map: { url: "https://www.openstreetmap.org/export/embed.html?bbox=-89.18285161256792%2C13.803329980926119%2C-89.18079704046251%2C13.80483552037058&layer=mapnik" } },
        { pattern: /^(teléfono|cual es el telefono|telefono|Teléfono|Telefono)$/, message: "Puedes llamarnos al <span class='phone-link' onclick='callPhone(\"22162772\")'>2216-2772</span> para más información." },
        { pattern: /^(llamar|quiero llamarlos|Llamar)$/, message: "¿Quieres llamarnos? Nuestro número es <span class='phone-link' onclick='callPhone(\"22162772\")'>2216-2772</span>" },
        { pattern: /^(correo electrónico|email|contacto|correo electronico|Correo electrónico)$/, message: "direccioninapopa@gmail.com" },
        { pattern: /^(horarios|horario de atención|Horarios|Horario de atención)$/, message: "Nuestros horarios de atención son de lunes a viernes de 8:00 AM a 5:00 PM." },
        { pattern: /^(bachilleratos|Bachilleratos|carreras|Carreras)$/, message: `
            <h4>Bachilleratos que ofrecemos:</h4>
            <br>
             <p>Bachillerato Técnico Vocacional:</p>
             <br>
        <div style="margin-bottom: 10px;">
            <span style="display: inline-block; margin-right: 15px;">- Desarrollo de Software</span>
            <span style="display: inline-block; margin-right: 15px;">- Electrónica</span>
            <span style="display: inline-block; margin-right: 15px;">- Administrativo Contable</span>
            <span style="display: inline-block; margin-right: 15px;">- Atención Primaria en <br><span style="display: block; margin-left: 9px;">Salud</span></span>
        </div>
        <br>
        <p>- Bachillerato General</p>
    ` }
    ];

    for (let response of responses) {
        if (response.pattern.test(lowerCaseMessage)) {
            return response;
        }
    }

    return { message: "Lo siento, no entiendo tu mensaje. ¿Puedes reformularlo?" };
}


function showIframeMap(url) {
    const chatBody = document.getElementById('chatBody');
    const iframeElement = document.createElement('iframe');
    iframeElement.src = url;
    chatBody.appendChild(iframeElement);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function callPhone(phoneNumber) {
    window.open('tel:' + phoneNumber);
}

document.getElementById('chatInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
