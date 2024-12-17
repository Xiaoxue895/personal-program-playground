
import React, { useState } from "react";

import { FaMagic } from 'react-icons/fa';  


function AIAssistant() {
  const [query, setQuery] = useState(""); 
  const [chatHistory, setChatHistory] = useState([]); 
  const [loading, setLoading] = useState(false); 


  const handleSubmit = async () => {
    if (!query) return;
    setLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/recommendations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();


      setChatHistory((prev) => [
        ...prev,
        { role: "user", content: query },
        { role: "bot", content: data.choices[0]?.message?.content || "No response." },
      ]);
    } catch (error) {
      console.error("Error fetching response:", error);
    } finally {
      setLoading(false);
      setQuery("");  
    }
  };

  return (
    <div className="ai-container">
      <h2>
        <FaMagic /> AI Assistant
      </h2>
      <div className="chat-window">
        {chatHistory.map((msg, idx) => (
          <div key={idx} className={msg.role === "user" ? "user-msg" : "bot-msg"}>
            {msg.content}
          </div>
        ))}
        {loading && <p>Loading...</p>}
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask something..."
      />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Sending..." : "Send"}
      </button>
    </div>
  );
}

export default AIAssistant;
