import { CompatClient, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

let stompClient: CompatClient | null = null;

const getStompClient = () => {
  if (stompClient) return stompClient;
  const socket = new SockJS(
    process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8080/ws"
  );
  stompClient = Stomp.over(socket);
  stompClient.connect({}, (frame: any) => {
    console.log("Connected:", frame);
  });
  return stompClient as CompatClient;
};

export default getStompClient;
