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
const PostQuestion = ({ hidden = true, userDetails, getQuestions }) => {
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // window.location.reload();
    let qItem = {
      username: userDetails[0],
      question: newQuestion,
      answer: "",
      type: "unanswered",
      therapist_name: "",
      therapist_rating: 0,
    };

    // console.log(qItem);

    const response = await axios.post(
      "http://localhost:8000/up_questions",
      qItem
    );
    getQuestions();
  };

  const openPostSection = () => {
    isPostOpen ? setIsPostOpen(false) : setIsPostOpen(true);
  };
  return (
    <div className={`flex flex-col mx-4 my-6`}>
      <div
        onClick={() => openPostSection()}
        className="mb-2 flex flex-row text-xl items-center font-semibold text-acc hover:underline cursor-pointer w-fit"
      >
        <PostAddIcon className="mr-3" />
        <h3>Post a Question</h3>
      </div>
      <form
        onSubmit={handleSubmit}
        className={`w-full ${!isPostOpen && "hidden"}`}
      >
        <textarea
          className="rounded-md w-full py-3 px-6 h-[150px] border-2 border-solid border-dark border-opacity-50 text-dark text-opacity-60"
          placeholder="What do you have in mind?"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />
        <button className="bg-acc2 px-5 py-2 text-light rounded-md">
          Post
        </button>
      </form>
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
