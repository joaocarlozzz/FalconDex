'use strict';

// var button = document.querySelector("#btnLocal");
import 'https://code.jquery.com/jquery-3.5.1.js';

import 'https://cdn.datatables.net/1.10.22/js/jquery.dataTables.min.js';

import { appendClass, createAlert, appendOption } from './DOMManipulate.JS';

import { Put, getAll } from './FetchAPI.js';

var form3 = document.querySelector("#form3");
//var titulo = document.querySelector("#equ_nome");
var equipamento = document.querySelector("#emp_equipamento"); //label
var usuario = document.querySelector("#emp_solicitante");
var dataEmprestimo = document.querySelector("#emp_data");
//var EquipamentoLabel = document.querySelector("#label_equipamento");

// variaveis 

var TIPO = [];
var status = [];
var EQUIPAMENTOS = [];

getAll("/api/solicitante/").then(usuarios =>
    usuarios.map(x => {
        //usuario.push(x);
        appendOption(usuario, x.Id, x.Nome);
    })
)

getAll("/api/equipamento/").then(equipamentos =>
    equipamentos.map(x => {
        //usuario.push(x);
        appendOption(equipamento, x.Id, x.Nome);
    })
)

async function getEquipamento() {
    //http://localhost:58052/api/equipamento/
    fetch("/api/emprestimo/"
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
        error => console.error('Erro ao obter emprestimos:', error)
    );
};

getEquipamento();

async function getTipo() {
    //http://localhost:58052/api/equipamento/
    fetch("/api/emprestimo/"
    ).then(
        tipos => tipos.json()
    ).then(
        tipos => {
            tipos.map(e => {
                TIPO.push(e);

            })
            $(document).ready(function () {
                var table = $('#table_Emprestimo').DataTable({
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
                        url: '/api/emprestimo',
                        dataSrc: ''
                    },
                    columns: [
                        { data: 'Equipamento.Nome' },
                        { data: 'Usuario.Nome' },
                        { data: 'Data' },
                        { data: 'Tecnico.Nome' }
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

    var emprestimo = {
        Equipamento: { Id: equipamento.options[equipamento.selectedIndex].value },
        Data: dataEmprestimo.value,
        Usuario: { Id: usuario.options[usuario.selectedIndex].value },
        Tecnico: { Id: '1' }
    }

    console.log(emprestimo);

    fetch("api/emprestimo", {
        method: "POST",
        body: JSON.stringify(emprestimo),
        headers: {
            'Accept': 'application/json; charset=utf-8',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(
        response => response
    ).then(
        response => {
            //console.log('Success:', response)
            $("#table_Emprestimo").DataTable().ajax.reload();
            createAlert("empréstimo adicionado com sucesso");
        }
    ).catch(
        error => console.error('Erro ao obter empréstimo:', error)
    );
    //LIMPAR CAMPOS

    //INSERIR LABEL
    //createLabel(local);
})
