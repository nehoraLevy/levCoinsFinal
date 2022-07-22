import React, { useState } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import botAvatar from "./img/logo.png";
import userAvatar from "./img/user.png";
const theme = {
  background: "#f5f8fb",
  fontFamily: "Helvetica",
  headerBgColor: "#00796B",
  headerFontColor: "#fff",
  headerFontSize: "15px",
  botBubbleColor: "#e1ffc7",
  botFontColor: "#000",
  userBubbleColor: "#fff",
  userFontColor: "#000"
};

const balance= 20;

function Chat() {

  return (
      <ThemeProvider theme={theme}>
        <ChatBot
          width="450px"
          botAvatar={botAvatar}
          userAvatar={userAvatar}
          steps={[
            {
              id: "1",
              message:"What You need help?",
              trigger: "2",
            },
            {
                id:"2",
                options: [
                    { value: 1, label: "Loans", trigger: "3" },
                    { value: 2, label: "Your details", trigger: "4" },
                    { value: 3, label: "Another", trigger: "5" },
                ],
            },
            {
                id:"3",
                message:"Go to My Loans->",
                end: true,
            },
            {
                id:"4",
                options: [
                    { value: 1, label: "My balance in LevCoins", trigger: "6" },
                    { value: 2, label: "My balance in dollars", trigger: "7" },
                ],
            },
            {
                id:"5",
                message:"write your request",
                trigger:8,
            },
            {
                id:"6",
                message:`Your Balance is ${balance} LevCoins`,
                end: true,
            },
            {
                id:"7",
                message:`Your Balance is ${balance} $`,
                end: true,
            },
            {
                id:"8",
                user:true,
                trigger:"9",
            },
            {
                id:"9",
                message:"Go to Contact Us ->",
                end: true,
            },


          ]}
        />
      </ThemeProvider>
  );
}
export default Chat;
