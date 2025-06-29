export function updateUI(){
    const displayMassa = document.getElementById("exibir-massa");
    const displayRecheio = document.getElementById("exibir-recheio");
    const displayBebida = document.getElementById("exibir-bebida");

    const displayCurrentMassa = document.getElementById("display-current-massa");
    const displayCurrentRecheio = document.getElementById("display-current-recheio");

    const form = document.getElementById("form");
    const btnUpdateEstoque = document.getElementById("update-estoque");
    const estoque = document.getElementById("estoque");
    const loandingOverlay = document.getElementById("loadingOverlay");

    const massaEstoque = JSON.parse(localStorage.getItem("massas")) || [];
    const recheioEstoque = JSON.parse(localStorage.getItem("recheio")) || [];
    const bebidaEstoque = JSON.parse(localStorage.getItem("bebida")) || [];
    const orders = JSON.parse(localStorage.getItem("infoForm")) || [];
    
    if(!displayMassa || !displayRecheio || !displayBebida || !form || !btnUpdateEstoque || !loandingOverlay) return;

    const showLoandingOverlay = () => loandingOverlay?.classList.remove("hidden");
    
    showLoandingOverlay();

    setTimeout(() => {
        if(massaEstoque && massaEstoque.length > 0){
            massaEstoque.forEach(massa => {
                displayMassa.innerHTML += 
                `
                    <p class="border-b-1 pl-2">${massa.massa || "Nenhuma massa no estoque."}</p>
                    <p class="border-b-1">${massa.quantidade || ""}</p>
                `;
            });
        }
        if(recheioEstoque && recheioEstoque.length > 0){
            recheioEstoque.forEach(recheio => {
                displayRecheio.innerHTML += 
                `
                    <p class="border-b-1 pl-2">${recheio.recheio || "Nenhuma recheio no estoque."}</p>
                    <p class="border-b-1">${recheio.quantidade || ""}</p>
                `;
            });
        }
        if(bebidaEstoque && bebidaEstoque.length > 0){
            bebidaEstoque.forEach(bebida => {
                displayBebida.innerHTML += 
                `
                    <p class="border-b-1 pl-2">${bebida.bebida || "Nenhuma bebida no estoque."}</p>
                    <p class="border-b-1">${bebida.quantidade || ""}</p>
                `;
            });
        }

        const allMassasOrder = orders.flatMap(p => [p.massa1, p.massa2]);
        const countMassas = {};

        allMassasOrder.forEach(nome => {
            countMassas[nome] = (countMassas[nome] || 0) + 1;
        });
        massaEstoque.forEach(massa => {
            const qtdPedidos = countMassas[massa.massa] || 0;
            const qtdAtual = Math.max(parseInt(massa.quantidade) - qtdPedidos, 0);

            displayCurrentMassa.innerHTML += 
            `
                <p class="border-b-1 pl-2">${massa.massa || "Nenhuma massa no estoque."}</p>
                <p class="border-b-1">${qtdAtual || ""}</p>
            `;
        });

        const allRecheiosOrders = orders.flatMap(p => [p.recheio1, p.recheio2]);
        const countRecheios = {};

        allRecheiosOrders.forEach(nome => {
            countRecheios[nome] = (countRecheios[nome] || 0) + 1;
        });
        recheioEstoque.forEach(recheio => {
            const qtdPedidos = countRecheios[recheio.recheio] || 0;
            const qtdAtual = Math.max(parseInt(recheio.quantidade) - qtdPedidos, 0);

            displayCurrentRecheio.innerHTML += 
            `
                <p class="border-b-1 pl-2">${recheio.recheio || "Nenhuma recheio no estoque."}</p>
                <p class="border-b-1">${qtdAtual || ""}</p>
            `;
        });

        const currentEstoqueMassas = massaEstoque.map(massa => {
            const qtdPedidos = countMassas[massa.massa] || 0;
            const qtdAtual = Math.max(parseInt(massa.quantidade) - qtdPedidos, 0);
            return { massa: massa.massa, quantidade: qtdAtual };
        });
        localStorage.setItem("currentEstoqueMassas", JSON.stringify(currentEstoqueMassas));

        const currentEstoqueRecheios = recheioEstoque.map(recheio => {
            const qtdPedidos = countRecheios[recheio.recheio] || 0;
            const qtdAtual = Math.max(parseInt(recheio.quantidade) - qtdPedidos, 0);
            return { recheio: recheio.recheio, quantidade: qtdAtual };
        });
        localStorage.setItem("currentEstoqueRecheios", JSON.stringify(currentEstoqueRecheios));

        form.classList.add("hidden");
        btnUpdateEstoque.classList.remove("hidden");
        estoque.classList.remove("hidden");
        loandingOverlay.classList.add("hidden");
    }, 800);
}