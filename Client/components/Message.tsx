import React from 'react';
import styles from '../styles/Message.module.css';

interface MessageProps {
    content: string;
    author: string;
}

const Message: React.FC<MessageProps> = ({ content, author }) => {
    return (
        <div className={styles.message}>
            <strong>{author}:</strong> {content}
        </div>
    );
};

export default Message;
