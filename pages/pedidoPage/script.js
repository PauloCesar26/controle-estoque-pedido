import { currentEstoque } from "../estoquePage/current-estoque.js";

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
    function showLoandingOverlay(){
        loandingOverlay?.classList.remove("hidden");
    }

    let infoForm = JSON.parse(localStorage.getItem("infoForm")) || [];

    if(form){
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const nomeDigitado = name.value.trim();
            const massa1Pedido = massa1.value;
            const recheio1Pedido = recheio1.value;
            const massa2Pedido = massa2.value;
            const recheio2Pedido = recheio2.value;

            if(nomeDigitado === ""){
                alert("Por favor, preencha o nome.");
                return;
            }
            if(massa1Pedido === ""){
                alert("Por favor, escolha a massa 1.");
                return;
            }
            if(recheio1Pedido === ""){
                alert("Por favor, escolha o recheio 1.");
                return;
            }
            if(massa2Pedido === ""){
                alert("Por favor, escolha a massa 2.");
                return;
            }
            if(recheio2Pedido === ""){
                alert("Por favor, escolha o recheio 2.");
                return;
            }
            
            infoForm.push({ 
                name: nomeDigitado,
                massa1: massa1Pedido,
                recheio1: recheio1Pedido,
                massa2: massa2Pedido,
                recheio2: recheio2Pedido
            });
            localStorage.setItem("infoForm", JSON.stringify(infoForm));
            console.log(infoForm);
            updateOrder();
            currentEstoque();
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

    const updateOrder = () => {
        showLoandingOverlay();

        setTimeout(() => {
            order.innerHTML = "";
    
            infoForm.forEach((item, index) => {
                if(!item.name || !item.massa1) return;
    
                const div = document.createElement("div");
                div.classList.add("m-2", "pl-2", "pr-2", "pt-1", "pb-1", "border-b-1", "border-black", "flex", "items-center", "justify-between");

                const span = document.createElement("span");

                const pName = document.createElement("p");
                pName.textContent = `Nome: ${item.name}`;
                span.appendChild(pName);

                const pMassa1 = document.createElement("p");
                pMassa1.textContent = `Massa 1: ${item.massa1}`;
                span.appendChild(pMassa1);
                
                const pRecheio1 = document.createElement("p");
                pRecheio1.textContent = `Recheio 1: ${item.recheio1}`;
                span.appendChild(pRecheio1);
                
                const pMassa2 = document.createElement("p");
                pMassa2.textContent = `Massa 1: ${item.massa2}`;
                span.appendChild(pMassa2);
                
                const pRecheio2 = document.createElement("p");
                pRecheio2.textContent = `Recheio 2: ${item.recheio2}`;
                span.appendChild(pRecheio2);

                const buttonDelete = document.createElement("button");
                buttonDelete.classList.add(
                    "pt-1",
                    "pb-1",
                    "sm:pl-3",
                    "sm:pr-3",
                    "max-sm:pl-2",
                    "max-sm:pr-2",
                    "sm:h-10",
                    "max-sm:h-8",
                    "rounded-[10px]",
                    "bg-zinc-950",
                    "hover:bg-zinc-800",
                    "ease-in-out",
                    "text-white",
                    "flex",
                    "items-center",
                    "cursor-pointer",
                    "transition",
                    "duration-[0.3s]"
                );
                buttonDelete.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>';

                buttonDelete.addEventListener("click", () => {
                    infoForm.splice(index, 1); 
                    localStorage.setItem("infoForm", JSON.stringify(infoForm));
                    console.log(infoForm);
                    updateOrder(); 
                });

                div.appendChild(span);
                div.appendChild(buttonDelete);
                order.appendChild(div);
            });

            loandingOverlay.classList.add("hidden");
        }, 800)
    };

    updateOrder();
    
}