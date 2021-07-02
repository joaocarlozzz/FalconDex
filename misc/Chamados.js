'use strict';

import Fuse from 'https://cdn.jsdelivr.net/npm/fuse.js@6.4.3/dist/fuse.esm.js';

import 'https://code.jquery.com/jquery-3.5.1.js';

import getTime from './Time.js';

import { Post, Put, getAll } from './FetchAPI.js';

import { appendClass, createAlert, appendOption } from './DOMManipulate.JS';

import { get, cleanData } from './DotObject.js';

import { isSentence } from './Validator.js';

//items
var titulo = document.querySelector("#cha_nome");
var descricao = document.querySelector("#cha_descricao");
var equipamentoItem = document.querySelector("#equiTipo");
var localItem = document.querySelector("#locTipo");
var prioridadeItem = document.querySelector("#priTipo");
//button
var button = document.querySelector("#btnChamado");
var btnAtender = document.querySelector("#chamado-atender");
var btnEncerrar = document.querySelector("#chamado-encerrar");
//forms
var form1 = document.querySelector("#form1");
var form2 = document.querySelector("#form2");

//Itens card
var ChamadosCards = document.querySelector("#chamados-cards");

//search
var search = document.querySelector("#searchInput");

//status
var statusSelected = document.querySelector("#tipoFiltro");
var equipamentoItem2 = document.querySelector("#tipoEquipamento");
var localItem2 = document.querySelector("#tipoLocal");
var prioridadeItem2 = document.querySelector("#tipoPrioridade");
var tecnicosItem = document.querySelector("#tipoAtendente");
var datePicker1 = document.querySelector("#datePicker1");
var datePicker2 = document.querySelector("#datePicker2");
var cleanDates = document.querySelector("#cleanDates");

//registros
var tipoQuantidade = document.querySelector("#tipoQuantidade");

//chamados
var chamadoSelecionado = [];

//statics
var CHAMADOS = [];

//terms
var term = "";
var statusS = "1";
var equipamentoId = "";
var localId = "";
var prioridadeId = "";
var tecnicosId = "";
var data1 = "";
var data2 = "";
var sort = "1";

var quantidadeItens = "5";
var value = "1";

//options
const options = {
    includeScore: true,
    minMatchCharLength: 0,
    useExtendedSearch: true,
    keys: [
        "status.Id",
        "Nome",
        "Descricao",
        "equipamento.ID",
        "Responsavel.Id",
        "Local.Id",
        "prioridade.Id",
        "Data",
    ]
};


var validation = {
    Nome: false,
    Descricao: false
}

//FETCHS
getAll("/api/tecnico/").then(estados =>
    estados.map(tecnico => {
        appendOption(tecnicosItem, tecnico.Id, tecnico.Nome);
    })
)


getAll("/api/tipoequipamento/").then(equipamentos =>
    equipamentos.map(equipamento => {
        appendOption(equipamentoItem, equipamento.ID, equipamento.Nome);
        appendOption(equipamentoItem2, equipamento.ID, equipamento.Nome);
    })
)

getAll("/api/status/").then(estados =>
    estados.map(estado => {
        appendOption(statusSelected, estado.Id, estado.Nome);
    })
)

getAll("/api/prioridade/").then(prioridades =>
    prioridades.map(prioridade => {
        appendOption(prioridadeItem, prioridade.Id, prioridade.Nome);
        appendOption(prioridadeItem2, prioridade.Id, prioridade.Nome);
    })
)

getAll("/api/local/").then(locais =>
    locais.map(local => {
        appendOption(localItem, local.Id, local.Nome);
        appendOption(localItem2, local.Id, local.Nome);
    })
)

getAll("/api/chamado/").then(chamados => {
    chamados.map(chamado => {
        CHAMADOS.push(chamado);
    });
    searchChamado()
})

async function getChamado(id) {
    var result = CHAMADOS.filter(e => e.Id == id);

    setSlider(result[0]);
}

