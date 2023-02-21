'use client';
import React, { useState, useEffect } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import Image from "next/image";

const myLog = require('../assets/log.webp')


export const Login = () => {
    return (
        <div>Login</div>
    )
}


export default Login;
