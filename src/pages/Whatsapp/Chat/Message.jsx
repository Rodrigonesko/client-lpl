const Message = ({ message }) => {
    return (
        <div className="message">
            <div className="message__content">
                <div className="message__text">{message.text}</div>
                <div className="message__timestamp">{message.timestamp}</div>
            </div>
        </div>
    );
}
export default Message;