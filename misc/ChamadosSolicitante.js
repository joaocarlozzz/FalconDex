'use strict';

import Fuse from 'https://cdn.jsdelivr.net/npm/fuse.js@6.4.3/dist/fuse.esm.js';

import getTime from './Time.js';

import { Put, getAll } from './FetchAPI.js';

import { appendClass, createAlert, appendOption } from './DOMManipulate.JS';

//items
var titulo = document.querySelector("#cha_nome");
var descricao = document.querySelector("#cha_descricao");
var equipamento = document.querySelector("#equiTipo");
var localItem = document.querySelector("#locTipo");
var prioridadeItem = document.querySelector("#priTipo");
//button
var button = document.querySelector("#btnChamado");
//forms
var form1 = document.querySelector("#form1");
var form2 = document.querySelector("#form2");
var formRating = document.querySelector("#formRating");

//Itens card
var ChamadosCards = document.querySelector("#chamados-cards");

//search
var search = document.querySelector("#searchInput");
//status
var statusSelected = document.querySelector("#tipoFiltro");

//alert
var message = document.querySelector("#alert-message");

//chamados
var chamadoSelecionado = [];

//statics
var locais = [];
var equipamentos = [];
var statu = [];
var prioridades = [];
var CHAMADOS = [];

//terms
var term = "";
var statusS = "1";

//options
const options = {
    // isCaseSensitive: false,
    includeScore: true,
    // shouldSort: true,
    //includeMatches: true,
    // findAllMatches: false,
    minMatchCharLength: 0,
    // location: 0,
    // threshold: 0.6,
    // distance: 100,
    useExtendedSearch: true,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    keys: [
        "status.Id",
        "Nome",
        "Descricao"
    ]
};


var validation = {
    Nome: false,
    Descricao: false
}

//FETCHS
getAll("/api/tipoequipamento/").then(equipamentos =>
    equipamentos.map(equipamento => {
        equipamentos.push(equipamento);
    })
)

getAll("/api/status/").then(estados =>
    estados.map(estado => {
        statu.push(estado);
        appendOption(statusSelected, estado.Id, estado.Nome);
    })
)

getAll("/api/prioridade/").then(prioridades =>
    prioridades.map(prioridade => {
        prioridades.push(prioridade);
        appendOption(prioridadeItem, prioridade.Id, prioridade.Nome);
    })
)

getAll("/api/local/").then(locais =>
    locais.map(local => {
        locais.push(local);
        appendOption(localItem, local.Id, local.Nome);
    })
)


