
document.getElementById("riskForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const age = parseInt(document.getElementById("age").value);
    const gender = document.getElementById("gender").value;
    const race = document.getElementById("race").value;
    const totalChol = parseFloat(document.getElementById("totalChol").value);
    const hdl = parseFloat(document.getElementById("hdl").value);
    const sbp = parseFloat(document.getElementById("sbp").value);
    const htn = document.getElementById("htn").value === "yes";
    const smoker = document.getElementById("smoker").value === "yes";
    const diabetes = document.getElementById("diabetes").value === "yes";

    let risk = 0;

    // Fórmula simplificada ASCVD (ilustrativa)
    risk += age * 0.1;
    risk += (totalChol - hdl) * 0.02;
    risk += sbp * (htn ? 0.04 : 0.02);
    risk += smoker ? 5 : 0;
    risk += diabetes ? 5 : 0;
    if (gender === "female") risk -= 3;
    if (race === "african_american") risk += 2;

    risk = Math.max(0, Math.min(risk, 100));

    const color = risk < 5 ? "#28a745" : risk < 7.5 ? "#ffc107" : "#dc3545";

    document.getElementById("result").innerHTML = `<div style='background:${color};color:white;padding:10px;border-radius:8px;'>Riesgo a 10 años: ${risk.toFixed(1)}%</div>`;
});
