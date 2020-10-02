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

const EditProvider = (props) => {
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
              <h2>Add Cluster - {props.addType}</h2>
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
                <Table
                  className="ClusterList"
                  {...setting}
                  pagination={false}
                  columns={columns}
                  dataSource={nodePoolsData}
                // scroll={scroll}
                />
              </FormGroupContainer>
              <FormGroupContainer horizontal>
                <Alert
                  className="nodesNumber_alert"
                  message={
                    <div style={{ display: "flex" }}>
                      <h6 style={{ width: "100%" }}>Number of nodes required:</h6>
                      <p style={{ width: "100%", color: "red", paddingRight: "50px", maxWidth: "300px" }}>
                        <span style={{ paddingRight: "10px" }}> <CloseCircleOutlined style={{ verticalAlign: "middle" }} /> 1,3, or 5</span>
                        <span style={{ paddingRight: "10px" }}> <CloseCircleOutlined style={{ verticalAlign: "middle" }} /> 1 or more</span>
                        <span> <CloseCircleOutlined style={{ verticalAlign: "middle" }} /> 1 or more</span>
                      </p>
                    </div>
                  }
                  type="info"
                />
              </FormGroupContainer>
              <FormGroupContainer horizontal>
                <Button type="primary" icon={<PlusOutlined style={{ verticalAlign: "middle" }} />} style={{ maxWidth: "150px" }}>
                  Add Node Pool
                </Button>
              </FormGroupContainer>
              <FormGroupContainer horizontal>
                <Collapse
                  bordered={false}
                  expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                  className="site-collapse-custom-collapse"
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
                </Collapse>
              </FormGroupContainer>
              <FormGroupContainer horizontal>
                <h2>Cluster Options</h2>
                <Button type="primary" sm className="sm_button">
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
                  <Panel
                    header={
                      <CollapseHeader
                        title="Kubernetes Options"
                        description="Customize the kubernetes cluster options"
                      />
                    }
                    key="1"
                  >
                    <FormGroupContainer>
                      <FormGroupContainer horizontal>
                        <FormGroup>
                          <p>Kubernetes Version</p>
                          <Select defaultValue="v1.18.8" style={{ width: "50%" }} onChange={handleChange}>
                            <Option value="v1.18.8">v1.18.8-rancher1-1</Option>
                            <Option value="v1.17.11">v1.17.11-rancher1-1</Option>
                            <Option value="v1.16.15">v1.16.15-rancher1-1</Option>
                            <Option value="v1.15.12">v1.15.12-rancher2-5</Option>
                          </Select>
                        </FormGroup>
                      </FormGroupContainer>
                      <FormGroupContainer horizontal>
                        <FormGroup>
                          <p>Network Provider</p>
                          <Select defaultValue="canal" style={{ width: "100%" }} onChange={handleChange}>
                            <Option value="flannel">Flannel</Option>
                            <Option value="calico">Calico</Option>
                            <Option value="canal">Canal(Network Isolation Available)</Option>
                            <Option value="weave">Weave</Option>
                          </Select>
                        </FormGroup>
                        <FormGroup>
                          <p>Windows Support</p>
                          <Radio.Group onChange={handleChange} defaultValue={2}>
                            <Radio style={radioStyle} value={1} disabled={true}>
                              Enabled
                          </Radio>
                            <Radio style={radioStyle} value={2} disabled={true}>
                              Disabled
                          </Radio>
                          </Radio.Group>
                          <p>Available for Kubernetes 1.15 or above with Flannel network provider</p>
                        </FormGroup>
                        <FormGroup>
                          <p>Project Network Isolation</p>
                          <Radio.Group onChange={handleChange} defaultValue={1}>
                            <Radio style={radioStyle} value={1}>
                              Enabled
                            </Radio>
                            <Radio style={radioStyle} value={2}>
                              Disabled
                            </Radio>
                          </Radio.Group>
                        </FormGroup>
                      </FormGroupContainer>
                      <FormGroupContainer horizontal >
                        <FormGroup style={{ maxWidth: "32%" }}>
                          <p>CNI Plugin MTU Override</p>
                          <InputNumber defaultValue={0} placeholder="e.g. 1500" style={{ width: "100%" }} />
                          <p className="sm_text">Only applied if the value is non-zero. When applied, the MTU value is explicitly configured for the chosen network provider (disabling auto-discovery). The override must be calculated from the host's MTU minus the CNI plugin's required overhead.</p>
                        </FormGroup>
                      </FormGroupContainer>
                      <p>Cloud Provider
                        <Tooltip placement="topLeft" title={<span>Read more about the <a style={{ color: "white", textDecoration: "underline" }} target="blank" href="https://kubernetes.io/docs/concepts/cluster-administration/cloud-providers/">Kubernetes cloud providers</a></span>}>
                          <QuestionCircleOutlined className="text_icon" />
                        </Tooltip>
                      </p>
                      <Alert message={<span>If your cloud provider is not listed, please use the <b>Custom</b> option.</span>} type="info" showIcon />
                      <FormGroupContainer horizontal>
                        <FormGroup>
                          <Radio.Group onChange={handleChange} defaultValue={1}>
                            <Radio style={radioStyle} value={1}>
                              None
                            </Radio>
                            {
                              props.addType == "AmazonEC2" ?
                                <Radio style={radioStyle} value={2}>
                                  Amazon
                                </Radio>
                              : props.addType == "Azure" ?
                                <Radio style={radioStyle} value={3}>
                                  Azure
                                </Radio>
                              : <Radio style={radioStyle} value={4}>
                                  Custom
                                </Radio>
                            }
                            <Radio style={radioStyle} value={5}>
                              External
                          </Radio>
                          </Radio.Group>
                        </FormGroup>
                      </FormGroupContainer>
                    </FormGroupContainer>
                  </Panel>
                  <Panel
                    header={
                      <CollapseHeader
                        title="Private Registry"
                        description="Configure a default private registry for this cluster. When enabled, all images required for cluster provisioning and system add-ons startup will be pulled from this registry."
                      />
                    }
                    key="2"
                  >
                    <FormGroupContainer horizontal>
                      <FormGroup>
                        <p>Private Registry</p>
                        <Radio.Group onChange={handleChange} defaultValue={1}>
                          <Radio style={radioStyle} value={1}>
                            Disabled
                          </Radio>
                          <Radio style={radioStyle} value={2}>
                            Enabled
                          </Radio>
                        </Radio.Group>
                      </FormGroup>
                    </FormGroupContainer>
                  </Panel>
                  <Panel
                    header={
                      <CollapseHeader
                        title="Advanced Options"
                        description="Customize advanced cluster options"
                      />
                    }
                    key="3"
                  >
                    <FormGroupContainer>
                      <FormGroupContainer horizontal>
                        <FormGroup>
                          <p>Nginx Ingress</p>
                          <Radio.Group onChange={handleChange} defaultValue={1}>
                            <Radio style={radioStyle} value={1}>
                              Enabled
                            </Radio>
                            <Radio style={radioStyle} value={2}>
                              Disabled
                            </Radio>
                          </Radio.Group>
                        </FormGroup>
                        <FormGroup>
                          <p>Node Port Range</p>
                          <Input placeholder="e.g. 30000-32767" />
                        </FormGroup>
                        <FormGroup>
                          <p>Metrics Server Monitoring</p>
                          <Radio.Group onChange={handleChange} defaultValue={1}>
                            <Radio style={radioStyle} value={1}>
                              Enabled
                            </Radio>
                            <Radio style={radioStyle} value={2}>
                              Disabled
                            </Radio>
                          </Radio.Group>
                        </FormGroup>
                      </FormGroupContainer>
                      <FormGroupContainer horizontal>
                        <FormGroup>
                          <p>Pod Security Policy Support</p>
                          <Radio.Group onChange={handleChange} defaultValue={1}>
                            <Radio style={radioStyle} value={1}>
                              Enabled
                            </Radio>
                            <Radio style={radioStyle} value={2}>
                              Disabled
                            </Radio>
                          </Radio.Group>
                        </FormGroup>
                        <FormGroup>
                          <p>Default Pod Security Policy *</p>
                          <Select defaultValue="unrestricted" style={{ width: "100%" }} onChange={handleChange}>
                            <Option value="selectPod">Select a Pod Security Policy...</Option>
                            <Option value="restricted">restricted</Option>
                            <Option value="unrestricted">unrestricted</Option>
                          </Select>
                        </FormGroup>
                        <FormGroup>
                        </FormGroup>
                      </FormGroupContainer>
                      <FormGroupContainer horizontal>
                        <FormGroup>
                          <p>Docker version on nodes</p>
                          <Radio.Group onChange={handleChange} defaultValue={1}>
                            <Radio style={radioStyle} value={1}>
                              Require a supported Docker version
                            </Radio>
                            <Radio style={radioStyle} value={2}>
                              Aloow unsupported versions
                            </Radio>
                          </Radio.Group>
                        </FormGroup>
                        <FormGroup>
                          <p>Docker Root Directory</p>
                          <Input value="/var/lib/docker" placeholder="Default directory is /var/lib/docker" />
                        </FormGroup>
                        <FormGroup>
                        </FormGroup>
                      </FormGroupContainer>
                      <FormGroupContainer horizontal>
                        <FormGroup>
                          <p>etcd Snapshot Backup Target</p>
                          <Radio.Group onChange={handleChange} defaultValue={1}>
                            <Radio style={radioStyle} value={1}>
                              local
                            </Radio>
                            <p className="sm_text">snapshots only exist locally, no external backups are performed</p>
                            <Radio style={radioStyle} value={2}>
                              s3
                            </Radio>
                            <p className="sm_text">etcd snapshots will occur locally, subsequently the snapshot will be backed up to the configured s3 target</p>
                          </Radio.Group>
                        </FormGroup>
                      </FormGroupContainer>
                      <FormGroupContainer horizontal>
                        <FormGroup>
                          <p>Recurring etcd Snapshot Enabled</p>
                          <Radio.Group onChange={handleChange} defaultValue={1}>
                            <Radio value={1}>
                              Yes
                            </Radio>
                            <Radio value={2}>
                              No
                            </Radio>
                          </Radio.Group>
                        </FormGroup>
                        <FormGroup>
                          <p>Recurring etcd Snapshot Interval</p>
                          <Input type="number" addonAfter="hours" defaultValue={12} placeholder="e.g. 6" />
                        </FormGroup>
                        <FormGroup>
                          <p>Recurring etcd Snapshot Retention</p>
                          <Input type="number" addonBefore="Keep the last" defaultValue={6} placeholder="e.g. 12" />
                        </FormGroup>
                      </FormGroupContainer>
                      <FormGroupContainer horizontal>
                        <FormGroup>
                          <p>Scheduled CIS Scan Enabled</p>
                          <Radio.Group onChange={handleChange} defaultValue={2}>
                            <Radio value={1}>
                              Yes
                            </Radio>
                            <Radio value={2}>
                              No
                            </Radio>
                          </Radio.Group>
                        </FormGroup>
                        <FormGroup>
                          <p>Scheduled CIS Scan Profile</p>
                          <Select defaultValue="1" style={{ width: "100%" }} onChange={handleChange}>
                            <Option value="1">RKE-CIS-1.5 Permissive</Option>
                            <Option value="2">RKE-CIS-1.5 Hardened</Option>
                          </Select>
                        </FormGroup>
                        <FormGroup>
                          <p>Scheduled CIS Scan Interval(cron)</p>
                          <Input addonBefore="Keep the last" defaultValue="0 0 * * *" placeholder="e.g. 10 0 * * *" />
                        </FormGroup>
                        <FormGroup>
                          <p>Scheduled CIS Scan Report Retention</p>
                          <Input type="number" addonBefore="Keep the last" defaultValue={12} placeholder="e.g. 12" />
                        </FormGroup>
                      </FormGroupContainer>
                      <FormGroupContainer horizontal>
                        <FormGroup>
                          <p>Maximum Worker Nodes Unavailable</p>
                          <Input
                            type="number"
                            addonAfter={
                              <Select defaultValue="percentage" className="select-after">
                                <Option value="percentage">Percentage</Option>
                                <Option value="count">Count</Option>
                              </Select>
                            }
                            defaultValue={10}
                            placeholder="e.g. 6" />
                        </FormGroup>
                        <FormGroup></FormGroup>
                        <FormGroup></FormGroup>
                      </FormGroupContainer>
                      <FormGroupContainer horizontal>
                        <FormGroup>
                          <p>Drain nodes</p>
                          <Radio.Group onChange={handleChange} defaultValue={2}>
                            <Radio value={1}>
                              Yes
                            </Radio>
                            <Radio value={2}>
                              No
                            </Radio>
                          </Radio.Group>
                        </FormGroup>

                      </FormGroupContainer>
                    </FormGroupContainer>
                  </Panel>
                  <Panel
                    header={
                      <CollapseHeader
                        title="Authorized Endpoint"
                        description="Enabling the authorized cluster endpoint allows direct communication with the cluster, bypassing the API proxy. Authorized endpoints can be retrieved by generating a kubeconfig for the cluster."
                      />
                    }
                    key="4"
                  >
                    <FormGroupContainer>
                      <FormGroupContainer horizontal>
                        <FormGroup>
                          <p>Authorized Cluster Endpoint</p>
                          <Radio.Group onChange={handleChange} defaultValue={1}>
                            <Radio style={radioStyle} value={1}>
                              Enabled
                            </Radio>
                            <Radio style={radioStyle} value={2}>
                              Disabled
                            </Radio>
                          </Radio.Group>
                        </FormGroup>
                      </FormGroupContainer>
                      <FormGroupContainer horizontal>
                        <FormGroup>
                          <p>FQDN</p>
                          <Input placeholder="dev.example.com" />
                        </FormGroup>
                        <FormGroup>
                          <p>CA Certificate
                            <Tooltip placement="topLeft" title={<span className="sm_text">The CA certificate will be placed in the generated kubeconfig file(s) to validate the certificate (chain) presented by the load balancer which you have configured at the provided FQDN. <a style={{ color: "white", textDecoration: "underline" }} target="blank" href="https://rancher.com/docs/rancher/v2.x/en/cluster-provisioning/rke-clusters/options/#authorized-cluster-endpoint">More info here.</a></span>}>
                              <QuestionCircleOutlined className="text_icon" />
                            </Tooltip>
                          </p>
                          <div className="UploadContainer">
                            <Upload>
                              <Button type="primary" icon={<UploadOutlined />}>Read from a file</Button>
                            </Upload>
                            <Divider style={{ marginTop: "10px", marginBottom: "10px" }} />
                            <TextArea
                              placeholder="Paste in the CA certificate, starting with -----BEGIN CERTIFICATE-----"
                            />
                          </div>
                        </FormGroup>
                      </FormGroupContainer>
                    </FormGroupContainer>
                  </Panel>
                </Collapse>
              </FormGroupContainer>
              <FormGroupContainer style={{ marginBottom: "100px" }} horizontal>
                <div></div>
                <Button className="sm_button" type="primary" onClick={() => handleSetStep(2)} >
                  Next
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
              <h2>Add Cluster - Custom</h2>
            </FormGroupContainer>
            <Divider margin />
            <FormGroupContainer horizontal>
              <h3>Add Cluster - Option</h3>
            </FormGroupContainer>
            <Divider margin />
            <Collapse
              bordered={false}
              defaultActiveKey="1"
              expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
              className="site-collapse-custom-collapse"
            >
              <Panel
                header={
                  <CollapseHeader
                    title="Customize Node Run Command"
                    description="Editing node options will update the command you will run on your existing machines."
                  />
                }
                key="1"
              >
                <div className="OptionContainer">
                  <h6>Node Options</h6>
                  <p>Choose what roles the node will have in the cluster</p>
                  <FormGroupContainer horizontal>
                    <FormGroup>
                      <h6>Node Role</h6>
                      <Checkbox.Group style={{ width: '100%' }} onChange={handleChange}>
                        <Row>
                          <Col span={8}>
                            <Checkbox value="etcd">etcd</Checkbox>
                          </Col>
                          <Col span={8}>
                            <Checkbox value="control">Control Plane</Checkbox>
                          </Col>
                          <Col span={8}>
                            <Checkbox value="Worker">Worker</Checkbox>
                          </Col>
                        </Row>
                      </Checkbox.Group>
                    </FormGroup>
                  </FormGroupContainer>
                </div>

                <div className="OptionContainer">
                  <FormGroupContainer horizontal>
                    <FormGroup>
                      <h6> Run this command on one or more existing machines already running a supported version of Docker.</h6>
                      <div className="Clipboard">
                        <TextArea
                          className="CommandTextArea"
                          value={commands}
                          disabled
                          autoSize
                        >
                        </TextArea>
                        <Tooltip title={copied ? "Copied" : "Copy to Clipboard"} placement="left">
                          <CopyToClipboard
                            text={commands}
                            onCopy={handleCopyAction}>
                            <p><Button type="primary" icon={<CopyOutlined />}></Button></p>
                          </CopyToClipboard>
                        </Tooltip>

                      </div>

                    </FormGroup>
                  </FormGroupContainer>
                </div>
              </Panel>
            </Collapse>
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
export default EditProvider;
