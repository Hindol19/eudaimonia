import React, { useState } from "react";
import axios from "axios";
import Layout from "@/components/Layout";
const CategoryTab = ({ activeCategory = "All", title }) => {
  return (
    <div className="text-dark border-2 border-dark border-solid px-4 py-2 mx-4 cursor-pointer">
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
