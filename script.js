
document.getElementById('riskForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const edad = parseFloat(document.getElementById('edad').value);
    const colTotal = parseFloat(document.getElementById('colTotal').value);
    const hdl = parseFloat(document.getElementById('hdl').value);
    const pas = parseFloat(document.getElementById('pas').value);
    const tratamiento = document.getElementById('tratamiento').value === 'si';
    const fumador = document.getElementById('fumador').value === 'si';
    const diabetes = document.getElementById('diabetes').value === 'si';

    if (edad < 40 || edad > 79) {
        document.getElementById('resultado').textContent = 'Edad fuera de rango (40-79 años)';
        return;
    }

    const lnEdad = Math.log(edad);
    const lnCol = Math.log(colTotal);
    const lnHDL = Math.log(hdl);
    const lnPAS = Math.log(pas);

    const beta = {
        lnEdad: -29.799,
        lnCol: 13.540,
        lnEdad_lnCol: -3.114,
        lnHDL: -13.578,
        lnEdad_lnHDL: 3.149,
        lnPAS_trat: 2.019,
        lnPAS_no_trat: 1.957,
        fumador: 7.574,
        lnEdad_fumador: -1.665,
        diabetes: 0.661
    };

    let suma = 0;
    suma += beta.lnEdad * lnEdad;
    suma += beta.lnCol * lnCol;
    suma += beta.lnEdad_lnCol * lnEdad * lnCol;
    suma += beta.lnHDL * lnHDL;
    suma += beta.lnEdad_lnHDL * lnEdad * lnHDL;
    suma += tratamiento ? beta.lnPAS_trat * lnPAS : beta.lnPAS_no_trat * lnPAS;
    suma += fumador ? beta.fumador + beta.lnEdad_fumador * lnEdad : 0;
    suma += diabetes ? beta.diabetes : 0;

    const baseSurv = 0.9665;
    const mean = -29.18;

    const riesgo = 1 - Math.pow(baseSurv, Math.exp(suma - mean));
    const porcentaje = (riesgo * 100).toFixed(1);

    const resultado = document.getElementById('resultado');
    resultado.textContent = `Resultado simulado: riesgo estimado del ${porcentaje}% a 10 años.`;
});
