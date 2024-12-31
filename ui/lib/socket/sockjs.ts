import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

const socket = new SockJS("http://localhost:8080/ws");
const stompClient = Stomp.over(socket);
export default stompClient;
