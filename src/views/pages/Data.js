import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

const Data = () => {
  return (
    <>
      <Header filter={true} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 d-flex justify-content-between">
                <h3 className="mb-0">List of Real Estate Data</h3>
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
                  <tr>
                    <th scope="row">Muscat</th>
                    <td>A'Seeb</td>
                    <td>30,000</td>
                    <td>600</td>
                    <td>SWAP</td>
                    <td>Residential</td>
                    <td>MOH</td>
                    <td>2018</td>
                  </tr>
                  <tr>
                    <th scope="row">Muscat</th>
                    <td>A'Seeb</td>
                    <td>30,000</td>
                    <td>600</td>
                    <td>SWAP</td>
                    <td>Residential</td>
                    <td>MOH</td>
                    <td>2018</td>
                  </tr>
                  <tr>
                    <th scope="row">Muscat</th>
                    <td>A'Seeb</td>
                    <td>30,000</td>
                    <td>600</td>
                    <td>SWAP</td>
                    <td>Residential</td>
                    <td>MOH</td>
                    <td>2018</td>
                  </tr>
                  <tr>
                    <th scope="row">Muscat</th>
                    <td>A'Seeb</td>
                    <td>30,000</td>
                    <td>600</td>
                    <td>SWAP</td>
                    <td>Residential</td>
                    <td>MOH</td>
                    <td>2018</td>
                  </tr>
                  <tr>
                    <th scope="row">Muscat</th>
                    <td>A'Seeb</td>
                    <td>30,000</td>
                    <td>600</td>
                    <td>SWAP</td>
                    <td>Residential</td>
                    <td>MOH</td>
                    <td>2018</td>
                  </tr>
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Data;
