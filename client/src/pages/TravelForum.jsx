import React, { useState } from "react";
import { MessageCircle, ChevronDown, ChevronUp } from "lucide-react";

const forumData = [
  {
    id: 1,
    title: "Best time to visit Himachal?",
    description: "Planning a trip to Himachal. What’s the best season to go?",
    replies: [
      "March to June is ideal if you want pleasant weather.",
      "I visited in October and it was beautiful and less crowded!",
    ],
  },
  {
    id: 2,
    title: "Budget trip to Goa",
    description: "Any recommendations for budget-friendly stays in Goa?",
    replies: [
      "Check out Zostel or Hosteller – affordable and clean.",
      "You can also stay near Anjuna beach for cheap guesthouses.",
    ],
  },
  {
    id: 3,
    title: "Hidden gems in Kerala",
    description: "Share some offbeat places to explore in Kerala.",
    replies: [
      "Try Vagamon – it’s quiet and green.",
      "I’d recommend Aranmula and Thenmala too!",
    ],
  },
  {
    id: 4,
    title: "Best travel backpack?",
    description: "Looking for a lightweight, durable backpack for 1-week trips.",
    replies: [
      "Wildcraft and Quechua are both great options.",
      "Make sure it has good back support and rain cover.",
    ],
  },
];

export default function TravelForum() {
  const [openReplies, setOpenReplies] = useState({});

  const toggleReplies = (id) => {
    setOpenReplies((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div
  className="min-h-screen p-6 lg:p-12"
  style={{
    background: "linear-gradient(135deg, #2a001f, #4a0030, #3b002a)",
    color: "#f6f0e6",
  }}
>
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-pink-300 mb-2 mt-2.5 drop-shadow-md">
        Travel Forum</h1>
          <p className="text-pink-100 text-lg">
            Ask questions, share advice, and connect with travel lovers like you!
          </p>
        </div>

        {forumData.map((post) => (
          <div
            key={post.id}
              className="bg-[#fef6fb] bg-opacity-10 rounded-xl shadow-md p-6 border border-pink-100/20 transition hover:shadow-lg hover:bg-opacity-20"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold mb-1 text-pink-200">
                  {post.title}
                </h2>
               <p className="text-[#735f4d]">{post.description}</p>
              </div>
              <div
                className="flex items-center gap-2 text-[#967d6e] cursor-pointer"
                onClick={() => toggleReplies(post.id)}
              >
                <MessageCircle className="w-5 h-5" />
                {post.replies.length}
                {openReplies[post.id] ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </div>
            </div>

            {openReplies[post.id] && (
              <div className="mt-4 border-t pt-3 space-y-2 border-[#d4bdae]">
                {post.replies.map((reply, index) => (
                  <div
                    key={index}
                     className="text-sm text-[#5c4636] bg-[#f3e6dc] p-3 rounded-md"
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
            onClick={() => alert("Feature coming soon")}
            className="bg-[#6b3e2e] hover:bg-[#884f3b] text-white font-semibold py-3 px-6 rounded-xl transition duration-300"
          >
            + Ask a New Question
          </button>
        </div>
      </div>
    </div>
  );
}
