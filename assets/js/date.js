export const obtenerFechaFormateada = (valorEpoch) => {
    // Crea un nuevo objeto Date con el valor del épsilon
    const fecha = new Date(valorEpoch);

    // Obtén el día de la semana
    const diaDeLaSemana = fecha.toLocaleDateString("es-ES", { weekday: "long" });

    // Obtén el día del mes
    const diaDelMes = fecha.getDate();

    // Obtén el mes
    const mes = fecha.toLocaleDateString("es-ES", { month: "long" });

    // Cadena formateada
    const fechaFormateada = `${diaDeLaSemana}, ${diaDelMes} ${mes}`;

    return fechaFormateada;
}

export const obtenerHoraFormateada = (cadenaHora) => {
    // Divide la cadena de tiempo en partes
    const [parteFecha, parteHora] = cadenaHora.split(' ');

    // Extrae las horas y los minutos
    const [horas, minutos] = parteHora.split(':').map(part => parseInt(part));

    // Formatea la hora para agregar ceros iniciales si es necesario
    const horaFormateada = `${horas < 10 ? '0' : ''}${horas}:${minutos < 10 ? '0' : ''}${minutos}`;

    return horaFormateada;
}