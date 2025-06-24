export function pedido(){
    // - Adicionar info no form
    // - Fazer a exibição na tela
    // -
    const form = document.getElementById("form");
    const btnClean = document.getElementById("limpar");
    const order = document.getElementById("exibir-order");
    const name = document.getElementById("name");
    const massa1 = document.querySelector(".name-massa1");

    const loandingOverlay = document.getElementById("loadingOverlay");
    function showLoandingOverlay(){
        loandingOverlay?.classList.remove("hidden");
    }

    const currentDate = document.getElementById("current-date");
    const date = new Date(); 
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    currentDate.textContent = formattedDate;

    let infoForm = JSON.parse(localStorage.getItem("infoForm")) || [];

    const updateOrder = () => {
        order.innerHTML = "";

        infoForm.forEach((item) => {
            if(!item.name) return; 
            if(!item.massa1) return;

            const div = document.createElement("div");
            div.classList.add("m-2", "pl-2", "pr-2", "pt-1", "pb-1", "border-b-1", "border-black");
            const pName = document.createElement("p");
            pName.textContent = `Nome: ${item.name}`;
            div.appendChild(pName);
            const pMassa1 = document.createElement("p");
            pMassa1.textContent = `Massa 1: ${item.massa1}`;
            div.appendChild(pMassa1);
            order.appendChild(div);
        });
    };

    if(form){
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const nomeDigitado = name.value.trim();
            const massa1Pedido = massa1.value;

            if(nomeDigitado === ""){
                alert("Por favor, preencha o nome.");
                return;
            }
            if(massa1Pedido === ""){
                alert("Por favor, escolha a massa 1.");
                return;
            }
            
            infoForm.push({ 
                name: nomeDigitado,
                massa1: massa1Pedido,
            });
            localStorage.setItem("infoForm", JSON.stringify(infoForm));
            console.log(infoForm);
            updateOrder();
            form.reset();
        });

        btnClean.addEventListener("click", () => {
            localStorage.removeItem("infoForm"); 

            infoForm = []; 
            localStorage.removeItem("infoForm");
            order.innerHTML = "";
        });
    }
    updateOrder();
}