async function searchChamado() {
    ChamadosCards.innerHTML = null;

    const fuse = new Fuse(CHAMADOS, options);

    var itens = getAllTerms();

    var result = fuse.search({
        $and: itens
    });

    var count = 0;

    var empty = 0;

    /*var teste = result.sort(e => {
        console.log(ordenation(sort, e));
        compare(ordenation(sort, e));
    });
    console.log(teste);*/

    result.map(e => {
        count++;
        if (isInsideRange(count)) {
            //console.log(new Date(e.item.Data));
            if (betweenDates(new Date(e.item.Data))) {
                createCard(e.item);
                empty++;
            }
        }
    });

    count = 0;

    //console.log(result.length + ": quantidade de itens"); //tamanho
    //console.log(Math.ceil(result.length / quantidadeItens) + " Páginas"); //qtd de páginas

    cleanPagination();
    if (result.length > 0) {
        var pages = Math.ceil(result.length / quantidadeItens);

        createPagination(pages);
        getPageItensLenght();
    }

    if (result.length == 0 || empty == 0) {
        createEmpty("Sem resultados: Limpe os filtros e tente novamente", ChamadosCards);
    }
}

function getAllTerms() {
    var bloco = [];

    if (term.length > 0 && typeof term != "undefined") bloco.push({ Nome: term }, { Descricao: term });
    if (statusS.length > 0 && typeof statusS != "undefined") bloco.push({ 'status.Id': statusS });
    if (tecnicosId.length > 0 && typeof tecnicosId != "undefined") bloco.push({ 'Responsavel.Id': tecnicosId });
    if (localId.length > 0 && typeof localId != "undefined") bloco.push({ 'Local.Id': localId });
    if (prioridadeId.length > 0 && typeof prioridadeId != "undefined") bloco.push({ 'prioridade.Id': prioridadeId });
    if (data1.length > 0 && typeof data1 != "undefined") bloco.push({ 'Data': data1 });

    return bloco;
}

function ordenation(orderType, e) {
    var orderEnumarator = [];

    if (orderType = "1") {
        orderEnumarator.push({ 'DATA': new Date(e.item.Data), 'ORDER': 'DESC' });
    }
    else if (orderType = "2") {
        orderEnumarator.push({ 'DATA': new Date(e.item.Data), 'ORDER': 'ASC' });
    }
    else if (orderType = "3") {
        orderEnumarator.push({ 'DATA': e.Nome, 'ORDER': 'DESC' });
    }
    else if (orderType = "4") {
        orderEnumarator.push({ 'DATA': e.Nome, 'ORDER': 'ASC' });
    }
    return orderEnumarator;
}


function betweenDates(date) {

    if (data1.length == 0 && data2.length == 0) {
        return true
    }

    if (data1.length == 0 && date <= new Date(data2)) {
        return true
    }

    if (data2.length == 0 && date >= new Date(data1)) {
        return true
    }

    if (date >= new Date(data1) && date <= new Date(data2)) {
        return true;
    }

    return false;
}

function isInsideRange(input) {
    return (input > (quantidadeItens * value) - quantidadeItens) && input <= quantidadeItens * value;
}

function createPagination(pages = 1) {
    var paginationArea = document.querySelector("#paginationArea");

    var paginationNav = document.createElement('nav');
    paginationNav.setAttribute('aria-label', 'Page navigation example');
    paginationNav.id = 'cardPagination';
    //<nav aria-label="Page navigation example" id="cardPagination">

    var paginationUl = document.createElement('ul');
    paginationUl.classList.add("pagination");
    paginationUl.id = 'navPagination';

    paginationUl.appendChild(createPaginationItem('Anterior', 'A'));

    for (var i = 1; i <= pages; i++) {
        paginationUl.appendChild(createPaginationItem(i, i));
    }

    paginationUl.appendChild(createPaginationItem('Próximo', 'P'));
    paginationNav.appendChild(paginationUl);
    paginationArea.appendChild(paginationNav);
}

function cleanPagination() {
    var paginationArea = document.querySelector("#paginationArea");
    paginationArea.innerHTML = null;
}

