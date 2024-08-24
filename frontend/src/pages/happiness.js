import React, { useState } from "react";
import axios from "axios";

import Layout from "@/components/Layout";

const CustomRadio = ({digit, attributes, setCategories, categories})=>{
  const [isClicked, setIsClicked]= useState(0)
  const updateCategories = (attribute, digit) => {
    let temp = categories;
    temp[attribute] = digit;
    setCategories(temp);
    console.log(categories);
    setIsClicked({ digit });
  };
  return (
    <div
      onClick={() => updateCategories(attribute, digit)}
      className={`mx-2 w-[30px] h-[30px] rounded-full flex items-center justify-center bg-altLight  text-dark fontSize`}
    >
      {digit}
    </div>
  );
}
const happiness = () => {
  return (
    <Layout>
      <form>
        <Rating></Rating>
      </form>
    </Layout>
  );
};

export default happiness;
