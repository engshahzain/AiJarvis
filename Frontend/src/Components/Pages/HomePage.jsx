import React, { useContext, useEffect, useState, useRef } from "react";
import { UserdataContext } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import gif from "../../assets/ai.gif";
const HomePage = () => {
  const { userData, setUserData, GemnaiResponse } = useContext(UserdataContext);
  const Navigate = useNavigate();

  const [assistantText, setAssistantText] = useState("");

  const isSpeakingRef = useRef(false);
  const recognitionRef = useRef(null);

  const synth = window.speechSynthesis;

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("http://localhost:5000/api/Auth/logout", {
        withCredentials: true,
      });
      setUserData(null);
      console.log(res.data.message);
      Navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  // SPEAK FUNCTION
  const speak = (text) => {
    if (!text) return;

    setAssistantText(text);

    isSpeakingRef.current = true;

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onend = () => {
      isSpeakingRef.current = false;

      if (recognitionRef.current) {
        recognitionRef.current.start();
      }
    };

    synth.cancel();
    synth.speak(utterance);
  };

  // COMMAND HANDLER
  const handleCommand = (data) => {
    if (!data) return;

    const { type, userinput, response } = data;

    console.log("Assistant Response:", data);

    speak(response);

    if (type === "google_search") {
      const query = encodeURIComponent(userinput);
      window.open(`https://www.google.com/search?q=${query}`, "_blank");
    }

    if (type === "calculator_open") {
      window.open(`https://www.google.com/search?q=calculator`, "_blank");
    }

    if (type === "instagram_open") {
      window.open(`https://www.instagram.com`, "_blank");
    }

    if (type === "facebook_open") {
      window.open(`https://www.facebook.com`, "_blank");
    }

    if (type === "weather_show") {
      window.open(`https://www.google.com/search?q=weather`, "_blank");
    }

    if (type === "youtube_search") {
      const query = encodeURIComponent(userinput);
      window.open(
        `https://www.youtube.com/results?search_query=${query}`,
        "_blank"
      );
    }
  };

  // SPEECH RECOGNITION
  useEffect(() => {
    if (!userData?.assistantName) return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.log("Speech Recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognitionRef.current = recognition;

    recognition.onresult = async (e) => {
      try {
        if (isSpeakingRef.current) return;

        const transcript = e.results[e.results.length - 1][0].transcript.trim();

        console.log("Transcript:", transcript);

        const wakeWord = userData.assistantName.toLowerCase();

        if (transcript.toLowerCase().includes(wakeWord)) {
          const command = transcript.toLowerCase().replace(wakeWord, "").trim();

          if (!command) return;

          recognition.stop();

          const data = await GemnaiResponse(command);

          handleCommand(data);
        }
      } catch (error) {
        console.log("Speech Error:", error);
      }
    };

    recognition.start();

    return () => {
      recognition.stop();
    };
  }, [userData]);

  return (
    <div className="w-full flex flex-col h-screen relative py-10 bg-gradient-to-t from-black to-blue-900">
      <Link
        to={"/customize"}
        className="absolute top-5 left-5 text-black font-medium bg-white rounded-lg px-5 py-2 hover:bg-gray-400 transition-all duration-150"
      >
        Customize
      </Link>

      <button
        onClick={handleLogout}
        className="absolute top-5 right-5 text-black font-medium bg-white rounded-lg px-5 py-2 hover:bg-gray-400 transition-all duration-150"
      >
        Logout
      </button>

      <div className="flex items-center justify-center flex-1 w-full flex-col">
        <div className="w-full max-w-[300px] bg-red-500 h-[450px] flex items-center justify-center rounded-3xl overflow-hidden">
          <img
            className="object-cover w-full object-top h-full"
            src={userData?.assistantImg}
            alt=""
          />
        </div>

        {/* Speaking GIF */}
        {isSpeakingRef.current && (
          <img
            src={gif}
            alt="speaking"
            className="w-30 h-5 object-cover object-center mt-4"
          />
        )}

        <h1 className="text-white text-2xl my-2 font-medium">
          I'm {userData?.assistantName}
        </h1>

        {/* Assistant Text */}
        {assistantText && (
          <p className="text-white text-center max-w-md mt-4 px-4">
            {assistantText}
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
