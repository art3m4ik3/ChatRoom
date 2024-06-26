import * as express from 'express';
import * as http from 'http';
import { Server, Socket } from 'socket.io';
import mongoose, { Document, Schema, Model, model } from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();
const app = express();

const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB || 'mongodb://127.0.0.1:27017/ChatRoom';

interface IMessage extends Document {
    _id: string;
    content: string;
    author: string;
    timestamp?: Date;
}

const MessageSchema = new Schema<IMessage>({
    content: { type: String, required: true },
    author: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

const Message: Model<IMessage> = model<IMessage>('Message', MessageSchema);

mongoose.connect(MONGODB_URI);

io.on('connection', (socket: Socket) => {
    console.log('A user connected');

    Message.find()
        .sort({ timestamp: 1 })
        .then((messages) => {
            socket.emit('allMessages', messages);
        })
        .catch((error) => {
            console.error('Error fetching messages:', error);
        });

    socket.on('sendMessage', ({ content, author }: { content: string; author: string }) => {
        const newMessage = new Message({ content, author });
        newMessage.save()
            .then(() => {
                io.emit('newMessage', newMessage);
            })
            .catch((error) => {
                console.error('Error saving message:', error);
            });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
