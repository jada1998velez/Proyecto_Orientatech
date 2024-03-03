import React, { useEffect } from "react";
import Chart from "chart.js";

export default function Chart2({ answers }) {
  useEffect(() => {
    if (answers.length > 0) {
      const ctx2 = document.getElementById("Chart2").getContext("2d");
      ctx2.canvas.parentNode.style.width = "60%";
    
      // Valores
      const frecuenciaGeneros = answers.reduce((acc, answer) => {
        const genero = answer.Género.toLowerCase();
        if (
          genero === "masculino" ||
          genero === "femenino" ||
          genero == "prefiero no decirlo" ||
          genero == "otro"
        ) {
          acc[genero] = (acc[genero] || 0) + 1;
        }
        return acc;
      }, {});

      const datosGraficoGeneros = Object.entries(frecuenciaGeneros).map(
        ([genero, cantidad]) => ({ genero, cantidad })
      );

      const generosData = datosGraficoGeneros.map((item) => item.genero);
      const generosCantidad = datosGraficoGeneros.map((item) => item.cantidad);
      const backgroundColors = [
        "rgba(255, 99, 132, 0.7)",
        "rgba(54, 162, 235, 0.7)",
        "rgba(255, 206, 86, 0.7)",
        "rgba(75, 192, 192, 0.7)",
      ];

      const datasets = generosData.map((genero, index) => {
        return {
          label: genero,
          data: [generosCantidad[index]],
          backgroundColor: backgroundColors[index],
          borderColor: backgroundColors[index],
          borderWidth: 1,
        };
      });

      // Gráficas
      new Chart(ctx2, {
        type: "bar",
        data: {
          labels: [""],
          datasets: datasets,
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

  return <canvas id="Chart2"></canvas>;
}
