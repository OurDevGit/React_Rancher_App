import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {TopBar, TopBarSection, TopBarTitle} from '@duik/it';

import AddCustom from "./AddCustom";
import AddImport from "./AddImport";
import AddAmazonEC2 from "./AddAmazonEC2";
const AddCluster = (props) => {
  const addType = props.addType;
  const [addStep, setAddStep] = useState("create");
  return (
    <>
      <TopBar>
        <TopBarSection>
          <TopBarTitle>
            Add Cluster - {addType}
          </TopBarTitle>
        </TopBarSection>
      </TopBar>
      {
        addType == 'Custom' ?
          <AddCustom />
          : addType == "Import" ?
            <AddImport />
            : addType == "AmazonEC2" ?
              <AddAmazonEC2 />
              : null
      }
    </>
  );
};
export default AddCluster;
