import { estoque } from "./pages/estoquePage/script.js";
import { pedido } from "./pages/pedidoPage/script.js";

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
    "/estoque": "/pages/estoquePage/index.html",
    "/pedido": "/pages/pedidoPage/index.html",
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
    if(path === "/estoque"){
        estoque();
    } 
    if(path === "/pedido"){
        pedido();
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
        buttonMenu.classList.toggle("hidden");
        iconOpen.classList.toggle("hidden");
        iconClose.classList.toggle("hidden");
    });
});
menu.addEventListener("click", () => {
    buttonMenu.classList.toggle("hidden");
    iconOpen.classList.toggle("hidden");
    iconClose.classList.toggle("hidden");
});