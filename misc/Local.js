'use strict';

// var button = document.querySelector("#btnLocal");
import 'https://code.jquery.com/jquery-3.5.1.js';

import 'https://cdn.datatables.net/1.10.22/js/jquery.dataTables.min.js';

import { appendClass, createAlert, appendOption } from './DOMManipulate.JS';

var form2 = document.querySelector("#form2");
var titulo = document.querySelector("#loc_nome");
var bloco = document.querySelector("#tipoBloco");

var LocalLabel = document.querySelector("#label_bory");

async function getLocal() {
    //http://localhost:58052/api/local/
    fetch("/api/local/"
    ).then(
        local => local.json()
    ).then(
        local => {
            $(document).ready(function () {
                    $("#table_Local").DataTable({
                    "processing": true,
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
                        url: '/api/local',
                        dataSrc: ''
                    },
                    columns: [
                        { data: 'Id' },
                        { data: 'Nome' },
                        { data: 'Bloco' },
                        { data: 'status.Nome' }
                            
                    ]
                });
            });
        }
                
    ).catch(
        error => console.error('Erro ao obter local:', error)
        )
};
    
getLocal();

function createLabel(local) {

    let tr = document.createElement("tr");


    let pri_td = document.createElement("td");
    pri_td.setAttribute('id', 'loc_id' + local.Id);
    pri_td.textContent = local.Id;

    let nome = document.createElement("td");
    nome.setAttribute('id', 'loc_nome' + local.Id);
    nome.textContent = local.Nome;

    let bloco = document.createElement("td");
    bloco.setAttribute('id', 'loc_bloco' + local.Id);
    bloco.textContent = local.Bloco;

    let status = document.createElement("td");
    status.setAttribute('id', 'loc_Status' + local.Id);
    status.textContent = local.status.Id;

    tr.appendChild(pri_td);
    tr.appendChild(nome);
    tr.appendChild(bloco);
    tr.appendChild(status);

    LocalLabel.appendChild(tr);
}


form2.addEventListener("submit", e => {
    e.preventDefault();

    //ASSINCRONO

    var local = {
        Nome: titulo.value,
        bloco: bloco.options[bloco.selectedIndex].value
    }

    fetch("api/local/", {
        method: "POST",
        body: JSON.stringify(local),
        headers: {
            'Accept': 'application/json; charset=utf-8',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(
        response => response
    ).then(
        response => {
            //console.log('Success:', response)
            //LocalLabel.textContent = null;
            $("#table_Local").DataTable().ajax.reload();
            createAlert("Local adicionado com sucesso");
        }
    ).catch(
        error => console.error('Error:', error)
    );
    //LIMPAR CAMPOS

    //INSERIR LABEL
    //createLabel(local);
})
