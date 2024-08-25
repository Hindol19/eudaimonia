import { useState } from "react";
import React from "react";
import Header from "@/components/Header";
import axios from "axios";

const SurveyCard = ({ question, index, surveyList, setSurveyList }) => {
  const [newAnswer, setNewAnswer] = useState("");

  const handleBlur = () => {
    const updatedSurveyList = [...surveyList];
    updatedSurveyList[index] = newAnswer;
    setSurveyList(updatedSurveyList);
  };

  return (
    <div className="flex flex-col justify-center h-screen mt-[-80px]">
      <div className="text-2xl mb-4">{question}</div>
      <textarea
        className="w-full py-3 px-6  border-2 border-solid border-dark border-opacity-50 text-dark text-opacity-60"
        placeholder="Please answer"
        value={newAnswer}
        onChange={(e) => setNewAnswer(e.target.value)}
        onBlur={handleBlur}
      />
    </div>
  );
};

const Survey = () => {
  const [surveyList, setSurveyList] = useState([]);
  const qList = [
    {
      question:
        "Can you describe any thoughts or feelings you have about your future that may be affecting your mental health?",
      purpose:
        "To understand how future outlook and concerns are influencing current mental health.",
    },
    {
      question:
        "What goals or aspirations do you have for improving your mental health, and what steps have you taken or plan to take to achieve them?",
      purpose:
        "To assess motivation for improvement and any proactive steps towards mental wellness.",
    },
    {
      question:
        "Is there anything specific you would like to share about your mental health that you haven’t had the chance to express yet?",
      purpose:
        "To give patients an opportunity to provide additional information or express concerns that might not have been covered by other questions.",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const answer = surveyList.join(" ");
    const response = await axios.post("http://localhost:8000/generate_report", {
      answer,
    });
    // console.log(sen);
    // Here you can send surveyList to your server using a fetch or axios call
  };

  return (
    <div className="flex flex-col">
      <Header title="Take a quick survey" />
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        {qList.map((q, ind) => {
          return (
            <SurveyCard
              key={ind}
              index={ind}
              question={q.question}
              surveyList={surveyList}
              setSurveyList={setSurveyList}
            />
          );
        })}
        <button type="submit" className="bg-acc px-6 py-3 mt-[-300px]">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Survey;
