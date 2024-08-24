import React, { useState } from "react";
import axios from "axios";

import Layout from "@/components/Layout";

const CustomRadio = ({digit, attribute, setCategories, categories})=>{
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
const RatingSystem = ({attribute, categories, setCategories}) => {
  <div>
    <h3>{attribute}</h3>
    <div>
      <CustomRadio digit="1" 
      attribute={attribute} 
      categories={categories} 
      setCategories={setCategories}
      />
      <CustomRadio digit="2" 
      attribute={attribute} 
      categories={categories} 
      setCategories={setCategories}
      />
      <CustomRadio digit="3" 
      attribute={attribute} 
      categories={categories} 
      setCategories={setCategories}
      />
      <CustomRadio digit="4" 
      attribute={attribute} 
      categories={categories} 
      setCategories={setCategories}
      />
      <CustomRadio digit="5" 
      attribute={attribute} 
      categories={categories} 
      setCategories={setCategories}
      />
      <CustomRadio digit="6" 
      attribute={attribute} 
      categories={categories} 
      setCategories={setCategories}
      />
      <CustomRadio digit="7" 
      attribute={attribute} 
      categories={categories} 
      setCategories={setCategories}
      />
      <CustomRadio digit="8" 
      attribute={attribute} 
      categories={categories} 
      setCategories={setCategories}
      />
      <CustomRadio digit="9" 
      attribute={attribute} 
      categories={categories} 
      setCategories={setCategories}
      />
      <CustomRadio digit="10" 
      attribute={attribute} 
      categories={categories} 
      setCategories={setCategories}
      />
    </div>
  </div>
}
const happiness = () => {
  return (
    <Layout>
      <form>
        
      </form>
    </Layout>
  );
};

export default happiness;
