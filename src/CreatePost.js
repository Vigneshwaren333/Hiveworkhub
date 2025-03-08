import React, { useState } from "react";
import hive from "@hiveio/hive-js";

const CreatePost = () => {
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");

  const handlePost = () => {
    if (!username || !title || !body || !tags) {
      alert("Please fill in all fields.");
      return;
    }

    const permlink = title.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();
    const parentPermlink = tags.split(",")[0].trim();
    const jsonMetadata = JSON.stringify({ tags: tags.split(","), app: "hive-react-app" });

    const postData = [
      [
        "comment",
        {
          parent_author: "",
          parent_permlink: parentPermlink,
          author: username,
          permlink: permlink,
          title: title,
          body: body,
          json_metadata: jsonMetadata,
        },
      ],
    ];

    if (window.hive_keychain) {
      window.hive_keychain.requestBroadcast(username, postData, "posting", (response) => {
        if (response.success) {
          alert("Post published successfully!");
        } else {
          alert("Error publishing post: " + response.message);
        }
      });
    } else {
      alert("Hive Keychain not installed!");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create a Post</h2>
      <input
        type="text"
        placeholder="Your Hive Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <textarea
        placeholder="Write your post..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="w-full p-2 mb-2 border rounded h-32"
      />
      <input
        type="text"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <button
        onClick={handlePost}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Publish Post
      </button>
    </div>
  );
};

export default CreatePost;
