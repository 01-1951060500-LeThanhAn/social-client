import React, { useRef, useState } from "react";
import Topbar from "../../components/Topbar/TopBar";
import Conversation from "./Conversation";
import Message from "./Message";

import Chat from "./Chat";
import useFakeUser from "../../hooks/useFakeUser";
import { useEffect } from "react";
import { getConversation } from "../../api/conversation";
import { io } from "socket.io-client";
import { socketApi } from "../../utils/constant";
import { baseApi } from "../../api";
import AvatarMess from "./AvatarMess";

import InputMessage from "./InputMessage";
import { toast } from "react-toastify";
import { message } from "antd";

const Messenger = () => {
  const { newUser } = useFakeUser();

  const [conversations, setConverSations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [chatCurrent, setChatCurrent] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [socketMessage, setSocketMessage] = useState(null);
  const [onlineUser, setOnlineUser] = useState();
  const socket = useRef(io(socketApi));
  const messRef = useRef();
  const [file, setFile] = useState(null);
  const [image, setImage] = useState();
  const [query, setQuery] = useState("");
  const [listImages, setListImages] = useState([]);

  useEffect(() => {
    if (messages.length > 0) {
      setListImages(
        messages.filter((p) => {
          if (p && p.img) {
            return p.img;
          }
        })
      );
    }
  }, [messages]);

  useEffect(() => {
    socket.current.emit("addUser", newUser._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUser(users);
    });
  }, [newUser]);

  useEffect(() => {
    socket.current = io(socketApi);
    socket.current.on("getMessage", (data) => {
      setSocketMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    socketMessage &&
      chatCurrent?.members.includes(socketMessage.sender) &&
      setMessages((prev) => [...prev, socketMessage]);
  }, [socketMessage, chatCurrent]);

  useEffect(() => {
    const fetchConversation = async () => {
      const res = await getConversation(newUser._id);
      // console.log(res.data);
      setConverSations(res.data);
    };

    fetchConversation();
  }, [newUser._id]);

  useEffect(() => {
    const fetchAllMessages = async () => {
      try {
        const res = await baseApi.get(`/api/message/${chatCurrent?._id}`);
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllMessages();
  }, [chatCurrent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage) {
      return toast.error("Please enter message");
    }

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "thanhan2001");
    data.append("cloud_name", "dkw090gsn");
    fetch("https://api.cloudinary.com/v1_1/dkw090gsn/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.url);
        setImage(data.url);
      })
      .catch((err) => {
        toast.error("Some Thing Wron1g");
      });

    const saveMessage = {
      sender: newUser._id,
      text: newMessage,
      img: image,
      conversationId: chatCurrent._id,
    };

    const receiverId = chatCurrent.members.find(
      (member) => member !== newUser._id
    );

    socket.current.emit("sendMessage", {
      senderId: newUser._id,
      receiverId: receiverId,
      text: newMessage,
      img: image,
    });

    try {
      const res = await baseApi.post(`/api/message`, saveMessage);
      setMessages([...messages, res.data]);
      setNewMessage("");
      setFile(null);
    } catch (error) {
      setFile(null);
      console.log(error);
    }
  };

  useEffect(() => {
    messRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  });

  const checkUserOnline = (chat) => {
    const chatMembers = chat?.members?.find((member) => member !== newUser._id);
    const userOnline = onlineUser?.find((user) => user.userId === chatMembers);

    return userOnline ? true : false;
  };

  return (
    <>
      <Topbar />
      <div className="flex flex-col mt-16 md:flex-row bg-slate-100 h-auto">
        <div className="2xl:flex-[3]  md:block md:flex-[5] lg:flex-[3] ">
          <div className="p-[10px]  h-full">
            <div className="w-full">
              <input
                className="border-blue-600 border outline-none rounded-full w-full py-2 px-3"
                type="text"
                placeholder="Search users"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              {conversations.map((conver) => (
                <div key={conver?._id} onClick={() => setChatCurrent(conver)}>
                  <Conversation
                    conversations={conversations}
                    online={checkUserOnline(conver)}
                    userId={newUser._id}
                    item={conver}
                    messages={messages}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          className={
            chatCurrent
              ? `2xl:flex-[5.5] ml-5 md:ml-0 flex-[7] mr-5 md:flex-[7] lg:flex-[4.5]`
              : `flex-[9]`
          }
        >
          {chatCurrent ? (
            <>
              <div className="avata">
                <AvatarMess chatCurrent={chatCurrent} userId={newUser._id} />
              </div>
              <div className="p-[10px] pb-20 overflow-y-scroll h-screen z-10">
                {messages.map((mess) => (
                  <div ref={messRef}>
                    <Message
                      messages={messages}
                      key={mess._id}
                      chatCurrent={chatCurrent}
                      userId={newUser._id}
                      item={mess}
                    />
                  </div>
                ))}
              </div>
              <InputMessage
                file={file}
                setFile={setFile}
                handleSubmit={handleSubmit}
                newMessage={newMessage}
                setNewMessage={setNewMessage}
              />
            </>
          ) : (
            <div className="text-slate-400 text-center flex justify-center items-center h-screen text-3xl md:text-5xl">
              Open conversation to start chat
            </div>
          )}
        </div>
        {chatCurrent ? (
          <div className="lg:flex-[3] 2xl:flex-[3.5] lg:block hidden">
            <div className="p-[10px]  h-full">
              <Chat
                listImages={listImages}
                chatCurrent={chatCurrent}
                userId={newUser._id}
              />
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Messenger;
