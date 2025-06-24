document.getElementById('riskForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const edad = parseInt(document.getElementById('edad').value);
    const resultado = document.getElementById('resultado');
    if (edad && edad > 0) {
        resultado.innerHTML = 'Resultado simulado: riesgo estimado del 3.2% a 10 años.';
    } else {
        resultado.innerHTML = 'Por favor, complete todos los campos correctamente.';
    }
});
