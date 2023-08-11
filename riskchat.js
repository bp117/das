const [chat, setChat] = useState([]);
const [chat, setChat] = useState([]);
const [responseData, setResponseData] = useState(null);
if (response.ok) {
    const data = await response.json();

    // Update responseData
    setResponseData(data.response.result); 

    const botMessage = data.bot && data.bot.trim();
    if (botMessage) {
        setChat(prevChat => {
            const updatedChat = [...prevChat];
            updatedChat[updatedChat.length - 1].value = botMessage;
            return updatedChat;
        });
    } else {
        setChat(prevChat => prevChat.slice(0, -1));  // Remove the placeholder
    }
}
<div id="chat_container" ref={chatContainer}>
    {chat.map((item, index) => (
        // ... (existing chat messages rendering logic)
    ))}
    {responseData && (
        <div className="wrapper ai">
            <div className="chat">
                <div className="profile">
                    <img src={bot} alt='bot' />
                </div>
                <div className="message">
                    {Object.keys(responseData).map(key => (
                        <Accordion key={key}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>{key}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>{responseData[key]}</Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </div>
                <div style={{ fontSize: '0.8em', opacity: '0.6', verticalAlign: 'middle' }}>
                    Duration: {data.duration}
                </div>
            </div>
        </div>
    )}
</div>
