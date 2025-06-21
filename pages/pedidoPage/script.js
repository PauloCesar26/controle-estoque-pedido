export function pedido(){
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