//... (Import other dependencies)
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

//... (Other functions)

const processResponseData = (data) => {
    const { duration, response: { result: { context, book, section_title, hyperlink, generated_resp } } } = data;
    return {
        duration,
        context,
        book,
        section_title,
        hyperlink,
        generated_resp
    };
}

//... (Inside the useEffect after fetching data)

if (response.ok) {
    const data = await response.json();
    const processedData = processResponseData(data);
    messageDiv.innerHTML = `
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Response Details</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>Context: ${processedData.context}</Typography>
            </AccordionDetails>
            <AccordionDetails>
                <Typography>Book Hyperlink: <a href="${processedData.hyperlink}" target="_blank" rel="noopener noreferrer">${processedData.book}</a></Typography>
            </AccordionDetails>
            <AccordionDetails>
                <Typography>Hyperlink: <a href="${processedData.hyperlink}" target="_blank" rel="noopener noreferrer">${processedData.hyperlink}</a></Typography>
            </AccordionDetails>
            <AccordionDetails>
                <Typography>Response Duration: ${processedData.duration}</Typography>
            </AccordionDetails>
        </Accordion>
    `;
} else {
    //... (Error handling code)
}

//...

// ... (previous code)

// ... (Inside the useEffect after fetching data)

if (response.ok) {
    const data = await response.json();
    const processedData = processResponseData(data);
    messageDiv.innerHTML = `
        <div style="display: flex; flex-direction: column; justify-content: center; height: 100%;">
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Response Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>Context: ${processedData.context}</Typography>
                </AccordionDetails>
                <AccordionDetails>
                    <Typography>Book Hyperlink: <a href="${processedData.hyperlink}" target="_blank" rel="noopener noreferrer">${processedData.book}</a></Typography>
                </AccordionDetails>
                <AccordionDetails>
                    <Typography>Hyperlink: <a href="${processedData.hyperlink}" target="_blank" rel="noopener noreferrer">${processedData.hyperlink}</a></Typography>
                </AccordionDetails>
            </Accordion>
            <div style="opacity: 0.5; font-size: 12px; text-align: center; margin-top: 10px;">
                Response Duration: ${processedData.duration}
            </div>
        </div>
    `;
} else {
    // ... (Error handling code)
}

// ...
