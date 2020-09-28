import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Collapse } from 'antd';


import { TopBar, TopBarSection, TopBarTitle, FormGroupContainer, FormGroup, Divider, TextArea, TextField, Button } from "@duik/it";
import { CaretRightOutlined } from '@ant-design/icons';
import Icon from '@duik/icon'

import "./style.scss"
const AddCustom = (props) => {
  const { Panel } = Collapse;

  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

  const [addStep, setAddStep] = useState("select-type");
  return (
    <form className="Add_Cluster_Form">
      <FormGroupContainer>
        <FormGroupContainer horizontal>
          <FormGroup>
            <TextField label="Cluster Name *" placeholder="e.g. sandbox" />
          </FormGroup>
          <FormGroup>
            <TextField label="Description" placeholder="e.g. Cluster for dev and test workloads." />
          </FormGroup>
        </FormGroupContainer>

        <FormGroupContainer horizontal>
          <Collapse
            bordered={false}
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            className="site-collapse-custom-collapse"
          >
            <Panel header="Member Roles" key="1">
              <p>{text}</p>
            </Panel>
            <Panel header="Labels & Annotations" key="2">
              <p>{text}</p>
            </Panel>
          </Collapse>
        </FormGroupContainer>
        <FormGroupContainer horizontal>
          <h2>Cluster Options</h2>
          <Button primary sm className="sm_button">
            Edit as YAML
            <Icon ml>
              attachment
            </Icon>
          </Button>
        </FormGroupContainer>
        <Divider margin />
        <FormGroupContainer horizontal>
          <Collapse
            bordered={false}
            defaultActiveKey={1}
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            className="site-collapse-custom-collapse"
          >
            <Panel header="Kubernetes Options" key="1">
              <p>{text}</p>
            </Panel>
            <Panel header="Private Registry" key="2">
              <p>{text}</p>
            </Panel>
            <Panel header="Advanced Options" key="3">
              <p>{text}</p>
            </Panel>
            <Panel header="Authorized Endpoint" key="4">
              <p>{text}</p>
            </Panel>
          </Collapse>
        </FormGroupContainer>
        <FormGroupContainer horizontal>
          <div></div>
          <Button className="sm_button" primary>
            Next
          </Button>
          <Button className="sm_button" transparent>
            Cancel
          </Button>
          <div></div>
        </FormGroupContainer>
      </FormGroupContainer>
    </form>
  );
};
export default AddCustom;
