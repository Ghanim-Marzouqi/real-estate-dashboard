import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from "reactstrap";
import ReactLoading from 'react-loading';
import { ToastContainer, toast } from 'react-toastify';

import { syncData, cancelSyncData, loadData } from "../../services";
import { dataState, getDataState, filtersState, getFiltersState } from "../../store";

const Header = ({ filter, sync, stats, page, limit }) => {

  const data = useRecoilValue(getDataState);
  const [, setDataState] = useRecoilState(dataState);
  const [syncState, setSyncState] = useState(false);
  const [modal, setModal] = useState(false);
  const [, setFilters] = useRecoilState(filtersState);
  const filters = useRecoilValue(getFiltersState);

  let initialFilters = {
    year: "",
    region: "",
    willayat: "",
    village: "",
    zone: "",
    price: "",
    moh: false,
    external: false,
    sale: false,
    mortgage: false,
    swap: false,
    residential: false,
    industrial: false,
    commercial: false,
    residential_commercial: false,
    governmental: false,
    tourist: false,
    agricultral: false,
    others: false
  };

  const syncButtonHandler = async (e) => {
    e.preventDefault();

    setSyncState(true);

    const response = await syncData();

    if (response !== null) {
      setSyncState(false);
      setModal(false);
      if (response.status === "success") {
        notify(response.message);
        const dataResponse = await loadData({ ...filters });
        if (dataResponse !== null && dataResponse.status === "success") {
          setDataState(dataResponse);
        }
      } else {
        notify(response.message);
      }
    } else {
      notify("Server Error");
      setModal(false);
    }
  }

  const cancelSyncButtonHandler = async (e) => {
    e.preventDefault();
    const requestStatus = cancelSyncData();

    if (requestStatus) {
      setSyncState(false);
      notify("Sync has been canceled");
    }
  }

  const filtersButtonHandler = (e) => {
    e.preventDefault();
    setModal(true);
  }

  const searchButtonHandler = async (e) => {
    e.preventDefault();

    if (filters === initialFilters) {
      const response = await loadData({ page: page ? page : 1, limit: limit ? limit : 30 });

      if (response != null) {
        notify(response.message);
        setDataState(response.data);
      } else {
        notify("Cannot load data")
      }
    } else {
      const response = await loadData({ ...filters, page: 1, limit: 30 });

      if (response != null) {
        notify(response.message);
        setDataState(response.data);
      } else {
        notify("Cannot load data")
      }
    }
  }

  const notify = (message) => toast(message);

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <ToastContainer position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover />
        <Modal isOpen={modal}>
          <ModalHeader>Filters</ModalHeader>
          <ModalBody>
            <Form onSubmit={(e) => e.preventDefault()}>
              <FormGroup className="mt--3">
                <Label for="backdrop">By Year</Label>{' '}
                <Input className="m-1" bsSize="sm" type="number" name="year" placeholder="From" value={filters.year} onChange={e => setFilters({ ...filters, year: e.target.value })}></Input>
              </FormGroup>
              <FormGroup className="mt--3">
                <Label for="backdrop">By Location</Label>{' '}
                <div className="d-flex flex-row">
                  <Input className="m-1" bsSize="sm" type="text" name="region" placeholder="Region" value={filters.region} onChange={e => setFilters({ ...filters, region: e.target.value })}></Input>
                  <Input className="m-1" bsSize="sm" type="text" name="willayat" placeholder="Willayat" onChange={e => setFilters({ ...filters, willayat: e.target.value })}></Input>
                </div>
                <div className="d-flex flex-row">
                  <Input className="m-1" bsSize="sm" type="text" name="village" placeholder="Village" value={filters.village} onChange={e => setFilters({ ...filters, village: e.target.value })}></Input>
                  <Input className="m-1" bsSize="sm" type="text" name="zone" placeholder="Zone" onChange={e => setFilters({ ...filters, zone: e.target.value })}></Input>
                </div>
              </FormGroup>
              <FormGroup className="mt--3">
                <Label for="backdrop">Price Range</Label>{' '}
                <Input className="m-1" bsSize="sm" type="number" name="price" placeholder="Price" value={filters.price} onChange={e => setFilters({ ...filters, price: e.target.value })}></Input>
              </FormGroup>
              <div className="mt--3"><Label>By Source</Label></div>
              <FormGroup check inline>
                <Label check>
                  <Input type="checkbox" value={filters.moh} checked={filters.moh} onChange={e => setFilters({ ...filters, moh: e.target.checked ? true : false })} /> Ministry of Housing
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Label check>
                  <Input type="checkbox" value={filters.external} checked={filters.external} onChange={e => setFilters({ ...filters, external: e.target.checked ? true : false })} /> External Websites
                </Label>
              </FormGroup>
              <div className="mt-3"><Label>By Contract</Label></div>
              <FormGroup check inline>
                <Label check>
                  <Input type="checkbox" value={filters.sale} checked={filters.sale} onChange={e => setFilters({ ...filters, sale: e.target.checked ? true : false })} /> Sale
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Label check>
                  <Input type="checkbox" value={filters.mortgage} checked={filters.mortgage} onChange={e => setFilters({ ...filters, mortgage: e.target.checked ? true : false })} /> Mortgage
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Label check>
                  <Input type="checkbox" value={filters.swap} checked={filters.swap} onChange={e => setFilters({ ...filters, swap: e.target.checked ? true : false })} /> Swap
                </Label>
              </FormGroup>
              <div className="mt-3"><Label>By Type</Label></div>
              <FormGroup check inline>
                <Label check>
                  <Input type="checkbox" value={filters.residential} checked={filters.residential} onChange={e => setFilters({ ...filters, residential: e.target.checked ? true : false })} /> Residential
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Label check>
                  <Input type="checkbox" value={filters.industrial} checked={filters.industrial} onChange={e => setFilters({ ...filters, industrial: e.target.checked ? true : false })} /> Industrial
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Label check>
                  <Input type="checkbox" value={filters.commercial} checked={filters.commercial} onChange={e => setFilters({ ...filters, commercial: e.target.checked ? true : false })} /> Commercial
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Label check>
                  <Input type="checkbox" value={filters.residential_commercial} checked={filters.residential_commercial} onChange={e => setFilters({ ...filters, residential_commercial: e.target.checked ? true : false })} /> Residential / Commercial
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Label check>
                  <Input type="checkbox" value={filters.governmental} checked={filters.governmental} onChange={e => setFilters({ ...filters, governmental: e.target.checked ? true : false })} /> Governmental
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Label check>
                  <Input type="checkbox" value={filters.tourist} checked={filters.tourist} onChange={e => setFilters({ ...filters, tourist: e.target.checked ? true : false })} /> Tourist
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Label check>
                  <Input type="checkbox" value={filters.agricultral} checked={filters.agricultral} onChange={e => setFilters({ ...filters, agricultral: e.target.checked ? true : false })} /> Agricultural
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Label check>
                  <Input type="checkbox" value={filters.others} checked={filters.others} onChange={e => setFilters({ ...filters, others: e.target.checked ? true : false })} /> Others
                </Label>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={searchButtonHandler}>Search</Button>{' '}
            <Button color="secondary" onClick={() => setModal(false)}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            {stats === true ? <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col mb-3">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total Contracts
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {data.totalDocs}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col mb-3">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Sale Contract
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{data.docs.filter(d => d.contract === "sale").length}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-hand-holding-usd" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col mb-3">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Mortgage Contract
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{data.docs.filter(d => d.contract === "mortgage").length}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-file-invoice-dollar" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col mb-3">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Swap Contract
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{data.docs.filter(d => d.contract === "swap").length}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-exchange-alt" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row> : null}
            {/* Filter Button */}
            <Row className="mt-4">
              <Col lg="12" xl="12" className="text-right">
                {sync === true && syncState === false ? <Button className="btn-icon btn-2" size="sm" color="default" type="button" onClick={syncButtonHandler}>
                  <i className="fas fa-sync-alt" />{" "}Sync
                </Button> : null}
                {sync === true && syncState === true ? <Button className="btn-icon btn-2" size="sm" color="success" type="button" onClick={cancelSyncButtonHandler}>
                  <div style={{ width: 20 }}><ReactLoading type="bars" height={'auto'} width={'100%'} />{" "}</div>
                </Button> : null}
                {filter === true ? <Button className="btn-icon btn-2" size="sm" color="danger" type="button" onClick={filtersButtonHandler}>
                  <i className="fas fa-filter" />{" "}Filters
                </Button> : null}
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
