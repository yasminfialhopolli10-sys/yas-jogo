
let coins = Number(localStorage.getItem("kittyCoins")) || 100;
let currentService = "";
let currentClient = 0;
let completed = false;

const clients = [
    { name: "Maria", emoji: "👩🏻", request: "Quero um cabelo lindo!" },
    { name: "Sofia", emoji: "👩🏽", request: "Quero unhas maravilhosas!" },
    { name: "Luna", emoji: "👩🏼", request: "Quero uma maquiagem rosa!" },
    { name: "Ana", emoji: "👩🏾", request: "Quero uma transformação!" }
];

const services = {
    hair: {
        title: "💇‍♀️ Cabeleireiro",
        options: ["💗 Cabelo rosa", "💜 Cabelo roxo", "💛 Cabelo loiro", "🎀 Laço", "✨ Cachos"]
    },
    nails: {
        title: "💅 Manicure",
        options: ["💗 Esmalte rosa", "❤️ Esmalte vermelho", "💜 Esmalte lilás", "✨ Brilhos", "🌸 Flores"]
    },
    makeup: {
        title: "💄 Maquiagem",
        options: ["💗 Batom rosa", "❤️ Batom vermelho", "✨ Sombra brilhante", "🌸 Blush", "👁️ Cílios"]
    }
};

function updateCoins() {
    document.getElementById("coins").textContent = coins;
    localStorage.setItem("kittyCoins", coins);
}

function showScreen(id) {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });
    document.getElementById(id).classList.add("active");
}

function startGame() {
    showScreen("salon");
    updateClient();
}

function updateClient() {
    const client = clients[currentClient % clients.length];
    document.getElementById("client").textContent = client.emoji;
    document.getElementById("clientName").textContent = client.name;
    document.getElementById("request").textContent = client.request;
    document.getElementById("message").textContent =
        "A Hello Kitty está pronta para atender " + client.name + "! 🎀";
}

function newClient() {
    currentClient++;
    completed = false;
    updateClient();
}

function openService(service) {
    currentService = service;
    completed = false;

    const data = services[service];

    document.getElementById("serviceTitle").textContent = data.title;
    document.getElementById("preview").textContent =
        clients[currentClient % clients.length].emoji;

    const options = document.getElementById("options");
    options.innerHTML = "";

    data.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => chooseOption(option);
        options.appendChild(button);
    });

    showScreen("service");
}

function chooseOption(option) {
    document.getElementById("preview").textContent = option;
    completed = true;
}

function finishService() {
    if (!completed) {
        alert("Escolha pelo menos um item antes de finalizar! 💗");
        return;
    }

    coins += 20;
    updateCoins();

    alert("Parabéns! Atendimento concluído! Você ganhou 20 moedas! 🎀");
    showScreen("salon");
}

function openShop() {
    showScreen("shop");
}

function buyItem(item, price) {
    if (coins >= price) {
        coins -= price;
        updateCoins();
        alert("Você comprou: " + item + "! 💗");
    } else {
        alert("Você não tem moedas suficientes! 💰");
    }
}

updateCoins();
