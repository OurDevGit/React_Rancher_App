import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { TopBar, TopBarSection, TopBarTitle } from '@duik/it';

import AddCustom from "./AddCustom";
import AddImport from "./AddImport";
import AddProvider from "./AddProvider";
import AmazonEKS from "./AmazonEKS";
import AzureAKS from "./AzureAKS";
import GoogleGKE from "./GoogleGKE";

const AddCluster = (props) => {
  const addType = props.addType;
  const [addStep, setAddStep] = useState("create");
  return (
    <>
      {
        addType == 'Custom' ?
          <AddCustom
            handleCancelAction={props.handleCancelAction}
          />
          : addType == "Import" ?
            <AddImport
              handleCancelAction={props.handleCancelAction}
            />
          : addType == "AmazonEKS" ?
            <AmazonEKS handleCancelAction={props.handleCancelAction} />
          : addType == "AzureAKS" ?
            <AzureAKS handleCancelAction={props.handleCancelAction} />
          : addType == "GoogleGKE" ?
            <GoogleGKE handleCancelAction={props.handleCancelAction} />
          : <AddProvider addType={addType} />
      }
    </>
  );
};
export default AddCluster;
