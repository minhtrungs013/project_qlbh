import React, { useCallback, useEffect, useState } from "react";
import { Breadcrumb, Steps } from "antd";
import { Link } from "react-router-dom";
const ProgressBar = ({ title = "", onBack = false, step, crumbs }) => {
  const [current, setCurrent] = useState(0);
  const [steps, setSteps] = useState([]);
  const onChange = (value) => {
    console.log("onChange:", value);
    setCurrent(value);
  };


  useEffect(() => {
    // if (crumbs.length <= 1) {
    //     return null;
    //   }
  }, []);

  return (
    <>
    {/* {crumbs !== null && crumbs?.map(({ name, path }, key) =>
        key + 1 === crumbs.length ? (
          <span key={key}>
            {name}
          </span>
        ) : (
          <Link key={key} to={path}>
            {name}
          </Link>
        )
      )} */}
      <Breadcrumb
        separator=">"
        items={[
          {
            title: "Home",
          },
          {
            title: "Application Center",
            href: "",
          },
          {
            title: "Application List",
            href: "",
          },
          {
            title: "An Application",
          },
        ]}
      />
    </>
  );
};
export default ProgressBar;
