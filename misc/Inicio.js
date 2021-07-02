'use strict';

import Fuse from 'https://cdn.jsdelivr.net/npm/fuse.js@6.4.3/dist/fuse.esm.js';

import getTime from './Time.js';

//Itens card
var ChamadosCards = document.querySelector("#chamados-cards");

//statics
var locais = [];
var equipamentos = [];
var statu = [];
var prioridades = [];
var CHAMADOS = [];

//terms
var term = "";
var statusS = "1";

var SEARCH = [];

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

//FETCHS
async function getChamados() {
    //http://localhost:58052/api/test/
    await fetch("/api/chamado/"
    ).then(
        chamados => chamados.json()
    ).then(
        chamados => {
            chamados.map(e => {
                CHAMADOS.push(e);
            })

            searchChamado()
        }
    ).catch(
        error => console.error('Erro ao obter chamados:', error)
    );
};

getChamados();

async function getChamado(id) {
    var result = CHAMADOS.filter(e => e.Id == id);

    setSlider(result[0]);
}


async function searchChamado() {
    ChamadosCards.innerHTML = null;

    const fuse = new Fuse(CHAMADOS, options);

    SEARCH = fuse.search({
        $and: [
            { 'status.Id': statusS },
        ]
    });

    SEARCH.map(e => {
        var id = e.item.Id;

        if (id <= 3) {
            createCard(e.item);
        }
    });
}

async function getEquipamento() {
    //http://localhost:58052/api/test/
    await fetch("/api/tipoequipamento/"
    ).then(
        equipamento => equipamento.json()
    ).then(
        equipamento => {
            equipamento.map(e => {
                equipamentos.push(e);
            })
        }
    ).catch(
        error => console.error('Erro ao obter equipamentos:', error)
    );
};

getEquipamento();

async function getStatus() {
    //http://localhost:58052/api/test/
    await fetch("/api/status/"
    ).then(
        status => status.json()
    ).then(
        status => {
            status.map(e => {
                statu.push(e);
            })
        }
    ).catch(
        error => console.error('Erro ao obter status:', error)
    );
};

getStatus();

async function getPrioridade() {
    //http://localhost:58052/api/test/
    await fetch("/api/prioridade/"
    ).then(
        prioridade => prioridade.json()
    ).then(
        prioridade => {
            prioridade.map(e => {
                prioridades.push(e);
            })
        }
    ).catch(
        error => console.error('Erro ao obter prioridade:', error)
    );
};

getPrioridade();

async function getLocal() {
    //http://localhost:58052/api/test/
    await fetch("/api/local/"
    ).then(
        local => local.json()
    ).then(
        local => {
            local.map(e => {
                locais.push(e);
            })
        }
    ).catch(
        error => console.error('Erro ao obter local:', error)
    );
};

getLocal();

function setSlider(data) {

    console.log(data);
    var slider = document.querySelector("#slider");
    var sliderTitle = document.querySelector("#slider-title");
    sliderTitle.textContent = data.Nome;
    var sliderDescription = document.querySelector("#slider-description");
    sliderDescription.textContent = data.Descricao;
    var sliderAbridor = document.querySelector("#slider-opener");
    sliderAbridor.textContent = data.abridor.Id;
    var sliderEquipamento = document.querySelector("#slider-equipament");
    sliderEquipamento.textContent = equipamentos[data.equipamento.ID - 1].Nome;
    var sliderLocal = document.querySelector("#slider-local");
    sliderLocal.textContent = locais[data.Local.Id - 1].Nome;
    var sliderResponsavel = document.querySelector("#slider-resposavel");
    sliderResponsavel.textContent = data.Responsavel.Id;
    var sliderPrioridade = document.querySelector("#slider-prioridade");
    sliderPrioridade.textContent = prioridades[data.prioridade.Id - 1].Nome;
    var sliderData = document.querySelector("#slider-data");
    var utc = new Date(data.Data);
    sliderData.textContent = utc.toLocaleDateString();
    var sliderStatus = document.querySelector("#slider-status");
    sliderStatus.textContent = statu[data.status.Id - 1].Nome;
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

function createCard(chamado) {
    let card = document.createElement("div");
    card.setAttribute('id', 'chamado_num_' + chamado.Id);
    card.classList.add("card");
    card.classList.add("ml-1");
    card.classList.add("mr-1");
    card.classList.add("mt-1");
    card.classList.add("animate__animated");//fadeInRight
    card.classList.add("animate__fadeIn");

    var statusId = chamado.status.Id == undefined ? 1 : chamado.status.Id;

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
    modal.setAttribute('data-target', '#encerrarModal');//data-chamado
    modal.setAttribute('data-chamado', chamado.Id)

    if (statusId == 1) {
        modal.textContent = 'Encerrar';
    }

    card_body.appendChild(card_title);
    card_body.appendChild(card_descricao);
    card_footer.appendChild(card_criacao);
    card_footer.appendChild(visualizar);
    card_footer.appendChild(modal);
    card.appendChild(card_body);
    card.appendChild(card_footer);

    ChamadosCards.appendChild(card);
}