
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('form').addEventListener('submit', function (e) {
        e.preventDefault();
        const edad = parseFloat(document.getElementById('edad').value);
        const colesterol = parseFloat(document.getElementById('colesterol').value);
        const hdl = parseFloat(document.getElementById('hdl').value);
        const sbp = parseFloat(document.getElementById('sbp').value);
        const tratamiento = document.getElementById('tratamiento').value === 'Si';
        const fumador = document.getElementById('fumador').value === 'Si';
        const diabetico = document.getElementById('diabetico').value === 'Si';

        const lnEdad = Math.log(edad);
        const lnColesterol = Math.log(colesterol);
        const lnHDL = Math.log(hdl);
        const lnSBP = Math.log(sbp);

        const coef = {
            edad: -29.799,
            lnCol: 13.540,
            lnHDL: -13.578,
            lnSBP_tratado: 2.019,
            lnSBP_no_tratado: 1.957,
            fumador: 7.574,
            diabetico: 0.661
        };

        let suma = coef.edad * lnEdad
                 + coef.lnCol * lnColesterol
                 + coef.lnHDL * lnHDL
                 + (tratamiento ? coef.lnSBP_tratado : coef.lnSBP_no_tratado) * lnSBP
                 + (fumador ? coef.fumador : 0)
                 + (diabetico ? coef.diabetico : 0);

        const media = -29.18;
        const base = 0.9665;
        const riesgo = 1 - Math.pow(base, Math.exp(suma - media));
        const riesgo_pct = (riesgo * 100).toFixed(1);

        const resultado = document.getElementById('resultado');
        resultado.innerHTML = 'Riesgo estimado a 10 años: ' + riesgo_pct + '%';
        resultado.className = 'resultado ' +
            (riesgo < 5 ? 'bajo' : riesgo < 7.5 ? 'moderado' : 'alto');
    });
});
