export function updateUI(){
    const displayMassa = document.getElementById("exibir-massa");
    const displayRecheio = document.getElementById("exibir-recheio");
    const displayBebida = document.getElementById("exibir-bebida");

    const displayCurrentEstoque = document.getElementById("current-estoque");
    const displayCurrentMassa = document.getElementById("display-current-massa");
    const displayCurrentRecheio = document.getElementById("display-current-recheio");
    const displayCurrentBebida = document.getElementById("display-current-bebida");

    const form = document.getElementById("form");
    const btnUpdateEstoque = document.getElementById("update-estoque");
    const estoque = document.getElementById("estoque");
    const loandingOverlay = document.getElementById("loadingOverlay");

    const massaEstoque = JSON.parse(localStorage.getItem("massas")) || [];
    const recheioEstoque = JSON.parse(localStorage.getItem("recheio")) || [];
    const bebidaEstoque = JSON.parse(localStorage.getItem("bebida")) || [];
    const pedidos = JSON.parse(localStorage.getItem("infoForm")) || [];
    
    if(!displayMassa || !displayRecheio || !displayBebida || !form || !btnUpdateEstoque || !loandingOverlay) return;

    const showLoandingOverlay = () => loandingOverlay?.classList.remove("hidden");
    
    showLoandingOverlay();

    setTimeout(() => {
        if(massaEstoque && massaEstoque.length > 0){
            massaEstoque.forEach(massa => {
                displayMassa.innerHTML += 
                `
                    <p class="border-b-1 pl-2">${massa.massa || ""}</p>
                    <p class="border-b-1">${massa.quantidade || ""}</p>
                `;
            });
        }
        if(recheioEstoque && recheioEstoque.length > 0){
            recheioEstoque.forEach(recheio => {
                displayRecheio.innerHTML += 
                `
                    <p class="border-b-1 pl-2">${recheio.recheio || ""}</p>
                    <p class="border-b-1">${recheio.quantidade || ""}</p>
                `;
            });
        }
        if(bebidaEstoque && bebidaEstoque.length > 0){
            bebidaEstoque.forEach(bebida => {
                displayBebida.innerHTML += 
                `
                    <p class="border-b-1 pl-2">${bebida.bebida || ""}</p>
                    <p class="border-b-1">${bebida.quantidade || ""}</p>
                `;
            });
        }

        const allMassasPedidos = pedidos.flatMap(p => [p.massa1, p.massa2]);
        const contagemMassas = {};
        allMassasPedidos.forEach(nome => {
            contagemMassas[nome] = (contagemMassas[nome] || 0) + 1;
        });

        massaEstoque.forEach(massa => {
            const qtdPedidos = contagemMassas[massa.massa] || 0;
            const qtdAtual = Math.max(parseInt(massa.quantidade) - qtdPedidos, 0);
            displayCurrentMassa.innerHTML += 
            `<p class="border-b-1 pl-2">${massa.massa}</p>
            <p class="border-b-1">${qtdAtual}</p>`;
        });

        const allRecheiosPedidos = pedidos.flatMap(p => [p.recheio1, p.recheio2]);
        const contagemRecheios = {};
        allRecheiosPedidos.forEach(nome => {
            contagemRecheios[nome] = (contagemRecheios[nome] || 0) + 1;
        });
        recheioEstoque.forEach(recheio => {
            const qtdPedidos = contagemRecheios[recheio.recheio] || 0;
            const qtdAtual = Math.max(parseInt(recheio.quantidade) - qtdPedidos, 0);
            displayCurrentRecheio.innerHTML += 
            `<p class="border-b-1 pl-2">${recheio.recheio}</p>
             <p class="border-b-1">${qtdAtual}</p>`;
        });

        const estoqueAtualMassas = massaEstoque.map(massa => {
            const qtdPedidos = contagemMassas[massa.massa] || 0;
            const qtdAtual = Math.max(parseInt(massa.quantidade) - qtdPedidos, 0);
            return { massa: massa.massa, quantidade: qtdAtual };
        });
        localStorage.setItem("estoqueAtualMassas", JSON.stringify(estoqueAtualMassas));

        const estoqueAtualRecheios = recheioEstoque.map(recheio => {
            const qtdPedidos = contagemRecheios[recheio.recheio] || 0;
            const qtdAtual = Math.max(parseInt(recheio.quantidade) - qtdPedidos, 0);
            return { recheio: recheio.recheio, quantidade: qtdAtual };
        });
        localStorage.setItem("estoqueAtualRecheios", JSON.stringify(estoqueAtualRecheios));

        form.classList.add("hidden");
        btnUpdateEstoque.classList.remove("hidden");
        estoque.classList.remove("hidden");
        loandingOverlay.classList.add("hidden");
    }, 800);
}