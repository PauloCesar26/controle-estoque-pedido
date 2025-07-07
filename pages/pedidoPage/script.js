import { updateUI } from "../estoquePage/updateUI.js";
import { updateOrder } from "./updateOrder.js";

export function pedido(){
    const form = document.getElementById("form");
    const btnClean = document.getElementById("limpar");
    const order = document.getElementById("exibir-order");
    const name = document.getElementById("name");
    const massa1 = document.querySelector(".name-massa1");
    const recheio1 = document.querySelector(".name-recheio1");
    const massa2 = document.querySelector(".name-massa2");
    const recheio2 = document.querySelector(".name-recheio2");

    const currentDate = document.getElementById("current-date");
    const date = new Date(); 
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    currentDate.textContent = formattedDate;

    const loandingOverlay = document.getElementById("loadingOverlay");
    const showLoandingOverlay = () => loandingOverlay?.classList.remove("hidden");

    const closeModal = document.querySelector("#close-modal");
    const modal = document.querySelector("#modal");
    const fade = document.querySelector("#fade");
    const modalMessage = document.querySelector("#modal-message");

    const toggleModal = () => {
        [modal, fade].forEach((el) => el.classList.toggle("hide"));
    };
    const showModal = (message) => {
        modalMessage.textContent = message;
        toggleModal();
    };
    closeModal.addEventListener("click", () => {
        toggleModal();
    });

    let infoForm = JSON.parse(localStorage.getItem("infoForm")) || [];

    const renderOrder = () => {
        updateOrder(infoForm, order, showLoandingOverlay, loandingOverlay);
    };

    if(form){
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const nomeDigitado = name.value.trim();
            const massa1Pedido = massa1.value;
            const recheio1Pedido = recheio1.value;
            const massa2Pedido = massa2.value;
            const recheio2Pedido = recheio2.value;

            if(nomeDigitado === ""){
                showModal("Preencha o nome do cliente.");
                return;
            }
            if(massa1Pedido === ""){
                showModal("Escolha a massa 1.");
                return;
            }
            if(recheio1Pedido === ""){
                showModal("Escolha o recheio 1.");
                return;
            }
            if(massa2Pedido === ""){
                showModal("Escolha a massa 2.")
                return;
            }
            if(recheio2Pedido === ""){
                showModal("Escolha o recheio 2.")
                return;
            }
            
            infoForm.push({ 
                name: nomeDigitado,
                massa1: massa1Pedido,
                recheio1: recheio1Pedido,
                massa2: massa2Pedido,
                recheio2: recheio2Pedido,
                status: false,
            });
            
            localStorage.setItem("infoForm", JSON.stringify(infoForm));
            console.log(infoForm);
            renderOrder();
            updateUI();
            form.reset();
        });

        btnClean.addEventListener("click", () => {
            showLoandingOverlay();

            setTimeout(() => {
                localStorage.removeItem("infoForm"); 
    
                infoForm = []; 
                localStorage.removeItem("infoForm");
                order.innerHTML = "";
                loandingOverlay.classList.add("hidden");
            }, 800);
        });
    }
    renderOrder();
}