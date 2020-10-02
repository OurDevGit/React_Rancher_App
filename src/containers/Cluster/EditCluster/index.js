import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { TopBar, TopBarSection, TopBarTitle } from '@duik/it';

import EditCustom from "./EditCustom";
import EditImport from "./EditImport";
import EditProvider from "./EditProvider";
import AmazonEKS from "./AmazonEKS";
import AzureAKS from "./AzureAKS";
import GoogleGKE from "./GoogleGKE";

const EditCluster = (props) => {
  const editType = props.editType;
  const [addStep, setAddStep] = useState("create");
  return (
    <>
      {
        editType == 'Custom' ?
          <EditCustom
            handleCancelAction={props.handleCancelAction}
          />
          : editType == "Import" ?
            <EditImport
              handleCancelAction={props.handleCancelAction}
            />
          : editType == "AmazonEKS" ?
            <AmazonEKS handleCancelAction={props.handleCancelAction} />
          : editType == "AzureAKS" ?
            <AzureAKS handleCancelAction={props.handleCancelAction} />
          : editType == "GoogleGKE" ?
            <GoogleGKE handleCancelAction={props.handleCancelAction} />
          : <EditProvider editType={editType} />
      }
    </>
  );
};
export default EditCluster;
