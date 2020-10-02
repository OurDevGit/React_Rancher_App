import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Collapse, Table } from 'antd';
import * as images from "../../../../exampleAssets";
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { ScrollArea, ContainerHorizontal, FormGroupContainer, FormGroup, Divider, TextField, Avatar, TextArea } from "@duik/it";
import { Select, Radio, InputNumber, Tooltip, Alert, Input, Upload, message, Button, Checkbox, Row, Col } from 'antd';
import { CaretRightOutlined, MinusOutlined, QuestionCircleOutlined, UploadOutlined, CopyOutlined } from '@ant-design/icons';
import Icon from '@duik/icon'

import AWS from "aws-sdk/global";
import Identicon from "identicon.js";

import "./style.scss"

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

const EditImport = (props) => {
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
  const [copied, setCopied] = useState([false, false, false]);
  const commands = [
    "kubectl create clusterrolebinding cluster-admin-binding --clusterrole cluster-admin --user [USER_ACCOUNT]",
    "kubectl apply -f https://149.202.127.126/v3/import/8mtxt27f4jpkpcs7pqt7dxs4phmljs8972wvn5xjrt62nmcltdz5w2.yaml",
    "curl --insecure -sfL https://149.202.127.126/v3/import/8mtxt27f4jpkpcs7pqt7dxs4phmljs8972wvn5xjrt62nmcltdz5w2.yaml | kubectl apply -f -"
  ];
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

  const handleCopyAction = (index) => {
    const copy = [false, false, false];
    copy[index] = true;
    setCopied(copy);
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
              <h2>Add Cluster - Custom</h2>
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
              <FormGroupContainer style={{ marginBottom: "100px" }} horizontal>
                <div></div>
                <Button className="sm_button" type="primary" onClick={() => handleSetStep(2)} >
                  Create
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
              <h2>Add Cluster - Import</h2>
            </FormGroupContainer>
            <Divider margin />
            <div className="Import_content">
              <Alert
                message={
                  <div>
                    <p><b>Note:</b> If you want to import a Google Kubernetes Engine (GKE) cluster (or any cluster that does not supply you with a kubectl configuration file with the ClusterRole <b>cluster-admin</b> bound to it), you need to bind the ClusterRole <b>cluster-admin</b> using the command below.</p>
                    <p>Replace <b>[USER_ACCOUNT]</b> with your Google account address (you can retrieve this using <b>gcloud config get-value account</b>). If you are not importing a Google Kubernetes Engine cluster, replace <b>[USER_ACCOUNT]</b> with the executing user configured in your kubectl configuration file.</p>
                    <div className="Clipboard">
                      <TextArea
                        className="CommandTextArea"
                        value={commands[0]}
                        disabled
                        autoSize
                      >
                      </TextArea>
                      <Tooltip title={copied[0] ? "Copied" : "Copy to Clipboard"} placement="left">
                        <CopyToClipboard
                          text={commands[0]}
                          onCopy={()=>handleCopyAction(0)}>
                          <p><Button type="primary" icon={<CopyOutlined />}></Button></p>
                        </CopyToClipboard>
                      </Tooltip>
                    </div>
                  </div>
                }
                type="info"
                showIcon />
            </div>
            <div className="Import_content">
              <h6>Run the kubectl command below on an existing Kubernetes cluster running a supported Kubernetes version to import it into Rancher:</h6>
              <div className="Clipboard">
                <TextArea
                  className="CommandTextArea"
                  value={commands[1]}
                  disabled
                  autoSize
                >
                </TextArea>
                <Tooltip title={copied[1] ? "Copied" : "Copy to Clipboard"} placement="left">
                  <CopyToClipboard
                    text={commands[1]}
                    onCopy={()=>handleCopyAction(1)}>
                    <p><Button type="primary" icon={<CopyOutlined />}></Button></p>
                  </CopyToClipboard>
                </Tooltip>
              </div>
            </div>
            <div className="Import_content">
              <h6>If you get an error about 'certificate signed by unknown authority' because your Rancher installation is running with an untrusted/self-signed SSL certificate, run the command below instead to bypass the certificate check:</h6>
              <div className="Clipboard">
                <TextArea
                  className="CommandTextArea"
                  value={commands[2]}
                  disabled
                  autoSize
                >
                </TextArea>
                <Tooltip title={copied[2] ? "Copied" : "Copy to Clipboard"} placement="left">
                  <CopyToClipboard
                    text={commands[2]}
                    onCopy={()=>handleCopyAction(2)}>
                    <p><Button type="primary" icon={<CopyOutlined />}></Button></p>
                  </CopyToClipboard>
                </Tooltip>
              </div>
            </div>
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
export default EditImport;
