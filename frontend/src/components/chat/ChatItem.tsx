import { Avatar, Box, Typography } from "@mui/material";

import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type CodeBlock = { type: "text" | "code"; content: string; language?: string };

function extractCodeFromString(message: string): CodeBlock[] {
  if (!message.includes("```")) {
    return [{ type: "text", content: message }];
  }

  const parts = message.split("```");
  const blocks: CodeBlock[] = [];

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 0) {
      if (parts[i].trim()) {
        blocks.push({ type: "text", content: parts[i] });
      }
    } else {
      const lines = parts[i].split("\n");
      const firstLine = lines[0].trim();
      const language = /^[a-zA-Z0-9+#-]+$/.test(firstLine) ? firstLine : "text";
      const code = language === "text" ? parts[i] : lines.slice(1).join("\n");
      blocks.push({ type: "code", content: code, language });
    }
  }

  return blocks;
}

const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "assistant";
}) => {
  const messageBlocks = extractCodeFromString(content);
  const auth = useAuth();

  return role === "assistant" ? (
    <Box sx={{ display: "flex", p: 2, bgcolor: "#004d5612", my: 2, gap: 2,borderRadius: 2 }}>
      <Avatar sx={{ ml: "0" }}>
        <img src="airobot.png" alt="openai" width={"30px"} />
      </Avatar>
      <Box>
        {messageBlocks.map((block, idx) =>
          block.type === "code" ? (
            <SyntaxHighlighter
              key={idx}
              style={coldarkDark}
              language={block.language || "text"}
            >
              {block.content}
            </SyntaxHighlighter>
          ) : (
            <Typography key={idx} sx={{ fontSize: "20px" }}>
              {block.content}
            </Typography>
          )
        )}
      </Box>
    </Box>
  ) : (
    <Box sx={{ display: "flex", p: 2, bgcolor: "#004d56", gap: 2, my:2 }}>
      <Avatar sx={{ ml: "0", bgcolor: "black", color: "white" }}>
        {auth?.user?.name[0]}
        {auth?.user?.name.split(" ")[1][0]}
      </Avatar>
      <Box>
        <Typography fontSize={"20px"}>{content}</Typography>
      </Box>
    </Box>
  );
};

export default ChatItem;