getAll("/api/chamado/").then(chamados => {
    chamados.map(chamado => {
        if (chamado.abridor.Id == 4) {
            CHAMADOS.push(chamado);
        }
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

    if (term.length > 0) {

        var result = fuse.search({
            $and: [
                { 'status.Id': statusS },
                {
                    $or: [
                        { Nome: term },
                        { Descricao: term }
                    ]
                }
            ]
        });
    }
    else {
        var result = fuse.search({
            $and: [
                { 'status.Id': statusS },
            ]
        });
    }

    result.map(e => {
        createCard(e.item);
    });

    if (result.length == 0) {
        createEmpty("Sem resultados: Limpe os filtros e tente novamente", ChamadosCards);
    }
}

search.addEventListener("search", e => {
    term = search.value;

    searchChamado();
});

function setSlider(data) {

    console.log(data);
    var slider = document.querySelector("#slider");
    var sliderTitle = document.querySelector("#slider-title");
    sliderTitle.textContent = data.Nome;
    var sliderDescription = document.querySelector("#slider-description");
    sliderDescription.textContent = data.Descricao;
    var sliderAbridor = document.querySelector("#slider-opener");
    sliderAbridor.textContent = data.abridor.Nome;
    var sliderEquipamento = document.querySelector("#slider-equipament");
    sliderEquipamento.textContent = data.equipamento.Nome;//equipamentos[data.equipamento.ID - 1].Nome;
    var sliderLocal = document.querySelector("#slider-local");
    sliderLocal.textContent = data.Local.Nome;//locais[ - 1].Nome;
    var sliderResponsavel = document.querySelector("#slider-resposavel");
    sliderResponsavel.textContent = data.Responsavel.Nome;
    var sliderPrioridade = document.querySelector("#slider-prioridade");
    sliderPrioridade.textContent = data.prioridade.Nome;//await prioridades[data.prioridade.Id - 1].Nome;
    var sliderData = document.querySelector("#slider-data");
    var utc = new Date(data.Data);
    sliderData.textContent = utc.toLocaleDateString();
    var sliderStatus = document.querySelector("#slider-status");
    sliderStatus.textContent = data.status.Nome;//await statu[data.status.Id - 1].Nome;
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

function createCard(chamado) {
    let card = document.createElement("div");
    card.setAttribute('id', 'chamado_num_' + chamado.Id);
    card.classList.add("card");
    card.classList.add("ml-1");
    card.classList.add("mr-1");
    card.classList.add("mt-1");
    card.classList.add("animate__animated");//fadeInRight
    card.classList.add("animate__fadeIn");

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
    card_descricao.setAttribute('id', 'chamado_descricao_' + chamado.Id);
    card_descricao.classList.add('card-subtitle');
    card_descricao.classList.add('mb-2');
    card_descricao.classList.add('text-muted');
    card_descricao.textContent = chamado.Descricao;

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
    modal.setAttribute('data-toggle', 'modal');
    modal.setAttribute('data-target', '#feedbackModal');//data-chamado
    modal.setAttribute('data-chamado', chamado.Id)

    if (statusId == 3) {
        modal.textContent = 'Dar Feedback';
    }

    getItemC(modal);

    card_body.appendChild(card_title);
    card_body.appendChild(card_descricao);
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


function isSentence(entry) {
    return entry.split(/\b\W+\b/).length > 1;
}

form1.addEventListener("submit", e => {
    e.preventDefault();

    var Id = 0;
    //na atualização usar formData
    getAll("/api/chamado/").then(chamados => {
        chamados.map(chamado => {
            Id = chamado.Id
        });
        Id++;
    })

    var chamado = {
        Id: Id,
        Nome: titulo.value,
        Descricao: descricao.value,
        abridor: { Id: "4" },
        equipamento: { ID: equipamento.options[equipamento.selectedIndex].value },
        Local: { Id: localItem.options[localItem.selectedIndex].value },
        prioridade: { Id: prioridadeItem.options[prioridadeItem.selectedIndex].value },
        Data: Date.now(),
        Feed: 0
    }

    CHAMADOS = [];

    fetch("api/chamado", {
        method: "POST",
        body: JSON.stringify(chamado),
        headers: {
            'Accept': 'application/json; charset=utf-8',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(
        response => response
    ).then(
        response => {
            ChamadosCards.innerHTML = null

            getAll("/api/chamado/").then(chamados => {
                chamados.map(chamado => {
                    if (chamado.abridor.Id == 4) {
                        CHAMADOS.push(chamado)
                    }
                });
                searchChamado();
            })
            
            createAlert("Chamado criado com sucesso");
        }
    ).catch(
        error => console.error('Error:', error)
    );
    clean();
})

disabledButton();

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

formRating.addEventListener("submit", e => {
    e.preventDefault();

    let formData = new FormData(formRating);

    var object = {};
    formData.forEach((value, key) => object[key] = parseInt(value));

    var item = chamadoSelecionado[0];

    const chamados = Object.assign(item, object);

    //console.log(chamados);
    Put(chamados, "api/chamado/", chamados.Id);

    createAlert("Feedback Realizado");
});


function clean() {
    titulo.value = null;
    titulo.classList.remove("is-valid");
    descricao.value = null;
    descricao.classList.remove("is-valid");
    validation.Descricao = false
    validation.Nome = false;
    disabledButton();
}

//select
statusSelected.addEventListener('change', e => {
    statusS = e.target.options[e.target.selectedIndex].value;

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