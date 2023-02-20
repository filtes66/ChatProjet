import React from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./Styles/EnterChat.css"

const EnterChat = ({roomOptions, validationOptions}) => {

  const { register, control, handleSubmit, formState: { errors } } = useForm({mode:"onChange", defaultValues : { username: "", password: ""}});
  
  const navigate=useNavigate();

  const onSubmit = data => {
    console.log("data", data)
    const { username, room } = data;
    console.log("username room data", username, room, data)
    navigate('/chat', {state:{username:username, room:room}})
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Username</label>
        <input placeholder="username" {...register('username', validationOptions.username) }/>
        <small className="text-danger">
          {errors.username?.message}
        </small>
        <input type="password" placeholder="password" {...register("password", validationOptions.password)} />
        <small className="text-danger">
          {errors.password?.message}
        </small>
      </div>
      <div>
       <Controller
          control={control}
          name="room"
          render={({field :{onChange, onBlur, value, ref }}) => (
            <Select
              options={roomOptions}
              value={roomOptions.find((c) => c.value === value)}
              onChange={onChange}
            />
          )}
          rules={{ required: 'Please select an option'}}
        />
        {errors.room?.message}
      </div>
      <input type="submit" className="submit-button" value="start chat" />   
    </form>
  );
};
export default EnterChat;