"use client";
import React, { useRef, useState } from "react";

function Form() {
  const emailRef = useRef();
  const feedbackRef = useRef();
  const [feedback, setFeedback] = useState([]);
  const handleFormSubmission = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const feedback = feedbackRef.current.value;
    fetch("/api/form", {
      method: "POST",
      body: JSON.stringify({
        email,
        text: feedback,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "TEST",
      },
    });
  };
  const handleFetchFeedback = () => {
    fetch("/api/form")
      .then((r) => r.json())
      .then((r) => setFeedback(r));
  };
  return (
    <div>
      <h1>FORM</h1>
      <form onSubmit={handleFormSubmission}>
        <div>
          <div>
            <label htmlFor="email">Your Email Address</label>
            <input type="email" name="email" ref={emailRef} id="email" />
          </div>
          <div>
            <label htmlFor="message">Your Message</label>
            <textarea
              rows={5}
              name="message"
              ref={feedbackRef}
              id="message"
            ></textarea>
          </div>
          <button>Send Feedback</button>
        </div>
      </form>
      <button onClick={handleFetchFeedback}>Load Feedback</button>
      <ul>
        {feedback.map((v) => (
          <li key={v.id} style={{ color: "white" }}>{v.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default Form;
