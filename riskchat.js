// When receiving data, update the chat state like this:
setChat((prevChat) => prevChat.map((ch) => {
    if (ch.uniqueId === uniqueId) {
        return {
            ...ch,
            value: results,
            duration: data.duration,
            activeTab: 0
        };
    }
    return ch;
}));

// Render tabs like this:
{chat.map((item, index) => (
    // ... [rest of the code]
    {Array.isArray(item.value) ? (
        <div>
            <Tabs value={item.activeTab} 
                  onChange={(event, newValue) => handleTabChange(index, newValue)}>
                {item.value.map((_, idx) => (
                    <Tab label={`Result ${idx + 1}`} key={idx} />
                ))}
            </Tabs>
            {item.value.map((result, idx) => (
                // ... [rest of the tab content]
            ))}
        </div>
    ) : (
        <div className="message" id={item.uniqueId || ''}>{item.value}</div>
    )}
    // ... [rest of the code]
))}

// Add this function to handle tab change:
const handleTabChange = (chatIndex, newTabValue) => {
    setChat((prevChat) => prevChat.map((ch, index) => {
        if (index === chatIndex) {
            return {
                ...ch,
                activeTab: newTabValue
            };
        }
        return ch;
    }));
};


import React, { useState, useRef, useEffect } from 'react';
import { Tab, Tabs, Card, CardHeader, CardContent, Typography, Link } from '@mui/material';
import bot from './chatgpt.png';
import user from './me.png';
import './App.css';

function RiskChatExplorer({ chatInputText, setChatInputText }) {
    const [chat, setChat] = useState([]);
    const [tabValue, setTabValue] = useState(0);  // State to manage currently active tab
    // ... [rest of the useState and other functions]

    useEffect(() => {
        const lastChat = chat[chat.length - 1];
        if (lastChat && lastChat.isAi) {
            const uniqueId = lastChat.uniqueId;
            const messageDiv = document.getElementById(uniqueId);
            const loadInterval = loader(messageDiv);
            fetch('https://codelab-agnb.onrender.com', {
                // ... [unchanged code]
            }).then(async response => {
                clearInterval(loadInterval);
                if (response.ok) {
                    const data = await response.json();
                    const results = data.response.result;
                    setChat((prevChat) => prevChat.map((ch) => {
                        if (ch.uniqueId === uniqueId) {
                            return {
                                ...ch,
                                value: results,
                                duration: data.duration,
                            };
                        }
                        return ch;
                    }));
                } else {
                    const err = await response.text();
                    alert(err);
                }
            });
        }
    }, [chat, chatInputText]);

    // ... [rest of the functions]

    return (
        <div id="app">
            <div id="chat_container" ref={chatContainer}>
                {chat.map((item, index) => (
                    <div key={index} className={`wrapper ${item.isAi ? 'ai' : ''}`}>
                        <div className="chat">
                            <div className="profile">
                                <img src={item.isAi ? bot : user} alt={item.isAi ? 'bot' : 'user'} />
                            </div>
                            {Array.isArray(item.value) ? (
                                <>
                                    <Tabs value={tabValue} onChange={(event, newValue) => setTabValue(newValue)}>
                                        {item.value.map((_, idx) => (
                                            <Tab label={`Result ${idx + 1}`} key={idx} />
                                        ))}
                                    </Tabs>
                                    {item.value.map((result, idx) => (
                                        <div key={idx} hidden={tabValue !== idx}>
                                            <Card>
                                                <CardHeader title={`Book: ${result.book}`} />
                                                <CardContent>
                                                    <Typography variant="body1">{result.context}</Typography>
                                                    <Link href={result.hyperlink} target="_blank">{result.section_title}</Link>
                                                </CardContent>
                                            </Card>
                                            <Typography variant="caption">Response Duration: {item.duration}</Typography>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <div className="message" id={item.uniqueId || ''}>{item.value}</div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <h1>RiskExplorer Chat</h1>
            {/* ... [rest of the JSX] */}
        </div>
    );
}

export default RiskChatExplorer;