function createPaginationItem(text, id) {
    var item = document.createElement('li');
    item.classList.add('page-item');
    item.setAttribute('data-page-id', id);

    var itemLink = document.createElement('a');
    itemLink.classList.add('page-link');
    itemLink.href = "#";

    itemLink.textContent = text;

    item.appendChild(itemLink);

    return item;
}

function getPageItensLenght() {
    var pageItens = document.querySelectorAll("[data-page-id]");
    var maxPage = pageItens.length - 2;

    pageItens.forEach(item => {
        item.addEventListener('click', e => {
            var page = item.getAttribute('data-page-id');

            if (!Number.isNaN(parseInt(page))) {
                value = parseInt(page);
                searchChamado();
            }
            else if (page == 'A' && value > 1) {
                value--;
                searchChamado();
            }
            else if (page == 'P' && value < maxPage) {
                value++;
                searchChamado();
            }
        });
    });
}

function compare(a, b) {
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
}

search.addEventListener("search", e => {
    term = search.value;
    value = '1';

    searchChamado();
});

function setSlider(data) {
    var slider = document.querySelector("#slider");
    var sliderTitle = document.querySelector("#slider-title");
    sliderTitle.textContent = data.Nome;
    var sliderDescription = document.querySelector("#slider-description");
    sliderDescription.textContent = data.Descricao;
    var sliderAbridor = document.querySelector("#slider-opener");
    sliderAbridor.textContent = data.abridor.Nome;
    var sliderEquipamento = document.querySelector("#slider-equipament");
    sliderEquipamento.textContent = data.equipamento.Nome;
    var sliderLocal = document.querySelector("#slider-local");
    sliderLocal.textContent = data.Local.Nome;
    var sliderResponsavel = document.querySelector("#slider-resposavel");
    sliderResponsavel.textContent = data.Responsavel.Nome;
    var sliderPrioridade = document.querySelector("#slider-prioridade");
    sliderPrioridade.textContent = data.prioridade.Nome;
    var sliderData = document.querySelector("#slider-data");
    var utc = new Date(data.Data);
    sliderData.textContent = utc.toLocaleDateString();
    var sliderStatus = document.querySelector("#slider-status");
    sliderStatus.textContent = data.status.Nome;
    var sliderFeed = document.querySelector("#slider-feed");
    sliderFeed.value = data.Feed;
    var slideClose = document.querySelector("#slider-close");
    slideClose.addEventListener('click', e => {
        slider.classList.remove("slide-in");
        slider.classList.add('slide-out');
    });

}

function getElement(element) {
    element.addEventListener('click', e => {
        var sliderElement = document.querySelector("#slider");
        let slider = sliderElement.className;
        var chamadoId = e.target.getAttribute('data-chamado');

        if (slider !== 'slide-in' || sliderElement.classList.contains('slide-out')) {
            if (sliderElement.classList.contains('slide-out')) {
                sliderElement.classList.remove('slide-out');
            }
            sliderElement.classList.add('slide-in');
        }

        getChamado(chamadoId);
    });
}

function getItemC(element) {
    element.addEventListener('click', e => {
        var chamadoId = e.target.getAttribute('data-chamado');

        chamadoSelecionado = CHAMADOS.filter(e => e.Id == chamadoId);
    });
}

//function chamadoBtnAction(action, )

btnAtender.addEventListener('click', e => {
    var item = chamadoSelecionado[0];

    item.status.Id = '5';
    item.Responsavel.Id = '3';
    Put(item, "api/chamado/", item.Id);

    CHAMADOS = [];

    getAll("/api/chamado/").then(chamados => {
        chamados.map(chamado => {
            CHAMADOS.push(chamado);
        });

        statusSelected.options[4].selected = 'selected';
        statusS = "5";

        searchChamado()
        createCard(item);
        createAlert("Chamado selecionado com sucesso");
    })
});

