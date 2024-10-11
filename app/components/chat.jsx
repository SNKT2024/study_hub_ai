import React, { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import logo from "../../../studyhubai/public/assets/img/logo/logo.png";
import {
  Channel,
  ChannelHeader,
  ChannelList,
  Chat,
  LoadingIndicator,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";

import "stream-chat-react/dist/css/v2/index.css";
import { useUserContext } from "../../context/UserContext"; // Adjust path as necessary
import { Box, Stack, Button, TextField } from "@mui/material";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const Chat_Stream = () => {
  const [client, setClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [newChannelName, setNewChannelName] = useState("");
  const { userId, userName } = useUserContext();

  useEffect(() => {
    if (userId && userName && apiKey) {
      const initChat = async () => {
        const chatClient = StreamChat.getInstance(apiKey);

        // Connect user with a valid token
        await chatClient.connectUser(
          { id: userId, name: userName },
          chatClient.devToken(userId)
        );

        setClient(chatClient);
      };

      initChat().catch((error) =>
        console.error("Error initializing chat:", error)
      );

      return () => {
        if (client) client.disconnectUser();
      };
    }
  }, [userId, userName]);

  const handleCreateChannel = async () => {
    if (!newChannelName || !client) return;

    try {
      const newChannel = client.channel("messaging", newChannelName, {
        image: logo,
        name: newChannelName,
        members: [userId],
      });

      await newChannel.watch();
      setChannel(newChannel);
    } catch (error) {
      console.error("Error creating channel:", error);
    }
  };

  if (!client) return <LoadingIndicator />;

  return (
    <Box sx={{ height: "90vh" }}>
      <Chat client={client} theme="messaging light">
        <Stack spacing={12} direction={"row"} height={"90vh"} width={"90vw"}>
          <Box width={"20%"}>
            <ChannelList />
            <Box mt={2}>
              <TextField
                label="New Channel Name"
                value={newChannelName}
                onChange={(e) => setNewChannelName(e.target.value)}
                fullWidth
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreateChannel}
                fullWidth
                sx={{ mt: 1 }}
              >
                Create Channel
              </Button>
            </Box>
          </Box>
          <Box width={"70%"}>
            {channel ? (
              <Channel>
                <Window>
                  <ChannelHeader />
                  <MessageList />
                  <MessageInput />
                </Window>
                <Thread />
              </Channel>
            ) : (
              <div>Select or create a channel to start chatting</div>
            )}
          </Box>
        </Stack>
      </Chat>
    </Box>
  );
};

export default Chat_Stream;
