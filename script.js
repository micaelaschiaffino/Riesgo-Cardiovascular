
document.getElementById("risk-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const age = parseInt(document.getElementById("age").value);
    const totalChol = parseFloat(document.getElementById("totalChol").value);
    const hdl = parseFloat(document.getElementById("hdl").value);
    const systolic = parseFloat(document.getElementById("systolic").value);
    const sex = document.getElementById("sex").value;
    const race = document.getElementById("race").value;
    const bpMed = document.getElementById("bpMed").value === "yes";
    const smoker = document.getElementById("smoker").value === "yes";
    const diabetes = document.getElementById("diabetes").value === "yes";

    const lnAge = Math.log(age);
    const lnTC = Math.log(totalChol);
    const lnHDL = Math.log(hdl);
    const lnSBP = Math.log(systolic);

    let coef = {}, mean = 0, baseline = 0;

    if (sex === "female" && race === "white") {
        coef = { age: -29.799, tc: 13.540, age_tc: -3.114, hdl: -13.578, age_hdl: 3.149,
                 sbp: bpMed ? 2.822 : 1.998, smoker: 7.574, age_smoker: -1.665, diabetes: 0.661 };
        mean = -29.18;
        baseline = 0.9665;
    } else if (sex === "male" && race === "white") {
        coef = { age: 12.344, tc: 11.853, age_tc: -2.664, hdl: -7.99, age_hdl: 1.769,
                 sbp: bpMed ? 1.797 : 1.764, smoker: 7.837, age_smoker: -1.795, diabetes: 0.658 };
        mean = 61.18;
        baseline = 0.9144;
    } else if (sex === "female" && race === "african_american") {
        coef = { age: 17.114, tc: 0.94, hdl: -18.92, sbp: bpMed ? 29.291 : 27.82,
                 smoker: 0.691, diabetes: 0.874 };
        mean = 86.61;
        baseline = 0.9533;
    } else if (sex === "male" && race === "african_american") {
        coef = { age: 2.469, tc: 0.302, hdl: -0.307, sbp: bpMed ? 1.916 : 1.809,
                 smoker: 0.549, diabetes: 0.645 };
        mean = 19.54;
        baseline = 0.8954;
    } else {
        document.getElementById("result").innerHTML = "Grupo no soportado.";
        return;
    }

    let sum = coef.age * lnAge +
              coef.tc * lnTC +
              (coef.age_tc !== undefined ? coef.age_tc * lnAge * lnTC : 0) +
              coef.hdl * lnHDL +
              (coef.age_hdl !== undefined ? coef.age_hdl * lnAge * lnHDL : 0) +
              coef.sbp * lnSBP +
              coef.smoker * (smoker ? 1 : 0) +
              (coef.age_smoker !== undefined ? coef.age_smoker * lnAge * (smoker ? 1 : 0) : 0) +
              coef.diabetes * (diabetes ? 1 : 0);

    const risk = 1 - Math.pow(baseline, Math.exp(sum - mean));
    const result = `Resultado simulado: riesgo estimado del ${(risk * 100).toFixed(1)}% a 10 años.`;

    const resultDiv = document.getElementById("result");
    resultDiv.innerText = result;

    document.getElementById("recommendations").classList.remove("hidden");
});
