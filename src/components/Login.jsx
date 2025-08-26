import react from react;
import { useState } from 'react';

const Login = ()=>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e)=>{
        e.preventDefault();
        alert(`Username: ${username}, Password: ${password}`);
        console.log("Username:", username);
        console.log("Password:", password);
    };

    return(
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input 
                    type="text" 
                    value={username} 
                    onChange={(e)=> setUsername(e.target.value)} 
                />
            </div>
            <div>
                <label>Password:</label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e)=> setPassword(e.target.value)} 
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
}  

export default Login;