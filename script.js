'use scrict'

const todo_ListDiv = document.getElementById('todoList');
const novo_item = document.getElementById('newItem');


const getBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const setBanco = (banco) => localStorage.setItem('todoList', JSON.stringify(banco));

const criarItem = (tarefa, status, indice) =>{
    const item = document.createElement('label');
     item.classList.add('todo__item');
     item.innerHTML = `
        <input type="checkbox" ${status} data-indice = ${indice}>
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice = ${indice}>
     `
     todo_ListDiv.appendChild(item);
}

const limparTarefas = () =>{
    while(todo_ListDiv.firstChild) {
        todo_ListDiv.removeChild(todo_ListDiv.lastChild);
    }
}

const atualizarTela = () =>{
    limparTarefas();
    const banco = getBanco();
    banco.forEach((item, indice) => criarItem(item.tarefa, item.status, indice));
}

const criarTarefa = (evento) =>{
    const tecla = evento.key;
    const texto = evento.target.value;
    if(tecla == 'Enter') {
        const banco = getBanco();
        banco.push({'tarefa': texto, 'status': ''})
        setBanco(banco);
        atualizarTela();
        evento.target.value = '';
       
    }
}

const removerItem = (indice) =>{
    const banco = getBanco();
    banco.splice(indice, 1);
    setBanco(banco);
    atualizarTela();
}

const atualizarItem = (indice) => {
    const banco = getBanco();
    banco[indice].status  = banco[indice].status == '' ? 'checked' : '';
    setBanco(banco);
    atualizarTela();
}

const clickItem = (evento) =>{
    const elemento = evento.target;
    if(elemento.type == "button") {
        const indice = elemento.dataset.indice; 
        removerItem(indice);
    }else if(elemento.type == "checkbox") {
        const indice = elemento.dataset.indice;
        atualizarItem(indice);
    }
    
    
}

novo_item.addEventListener('keypress', criarTarefa);
todo_ListDiv.addEventListener('click', clickItem);

atualizarTela();


