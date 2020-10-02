import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import cookies from "react-cookies";
import {
   Dropdown, DropdownItem, DropdownButtonProps, ScrollArea, Modal, ContainerHorizontal
} from "@duik/it";
import Icon from '@duik/icon'
import { Table, Space, Tooltip, Button } from 'antd';
import { MoreOutlined, DeleteOutlined, EditOutlined, DeleteFilled, PlusOutlined } from '@ant-design/icons';

import {Blue_gear, Blue_upload, AmazonEC2, Azure, DigitalOcean, vSphere, AmazonEKS, AzureAKS, GoogleGKE} from '../../../assets/img/ui/providers/providers'
import CustomButton from '../../../components/CustomButton';

import AddCluster from '../AddCluster';
import "./styles.scss";


const MoreActionButton = ({
  handleToggle, handleClose, handleOpen, setOpenState, isOpen
}: DropdownButtonProps) => (
    <MoreOutlined onClick={handleToggle} />
  );




const setting = {
  bordered: false,
  loading: false,
  size: 'default',
  title: undefined,
  rowSelection: {},
  scroll: undefined,
  hasData: true,
  tableLayout: undefined,
  top: 'none',
  bottom: 'bottomRight',
};


const ClusterList = (props) => {
  const columns = [
    {
      title: 'Cluster Name',
      dataIndex: 'name',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Provider',
      dataIndex: 'provider',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Nodes',
      dataIndex: 'nodes',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'CPU',
      dataIndex: 'cpu',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'RAM',
      dataIndex: 'ram',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'State',
      dataIndex: 'state',
      sorter: (a, b) => a.age - b.age,
      filters: [
        {
          text: 'Completed',
          value: 'Completed',
        },
        {
          text: 'Provisioning',
          value: 'Provisioning',
        },
        {
          text: 'Rejected',
          value: 'Rejected',
        },
      ],
      onFilter: (value, record) => record.state_key.indexOf(value) === 0,
    },
    {
      title: 'Action',
      key: 'action',
      width: 120,
      render: (record) => (
        <Space size="middle">
          <a href={"/c/" + record.key + "/edit?provider=" + record.provider}><EditOutlined /></a>
          <DeleteFilled />
          <Dropdown
            ButtonComponent={MoreActionButton}
            buttonProps={{
              hideArrows: true,
            }}
            menuPosition="bottom-left"
            className="more_dropdown_menu"
          >
            <DropdownItem>
              Rotate Certificates<Icon ml>camera</Icon>
            </DropdownItem>
            <DropdownItem>
              Snapshot Now<Icon ml>stats</Icon>
            </DropdownItem>
            <DropdownItem>
              Restore Snapshot<Icon ml>tap_click_force_touch</Icon>
            </DropdownItem>
            <DropdownItem>
              View in API<Icon ml>tap_click_force_touch</Icon>
            </DropdownItem>
          </Dropdown>
        </Space>
      ),
    },
  ];
  const data = [];
  for (let i = 1; i <= 10; i++) {
    data.push({
      key: i,
      state: <p className={i % 3 == 0 ? "cluster_state success" : i % 3 == 1 ? "cluster_state process" : "cluster_state reject"}>
        {i % 3 == 0 ? "Completed" : i % 3 == 1 ? "Provisioning" : "Rejected"}
      </p>,
      state_key: i % 3 == 0 ? "Completed" : i % 3 == 1 ? "Provisioning" : "Rejected",
      name: <a className="cluster_name">My Cluster {i}</a>,
      provider: 'Custom',
      nodes: "0",
      cpu: "n/a",
      ram: "n/a"
    });
  }
  const [pageType, setPageType] = useState("List");
  const [modalOpenState, setModalOpenState] = useState(false);
  const [addType, setAddType] = useState("");
  const handleCloseModal = () => setModalOpenState(false);
  const handleOpenModal = () => setModalOpenState(true);
  const handleAddCluster = (type) => {
    setPageType("Add");
    setAddType(type);
    handleCloseModal();
  }

  const handleBackToClusterList = () =>{
    setPageType("List");
  }

  return (
    <>
      {
        pageType == "List" ?
          <div className="ClusterList_container" style={{ flexBasis: '100%' }}>
            <ScrollArea>
              <div className="action_top_bar">
                <Button className="delete_action_btn" danger type="default">
                  Delete
                    <DeleteOutlined ml="true" />
                </Button>
                <Button className="add_action_btn" type="primary" shape="round" icon={<PlusOutlined />} onClick={handleOpenModal}>
                  Add Cluster
                </Button>
              </div>
              <Table
                className="ClusterList"
                {...setting}
                // pagination={{ position: [this.state.top, this.state.bottom] }}
                columns={columns}
                dataSource={data}
              // scroll={scroll}
              />
            </ScrollArea>
          </div>
          : pageType == "Add" ?
            <AddCluster 
              addType = {addType}
              handleCancelAction = {handleBackToClusterList}
            />
          : null
      }
      <Modal
        className="add_modal"
        isOpen={modalOpenState}
        handleClose={handleCloseModal}
        closeOnOuterClick
        lg
      >
        <Modal.Header>
          <Modal.Title>Add Cluster - Select Cluster Type</Modal.Title>
        </Modal.Header>
        <Modal.Body className="add_modal_body">
          <ContainerHorizontal className="mainType">
            <CustomButton
              label="From existing nodes (Custom)"
              imageUrl={Blue_gear}
              imgWidth={80}
              description="Create new Kubernetes cluster using RKE, out of existing bare-metal servers or virtual machines."
              onClick={()=>handleAddCluster("Custom")}
            />
            <CustomButton
              label="Import an existing cluster"
              imageUrl={Blue_upload}
              imgWidth={80}
              description="Create new Kubernetes cluster using RKE, out of existing bare-metal servers or virtual machines."
              onClick={()=>handleAddCluster("Import")}
            />
          </ContainerHorizontal>
          <ContainerHorizontal className="providerType">
            <p>With RKE and new nodes in an infrastructure provider</p>
            <CustomButton
              label="Amazon EC2"
              imageUrl={AmazonEC2}
              imgWidth={70}
              onClick={()=>handleAddCluster("AmazonEC2")}
            />
            <CustomButton
              label="Azure"
              imageUrl={Azure}
              imgWidth={70}
              onClick={()=>handleAddCluster("Azure")}
            />
            <CustomButton
              label="DigitalOcean"
              imageUrl={DigitalOcean}
              imgWidth={70}
              onClick={()=>handleAddCluster("DigitalOcean")}
            />
            <CustomButton
              label="Linode"
              imageUrl={DigitalOcean}
              imgWidth={70}
              onClick={()=>handleAddCluster("Linode")}
            />
            <CustomButton
              label="vSphere"
              imageUrl={vSphere}
              imgWidth={70}
              onClick={()=>handleAddCluster("vSphere")}
            />
          </ContainerHorizontal>
          <ContainerHorizontal className="providerType">
            <p>With a hosted Kubernetes provider</p>
            <CustomButton
              label="Amazon EKS"
              imageUrl={AmazonEKS}
              imgWidth={70}
              onClick={()=>handleAddCluster("AmazonEKS")}
            />
            <CustomButton
              label="Azure AKS"
              imageUrl={AzureAKS}
              imgWidth={70}
              onClick={()=>handleAddCluster("AzureAKS")}
            />
            <CustomButton
              label="Google GKE"
              imageUrl={GoogleGKE}
              imgWidth={70}
              onClick={()=>handleAddCluster("GoogleGKE")}
            />
          </ContainerHorizontal>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default ClusterList;
