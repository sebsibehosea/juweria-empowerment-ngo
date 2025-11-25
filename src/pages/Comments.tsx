import { useState } from "react";
import type { FormEvent } from "react";

export default function Comments() {
  const [text, setText] = useState("");
  const [comments, setComments] = useState<{ id: number, content: string, time: string }[]>([]);
  const [counter, setCounter] = useState(0);

  const addComment = (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setComments([{ id: counter, content: text.trim(), time: new Date().toLocaleString() }, ...comments]);
    setCounter(c => c + 1);
    setText("");
  };
  const deleteComment = (id:number) => {
    setComments(comments => comments.filter((c) => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-200 flex justify-center items-start py-10">
      <div className="w-full max-w-xl bg-white shadow-md rounded-xl p-8">
        <h2 className="text-2xl font-bold text-emerald-700 mb-4 text-center">Comment Board</h2>
        <form className="flex gap-2 mb-6" onSubmit={addComment}>
          <input
            className="flex-1 border rounded-lg px-3 py-2 text-sm focus:ring-emerald-400"
            placeholder="Write a comment..."
            value={text}
            maxLength={200}
            onChange={e => setText(e.target.value)}
            required
          />
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-800 font-semibold" type="submit">Post</button>
        </form>
        <div className="space-y-4">
          {comments.length === 0 && (
            <div className="text-center text-gray-400 text-sm">No comments yet. Be the first to share!</div>
          )}
          {comments.map((c) => (
            <div key={c.id} className="bg-emerald-50 rounded-lg p-3 flex items-center justify-between">
              <div className="flex-1 text-gray-800 text-sm">
                <div>{c.content}</div>
                <div className="text-xs text-gray-400 mt-1">{c.time}</div>
              </div>
              <button className="ml-2 px-2 text-red-500 hover:text-red-700 text-lg font-bold" aria-label="delete" onClick={()=>deleteComment(c.id)}>
                &#10060;
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
