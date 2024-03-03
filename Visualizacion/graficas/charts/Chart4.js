import React, { useEffect } from "react";
import Chart from "chart.js";

export default function Chart4({ answers }) {
  useEffect(() => {
    if (answers.length > 0) {
      const ctx4 = document.getElementById("Chart4").getContext("2d");
      ctx4.canvas.parentNode.style.width = "60%";

      //  Valores
      // Ciberseguridad y hacking ético
      const interesesCiber = answers
        .map(
          (answer) =>
            answer[
              "¿Te genera curiosidad aprender sobre el mundo de la ciberseguridad y hacking ético?"
            ]
        )
        .filter((valor) => typeof valor === "number");

      const sumaCiber = interesesCiber.reduce(
        (acc, interes) => acc + interes,
        0
      );
      const mediaCiber = sumaCiber / interesesCiber.length;

      // Diseño web
      const interesesDis = answers
        .map(
          (answer) =>
            answer[
              "Sientes curiosidad por cómo está hecha una página web, su estética y diseño me resultan lo más interesante"
            ]
        )
        .filter((valor) => typeof valor === "number");

      const sumaDis = interesesDis.reduce((acc, interes) => acc + interes, 0);
      const mediaDis = sumaDis / interesesDis.length;

      // Programación
      const interesesProg = answers
        .map(
          (answer) =>
            answer[
              "He sentido atracción en cómo los programas informáticos incluyen distintos enfoques como el conocimiento de áreas matemáticas, estadística, ciencias…"
            ]
        )
        .filter((valor) => typeof valor === "number");

      const sumaProg = interesesProg.reduce((acc, interes) => acc + interes, 0);
      const mediaProg = sumaProg / interesesProg.length;

      // Mantenimiento de sistemas
      const interesesSis = answers
        .map(
          (answer) =>
            answer[
              "Sientes interés por el mantenimiento de sistemas, entonos de red, hardware y software"
            ]
        )
        .filter((valor) => typeof valor === "number");

      const sumaSis = interesesSis.reduce((acc, interes) => acc + interes, 0);
      const mediaSis = sumaSis / interesesSis.length;

      const dataIn = {
        labels: [
          "Mantenimiento de sistemas",
          "Ciberseguridad",
          "Programación",
          "Diseño web",
        ],
        datasets: [
          {
            label: "Intereses",
            data: [mediaSis, mediaCiber, mediaProg, mediaDis],
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 2,
          },
        ],
      };

      // Gráfica
      const options = {
        legend: {
          display: false,
        },
        scale: {
          angleLines: {
            display: true,
          },
          ticks: {
            suggestedMin: 0,
            suggestedMax: 4,
            stepSize: 1,
          },
        },
      };

      const radarChart = new Chart(ctx4, {
        type: "radar",
        data: dataIn,
        options: options,
      });
    }
  }, [answers]);

  return <canvas id="Chart4"></canvas>;
}
