import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import axios from "axios";
import QuestionCard from "@/components/QuestionCard";

const answer = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [userDetails, setUserDetails] = useState([]);
  