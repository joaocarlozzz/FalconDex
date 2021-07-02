'use strict';

// var button = document.querySelector("#btnLocal");
import 'https://code.jquery.com/jquery-3.5.1.js';

import 'https://cdn.datatables.net/1.10.22/js/jquery.dataTables.min.js';

import { appendClass, createAlert, appendOption } from './DOMManipulate.JS';

import { Put, getAll } from './FetchAPI.js';

var form3 = document.querySelector("#form3");
var titulo = document.querySelector("#equ_nome");
var patrimonio = document.querySelector("#equi_patrimonio");
var tipo = document.querySelector("#equiTipo");
var EquipamentoLabel = document.querySelector("#label_equipamento");
var local = document.querySelector("#equ_local"); //label

// variaveis 

var TIPO = [];
var status = [];
var EQUIPAMENTOS = [];

getAll("/api/local/").then(locais =>
    locais.map(x => {
        locais.push(x);
        appendOption(local, x.Id, x.Nome);
    })
)

async function getEquipamento() {
    //http://localhost:58052/api/equipamento/
    fetch("/api/equipamento/"
    ).then(
        equipamento => equipamento.json()
    ).then(
        equipamento => {
            equipamento.map(e => {
                // createLabel(e);
                EQUIPAMENTOS.push(e);
            })
        }
    ).catch(
            error => console.error('Erro ao obter equipamento:', error)
        );
};

getEquipamento();

async function getTipo() {
    //http://localhost:58052/api/equipamento/
    fetch("/api/tipoequipamento/"
    ).then(
        tipos => tipos.json()
    ).then(
        tipos => {
            tipos.map(e => {
                TIPO.push(e);
                 
            })
            $(document).ready(function () {
                var  table =  $('#table_Equipamento').DataTable({
                    language: {
                        "emptyTable": "Nenhum registro encontrado",
                        "info": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                        "infoEmpty": "Mostrando 0 até 0 de 0 registros",
                        "infoFiltered": "(Filtrados de _MAX_ registros)",
                        "infoThousands": ".",
                        "lengthMenu": "_MENU_ resultados por página",
                        "loadingRecords": "Carregando...",
                        "processing": "Processando...",
                        "zeroRecords": "Nenhum registro encontrado",
                        "search": "Pesquisar",
                        "paginate": {
                            "next": "Próximo",
                            "previous": "Anterior",
                            "first": "Primeiro",
                            "last": "Último"
                        },
                        "aria": {
                            "sortAscending": ": Ordenar colunas de forma ascendente",
                            "sortDescending": ": Ordenar colunas de forma descendente"
                        },
                        "select": {
                            "rows": {
                                "_": "Selecionado %d linhas",
                                "0": "Nenhuma linha selecionada",
                                "1": "Selecionado 1 linha"
                            }
                        },
                        "buttons": {
                            "copy": "Copiar para a área de transferência",
                            "copyTitle": "Cópia bem sucedida",
                            "copySuccess": {
                                "1": "Uma linha copiada com sucesso",
                                "_": "%d linhas copiadas com sucesso"
                            }
                        }
                    },
                    ajax: {
                        url: '/api/equipamento',
                        dataSrc: ''
                    },
                    columns: [
                        { data: 'Nome' },
                        { data: 'Patrimonio' },
                        { data: 'Tipo.Nome' },
                        { data: 'Status.Nome' }
                    ]
  
                });
            })
        }
    ).catch(
        error => console.error('Erro ao obter equipamento:', error)
    );

};
getTipo();
function createLabel(equipamento) {

    let tr = document.createElement("tr");

    let nome = document.createElement("td");
    nome.setAttribute('id', 'equ_nome' + equipamento.Id);
    nome.textContent = equipamento.Nome;

    let patrimonio = document.createElement("td");
    patrimonio.setAttribute('id', 'equi_patrimonio' + equipamento.Id);
    patrimonio.textContent = equipamento.Patrimonio;

    let tipo = document.createElement("td");
    tipo.setAttribute('id', 'equiTipo' + equipamento.Id);
    tipo.textContent = equipamento.Tipo.ID;

    let status = document.createElement("td");
    status.setAttribute('id', 'equ_Status' + equipamento.Id);
    status.textContent = equipamento.Status.Id;

    tr.appendChild(nome);
    tr.appendChild(patrimonio);
    tr.appendChild(tipo);
    tr.appendChild(status);

    EquipamentoLabel.appendChild(tr);
}


form3.addEventListener("submit", e => {
    e.preventDefault();

    //ASSINCRONO

    var equipamento = {
        Nome: titulo.value,
        Patrimonio: patrimonio.value,
        Tipo: { ID: tipo.options[tipo.selectedIndex].value },
        local: { Id: local.options[local.selectedIndex].value },
        Usuario: { Id: 1}

    }

    fetch("api/equipamento", {
        method: "POST",
        body: JSON.stringify(equipamento),
        headers: {
            'Accept': 'application/json; charset=utf-8',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(
        response => response
    ).then(
        response => {
            //console.log('Success:', response)
            $("#table_Equipamento").DataTable().ajax.reload();
            createAlert("Equipamento adicionado com sucesso");
        }
    ).catch(
        error => console.error('Erro ao obter equipamento:', error)
    );
    //LIMPAR CAMPOS

    //INSERIR LABEL
    //createLabel(local);
})
