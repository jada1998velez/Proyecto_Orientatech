import React, { useState, useEffect } from "react";
import { BasicLayout } from "@/layouts";
import { Separator } from "@/components/Shared";
import { Tab, Container, Table } from "semantic-ui-react";
import * as styles from "./info.module.scss";
import { set } from "lodash";


export default function InfoPage() {

  const [activeTab, setActiveTab] = useState("DAW");
  const [dataDAM, setDataDAM] = useState([]);
  const [dataDAW, setDataDAW] = useState([]);
  const [dataASIR, setDataASIR] = useState([]);
  const [salidaDAM, setSalidaDAM] = useState([]);
  const [salidaDAW, setSalidaDAW] = useState([]);
  const [salidaASIR, setSalidaASIR] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("/info_fpgs.csv");
      const csvData = await response.text();
      const rows = csvData.split("\n").map((row) => row.split(","));
      console.log(rows);
      // Filtrar datos por categoría (DAM, DAW, ASIR)
      const dataDAM = rows.filter((row) => row[4] === "DAM");
      const dataDAW = rows.filter((row) => row[4] === "DAW");
      const dataASIR = rows.filter((row) => row[4] === "ASIR");

      const salidaDAM = rows.filter((row) => row[6] === "DAM");
      const salidaDAW = rows.filter((row) => row[6] === "DAW");
      const salidaASIR = rows.filter((row) => row[6] === "ASIR");
      console.log(rows.filter((row) => row[6] === "DAM"));

      setDataDAM(dataDAM);
      setDataDAW(dataDAW);
      setDataASIR(dataASIR);

      setSalidaDAM(salidaDAM);
      setSalidaDAW(salidaDAW);
      console.log(salidaDAW);
      setSalidaASIR(salidaASIR);
    } catch (error) {
      console.error("Error fetching CSV:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const organizeDataByCategory = (category) => {
    switch (category) {
      case "DAM":
        return dataDAM;
      case "DAW":
        return dataDAW;
      case "ASIR":
        return dataASIR;
      default:
        return [];
    }
  };

  const DataTable = ({ data }) => {
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Cod.</Table.HeaderCell>
            <Table.HeaderCell>Módulo</Table.HeaderCell>
            <Table.HeaderCell>H.SEM.</Table.HeaderCell>
            <Table.HeaderCell>H.TOT.</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((item) => (
            <Table.Row key={item[0]}>
              <Table.Cell>{item[0]}</Table.Cell>
              <Table.Cell>{item[1]}</Table.Cell>
              <Table.Cell>{item[2]}</Table.Cell>
              <Table.Cell>{item[3]}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  };

  const SalidasLaboralesTable = ({ salidas }) => {
    return (
      <div className={styles.salidas}>
        <h2>Salidas Laborales</h2>
        <ul>
          {salidas.map((item) => (
            <li key={item[5]}>{item[5]}</li>
          ))}
        </ul>
      </div>
    );
  };

  const panes = [
    {
      menuItem: "DAW",
      render: () => (
        <Tab.Pane attached={false}>
          <h2>Asignaturas</h2>
          <DataTable data={organizeDataByCategory("DAW")} />
          <SalidasLaboralesTable salidas={salidaDAW} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "DAM",
      render: () => (
        <Tab.Pane attached={false}>
          <h2>Asignaturas</h2>
          <DataTable data={organizeDataByCategory("DAM")} />
          <SalidasLaboralesTable salidas={salidaDAM} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "ASIR",
      render: () => (
        <Tab.Pane attached={false}>
          <h2>Asignaturas</h2>
          <DataTable data={organizeDataByCategory("ASIR")} />
          <SalidasLaboralesTable salidas={salidaASIR} />
        </Tab.Pane>
      ),
    },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <BasicLayout>
      <Separator height={100} />
      <Container>
        <h1 className={styles.title}>
          Información sobre los Grados Superiores de Informática
        </h1>
        <Tab
          menu={{ secondary: true, pointing: true }}
          panes={panes}
          activeIndex={panes.findIndex((pane) => pane.menuItem === activeTab)}
          onTabChange={(_, { activeIndex }) =>
            handleTabClick(panes[activeIndex].menuItem)
          }
          className={styles.tabs}
        />
      </Container>
      <Separator height={100} />
    </BasicLayout>
  );
}
