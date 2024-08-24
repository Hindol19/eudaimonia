import React, { useState } from "react";
import axios from "axios";
import Layout from "@/components/Layout";
const CategoryTab = ({ activeCategory = "All", title, handleCategory }) => {
  return (
    <div
      onClick={() => handleCategory(title)}
      className={`mx-4 px-6 py-2 bg-altLight rounded-full cursor-pointer ${
        activeCategory === title && "bg-primaryDark"
      }`}
    >
      {title}
    </div>
  );
};
const question = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const getQuestions = async () => {
    try {
      const response = await axios.get("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div>
        <div className="flex flex-row my-4 ">
          <CategoryTab title="All" />
          <CategoryTab title="Answered" />
          <CategoryTab title="Unanswered" />
        </div>
      </div>
    </Layout>
  );
};

export default question;
