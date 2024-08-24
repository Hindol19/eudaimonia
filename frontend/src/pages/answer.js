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
}
