import {
  Chat,
  Message,
} from "@/app/(routes)/chats/Components/TableChats/TableChats.types";
import { CustomIcon } from "@/components/CustomIcon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { db } from "@/firebase";
import { addMessageToChat, fetchChatMessages } from "@/firebaseFunctions";
import { doc, onSnapshot } from "firebase/firestore";
import { Image, PaperclipIcon, Send } from "lucide-react";
import { useEffect, useState } from "react";

interface ChatModalProps {
  chatId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ chatId, isOpen, onClose }) => {
  const [chat, setChat] = useState<Chat | null>(null); // Changed 'messages' to 'chat' to avoid confusion
  const [message, setMessage] = useState<string>("");
  
 

  const newMessage = async (newMessageData: Message) => {
    console.log("Attempting to send new message...");
    if (chatId) {
      try {
        await addMessageToChat(chatId, newMessageData);
        console.log("Message sent successfully.");
      } catch (error) {
        console.error("Error adding message:", error);
      } finally {
      }
    } else {
      console.error("Chat ID is invalid:", chatId);
    }
  };
  
  
  useEffect(() => {
    if (chatId) {
      console.log("Listening to chat with ID:", chatId);
      const chatDoc = doc(db, 'chat', chatId);
      const unsubscribe = onSnapshot(chatDoc, (snapshot) => {
        if (snapshot.exists()) {
          console.log("Chat data received:", snapshot.data());
          setChat({ ...snapshot.data(), chatId: snapshot.id } as Chat);
        } else {
          console.log("Chat does not exist.");
        }
      }, (error) => {
        console.error("Error fetching chat document:", error);
      });
  
      return () => unsubscribe(); // Clean up the listener
    } else {
      console.error("Chat ID is not set.");
    }
  }, [chatId]);
  


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90vw] h-[99vh] mx-auto my-auto p-6 rounded-lg overflow-auto">
        <DialogHeader>
          <DialogTitle>Chat Messages</DialogTitle>
          <DialogDescription>Pet Walks Chat</DialogDescription>
        </DialogHeader>
        <div className="h-full overflow-y-auto border p-2">
          <ul>
            {chat?.messages.map((message, index) => {
              const isAdmin = message.s === "admin";
              const isOwner = message.s === chat.user1;

              return (
                <li
                  key={index}
                  className={`py-1 px-2 max-w-xs rounded-lg ${
                    isAdmin
                      ? "bg-blue-500 text-white ml-auto"
                      : isOwner
                      ? "bg-green-400 text-white"
                      : "bg-gray-300 text-black"
                  } ${isAdmin ? "text-right" : "text-left"}`}
                  style={{
                    float: isAdmin ? "right" : "left",
                    clear: "both",
                    marginBottom: "10px",
                  }}
                >
                  <div>
                    {isAdmin ? (
                      <strong className="text-white">Admin</strong>
                    ) : (
                      <strong>{message.s}</strong> // Display the sender's name
                    )}
                  </div>
                  <div>
                    {message.m ||
                      message.i ||
                      message.f ||
                      "No message available"}
                  </div>
                  <span className="text-gray-700 text-sm">
                    {new Date(message.t).toLocaleTimeString()}{" "}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex items-center gap-x-2">
          <Button
           onClick={() => {
            newMessage({
              s: "admin", 
              t: Date.now(),
              f: message, 
            });
          }}
            className="bg-primary hover:bg-zinc-500 px-1"
          >
            <PaperclipIcon className="" />
          </Button>
          <Button
            onClick={() => {
              newMessage({
                s: "admin", 
                t: Date.now(),
                i: [message], 
              });
            }}
            className="bg-primary hover:bg-zinc-500 px-1"
          >
            <Image className="" />
          </Button>
          <Input value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message..."/>
          <Button
            onClick={() => {
              newMessage({
                s: "admin", 
                t: Date.now(),
                m: message, 
              });
              setMessage('');
            }}
            className="bg-primary hover:bg-zinc-500 px-1"
          >
            <Send className="" />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="mt-2 bg-secondary hover:bg-zinc-500 px-4 py-2 rounded w-full"
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChatModal;
