'use strict'

import "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.bundle.min.js";

var ctx = document.getElementById('myChart').getContext('2d');

var chartSelect = document.querySelector("#chartType");

var LABELS = [];
var DATA = [];

var chart = new Chart(ctx, {
    type: 'bar',
    data: {
        datasets: [
            {
                backgroundColor: [
                    '#45688e',
                    '#2b8c39',
                    '#9e6c18',
                    '#c153c5de',
                    '#53c2c5de',
                    '#c55353de'
                ]
            }
        ]
    },
    options: {
        chart: {
            fontColor: 'black',
        },
        legend: {
            display: false,
            labels: {
                fontColor: 'black',
                fontFamily: 'Segoe UI',
                fontSize: 16
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

Chart.defaults.global.defaultFontFamily = "Segoe UI";
Chart.defaults.global.defaultFontSize = 16;
Chart.defaults.global.defaultFontColor = "black";

async function getGrafico(id) {
    LABELS = [];
    DATA = [];

    //http://localhost:58052/api/equipamento/
    fetch("/api/grafico/" + id
    ).then(
        grafico => grafico.json()
    ).then(
        grafico => {
            grafico.map(e => {
                LABELS.push(e.nome);
                DATA.push(e.quantidade);
            })

            console.log(LABELS);
            console.log(DATA);
            addData(chart, LABELS, DATA);
        }
    ).catch(
        error => console.error('Erro ao obter grafico:', error)
    );


};

getGrafico(1);

addData(chart, LABELS, DATA)

function addData(chart, label, data) {
    chart.data.labels = label;
    chart.data.datasets.forEach((dataset) => {
        dataset.data = data.slice();
    });
    chart.update();
}

chartSelect.addEventListener('change', e => {
    var value = e.target.options[e.target.selectedIndex].value;

    getGrafico(value);
});

function updateChart(chart, LABELS, DATA) {
    removeData(chart);

    addData(chart, LABELS, DATA);
}

function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}