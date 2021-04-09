import React, { useRef } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { CSVLink } from "react-csv";

// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Table,
  Container,
  Row,
  Pagination,
  PaginationItem,
  PaginationLink,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

// core components
import Header from "components/Headers/Header.js";
import { getDataState, dataState, getFiltersState } from "../../store";

import "../../assets/css/custom.css";
import { loadData } from "../../services";

const Data = () => {
  const getData = useRecoilValue(getDataState);
  const filters = useRecoilValue(getFiltersState);
  const [, setDataState] = useRecoilState(dataState);
  const limit = useRef(30);

  const PaginationComponent = () => {
    return (
      <div className="d-flex flex-row justify-content-between w-100">
        <Form inline>
          <FormGroup size="sm">
            <Label>Records Per Page:</Label>
            <Input type="select" bsSize="sm" value={limit.current} onChange={e => {
              e.preventDefault();
              limit.current = e.target.value;
              getUpdatedData(e, getData.page, limit.current)
            }}>
              <option value={30}>30</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </Input>
          </FormGroup>
        </Form>
        <Pagination size="sm" aria-label="Page navigation example">
          <PaginationItem>
            <PaginationLink first onClick={e => getUpdatedData(e, 1, limit.current)} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink previous onClick={e => {
              e.preventDefault();
              if (getData.hasPrevPage) {
                getUpdatedData(e, getData.prevPage, limit.current);
              }
            }} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink next onClick={e => {
              e.preventDefault();
              if (getData.hasNextPage) {
                getUpdatedData(e, getData.nextPage, limit.current);
              }
            }} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink last onClick={e => getUpdatedData(e, getData.totalPages, limit.current)} />
          </PaginationItem>
        </Pagination>
      </div>

    );
  }

  const getUpdatedData = async (e, p, l) => {
    e.preventDefault();

    const response = await loadData({ ...filters, page: p, limit: l });

    if (response !== null) {
      if (response.status === "success") {
        console.log("message", response.message);
        setDataState(response.data)
      } else {
        console.log("message", response.message);
        setDataState({
          docs: [],
          totalDocs: 0,
          totalPages: 0,
          page: 1,
          pagingCounter: 0,
          hasPrevPage: false,
          hasNextPage: false,
          prevPage: 0,
          nextPage: 0
        });
      }
    } else {
      setDataState({
        docs: [],
        totalDocs: 0,
        totalPages: 0,
        page: 1,
        pagingCounter: 0,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: 0,
        nextPage: 0
      });
    }
  }

  const getCSVData = () => {
    return getData.docs.map((el, i) => ({
      No: ++i,
      Region: el.region,
      Willayat: el.willayat,
      Village: el.village,
      Zone: el.zone,
      Area: el.area,
      Price: el.price,
      Contract: el.contract,
      Type: el.type,
      Year: el.year,
      Source: el.source === "MOH" ? "Ministry of Housing" : "External Websites"
    }));
  }

  return (
    <>
      <Header filter={true} sync={true} page={getData.page} limit={limit.current} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 d-flex justify-content-between">
                <h3 className="mb-0">List of Real Estate Data {getData.totalDocs}</h3>
                <CSVLink filename={"tamleek-home-data.csv"} data={getCSVData()}>
                  <i className="fas fa-file-csv"></i>{" "} Export Data
                </CSVLink>
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
                  {getData.docs.map((d, i) =>
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
              <CardFooter className="d-flex flex-row">
                <PaginationComponent />
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Data;