btnEncerrar.addEventListener('click', e => {
    var item = chamadoSelecionado[0];

    item.status.Id = '3';
    Put(item, "api/chamado/", item.Id);

    CHAMADOS = [];

    getAll("/api/chamado/").then(chamados => {
        chamados.map(chamado => {
            CHAMADOS.push(chamado);
        });

        statusSelected.options[2].selected = 'selected';
        statusS = "3";

        searchChamado()
        createCard(item);
        createAlert("Chamado encerrado com sucesso");
    })
});

function createCard(chamado) {
    let card = document.createElement("div");
    card.setAttribute('id', 'chamado_num_' + chamado.Id);
    appendClass(card, ['card', 'ml-1', 'mr-1', 'mt-1', 'animate__animated', 'animate__fadeIn']);

    var statusId = chamado.status == undefined ? 1 : chamado.status.Id;

    if (statusId == 1) {
        card.classList.add("border-success");

    } else if (statusId == 2) {
        card.classList.add("border-danger");
    }

    card.style.width = "18rem";

    let card_body = document.createElement("div");
    card_body.classList.add('card-body');

    let card_title = document.createElement('h5');
    card_title.setAttribute('id', 'chamado_title_' + chamado.Id);
    card_title.classList.add('card-title');
    card_title.textContent = chamado.Nome;

    let card_descricao = document.createElement('h6');
    appendClass(card_descricao, ['card-subtitle', 'mb-2', 'text-muted']);
    card_descricao.setAttribute('id', 'chamado_descricao_' + chamado.Id);
    card_descricao.textContent = chamado.Descricao;

    let card_status = document.createElement('span');
    card_status.setAttribute('id', 'chamado_status_name' + chamado.Id);
    card_status.textContent = chamado.status.Nome;

    let card_footer = document.createElement('div');
    card_footer.classList.add('card-footer');

    let card_criacao = document.createElement('p');
    card_criacao.setAttribute('id', 'chamado_criacao_' + chamado.Id);
    card_criacao.classList.add('card-text');

    let card_criacao_span = document.createElement('span');
    card_criacao_span.classList.add('fa');
    card_criacao_span.classList.add('fa-calendar');

    card_criacao.appendChild(card_criacao_span);

    let text = document.createTextNode(" " + getTime(chamado.Data));

    card_criacao.appendChild(text);

    let visualizar = document.createElement('a');
    visualizar.href = "#";
    visualizar.classList.add('card-link');
    visualizar.setAttribute('data-chamado', chamado.Id);
    getElement(visualizar);

    visualizar.textContent = 'Visualizar';

    let modal = document.createElement('a');
    modal.href = "#";
    modal.classList.add('card-link');
    modal.setAttribute('data-toggle', 'modal');//data-chamado

    if (statusId == 1) {
        modal.textContent = 'Atender';
        modal.setAttribute('data-target', '#atenderModal');
    }
    else if (statusId == 5) {
        modal.textContent = 'Encerrar';
        modal.setAttribute('data-target', '#encerrarModal');
    }

    modal.setAttribute('data-chamado', chamado.Id);

    getItemC(modal);

    card_body.appendChild(card_title);
    card_body.appendChild(card_descricao);
    card_footer.appendChild(card_status);
    card_footer.appendChild(card_criacao);
    card_footer.appendChild(visualizar);
    card_footer.appendChild(modal);
    card.appendChild(card_body);
    card.appendChild(card_footer);

    ChamadosCards.appendChild(card);
}

titulo.addEventListener("keyup", e => {
    var text = e.target.value;

    var tip = document.querySelector("[data-source='" + e.target.id + "']");

    if (!isSentence(text)) {
        e.target.classList.remove("is-valid");
        e.target.classList.add("is-invalid");
        tip.textContent = "Elabore com mais de uma palavra";
        validation.Nome = false;
    }
    else {
        e.target.classList.add("is-valid");
        e.target.classList.remove("is-invalid");
        tip.textContent = "Por exemplo, Projetor queimado, cabo de rede sem funcionamento";
        validation.Nome = true;
    }

    disabledButton();
});

