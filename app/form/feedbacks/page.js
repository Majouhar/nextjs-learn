import React from "react";

async function Feedbacks() {
  //use db directly , this added for testing purpose
  const feedbackResponse = await fetch(`${process.env.baseUrl}/api/form`);
  const feedback = await feedbackResponse.json();
  return (
    <ul>
      {feedback.map((v) => (
        <li key={v.id} style={{ color: "white" }}>
          {v.text}
        </li>
      ))}
    </ul>
  );
}

export default Feedbacks;
