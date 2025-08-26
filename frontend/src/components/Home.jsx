import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { PuffLoader } from "react-spinners";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { axiosInstance } from "../lib/axios";

const Home = () => {
  const [code, setCode] = useState("// Write your code here...");
  const [language, setLanguage] = useState("javascript");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    setLoading(true);

    try {
      const res = await axiosInstance.post("/api/ai/review", {
        code,
        language,
      });

      setResponse(res.data.review || res.data.response);
    } catch (err) {
      console.error(err);
      setResponse(" Error fetching review");
    }
    setLoading(false);
  };

  return (
    <>
      <div className="flex h-screen bg-base-200">
        <div className="w-1/2 border-r border-stone-500">
          <div className="flex justify-between items-center p-2 bg-base-200">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border rounded p-1 "
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="cpp">C++</option>
              <option value="java">Java</option>
            </select>
            <button
              onClick={handleRun}
              className="bg-primary hover:bg-primary/70 text-white px-3 py-1 rounded"
            >
              {loading ? "Analyzing..." : "Review Code"}
            </button>
          </div>

          <Editor
            height="90vh"
            language={language}
            theme="vs-dark"
            value={code}
            onChange={(val) => setCode(val || "")}
          />
        </div>

        <div className="w-1/2 p-4 flex flex-col">
          <h2 className="text-xl font-bold mb-2">AI Review</h2>
          <div className="bg-base-100 border-1 border-stone-400 p-4 rounded-md shadow flex-1 overflow-y-auto ">
            {loading ? (
              <div className="flex h-full items-center justify-center">
                <div className="flex flex-col items-center gap-2 ">
                  <PuffLoader size={30} color="#94a3b8" />
                  <span className="text-base-content">Analyzing your code</span>
                </div>
              </div>
            ) : response ? (
              <ReactMarkdown
                children={response}
                remarkPlugins={[remarkGfm]}
              ></ReactMarkdown>
            ) : (
              <span className="text-gray-500">No review yet</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