descricao.addEventListener("keyup", e => {
    var text = e.target.value;

    var tip = document.querySelector("[data-source='" + e.target.id + "']");

    if (!isSentence(text)) {
        e.target.classList.remove("is-valid");
        e.target.classList.add("is-invalid");
        tip.textContent = "Elabore com mais de uma palavra";
        validation.Descricao = false;
    }
    else {
        e.target.classList.add("is-valid");
        e.target.classList.remove("is-invalid");
        tip.textContent = "Descrição do chamado";
        validation.Descricao = true;
    }

    disabledButton();
});

form1.addEventListener("submit", e => {
    e.preventDefault();

    let formData = new FormData(form1);

    var chamado = get(formData);

    chamado["abridor"] = { Id: "3" };
    chamado["Data"] = Date.now();

    console.log(chamado);

    CHAMADOS = [];

    Post(chamado, "api/chamado").then(
        () => {
            getAll("/api/chamado/").then(chamados => {
                chamados.map(chamado => {
                    CHAMADOS.push(chamado)
                });
                searchChamado();
            })
            createAlert("Chamado criado com sucesso");
            cleanData(formData);
            form1.reset();
            $('#novoChamado').modal('hide');
            disabledButton();
        }
    ).catch(
        error => console.error('Error:', error)
    );
})

form2.addEventListener("submit", e => {
    e.preventDefault();
})

function disabledButton() {
    if (validation.Nome == true && validation.Descricao == true) {
        button.removeAttribute("disabled");
    }
    else {
        button.setAttribute("disabled", "disabled");
    }
}

//select
statusSelected.addEventListener('change', e => {
    statusS = e.target.options[e.target.selectedIndex].value;

    searchChamado();
});

//result
tipoQuantidade.addEventListener('change', e => {
    quantidadeItens = e.target.options[e.target.selectedIndex].value;
    value = "1";

    searchChamado();
});

//equipamento
equipamentoItem2.addEventListener('change', e => {
    equipamentoId = e.target.options[e.target.selectedIndex].value;
    value = "1";

    searchChamado();
});

//local
localItem2.addEventListener('change', e => {
    localId = e.target.options[e.target.selectedIndex].value;

    console.log(localId);
    value = "1";

    searchChamado();
});

//Prioridade
prioridadeItem2.addEventListener('change', e => {
    prioridadeId = e.target.options[e.target.selectedIndex].value;
    value = "1";

    searchChamado();
});

//Tecnicos
tecnicosItem.addEventListener('change', e => {
    tecnicosId = e.target.options[e.target.selectedIndex].value;
    value = "1";

    searchChamado();
});

//dataInicio
$(datePicker1).on('pick.datepicker', function (e) {
    if (e.date > new Date()) {
        e.preventDefault();
    }
    data1 = $(datePicker1).datepicker('getDate');
    value = "1";
    console.log("data1 => " + data1);
    searchChamado();
});

//dataFim
$(datePicker2).on('pick.datepicker', function (e) {
    if (e.date > new Date()) {
        e.preventDefault();
    }
    data2 = $(datePicker2).datepicker('getDate');
    value = "1";
    console.log("data2 => " + data2);
    searchChamado();
});

cleanDates.addEventListener('click', e => {
    data1 = "";
    $(datePicker1).datepicker('reset');
    data2 = "";
    $(datePicker2).datepicker('reset');
    value = "1";

    searchChamado();
});

function createEmpty(textNode = "Base", element) {
    var content = document.createElement("div");

    appendClass(content, ["w-100", "mt-3", "text-center", "bg-warning", "rounded", "p-5"]);

    var faFilter = document.createElement("i");

    appendClass(faFilter, ["fa", "fa-info", "fa-5x"]);

    var textDiv = document.createElement("div");
    appendClass(textDiv, ["font-weight-bold"]);

    var textNode = document.createTextNode(textNode);

    textDiv.appendChild(textNode);

    content.appendChild(faFilter);
    content.appendChild(textDiv);

    element.appendChild(content);
}