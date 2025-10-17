import React, { useEffect, useMemo, useState, useContext, createContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link, NavLink, useNavigate, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, LogOut, Menu, X, GraduationCap, Home as HomeIcon, Info, Mail, LayoutDashboard, Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
const brand={red:"#cc0000",redDark:"#990000"};
export default function App(){ return (<div className="p-6"><h1 className="text-2xl font-bold">IIT Onboarding — Starter</h1><p className="mt-2">Replace this App.jsx with your full multilingual version.</p></div>); }
