import React, { useState } from "react";
import "./App.css";

function App() {
  const [policyText, setPolicyText] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [source, setSource] = useState("");

  const handleAsk = () => {
    if (!policyText || !question) {
      setAnswer("Please provide both policy text and a question.");
      return;
    }

    const sentences = policyText.split(/(?<=[.!?])\s+/);
    const questionWords = question.toLowerCase().split(/\W+/);

    let bestMatch = "";
    let maxMatches = 0;

    sentences.forEach((sentence) => {
      const sentenceWords = sentence.toLowerCase().split(/\W+/);
      const matches = questionWords.filter((word) =>
        sentenceWords.includes(word)
      ).length;

      if (matches > maxMatches) {
        maxMatches = matches;
        bestMatch = sentence;
      }
    });

    setAnswer(bestMatch || "Sorry, no relevant information found.");
    setSource(bestMatch ? `Matched sentence: "${bestMatch}"` : "");
  };

  return (
    <div className="container">
      <h1 className="title">Mini Knowledge Assistant</h1>

      <textarea
        className="textarea"
        placeholder="Paste HR Policy Text Here..."
        value={policyText}
        onChange={(e) => setPolicyText(e.target.value)}
      />

      <input
        type="text"
        className="input"
        placeholder="Type your question here..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button className="button" onClick={handleAsk}>
        Ask
      </button>

      {answer && (
        <div className="answerBox">
          <h2>Answer:</h2>
          <p className="answerText">{answer}</p>
          {source && (
            <>
              <h3>Source:</h3>
              <p className="sourceText">{source}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
