import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
const QuestionCard = ({
  ques,
  question,
  answer,
  type,
  therapist_name,
  therapist_rating,
  user = "patient",
  username,
}) => {
  const [newAnswer, setNewAnswer] = useState("");

  const handleAnswer = async (e) => {
    e.preventDefault();
    let temp = ques;
    temp.type = "answered";
    temp.answer = newAnswer;
    temp.therapist_name = username;
    console.log(temp);
  };

  return (
    // ${type === "answered" && "bg-ansLight"}
    // ${type === "unanswered" && "bg-primary"}
    // ${type === "discarded" && "bg-accLight"}
    <div className={`w-[97%]  my-5 px-4 py-4 rounded-xl bg-primary`}>
      <div
        className={`pb-3 text-2xl font-semibold ${
          type === "answered" &&
          "border-b-2 border-solid border-dark border-opacity-30"
        }`}
      >
        {question}
      </div>

      {type === "answered" && <div className="py-3 text-lg">{answer}</div>}
      <div className="w-full flex flex-row justify-between">
        {user === "patient" ? (
          <div
            className={`capitalize border-2 border-solid  px-4 py-1 rounded-full  ${
              type === "answered" && "border-altDark text-altDark"
            }
          ${type === "unanswered" && "border-acc2 text-acc2"}
          ${type === "discarded" && "border-acc text-acc"}`}
          >
            {type}
          </div>
        ) : (
          <div className="border-t-2 border-dark border-solid w-full pt-3">
            <form onSubmit={handleAnswer}>
              <textarea
                className="rounded-md w-full py-3 px-6  border-2 border-solid border-dark border-opacity-50 text-dark text-opacity-60"
                placeholder="What do you have in mind?"
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
              />
              <button
                className="bg-acc2 px-5 py-2 text-light rounded-md"
                type="submit"
              >
                Answer
              </button>
            </form>
          </div>
        )}
        {type === "answered" && (
          <div className="italic flex flex-row items-center">
            <div>
              Answered by
              <span className="font-semibold ml-2">{therapist_name}</span>
            </div>
            <FiberManualRecordIcon className="ml-4 text-xs opacity-40" />
            <div class="flex items-center ml-4">
              <StarIcon className="text-yellow-300 stroke-dark text-md" />
              <p class="ms-2 text-sm  text-dark ">{therapist_rating}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
