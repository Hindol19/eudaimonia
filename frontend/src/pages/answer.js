import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import axios from "axios";
import QuestionCard from "@/components/QuestionCard";

const answer = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [userDetails, setUserDetails] = useState([]);

  const router = useRouter();
  const [qList, setQList] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");

    const savedUserName = localStorage.getItem("username");
    const savedUserType = localStorage.getItem("usertype");
    if (!token) {
      router.push("/login");
    }
    if (savedUserType === "patient") {
      router.push("/login");
      // alert("hh");
    } else {
      setUserDetails([savedUserName, savedUserType]);
      // setMode("dark");
    }
  }, []);
  const getQuestions = async () => {
    try {
      const response = await axios.get("http://localhost:8000/get_questions", {
        params: {
          username: "patient",
        },
      });

      setQList(response?.data);
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getQuestions();
  }, [userDetails[0]]);

  console.log(qList);

  return (
    <div className="">
      <Header title="Questions by Patients" />
      <div className="flex flex-col items-center w-full ">
        {qList.map((q, ind) => {
          return (
            q.type === "unanswered" && (
              <QuestionCard
                ques={q}
                key={ind}
                question={q.question}
                answer={q.answer}
                type={q.type}
                therapist_name={q.therapist_name}
                therapist_rating={q.therapist_rating}
                user="doc"
                username={userDetails[0]}
              />
            )
          );
        })}
      </div>
    </div>
  );
};

export default answer;
