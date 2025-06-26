export function estoque(){
    const form = document.getElementById("form");
    const btnLimpar = document.getElementById("limpar");
    const btnUpdateEstoque = document.getElementById("update-estoque");

    const currentDate = document.getElementById("current-date");

    const estoque = document.getElementById("estoque");
    const displayMassa = document.getElementById("exibir-massa");
    const displayRecheio = document.getElementById("exibir-recheio");
    const displayBebida = document.getElementById("exibir-bebida");

    const loandingOverlay = document.getElementById("loadingOverlay");
    function showLoandingOverlay(){
        loandingOverlay?.classList.remove("hidden");
    }

    const date = new Date(); 
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    currentDate.textContent = formattedDate;

    const resultMassas = document.getElementById("massas");
    const buttonAddMassa = document.getElementById("add-massa");
    let contMassas = 1;

    const resultRecheios = document.getElementById("recheios");
    const buttonAddRecheio = document.getElementById("add-recheio");
    let contRecheio = 1;

    const resultBebidas = document.getElementById("bebidas");
    const buttonAddBebida = document.getElementById("add-bebida");
    let contBebida = 1;

    const addMassa = () => {
        const idMassa = `${contMassas}`;

        const massasAdd = 
        `
            <div id="${idMassa}" class="massa space-y-5 pb-4 mb-4 border-b-1 border-zinc-100/20">
                <div class="flex flex-col">
                    <span class="flex flex-col gap-1">
                        <label for="massas">Massa:</label>
                        <select name="" class="name-massas w-30 bg-zinc-100 text-black pt-1 pb-1 pl-1 pr-3 rounded-[10px]">
                            <option value="">Selecione...</option>
                            <option value="Chocolate">Chocolate</option>
                            <option value="Branca">Branca</option>
                            <option value="Red Velvet">Red velvet</option>
                            <option value="Cenoura">Cenoura</option>
                        </select>
                    </span>
                    <p id="erro-massa" class="text-red-900"></p>
                </div>

                <div class="flex flex-col">
                    <span class="flex flex-col gap-1">
                        <label for="qtd-massa">Quantidade:</label>
                        <input type="number" placeholder="Digite a qtd para o estoque" class="qtd-massa bg-zinc-100 rounded-[10px] pt-2 pb-2 pl-2 text-black">
                    </span>
                    <p id="erro-qtd-massa" class="text-red-900"></p>
                </div>

                <button onClick="removeMassa(${idMassa})"  type="button" class="pt-2 pb-2 pl-3 pr-3 rounded-[10px] bg-zinc-950 hover:bg-zinc-800 ease-in-out text-white mr-5 flex items-center gap-2 cursor-pointer transition duration-[0.3s]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                </button>
            </div>
        `;

        resultMassas.insertAdjacentHTML("beforeend", massasAdd);

        contMassas++;
    };
    window.removeMassa = (id) => {
        const element = document.getElementById(id);
        
        if(element){
            element.remove();
        }
    };

    const addRecheio = () => {
        const idRecheio = `${contRecheio}`;

        const recheioAdd = 
        `
            <div id="${idRecheio}" class="recheio space-y-5 pb-4 mb-4 border-b-1 border-zinc-100/20">
                <div class="flex flex-col">
                    <span class="flex flex-col gap-1">
                        <label for="recheio">Recheio:</label>
                        <select name="" class="name-recheio w-30 bg-zinc-100 text-black pt-1 pb-1 pl-1 pr-3 rounded-[10px]">
                            <option value="">Selecione...</option>
                            <option value="Chocolate">Chocolate</option>
                            <option value="Ninho">Ninho</option>
                            <option value="Doce de Leite">Doce de leite</option>
                            <option value="Maracujá">Maracujá</option>
                        </select>
                    </span>
                    <p id="erro-recheio" class="text-red-900"></p>
                </div>

                <div class="flex flex-col">
                    <span class="flex flex-col gap-1">
                        <label for="qtd-recheio">Quantidade:</label>
                        <input type="number" placeholder="Digite a qtd para o estoque" class="qtd-recheio bg-zinc-100 rounded-[10px] pt-2 pb-2 pl-2 text-black">
                    </span>
                    <p id="erro-qtd-recheio" class="text-red-900"></p>
                </div>

                <button onClick="removeRecheio(${idRecheio})"  type="button" class="pt-2 pb-2 pl-3 pr-3 rounded-[10px] bg-zinc-950 hover:bg-zinc-800 ease-in-out text-white mr-5 flex items-center gap-2 cursor-pointer transition duration-[0.3s]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                </button>
            </div>
        `;

        resultRecheios.insertAdjacentHTML("beforeend", recheioAdd);

        contRecheio++;
    };
    window.removeRecheio = (id) => {
        const element = document.getElementById(id);
        
        if(element){
            element.remove();
        }
    };

    const addBebida = () => {
        const idBebida = `${contBebida}`;

        const bebidaAdd = 
        `
        <div id="${idBebida}" class="bebida space-y-5 pb-4 mb-4 border-b-1 border-zinc-100/20">
            <div class="flex flex-col">
                <span class="flex flex-col gap-1">
                    <label for="bebida">Bebida:</label>
                    <select name="" class="name-bebida w-30 bg-zinc-100 text-black pt-1 pb-1 pl-1 pr-3 rounded-[10px]">
                        <option value="">Selecione...</option>
                        <option value="Coca">Coca</option>
                        <option value="Fanta">Fanta</option>
                        <option value="Água">Água</option>
                        <option value="Guarana">Guarana</option>
                    </select>
                </span>
                <p id="erro-bebida" class="text-red-900"></p>
            </div>

            <div class="flex flex-col">
                <span class="flex flex-col gap-1">
                    <label for="qtd-bebida">Quantidade:</label>
                    <input type="number" placeholder="Digite a qtd para o estoque" class="qtd-bebida bg-zinc-100 rounded-[10px] pt-2 pb-2 pl-2 text-black">
                </span>
                <p id="erro-qtd-bebida" class="text-red-900"></p>
            </div>

            <button onClick="removeBebida(${idBebida})"  type="button" class="pt-2 pb-2 pl-3 pr-3 rounded-[10px] bg-zinc-950 hover:bg-zinc-800 ease-in-out text-white mr-5 flex items-center gap-2 cursor-pointer transition duration-[0.3s]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
            </button>
        </div>
        `;

        resultBebidas.insertAdjacentHTML("beforeend", bebidaAdd);

        contBebida++;
    };
    window.removeBebida = (id) => {
        const element = document.getElementById(id);
        
        if(element){
            element.remove();
        }
    };

    buttonAddMassa.addEventListener("click", addMassa);
    buttonAddRecheio.addEventListener("click", addRecheio);
    buttonAddBebida.addEventListener("click", addBebida);

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

    btnLimpar.addEventListener("click", () => {
        showLoandingOverlay();

        setTimeout(() => {
            displayMassa.innerHTML = "";
            displayRecheio.innerHTML = "";
            displayBebida.innerHTML = "";
            estoque.classList.add("hidden");

            localStorage.removeItem("massas");
            localStorage.removeItem("recheio");
            localStorage.removeItem("bebida");

            form.classList.remove("hidden");
            btnUpdateEstoque.classList.add("hidden");
            loandingOverlay.classList.add("hidden");
        }, 900);
    });

    if(form){
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const saveMassas = document.querySelectorAll(".massa");
            const saveRecheio = document.querySelectorAll(".recheio");
            const saveBebida = document.querySelectorAll(".bebida");
            const listMassas = [];
            const listRecheios = [];
            const listBebidas = [];

            saveMassas.forEach((div) => {
                const massa = div.querySelector(".name-massas").value;
                const quantidade = div.querySelector(".qtd-massa").value;

                listMassas.push({massa, quantidade});
            });
            localStorage.setItem("massas", JSON.stringify(listMassas));

            saveRecheio.forEach((div) => {
                const recheio = div.querySelector(".name-recheio").value;
                const quantidade = div.querySelector(".qtd-recheio").value;

                listRecheios.push({recheio, quantidade});
            });
            localStorage.setItem("recheio", JSON.stringify(listRecheios));

            saveBebida.forEach((div) => {
                const bebida = div.querySelector(".name-bebida").value;
                const quantidade = div.querySelector(".qtd-bebida").value;

                listBebidas.push({bebida, quantidade});
            });
            localStorage.setItem("bebida", JSON.stringify(listBebidas));

            estoque.classList.remove("hidden");
            updateUI();
            form.reset();
        });

    }

    const updateUI = () => {
        const massaEstoque = JSON.parse(localStorage.getItem("massas"));
        const recheioEstoque = JSON.parse(localStorage.getItem("recheio"));
        const bebidaEstoque = JSON.parse(localStorage.getItem("bebida"));

        if(!displayMassa || !displayRecheio || !displayBebida || !form || !btnUpdateEstoque || !loandingOverlay) return;

        showLoandingOverlay();

        setTimeout(() => {
            if(massaEstoque && massaEstoque.length > 0){
                massaEstoque.forEach((massa, index) => {
                    displayMassa.innerHTML += 
                    `
                        <p class="border-b-1 pl-2">${massa.massa || ""}</p>
                        <p class="border-b-1">${massa.quantidade || ""}</p>
                    `;
                });
            }
            if(recheioEstoque && recheioEstoque.length > 0){
                recheioEstoque.forEach((recheio, index) => {
                    displayRecheio.innerHTML += 
                    `
                        <p class="border-b-1 pl-2">${recheio.recheio || ""}</p>
                        <p class="border-b-1">${recheio.quantidade || ""}</p>
                    `;
                });
            }
            if(bebidaEstoque && bebidaEstoque.length > 0){
                bebidaEstoque.forEach((bebida, index) => {
                    displayBebida.innerHTML += 
                    `
                        <p class="border-b-1 pl-2">${bebida.bebida || ""}</p>
                        <p class="border-b-1">${bebida.quantidade || ""}</p>
                    `;
                });
            }

            form.classList.add("hidden");
            btnUpdateEstoque.classList.remove("hidden");
            estoque.classList.remove("hidden");
            loandingOverlay.classList.add("hidden");
        }, 800);
    };

    if(localStorage.getItem("massas") && localStorage.getItem("recheio") && localStorage.getItem("bebida")){
        updateUI();
    }
};