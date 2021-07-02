var USUARIO = [];

async function getUsuarios() {
    await fetch("/api/usuario/"
    ).then(
        usuarios => usuarios.json()
    ).then(
        usuarios => {
            usuarios.map(e => {
                USUARIO.push(e);
                console.log(e);
                //createAccordion(e);
            })
        }
    ).catch(
        error => console.error('Erro ao obter usuarios:', error)
    );
};

getUsuarios();

function createAccordion(data) {
    var accordion = document.querySelector("#usuarios-accordion");

    var section = document.createElement("div");
    section.classList.add("card");
    section.classList.add("z-depth-0");
    section.classList.add("bordered");
    section.classList.add("motion");

    var header = document.createElement("div");
    header.classList.add("card-header");
    header.classList.add("d-flex");
    header.classList.add("justify-content-between");

    var heading = document.createElement('h5');
    heading.classList.add("mb-0");

    var button = document.createElement('button');
    button.classList.add("btn");
    button.classList.add("btn-link");
    button.classList.add("badge");
    button.classList.add("badge-light");
    button.type = "button";
    button.setAttribute("data-toggle","collapse");
    button.setAttribute("data-target", "#collapseOne" + data.Id);
    button.setAttribute("aria-expanded", "true");
    button.setAttribute("aria-controls", "");

    var icon = document.createElement("i");
    icon.classList.add("fa");
    icon.classList.add("fa-user");
    icon.classList.add("mr-3");

    var NomeTextNode = document.createTextNode(data.Nome);

    button.appendChild(icon);
    button.appendChild(NomeTextNode);

    heading.appendChild(button);

    var editLink = document.createElement("a");
    editLink.href = "#";
    editLink.classList.add("text-black");
    editLink.classList.add("badge");
    editLink.classList.add("badge-light");

    var editIcon = document.createElement("i");
    editIcon.classList.add("fa");
    editIcon.classList.add("fa-edit");
    editIcon.classList.add("fa-2x");

    editLink.appendChild(editIcon);

    header.appendChild(heading);
    header.appendChild(editLink);

    var body = document.createElement("div");
    body.classList.add("collapse");
    body.setAttribute("aria-labelledby", "headingOne" + data.Id);
    body.setAttribute("data-parent", "#usuarios-accordion" + data.Id);

    var bodyContent = document.createElement("div");
    bodyContent.textContent = data.Email + " " + data.status + " " + data.permissao;

    body.appendChild(bodyContent);

    accordion.appendChild(header);
    accordion.appendChild(body);
}