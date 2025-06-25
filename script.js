
document.getElementById('risk-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const age = parseFloat(document.getElementById('age').value);
  const sex = document.getElementById('sex').value;
  const race = document.getElementById('race').value;
  const tc = parseFloat(document.getElementById('tc').value);
  const hdl = parseFloat(document.getElementById('hdl').value);
  const sbp = parseFloat(document.getElementById('sbp').value);
  const htn = parseInt(document.getElementById('htn').value);
  const diabetes = parseInt(document.getElementById('diabetes').value);
  const smoker = parseInt(document.getElementById('smoker').value);

  const ln = Math.log;
  let coef = {};
  let baselineSurvival;

  if (sex === 'female' && race === 'white') {
    coef = {age: -29.799, tc: 13.540, hdl: -13.578, sbpTx: 2.019, sbpNoTx: 1.957, smoker: 7.574, diabetes: 0.661, mean: -29.18};
    baselineSurvival = 0.9665;
  } else if (sex === 'male' && race === 'white') {
    coef = {age: 12.344, tc: 11.853, hdl: -7.99, sbpTx: 1.797, sbpNoTx: 1.764, smoker: 7.837, diabetes: 0.658, mean: 61.18};
    baselineSurvival = 0.9144;
  } else {
    document.getElementById('result').textContent = "Raza aún no soportada en esta versión.";
    return;
  }

  const sum = coef.age * ln(age) +
              coef.tc * ln(tc) +
              coef.hdl * ln(hdl) +
              coef.smoker * smoker +
              coef.diabetes * diabetes +
              (htn ? coef.sbpTx : coef.sbpNoTx) * ln(sbp);

  const risk = 1 - Math.pow(baselineSurvival, Math.exp(sum - coef.mean));
  const riskPercent = (risk * 100).toFixed(1);

  const result = document.getElementById('result');
  let color = risk >= 0.2 ? 'red' : (risk >= 0.075 ? 'orange' : (risk >= 0.05 ? 'yellow' : 'green'));
  result.style.backgroundColor = color;
  result.innerHTML = `<p>Riesgo a 10 años: ${riskPercent}%</p>`;

  document.getElementById('recomendaciones').innerHTML = `
    <h3>Recomendaciones:</h3>
    <ul>
      <li>Controlar factores de riesgo cardiovascular.</li>
      <li>Consultar al especialista si el riesgo es elevado.</li>
      <li>Modificar hábitos: dieta, ejercicio, dejar de fumar.</li>
    </ul>
  `;
});
