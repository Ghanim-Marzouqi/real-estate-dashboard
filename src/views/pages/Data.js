import React from "react";
import { useRecoilValue } from "recoil";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
} from "reactstrap";

// core components
import Header from "components/Headers/Header.js";
import { getDataState } from "../../store";

import "../../assets/css/custom.css";

const Data = () => {
  const getData = useRecoilValue(getDataState);

  return (
    <>
      <Header filter={true} sync={true} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 d-flex justify-content-between">
                <h3 className="mb-0">List of Real Estate Data {getData.length > 0 ? "(" + getData.length + ")" : "(0)"}</h3>
                <Button size="sm" color="primary">
                  <i className="fas fa-file-csv"></i>{" "} Export Data
                </Button>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Region</th>
                    <th scope="col">Willayat</th>
                    <th scope="col">Price (O.R)</th>
                    <th scope="col">Area (m^2)</th>
                    <th scope="col">Contract</th>
                    <th scope="col">Type</th>
                    <th scope="col">Source</th>
                    <th scope="col">Year</th>
                  </tr>
                </thead>
                <tbody>
                  {getData.map((d, i) =>
                    <tr key={d._id}>
                      <th scope="row">{d.region}</th>
                      <td>{d.willayat}</td>
                      <td>{d.price}</td>
                      <td>{d.area}</td>
                      <td>{d.contract}</td>
                      <td>{d.type}</td>
                      <td>{d.source}</td>
                      <td>{d.year}</td>
                    </tr>)
                  }
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Data;
