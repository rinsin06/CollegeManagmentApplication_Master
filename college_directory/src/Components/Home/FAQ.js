import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQ = () => {
    const faqData = [
        {
            question: "What is the purpose of the Administration section?",
            answer: "Administration that are affiliated/applying for affiliation with ABC University can login to the application. Administration users can perform activities related to affiliation, student registration and academics, make fee payments etc. College faculty members can view the student records that includes personal information, admission information, attendance details, internal evaluation details, mark lists, student history and other details after logging on."
        },
        {
            question: "What can Students do in the student portal?",
            answer: "Students who are admitted in colleges affiliated to ABC University can login to the application. Registered students can use the student portal to gain access to personalized information and also view their academic details, attendance and marks, earned credits etc. They can download their mark list, grade sheet etc and access educational information. The portal also allows students to securely communicate with the university faculty members."
        },
        {
            question: "What activities can Faculty Members perform?",
            answer: "Faculty Members such as management team, auditors, external trainers and other officials can login to the application to perform various activities. Clusters can be set up, cluster members configured and curriculum managed for each cluster."
        },
    ];

    return (
        <Box sx={{ width: '100%', padding: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Frequently Asked Questions
            </Typography>
            {faqData.map((item, index) => (
                <Accordion key={index}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">{item.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {item.answer}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
};

export default FAQ;
