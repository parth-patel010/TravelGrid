import React, { useState } from "react";
import { MessageCircle, ChevronDown, ChevronUp } from "lucide-react";
import toast from "react-hot-toast";

const forumTopics = [
  {
    id: 1,
    title: "Best travel hacks for solo travelers",
    description: "Share your favorite tips for solo adventures.",
    replies: [
      "Always keep digital copies of your documents.",
      "Pack light and use a universal adapter.",
    ],
  },
  {
    id: 2,
    title: "How to plan a budget-friendly trip to Leh",
    description: "Looking for affordable travel and stay options.",
    replies: [
      "Travel by bus and stay in hostels for best rates.",
      "Book flights early and try local guesthouses.",
    ],
  },
  {
    id: 3,
    title: "Top 5 underrated places in South India",
    description: "Suggest hidden gems for my next trip.",
    replies: [
      "Try Chettinad, Hampi, and Gokarna.",
      "Araku Valley and Yercaud are beautiful too!",
    ],
  },
];

export default function Forum() {
  const [openReplies, setOpenReplies] = useState({});

  const toggleReplies = (id) => {
    setOpenReplies((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-50 p-6 lg:p-12 flex justify-center items-center">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-900 mb-2 mt-2.5">Travel Forum</h1>
          <p className="text-gray-700 text-lg">
            Connect with fellow travelers, ask questions, and share your experiences!
          </p>
        </div>

        {forumTopics.map((topic) => (
          <div
            key={topic.id}
            className="bg-white rounded-xl shadow-md p-6 transition hover:shadow-lg"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold mb-1 text-blue-800">
                  {topic.title}
                </h2>
                <p className="text-gray-600">{topic.description}</p>
              </div>
              <div
                className="flex items-center gap-2 text-gray-500 cursor-pointer"
                onClick={() => toggleReplies(topic.id)}
              >
                <MessageCircle className="w-5 h-5" />
                {topic.replies.length}
                {openReplies[topic.id] ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </div>
            </div>

            {openReplies[topic.id] && (
              <div className="mt-4 border-t pt-3 space-y-2">
                {topic.replies.map((reply, idx) => (
                  <div
                    key={idx}
                    className="text-sm text-gray-700 bg-blue-50 p-3 rounded-md"
                  >
                    💬 {reply}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="flex justify-center mt-10">
          <button
            onClick={() => toast.error("Feature coming soon")}
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-xl transition duration-300"
          >
            + Ask a New Question
          </button>
        </div>
      </div>
    </div>
  );
}