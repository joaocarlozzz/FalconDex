export default function (datetime = new Date()) {
    if (Math.floor(getDays(datetime)) > 0) {
        return Math.floor(getDays(datetime)) + " Dias";
    }
    else if (Math.floor(getHours(datetime)) > 0) {
        return Math.floor(getHours(datetime)) + " Horas";
    }
    return Math.floor(getMinutes(datetime)) + " Minutos";
}


function getDays(datetime = new Date()) {
    return getHours(datetime) / 24;
}

function getHours(datetime = new Date()) {
    return getMinutes(datetime) / 60;
}

function getMinutes(datetime = new Date()) {
    let data = new Date(datetime);
    let now = new Date();

    return (now.getTime() - data.getTime()) / 60000;
}