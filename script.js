
document.getElementById('riskForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const edad = parseInt(document.getElementById('edad').value);
    const col_total = parseInt(document.getElementById('col_total').value);
    const hdl = parseInt(document.getElementById('hdl').value);
    const tas = parseInt(document.getElementById('tas').value);
    const tratamiento = parseInt(document.getElementById('tratamiento').value);
    const fumador = parseInt(document.getElementById('fumador').value);
    const diabetico = parseInt(document.getElementById('diabetico').value);

    // Fórmula simplificada (ejemplo ilustrativo)
    let riesgo = 0.02 * edad + 0.01 * col_total - 0.015 * hdl + 0.018 * tas;
    riesgo += tratamiento * 5 + fumador * 7 + diabetico * 6;
    riesgo = Math.min(Math.max(riesgo, 0), 100).toFixed(1);

    let mensaje = "Resultado simulado: riesgo estimado del " + riesgo + "% a 10 años.";
    document.getElementById('resultado').innerText = mensaje;
});
