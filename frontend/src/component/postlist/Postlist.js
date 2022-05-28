import { useEffect, useState } from "react";
import "./postlist.css";
import Post from "../post/Post";

export default function Postlist({ posts, ishomepage }) {
  const [showpost, setShowpost] = useState(false);
  const [post_id, setpost_id] = useState(null);
  const [bgcolor , setBgcolor] = useState();
  const go = (id) => {
    setpost_id(id);
    setShowpost(true);
  };

  const handleClose = () => {
    setShowpost(false);
  };

  //   if(posts.length === 0)
  //     return <div className='error'>No posts found ...</div>

  useEffect(() => {
    if (ishomepage) {
      setBgcolor({ background: "#e8d9d3" });
    } else {
      setBgcolor({ background: "#1a212e" });
    }
  }, []);

  return (
    <div className="post-list">
      {posts.map((p) => (
        <div
          key={p.id}
          className="post"
          style={bgcolor}
          onClick={() => {
            go(p.id);
          }}
        >
          <img src={p.image} alt="post-img" />
        </div>
      ))}
      {showpost && <Post handleClose={handleClose} id={post_id} />}
    </div>
  );
}
