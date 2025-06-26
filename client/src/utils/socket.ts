import { io, Socket } from 'socket.io-client';

interface MessageData {
  sender: string;
  text: string;
  createdAt: Date;
}

interface ErrorData {
  message: string;
}

class SocketService {
  private socket: Socket | null = null;
  private apiUrl: string;

  constructor() {
    this.apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  }

  connect(): Socket {
    if (!this.socket) {
      this.socket = io(this.apiUrl, {
        transports: ['websocket', 'polling'],
        withCredentials: true,
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      this.socket.on('connect', () => {
        console.log('Connected to Socket.IO server');
      });

      this.socket.on('disconnect', () => {
        console.log('Disconnected from Socket.IO server');
      });

      this.socket.on('connect_error', (error: Error) => {
        console.error('Socket.IO connection error:', error);
      });
    }

    return this.socket;
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  getSocket(): Socket | null {
    return this.socket;
  }

  joinRoom(postId: string): void {
    if (this.socket) {
      this.socket.emit('joinRoom', { postId });
    }
  }

  leaveRoom(postId: string): void {
    if (this.socket) {
      this.socket.emit('leaveRoom', { postId });
    }
  }

  sendMessage(postId: string, sender: string, text: string): void {
    if (this.socket) {
      this.socket.emit('sendMessage', { postId, sender, text });
    }
  }

  onReceiveMessage(callback: (data: MessageData) => void): void {
    if (this.socket) {
      this.socket.on('receiveMessage', callback);
    }
  }

  onError(callback: (data: ErrorData) => void): void {
    if (this.socket) {
      this.socket.on('error', callback);
    }
  }
}

export const socketService = new SocketService();
export default socketService; 