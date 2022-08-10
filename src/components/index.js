import React from "react";
import { Row, Col, Select } from "antd";
import { useState, useEffect, useMemo } from "react";

const { Option } = Select;

export default function Homepage() {
  const [getData, setGetData] = useState([]);
  const [filteredData, setfilteredData] = useState([]);
  const [CategoryFilter, setCategoryFilter] = useState([]);
  const [selectCat, setSelectCat] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=10", {
      method: "GET",
    })
      .then((data) => data.json())
      .then((json) => {
        setGetData(json);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (getData?.length) {
      console.log(getData);
      let cateogry = getData.map((data) => {
        return data?.category;
      });
      let finalCategory = [];
      cateogry.map((catname) => {
        if (!finalCategory.includes(catname)) {
          finalCategory.push(catname);
        }
      });
      console.log(finalCategory);
      setCategoryFilter(finalCategory);
    }
  }, [getData?.length]);

  useEffect(() => {
    let updatedData = getData.filter(
      (product) => product.category === selectCat
    );
    console.log(updatedData);
    setfilteredData(updatedData);
  }, [selectCat]);

  const handleCategoryChange = (event) => {
    setSelectCat(event);
  };

  return (
    <>
      <div className="container ">
        <div
          className=""
          style={{
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          Category:
          <Select
            defaultValue="lucy"
            style={{
              width: 120,
              marginLeft: "9px",
            }}
            onChange={handleCategoryChange}
          >
            {CategoryFilter?.length &&
              CategoryFilter.map((name, index) => (
                <Option key={index} value={name}>
                  {name}
                </Option>
              ))}
          </Select>
        </div>
        <Row gutter={24}>
          {(selectCat ? filteredData : getData).map((item, index) => {
            return (
              <Col span={6} key={index}>
                <div className="product">
                  <img src={item?.image} alt="" />
                  <div className="product_name">
                    <h4>{item?.title}</h4>
                    <p>Rs {item?.price}</p>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </>
  );
}
