import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { PuffLoader } from "react-spinners";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Home = () => {
  const [code, setCode] = useState("// Write your code here...");
  const [language, setLanguage] = useState("javascript");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/ai/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code, language: language }),
      });

      const data = await res.json();
      setResponse(data.review || data.response);
    } catch (err) {
      console.error(err);
      setResponse(" Error fetching review");
    }
    setLoading(false);
  };

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <div className="w-1/2 border-r border-gray-300">
          <div className="flex justify-between items-center p-2 bg-gray-200">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border rounded p-1"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="cpp">C++</option>
              <option value="java">Java</option>
            </select>
            <button
              onClick={handleRun}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
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
          <div className="bg-white p-4 rounded-xl shadow flex-1 overflow-y-auto ">
            {loading ? (
              <div className="flex flex-col items-center gap-2 ">
                <PuffLoader size={24} color="#101010" />
                <span>Analyzing your code</span>
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
