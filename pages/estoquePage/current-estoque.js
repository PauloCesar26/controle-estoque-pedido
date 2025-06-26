export function currentEstoque(){
    const currentEstoque = document.getElementById("current-estoque");
    const displayCurrentMassa = document.getElementById("display-current-massa");
    const displayCurrentRecheio = document.getElementById("display-current-recheio");
    const displayCurrentBebida = document.getElementById("display-current-bebida");

    const productMassa = JSON.parse(localStorage.getItem("massas"));
    const productOrderMassa1 = JSON.parse(localStorage.getItem("infoForm"));

    const nameEstoqueMassa = productMassa.map(name => name.massa);
    const qtdEstoqueMassa = productMassa.map(qtd => qtd.quantidade);
    console.log(nameEstoqueMassa);
    console.log(qtdEstoqueMassa);

    const nameOrderMassa1 = productOrderMassa1.map(nameOrderMassa => nameOrderMassa.massa1);
    console.log(nameOrderMassa1);

    // nameOrderMassa1.forEach((product, index) => {
    //     if(product === nameEstoqueMassa){
    //         console.log("Subtrair");
    //     }
    // });
};