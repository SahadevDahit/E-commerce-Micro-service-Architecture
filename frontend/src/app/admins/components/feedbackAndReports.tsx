"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

interface FeedbackAndReport {
  title: string;
  message: string;
  user: {
    name: string;
    email: string;
  };
}

export default function FeedbacksAndReports() {
  const [feedbackAndReports, setFeedbackAndReports] = useState<FeedbackAndReport[]>([]);
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackAndReport | null>(null);

  useEffect(() => {
    const fetchFeedbackAndReports = async () => {
      try {
        const response = await axios.get(`${process.env.server}/users/v1/feedbackAndReports/all`);
        setFeedbackAndReports(response?.data?.FoundFeedbackAndReports);
      } catch (error: any) {
        console.log(
          error.response?.data?.message ||
            "Error occurred while fetching feedback and reports"
        );
      }
    };

    fetchFeedbackAndReports();
  }, []);

  const handleRowClick = (feedback: FeedbackAndReport) => {
    setSelectedFeedback(feedback);
  };

  if (feedbackAndReports.length === 0) return (<></>);

  return (
    <>
      <h1>Feedbacks and Reports</h1>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Message</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {feedbackAndReports.map((feedbackReport, index) => (
            <tr key={index} onClick={() => handleRowClick(feedbackReport)}>
              <td>{feedbackReport.title}</td>
              <td>{feedbackReport.message}</td>
              <td>{feedbackReport.user.name}</td>
              <td>{feedbackReport.user.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {selectedFeedback && (
        <div className="selected-feedback ps-5">
          <h2>Selected Feedback Report</h2>
          <p>Title: {selectedFeedback.title}</p>
          <p>Message: {selectedFeedback.message}</p>
          <p>Name: {selectedFeedback.user.name}</p>
          <p>Email: {selectedFeedback.user.email}</p>
        </div>
      )}
    </>
  );
}
