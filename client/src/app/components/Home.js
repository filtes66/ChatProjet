import React, { useState } from "react";
import Select from "react-select";
import { useController, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import EnterChat from "./EnterChat"
import { BsChatLeft } from "react-icons/fa"

const [isEnterChat, setIsEnterChat] = useState(false)

const roomOptions = [
    { value: "classroom", label: "Classroom" }
]

const validationOptions = {
    username: {
        required: "username is required",
        minLength: {
            value: 2,
            message: "username must have at least 2 characters"
        }
    },
    room: { required: true },
    firstname: {
        required: "firstname is required",
        minLength: {
            value: 2,
            message: "first name must have at least 2 characters"
        }
    },
    lastname: {
        required: "last name is required",
        minLength: {
            value: 2,
            message: "last name must have at least 2 characters"
        }
    },
    email: { required: "email is required", pattern: /^\S+@\$/i },
    password: {
        required: "password is required",
        minLength: {
            value: 6,
            message: "password must have at least 6 characters"
        }
    }
};

function Home() {
    return (
        <div>
            <button className="home__switchChat" onClick={onEnterChatSelected}>
                <BsChatLeft />
            </button>
            {isEnterChat && <EnterChat roomOptions={roomOptions} validationOptions={validationOptions} />}
        </div>
    )
}

export default Home;