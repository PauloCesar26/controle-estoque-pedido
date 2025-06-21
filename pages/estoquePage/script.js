export function estoque(){
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