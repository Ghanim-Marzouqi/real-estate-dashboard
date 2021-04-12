import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { Line, Bar, Pie } from "react-chartjs-2";

import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
} from "reactstrap";

import Header from "components/Headers/Header.js";
import { getDataState } from "../../store";

const Dashboard = (props) => {
  const data = useRecoilValue(getDataState);
  const [lineChart, setLineChart] = useState({});
  const [barGraph, setBarGraph] = useState({});
  const [pieChart, setPieChart] = useState({});

  useEffect(() => {
    const fillLineChartValues = () => {
      return {
        labels: ["2015", "2016", "2017", "2018", "2019", "2020", "2021"],
        datasets: [
          {
            label: "Market Value",
            data: [
              data.mohDocsCount.count2015,
              data.mohDocsCount.count2016,
              data.mohDocsCount.count2017,
              data.mohDocsCount.count2018,
              data.mohDocsCount.count2019,
              data.mohDocsCount.count2020,
              data.mohDocsCount.count2021
            ],
            fill: false,
            borderColor: "rgba(75,192,192,1)"
          },
          {
            label: "Market Price",
            data: [
              data.externalDocsCount.count2015,
              data.externalDocsCount.count2016,
              data.externalDocsCount.count2017,
              data.externalDocsCount.count2018,
              data.externalDocsCount.count2019,
              data.externalDocsCount.count2020,
              data.externalDocsCount.count2021
            ],
            fill: false,
            borderColor: "#742774"
          }
        ]
      }
    }

    const fillBarGraphValues = () => {
      return {
        labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021'],
        datasets: [
          {
            label: 'Market Value',
            backgroundColor: 'rgba(75,192,192,1)',
            borderWidth: 2,
            data: [
              data.mohDocsCount.count2015,
              data.mohDocsCount.count2016,
              data.mohDocsCount.count2017,
              data.mohDocsCount.count2018,
              data.mohDocsCount.count2019,
              data.mohDocsCount.count2020,
              data.mohDocsCount.count2021
            ],
          },
          {
            label: 'Market Price',
            backgroundColor: '"#742774"',
            borderWidth: 2,
            data: [
              data.externalDocsCount.count2015,
              data.externalDocsCount.count2016,
              data.externalDocsCount.count2017,
              data.externalDocsCount.count2018,
              data.externalDocsCount.count2019,
              data.externalDocsCount.count2020,
              data.externalDocsCount.count2021
            ],
          }
        ]
      }
    }

    const fillPieChartValues = () => {
      return {
        labels: ['Sale', 'Mortgage', 'Swap'],
        datasets: [
          {
            label: 'Contract Comparison',
            backgroundColor: [
              '#B21F00',
              '#C9DE00',
              '#00A6B4',
            ],
            hoverBackgroundColor: [
              '#501800',
              '#4B5000',
              '#003350',
            ],
            data: [
              data.saleDocsCount,
              data.mortgageDocsCount,
              data.swapDocsCount
            ]
          }
        ]
      }
    }

    setLineChart(fillLineChartValues());
    setBarGraph(fillBarGraphValues());
    setPieChart(fillPieChartValues());
  }, [data]);

  return (
    <>
      <Header filter={true} sync={true} stats={true} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h2 className="text-white mb-0">Market Value vs Market Price</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Line Chart */}
                <Line data={lineChart} />
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h2 className="mb-0">Market Value / Market Price</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Bar Chart */}
                <Bar data={barGraph} />
                <div className="mt-5">
                  <Pie data={pieChart} />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
