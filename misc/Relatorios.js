"use strict"

import './FileSaver.js';
import './Docx.js';

import { getAll, toDataURL } from './FetchAPI.js';

import { appendClass, createAlert, appendOption } from './DOMManipulate.JS';

var form1 = document.querySelector("#form1");
var form2 = document.querySelector("#form2");
var selectLocal = document.querySelector("#selectLocal");

var image;

//fetch
getAll('/api/local').then(locais =>
    locais.map(local => {
        appendOption(selectLocal, local.Nome, local.Nome);
    })
);

form1.addEventListener('submit', e => {
    e.preventDefault();
    let formData = new FormData(form1);

    var object = {};
    formData.forEach((value, key) => object[key] = value);
    console.log(object);

    relatorioManutencao(object);
});

form2.addEventListener('submit', e => {
    e.preventDefault();

    let formData = new FormData(form2);

    var object = {};
    formData.forEach((value, key) => object[key] = value);
    console.log(object);

});

function relatorioManutencao(data = {}) {

    const table = new docx.Table({
        width: {
            size: 100,
            type: docx.WidthType.PERCENTAGE,
        },
        margins: {
            top: 400,
            bottom: 400,
            right: 400,
            left: 400,
        },
        rows: [
            new docx.TableRow({
                tableHeader: true,
                children: [
                    new docx.TableCell({
                        columnSpan: 2,
                        children: [new docx.Paragraph({
                            text: "Solicitação de manutenção externa",
                            heading: docx.HeadingLevel.HEADING_1,
                            alignment: docx.AlignmentType.CENTER
                        })],
                    })
                ],
                height: {
                    height: 1000
                }
            }),
            new docx.TableRow({
                children: [
                    new docx.TableCell({
                        children: [new docx.Paragraph("Item")],
                    }),
                    new docx.TableCell({
                        children: [new docx.Paragraph(data.item)],
                    }),
                ],
            }),
            new docx.TableRow({
                children: [
                    new docx.TableCell({
                        children: [new docx.Paragraph("Nª Série")],
                    }),
                    new docx.TableCell({
                        children: [new docx.Paragraph(data.nSerie)],
                    }),
                ],
            }),
            new docx.TableRow({
                children: [
                    new docx.TableCell({
                        children: [new docx.Paragraph("Local da retirada")],
                    }),
                    new docx.TableCell({
                        children: [new docx.Paragraph(data.local)],
                    }),
                ],
            }),
            new docx.TableRow({
                children: [
                    new docx.TableCell({
                        children: [new docx.Paragraph("Problema")],
                    }),
                    new docx.TableCell({
                        children: [new docx.Paragraph(data.problema)],
                    }),
                ],
            }),
            new docx.TableRow({
                children: [
                    new docx.TableCell({
                        children: [new docx.Paragraph("Descrição")],
                    }),
                    new docx.TableCell({
                        children: [new docx.Paragraph(data.descricao)],
                    }),
                ],
            }),
        ],
    });

    const doc = new docx.Document();

    const image1 = docx.Media.addImage(doc, image, 650, 120);

    doc.addSection({
        creator: "Técnico",
        description: "Relatório de manutenção externa",
        margins: {
            top: 1000,
            right: 1500,
            bottom: 1500,
            left: 1000
        },
        headers: {
            default: new docx.Header({
                children: [new docx.Paragraph(image1)],
            }),
        },
        children: [table]
    });

    docx.Packer.toBlob(doc).then(blob => {
        console.log(blob);

        var time = new Date();

        var day = time.getDate();
        var month = time.getMonth();
        var year = time.getFullYear();

        var name = "RelatorioDeManutencao_" + day + "" + month + "" + year + ".docx";

        saveAs(blob, name);
    }).then(e => {
        console.log("Documento criado com sucesso");
        createAlert("Documento criado com sucesso");
    });

}

toDataURL("./img/headerFatec.png")
    .then(dataUrl => {
        console.log('IMAGEM LOCALIZADA:');
        image = dataUrl;
    })