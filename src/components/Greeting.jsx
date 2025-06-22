import { useState } from "react";
import './index.less'

export default function Greeting({ messages }) {
  const randomMessage = () =>
    messages[Math.floor(Math.random() * messages.length)];

  const [greeting, setGreeting] = useState(messages[0]);

  return (
    <div>
        <h2 className="test">我啊哈哈</h2>
      <h3 className="text-[red] text-[20px]">{greeting}！感谢来访！</h3>
      <button onClick={() => setGreeting(randomMessage())}>新的欢迎语</button>
    </div>
  );
}
