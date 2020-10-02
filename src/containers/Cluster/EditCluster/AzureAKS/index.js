import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as images from "../../../../exampleAssets";
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { ScrollArea, ContainerHorizontal, FormGroupContainer, FormGroup, Divider, TextField, Avatar, TextArea } from "@duik/it";
import { Collapse, Table, Select, Radio, InputNumber, Tooltip, Alert, Input, Upload, message, Button, Checkbox, Row, Col, Space } from 'antd';
import { CaretRightOutlined, MinusOutlined, QuestionCircleOutlined, UploadOutlined, CopyOutlined, EditOutlined, CloseCircleOutlined, PlusOutlined } from '@ant-design/icons';
import Icon from '@duik/icon'

import AWS from "aws-sdk/global";
import Identicon from "identicon.js";

import "./style.scss"
import { Redirect } from "react-router-dom";

const CollapseHeader = (props) => {
  return (
    <div className="collapse_header">
      <h6 className="collapse_header_title">{props.title}</h6>
      <p className="collapse_header_description">{props.description}</p>
    </div>
  )
};

const InputGroups = (props) => {
  return (
    <FormGroupContainer className="inputGroups" horizontal>
      <FormGroup>
        <TextField label={props.index == 0 ? "Key *" : ""} placeholder="e.g. foo" value={props.key_val} onChange={() => props.handleChange} />
      </FormGroup>
      <p className={props.index == 0 ? "equal first" : "equal"}> = </p>
      <FormGroup>
        <TextField label={props.index == 0 ? "Value *" : ""} placeholder="e.g. bar" value={props.value_val} onChange={() => props.handleChange} />
      </FormGroup>
      <Button square primary className={props.index == 0 ? "minus_button first" : "minus_button"} onClick={props.handleRemove}>
        <MinusOutlined />
      </Button>
    </FormGroupContainer>
  )
};

const columns = [
  {
    title: 'Name Prefix',
    dataIndex: 'name_prefix',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Count',
    width: 100,
    dataIndex: 'count',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Template',
    dataIndex: 'template',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Auto Replace',
    dataIndex: 'auto_replace',
    width: 200,
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'etcd ',
    dataIndex: 'etcd',
    width: 60
  },
  {
    title: 'Control Plane',
    dataIndex: 'control_plane',
    width: 120
  },
  {
    title: 'Worker',
    dataIndex: 'worker',
    width: 80
  },
  {
    title: 'Taints',
    dataIndex: 'taints',
    width: 120
  },
];

const nodePoolCol = {
  key: 1,
  name_prefix: <Input value="" />,
  name_prefix_val: "",
  count: <Input type="number" defaultValue={1} />,
  count_val: 1,
  template: <Button type="primary">Add Node Template</Button>,
  auto_replace: <Input type="number" addonAfter="minutes" defaultValue={0} />,
  auto_replace_val: 0,
  etcd: <p className="checkbox_col"><Checkbox /></p>,
  etcd_val: false,
  control_plane: <p className="checkbox_col"><Checkbox /></p>,
  control_plane_val: false,
  worker: <p className="checkbox_col"><Checkbox /></p>,
  worker_val: false,
  taints: <Space size="small">
    <Button type="text" icon={<EditOutlined />} size="small">Taints</Button>
    <Button type="primary" icon={<MinusOutlined />} size="small" />
  </Space>
}

