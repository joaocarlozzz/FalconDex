export function appendClass(element, classes = []) {
    classes.map(c => {
        element.classList.add(c)
    })
}

export function createAlert(message = "alert") {
    let divAlert = document.createElement("div");
    var alertClasses = ["alert", "alert-success", "alert-dismissible", "fade", "show"];
    appendClass(divAlert, alertClasses);
    divAlert.style.position = "absolute";
    divAlert.style.top = "10px";
    divAlert.style.right = "20px";
    divAlert.setAttribute("role", "alert");

    var textNode = document.createTextNode(message);

    divAlert.appendChild(textNode);

    var buttonClose = document.createElement("button");
    buttonClose.setAttribute("type", "button");
    buttonClose.classList.add("close");
    buttonClose.setAttribute("data-dismiss", "alert");
    buttonClose.setAttribute("aria-label", "Close");

    var buttonContext = document.createElement("span");
    buttonContext.setAttribute("aria-hidden", "true");
    buttonContext.innerHTML = "&times;";

    buttonClose.appendChild(buttonContext);

    divAlert.appendChild(buttonClose);

    document.body.appendChild(divAlert);

    setTimeout(document.body.remove(divAlert), 2000);
}

export function appendOption(element, value, text) {
    var option = document.createElement("option");
    option.text = text
    option.value = value;

    element.appendChild(option);
}