import React, { useEffect } from "react";
import Chart from "chart.js";

export default function Chart1({ answers }) {
  useEffect(() => {
    if (answers.length > 0) {
      const ctx = document.getElementById("Chart1").getContext("2d");
      ctx.canvas.parentNode.style.width = "60%";

      // Valores
      const edades = answers.map((answer) => parseInt(answer.Edad));
      const edadesFiltradas = edades.filter((edad) => edad <= 99);
      const frecuenciaEdades = edadesFiltradas.reduce((acc, edad) => {
        acc[edad] = (acc[edad] || 0) + 1;
        return acc;
      }, {});
      const datosGraficoEdades = Object.entries(frecuenciaEdades).map(
        ([label, data]) => ({ label, data })
      );

      var labels = datosGraficoEdades.map((item) => item.label);
      var data = datosGraficoEdades.map((item) => item.data);

      // Gráfica
      new Chart(ctx, {
        type: "pie",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Pie Dataset",
              data: data,
              backgroundColor: [
                "rgba(153, 102, 255, 0.4)",
                "rgba(255, 159, 64, 0.4)",
                "rgba(51, 204, 51,0.4)",
                "rgb(191, 191, 63,0.4)",
              ],
              borderColor: [
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(51, 204, 51,1)",
                "rgb(191, 191, 63,1)",
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

  return <canvas id="Chart1"></canvas>;
}