const AzureAKS = (props) => {
  const { Panel } = Collapse;
  const { Option } = Select;
  const { TextArea } = Input;
  const user = useSelector((state) => state.user.currentUser);
  const [addStep, setAddStep] = useState(1);
  const [ghAvatarSrc, setGhAvatarSrc] = useState("");
  const [currentUserName, setCurrentUserName] = useState();
  const [labelArray, setLabelArrary] = useState([]);
  const [annotationArray, setAnnotationArray] = useState([]);
  const [labels, setLabels] = useState();
  const [annotations, setAnnotations] = useState();
  const [labelCount, setLabelCount] = useState(0);
  const [annotationCount, setAnnotationCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const [nodePoolsData, setNodePoolsData] = useState([nodePoolCol]);
  const commands = "sudo docker run -d --privileged --restart=unless-stopped --net=host -v /etc/kubernetes:/etc/kubernetes -v /var/run:/var/run rancher/rancher-agent:v2.4.8 --server https://149.202.127.126 --token jh72cl9pz9brsplbr299q7gm6jlhdm2r8ncpdh7zbktbp89gsf7l2j --ca-checksum e4b14e8dc54f75706bee885aecf13aedb40f7e572faba3699a8caf0dad0dbb10 --worker";



  const setting = {
    bordered: false,
    loading: false,
    size: 'default',
    title: undefined,
    scroll: undefined,
    hasData: true,
    tableLayout: undefined,
    top: 'none',
    bottom: 'bottomRight',
  };

  const handleAddAnnotation = () => {
    setAnnotationArray([...annotationArray, { key: "", value: "" }])

  }
  const handleAddLabel = () => {
    setLabelArrary([...labelArray, { key: "", value: "" }]);
  }

  const handleRemoveLabel = (index) => {
    labelArray.splice(index, 1);
    setLabelArrary(labelArray);
    setLabelCount(labelArray.length);
  }

  const handleRemoveAnnotation = (index) => {
    annotationArray.splice(index, 1);
    setAnnotationArray(annotationArray);
    setAnnotationCount(annotationArray.length);
  }

  const handleSetStep = (step) => {
    setAddStep(step);
  }

  function handleChange(value) {
  }

  const handleCopyAction = () => {
    setCopied(true);
  }

  useEffect(() => {
    if (user && user.id) {
      const data = AWS.util.crypto.md5(user.id, "hex");
      const settings = JSON.parse(localStorage.getItem("settings"));
      const userNameData = {
        name: user.name,
        type:
          settings.provider.charAt(0).toUpperCase() +
          settings.provider.slice(1) +
          " " +
          user.type.charAt(0).toUpperCase() +
          user.type.slice(1),
        userName: user.username,
      };
      setGhAvatarSrc(
        `data:image/png;base64,${new Identicon(data, 80, 0.01).toString()}`
      );
      setCurrentUserName(userNameData);
    }
  }, [user]);

  useEffect(() => {
    const labels_temp = labelArray.map((label, index) =>
      <InputGroups
        key={index.toString()}
        index={index}
        key_val={label.key}
        value_val={label.value}
        handleRemove={() => handleRemoveLabel(index)}
      />
    );
    setLabels(labels_temp);
  }, [labelArray, labelCount]);

  useEffect(() => {
    const annotations_temp = annotationArray.map((annotation, index) =>
      <InputGroups
        key={index.toString()}
        index={index}
        key_val={annotation.key}
        value_val={annotation.value}
        handleRemove={() => handleRemoveAnnotation(index)}
      />);
    setAnnotations(annotations_temp);
  }, [annotationArray, annotationCount]);


  const members_data = [
    {
      key: '1',
      name:
        <Avatar
          imgUrl={ghAvatarSrc !== "" ? ghAvatarSrc : images.a21}
          name={
            currentUserName
              ? currentUserName.name + `(${currentUserName.userName})`
              : "User"
          }
          textBottom={currentUserName ? currentUserName.type : "user"}
          className="userAvatar"
        />,
      role: 'Cluster Owner'
    }
  ];

  const members_columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    }
  ];

  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };

  return (
    <ScrollArea>
      {
        addStep == 1 ?
          <form className="Add_Cluster_Form">
            <FormGroupContainer horizontal>
              <h2>Add Cluster - Azure AKS</h2>
            </FormGroupContainer>
            <Divider margin />
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
                <Alert
                  className="nodesNumber_alert"
                  message="Note: Currently Azure AKS will not create an ingress controller when launching a new cluster. If you need this functionality you will have to create an ingress controller manually after cluster creation."
                  type="warning"
                  showIcon
                />
              </FormGroupContainer>

              <FormGroupContainer horizontal>
                <Collapse
                  bordered={false}
                  expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                  className="site-collapse-custom-collapse"
                  defaultActiveKey={3}
                >
                  <Panel
                    header={
                      <CollapseHeader
                        title="Member Roles"
                        description="Control who has access to the cluster and what permission they have to change it."
                      />
                    }
                    key="1"
                  >
                    <Table
                      dataSource={members_data}
                      columns={members_columns}
                      pagination={false}
                      className="members_table" />
                    <Button primary>
                      <Icon mr>
                        add
                      </Icon>
                      Add Member
                    </Button>
                  </Panel>

                  <Panel
                    header={
                      <CollapseHeader
                        title="Labels & Annotations"
                        description="Control who has access to the cluster and what permission they have to change it."
                      />
                    }
                    key="2"
                  >
                    <ContainerHorizontal>
                      <div style={{ flexBasis: '50%', paddingRight: '20px' }}>
                        <p>Labels</p>
                        {labels}
                        {labelArray.length > 0 ?
                          <p className="propTip">ProTip: Paste one or more lines of key=value pairs into any key field for easy bulk entry.</p>
                          : null}
                        <Button primary onClick={handleAddLabel}>
                          <Icon mr>
                            add
                          </Icon>
                          Add Label
                        </Button>
                      </div>
                      <div style={{ flexBasis: '50%', paddingLeft: '20px' }}>
                        <p>Annotations</p>
                        {annotations}
                        {annotationArray.length > 0 ?
                          <p className="propTip">ProTip: Paste one or more lines of key=value pairs into any key field for easy bulk entry.</p>
                          : null}
                        <Button primary onClick={handleAddAnnotation}>
                          <Icon mr>
                            add
                          </Icon>
                          Add Annotation
                        </Button>
                      </div>
                    </ContainerHorizontal>
                  </Panel>

                  <Panel
                    header={
                      <CollapseHeader
                        title="Account Access"
                        description="Configure the Azure Active Directory (AD) Service Principal that will be used to talk to Azure"
                      />
                    }
                    key="3"
                  >
                    <FormGroupContainer horizontal>
                      <FormGroup>
                        <p>Subscription ID *</p>
                        <Input placeholder="Your Azure subscription ID" />
                      </FormGroup>
                      <FormGroup>
                        <p>Tenant ID *</p>
                        <Input placeholder="Your Azure tenant ID" />
                      </FormGroup>
                    </FormGroupContainer>

                    <FormGroupContainer horizontal>
                      <FormGroup>
                        <p>Client ID *</p>
                        <Input placeholder="Your Client ID" />
                      </FormGroup>
                      <FormGroup>
                        <p>Client Secret *</p>
                        <Input placeholder="Your Client Secret" />
                      </FormGroup>
                    </FormGroupContainer>

                    <FormGroupContainer horizontal>
                      <FormGroup>
                        <p>Location *</p>
                        <Select defaultValue="eastUS" style={{ width: "100%" }} onChange={handleChange}>
                          <Option value="us-east-2">Choose a location</Option>
                          <Option value="us-east-1">Australia East</Option>
                          <Option value="us-west-2">Australia Southeast</Option>
                          <Option value="ap-east-1">Brazil South</Option>
                          <Option value="ap-south-1">Canada Central</Option>
                          <Option value="ap-northeast-1">Canada East</Option>
                          <Option value="ap-northeast-2">Canada India</Option>
                          <Option value="ap-southeast-1">Canada US</Option>
                          <Option value="ap-southeast-2">China East 2</Option>
                          <Option value="ca-central-1">China North 2</Option>
                          <Option value="cn-north-1">East Asia</Option>
                          <Option value="eastUS">East US</Option>
                          <Option value="eu-central-1">East US 2</Option>
                          <Option value="eu-west-1">Japan East</Option>
                          <Option value="eu-west-2">Japan West</Option>
                          <Option value="eu-west-3">Korea Central</Option>
                          <Option value="eu-north-1">Korea South</Option>
                          <Option value="me-south-1">Korea South</Option>
                          <Option value="sa-east-1">North Central US</Option>
                          <Option value="sa-east-1">North Europe</Option>
                          <Option value="eu-north-1">South Africa North</Option>
                          <Option value="me-south-1">Southeast Asia</Option>
                          <Option value="sa-east-1">South India</Option>
                          <Option value="sa-east-1">UK South</Option>
                          <Option value="eu-north-1">UK West</Option>
                          <Option value="me-south-1">West Europe</Option>
                          <Option value="sa-east-1">West US</Option>
                          <Option value="sa-east-1">West US 2</Option>
                        </Select>
                      </FormGroup>
                      <FormGroup></FormGroup>
                    </FormGroupContainer>
                    <FormGroupContainer horizontal>
                      <Alert showIcon message={<p>You can find instructions on how to create an Azure AD Service Principal <a style={{color:"#3497da"}}>here.</a></p>} type="info" />
                    </FormGroupContainer>
                  </Panel>
                </Collapse>
              </FormGroupContainer>

              <FormGroupContainer style={{ marginBottom: "100px" }} horizontal>
                <div></div>
                <Button className="lm_button" type="primary" onClick={() => handleSetStep(2)} >
                  Next: Authenticate & configure nodes
                </Button>
                <Button className="sm_button" transparent onClick={props.handleCancelAction}>
                  Cancel
                </Button>
                <div></div>
              </FormGroupContainer>

            </FormGroupContainer>
          </form>
          :
          <form className="Add_Cluster_Form">
            <FormGroupContainer horizontal>
              <h2>Add Cluster - Azure AKS</h2>
            </FormGroupContainer>
            <Divider margin />
            <FormGroupContainer horizontal>
              <h3>Add Cluster - Option</h3>
            </FormGroupContainer>
            <Divider margin />
            <FormGroupContainer style={{ marginBottom: "100px" }} horizontal>
              <div></div>
              <Button className="sm_button" type="primary" onClick={props.handleCancelAction} >
                Done
              </Button>
              <div></div>
            </FormGroupContainer>
          </form>
      }
    </ScrollArea>
  );
};
export default AzureAKS;
