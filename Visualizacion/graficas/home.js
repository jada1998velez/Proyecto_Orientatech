import { useEffect, useState } from "react";
import { BasicLayout } from "@/layouts";
import { Separator } from "@/components/Shared";
import Link from "next/link";
import Chart1 from "./charts/Chart1";
import Chart2 from "./charts/Chart2";
import Chart3 from "./charts/Chart3";
import Chart4 from "./charts/Chart4";

export default function HomePage() {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/mongodb");
        if (response.ok) {
          const data = await response.json();
          setAnswers(data);
        } else {
          console.error("Error:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <BasicLayout>
      <Separator height={100} />
      <h1>Edades</h1>
      <Chart1 answers={answers} />
      <h1>Género</h1>
      <Chart2 answers={answers} />
      <h1>Motivo por el que estudiar un CFGS</h1>
      <Chart3 answers={answers} />
      <h1>Intereses generales</h1>
      <Chart4 answers={answers} />
      <Separator height={20} />
    </BasicLayout>
  );
}
