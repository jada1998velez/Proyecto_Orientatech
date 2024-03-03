import React, { useEffect } from "react";
import Chart from "chart.js";

export default function Chart3({ answers }) {
  useEffect(() => {
    if (answers.length > 0) {
      const ctx3 = document.getElementById("Chart3").getContext("2d");
      ctx3.canvas.parentNode.style.width = "60%";

      // Valores
      const frecuenciaMotivo = answers.reduce((acc, answer) => {
        const motivo = answer["Motivo por el que quieres estudiar un CFGS"];
        if (
          motivo === "Especialización profesional" ||
          motivo === "Salida laboral" ||
          motivo == "Continuar mi formación"
        ) {
          acc[motivo] = (acc[motivo] || 0) + 1;
        }
        return acc;
      }, {});

      const datosGraficoMotivo = Object.entries(frecuenciaMotivo).map(
        ([motivo, frecuencia]) => ({ motivo, frecuencia })
      );

      const labels3 = datosGraficoMotivo.map((item) => item.motivo);
      const data3 = datosGraficoMotivo.map((item) => item.frecuencia);

      // Gráfica
      new Chart(ctx3, {
        type: "doughnut",
        data: {
          labels: labels3,
          datasets: [
            {
              data: data3,
              backgroundColor: [
                "rgba(255, 153, 204, 0.7)",
                "rgba(102, 255, 204, 0.7)",
                "rgba(204, 255, 102, 0.7)",
                "rgba(204, 102, 255, 0.4)",
              ],
              borderColor: [
                "rgba(255, 153, 204, 1)",
                "rgba(102, 255, 204, 1)",
                "rgba(204, 255, 102, 1)",
                "rgba(204, 102, 255, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              ticks: {
                beginAtZero: true,
              },
            },
          },
        },
      });
    }
  }, [answers]);

  return <canvas id="Chart3"></canvas>;
}
