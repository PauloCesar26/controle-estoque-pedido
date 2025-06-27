export function loadCurrentEstoque(){
     const displayCurrentMassa = document.getElementById("display-current-massa");
    const displayCurrentRecheio = document.getElementById("display-current-recheio");
    const displayCurrentBebida = document.getElementById("display-current-bebida");

    const estoqueAtualMassas = JSON.parse(localStorage.getItem("estoqueAtualMassas")) || [];
    const estoqueAtualRecheios = JSON.parse(localStorage.getItem("estoqueAtualRecheios")) || [];
    const estoqueAtualBebidas = JSON.parse(localStorage.getItem("estoqueAtualBebidas")) || [];

    displayCurrentMassa.innerHTML = "";
    estoqueAtualMassas.forEach(massa => {
        displayCurrentMassa.innerHTML += 
        `<p class="border-b-1 pl-2">${massa.massa}</p>
         <p class="border-b-1">${massa.quantidade}</p>`;
    });

    displayCurrentRecheio.innerHTML = "";
    estoqueAtualRecheios.forEach(recheio => {
        displayCurrentRecheio.innerHTML += 
        `<p class="border-b-1 pl-2">${recheio.recheio}</p>
         <p class="border-b-1">${recheio.quantidade}</p>`;
    });

    displayCurrentBebida.innerHTML = "";
    estoqueAtualBebidas.forEach(bebida => {
        displayCurrentBebida.innerHTML += 
        `<p class="border-b-1 pl-2">${bebida.bebida}</p>
         <p class="border-b-1">${bebida.quantidade}</p>`;
    });
}