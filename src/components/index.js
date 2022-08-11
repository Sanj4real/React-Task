import React from "react";
import { Row, Col, Select, Slider } from "antd";
import { useState, useEffect, useMemo } from "react";

const { Option } = Select;

export default function Homepage() {
  const [getData, setGetData] = useState([]);
  const [filteredData, setfilteredData] = useState([]);
  const [CategoryFilter, setCategoryFilter] = useState([]);
  const [selectCat, setSelectCat] = useState("");
  const [selectStock, setSelectStock] = useState("");
  const [price, setPrice] = useState([0, 500]);

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
    let filteredData = [];
    if (selectCat) {
      let updatedData = getData.filter(
        (product) => product.category === selectCat
      );
      if (price) {
        console.log("pricw");
        let priceData = updatedData.filter((product) => {
          if (product.price >= price[0] && product.price <= price[1]) {
            return true;
          }
        });
        console.log(priceData);
        setfilteredData([...priceData]);
      }
      if (!price) {
        setfilteredData([...updatedData]);
      }
    }
    console.log(price);

    if (price[0]) {
      let priceData = getData.filter((product) => {
        if (product.price >= price[0] && product.price <= price[1]) {
          return true;
        }
      });
      console.log(priceData);
      setfilteredData([...priceData]);
    }

    // // if (selectStock) {
    // //   console.log("2");

    // //   let updatedData = getData.filter((product) =>
    // //     selectStock === "Available" ? product.stock > 0 : product.stock < 0
    // //   );
    // //   filteredData.push(...updatedData);
    // // }
    // console.log(filteredData);
  }, [selectCat, price]);
  // useEffect(() => {
  //   let filteredData = [];

  //   if (price) {
  //     let updatedData = filteredData.filter((product) => {
  //       console.log(price[0]);
  //       if (product.price >= price[0] && product.price <= price[1]) {
  //         return true;
  //       }
  //     });
  //     console.log(updatedData);
  //   }
  //   setfilteredData(filteredData);
  // }, [price]);

  const handleCategoryChange = (event) => {
    console.log(event);
    setSelectCat(event);
  };

  //stock
  const handleStock = (event) => {
    setSelectStock(event);
  };

  //range
  const handlePrice = (value) => {
    console.log(value);
    setPrice(value);
  };

  return (
    <>
      <div className="container ">
        <div className="">
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
              defaultValue=""
              style={{
                width: 120,
                marginLeft: "9px",
              }}
              onChange={handleCategoryChange}
            >
              <Option value="">Select Category</Option>

              <Option value="All">All</Option>
              {CategoryFilter?.length &&
                CategoryFilter.map((name, index) => (
                  <Option key={index} value={name}>
                    {name}
                  </Option>
                ))}
            </Select>
          </div>
          {/* stock */}
          {/* <div
          className=""
          style={{
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          Stock:
          <Select
            // defaultValue=""
            style={{
              width: 120,
              marginLeft: "9px",
            }}
            onChange={handleStock}
          >
            <Option key={1} value={"Available"}>
              Available
            </Option>
            <Option key={2} value={"NotAvailable"}>
              Not Available
            </Option>
          </Select>
        </div> */}
          {/* Slider */}
          <div>
            <Slider
              range
              defaultValue={[5, 900]}
              onChange={handlePrice}
              tooltipVisible
              max={1000}
            />
          </div>
        </div>

        <Row gutter={24}>
          {(filteredData?.length ? filteredData : getData).map(
            (item, index) => {
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
            }
          )}
        </Row>
      </div>
    </>
  );
}
