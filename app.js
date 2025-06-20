const app = document.getElementById("app");
const links = document.querySelectorAll("a[data-link]");
const buttons = document.querySelectorAll(".button");
const menu = document.getElementById("menu");
const buttonMenu = document.querySelector(".button-menu");
const iconOpen = document.getElementById("icon-open");
const iconClose = document.getElementById("icon-close");

const routes = {
    "": "/pages/index.html",
    "/": "/pages/index.html",
    "/page1": "/pages/page1/index.html",
    "/page2": "/pages/page2/index.html",
};
 
const render = async (path) => {
    const route = routes[path] || "/pages/index.html";

    try{
        const req = await fetch(route);
        if(!req.ok){
            app.innerHTML = `<h1>Erro ${req.status}</h1>`;
        }
        const res = await req.text();
        app.innerHTML = res;
        logicPage(path);
    }
    catch{
        console.log("Erro ao carregar a página");
        app.innerHTML = "<h1>Erro ao carregar a página</h1>";
    }

};

const navigate = (e) => {
    e.preventDefault();
    const path = e.target.getAttribute("href");
    history.pushState({}, "", path);
    render(path);
};

const logicPage = (path) => {
    if(path === "/page1"){
        const form = document.getElementById("form");
        const btnLimpar = document.getElementById("limpar");
        const btnUpdateEstoque = document.getElementById("update-estoque");

        const currentDate = document.getElementById("current-date");

        const estoque = document.getElementById("estoque");
        const displayEstoque = document.getElementById("exibir-estoque");

        const loandingOverlay = document.getElementById("loadingOverlay");
        function showLoandingOverlay(){
            loandingOverlay?.classList.remove("hidden");
        }

        const massas = document.getElementById("massas");
        const qtdMassa = document.getElementById("qtd-massa");

        const date = new Date(); 
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        currentDate.textContent = formattedDate;

        const updateUI = () => {
            let massa = localStorage.getItem("massa");
            let qtdMassaEstoque = localStorage.getItem("qtdMassa");

            if (!displayEstoque || !form || !btnUpdateEstoque || !loandingOverlay) return;

            showLoandingOverlay();

            setTimeout(() => {
                displayEstoque.innerHTML = 
                `
                    <div class="grid grid-cols-2 w-full">
                        <p class="border-b-1 pl-2">Massa</p>
                        <p class="border-b-1">Quantidade de massa</p>
                    </div>
                    <div class="grid grid-cols-2 w-full">
                        <p class="border-b-1 pl-2">${massa || ""}</p>
                        <p class="border-b-1">${qtdMassaEstoque || ""}</p>
                    </div>
                `;
                
                form.classList.add("hidden");
                btnUpdateEstoque.classList.remove("hidden");
                estoque.classList.remove("hidden");
                loandingOverlay.classList.add("hidden");
            }, 800);
        };

        if(btnUpdateEstoque){
            btnUpdateEstoque.addEventListener("click", () => {
                showLoandingOverlay();
    
                setTimeout(() => {
                    form.classList.remove("hidden");
                    btnUpdateEstoque.classList.add("hidden");
                    loandingOverlay.classList.add("hidden");
                }, 800);
            });
        }

        if(form){
            btnLimpar.addEventListener("click", () => {
                showLoandingOverlay();

                setTimeout(() => {
                    displayEstoque.innerHTML = "";
                    localStorage.removeItem("massa"); 
                    localStorage.removeItem("qtdMassa"); 
                    form.classList.remove("hidden");
                    btnUpdateEstoque.classList.add("hidden");
                    estoque.classList.add("hidden");
                    loandingOverlay.classList.add("hidden");
                }, 900);
            });

            form.addEventListener("submit", (e) => {
                e.preventDefault();
                
                
                // if(name.value.trim() === ""){
                //     alert("Por favor, preencha o nome.");
                //     return;
                // }
                // if(mensagem.value.trim() === ""){
                //     alert("Por favor, preencha a mensagem.");
                //     return;
                // }

                const massaSelect = massas.value;
                localStorage.setItem("massa", massaSelect);
                localStorage.setItem("qtdMassa", qtdMassa.value);
                estoque.classList.remove("hidden");
                updateUI();
                form.reset();
            });
            if(localStorage.getItem("massa") && localStorage.getItem("qtdMassa")){
                updateUI();
            }
        }
  
    }

    if(path === "/page2"){
        const form = document.getElementById("form");
        const btnClean = document.getElementById("limpar");
        const order = document.getElementById("exibir-estoque");
        const name = document.getElementById("name");

        const loandingOverlay = document.getElementById("loadingOverlay");
        function showLoandingOverlay(){
            loandingOverlay?.classList.remove("hidden");
        }

        let infoForm = JSON.parse(localStorage.getItem("infoForm")) || [];

        const updateOrder = () => {
            order.innerHTML = "";
            infoForm.forEach((item) => {
                if (!item.name) return; 

                const p = document.createElement("p");
                p.textContent = `Nome: ${item.name}`;
                order.appendChild(p);
            });
        };

        if(form){
            btnClean.addEventListener("click", () => {
                localStorage.removeItem("infoForm"); 

                infoForm = []; 
                order.innerHTML = "";
            });

            form.addEventListener("submit", (e) => {
                e.preventDefault();

                const nomeDigitado = name.value.trim();

                if (nomeDigitado === "") {
                    alert("Por favor, preencha o nome.");
                    return;
                }
                
                infoForm.push({ name: nomeDigitado });
                localStorage.setItem("infoForm", JSON.stringify(infoForm));
                console.log(infoForm);
                updateOrder();
                form.reset();
            });
        }
        updateOrder();
    }
};

window.onpopstate = () => {
    render(location.pathname);   
};

document.addEventListener("DOMContentLoaded", () => {
    if(location.pathname === "/page1" || location.pathname === "/page2"){
        history.replaceState({}, "", "/");
        render("/");
        return;
    }

    links.forEach(link => {
        link.addEventListener("click", navigate);
    });
    render(location.pathname);
});

buttons.forEach((a) => {
    a.addEventListener("click", () => {
        buttons.forEach((links) => {
            links.classList.remove("active");
        })

        a.classList.add("active");
    })
});

menu.addEventListener("click", () => {
    buttonMenu.classList.toggle("hidden");
    iconOpen.classList.toggle("hidden");
    iconClose.classList.toggle("hidden");
});