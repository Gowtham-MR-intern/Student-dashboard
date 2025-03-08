import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, addToast, ToastProvider } from '@heroui/react';
import { auth } from './FirebaseConfiguration';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from "../services/AuthContext";

const Login: React.FC = () => {      
    const navigate = useNavigate();
    const { user,loading } = useAuth();
    const [log, setLog] = useState("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        
        if (!loading && user) {
            //after creating an account it will render the login page 
            if(log=="signup"){
                setLog("login");
                navigate("/");
            }
            else{
                navigate("/home");
            }
        }
        
    }, [user, loading, navigate]);

    const showSuccessToast = (title: string, description: string) => {
        addToast({
          title,
          description,
          variant: "flat", 
          color: "success", 
        });
      };
      
      const showErrorToast = (title: string, description: string) => {
        addToast({
          title,
          description,
          variant: "solid", 
          color: "danger", 
        });
      };
      
    // handle Form Submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (log === "signup" && password !== confirmPassword) {
            showErrorToast("Error", "Passwords do not match!");
            return;
        }

        try {
            if (log === "signup") {
                await createUserWithEmailAndPassword(auth, email, password);
                showSuccessToast("Success", "Account created! Please log in.");
                navigate('/');        
            } else {
                await signInWithEmailAndPassword(auth, email, password);
                navigate('/home');
            }
        } catch (error: any) {
            let message = "Something went wrong. Please try again.";
            switch (error.code) {
                case "auth/email-already-in-use":
                  message = "Email already exists! Try logging in.";
                  break;
                case "auth/invalid-credential":
                  message= "Incorrect email or password";
                  break;
                case "auth/user-not-found":
                  message = "User not found! Please sign up.";
                  break;
                case "auth/weak-password":
                  message = "Password should be at least 6 characters.";
                  break;
            }
            showErrorToast("", message);
        }
    };
    console.log(log);
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
            <ToastProvider
                toastProps={{
                radius: "md",
                color: "secondary",
                timeout: 3000,
                classNames: {
                    closeButton: "opacity-5 absolute right-4 top-1/2 -translate-y-1/2",
                },
                }}
                placement="top-center"
                toastOffset={60}
            />
            <div className='w-full max-w-md p-8 bg-white rounded-2xl shadow-lg'>
                <h1 className='text-center text-xl mb-8'>{log === "login" ? "Login Page!" : "Signup Page!"}</h1>
                
                <Form className='flex flex-col gap-5 justify-center items-center' onSubmit={handleSubmit}>
                    <Input label="Email" type="email" variant="flat" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <Input label="Password" type="password" variant="flat" value={password} onChange={(e) => setPassword(e.target.value)} required />

                    {log === "signup" && (
                        <Input label="Confirm Password" type="password" variant="flat" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    )}

                    <Button type="submit" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg mt-2 w-[100px]" radius="full">
                        Submit
                    </Button>

                    <p>
                        {log === "login" ? 
                            <>
                                Don't have an account? 
                                <Button className='text-blue-500 bg-transparent' onPress={() => setLog("signup")}>Signup</Button>
                            </>
                            :
                            <>
                                Already have an account? 
                                <Button className='text-blue-500  bg-transparent ' onPress={() => setLog("login")}>Login</Button>
                            </>
                        }
                    </p>
                </Form>
            </div>
        </div>
    );
};

export default Login;
