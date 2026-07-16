import {forwardRef, useState} from 'react';
import type {JSX} from 'react';
import './App.css';

import Badge from "./components/Badge";

import.meta.env.VITE_APP_TITLE;

import Card from "./components/ui/Card.tsx";
import Button from "./components/ui/Button.tsx";
import Header from "./components/ui/Header.tsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Input, {type InputProps} from "./components/ui/Input.tsx";
import Layout from "./components/ui/Layout.tsx";
import SkipToContent from "./components/ui/SkipToContent.tsx";

import {useTaskList} from "./hooks/useTaskList.ts";

import {useTasks} from "./hooks/useTasks.ts";

import Input2 from "./components/ui/Input2.tsx";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {type TaskFormData, taskSchema} from "./utils/validations.ts";
import type {Task} from "./types/task.ts";
import Modal from "./components/ui/Modal.tsx";
import TaskForm from "./components/ui/TaskForm.tsx"
import api from "./services/api.ts";

import {lazy, Suspense} from 'react';
//import ProtectedRoute from './components/auth/ProtectedRoute';
import Spinner from './components/ui/Spinner.tsx';

import { useAuth } from "./hooks/useAuth";
import Login from "./components/Login";
import {useDebounce} from "./hooks/useDebounce.ts";

/*
//Páginas
const LoginPage=lazy(()=>import ('./pages/LoginPage'));
const RegisterPage=lazy(()=>import ('./pages/RegisterPage'));
const DashboardPage=lazy(()=>import ('./pages/DashboardPage'));
const TaskDetailPage=lazy(()=>import ('./pages/TaskDetailPage'));
 */
import Home from "./pages/Home.tsx"
import Tasks from "./pages/Tasks.tsx"
import About from "./pages/About.tsx"
import Footer from "./components/ui/Footer.tsx";
import Lab from "./pages/Lab.tsx";

function App(): JSX.Element {

    //...

  return (
      <BrowserRouter>
            <Routes>
              <Route path={"/"} element={<Layout children={undefined}/>}>
                <Route index element={<Home />}/>
                <Route path={"tasks"} element={<Tasks />}/>
                <Route path={"about"} element={<About />}/>
                  <Route path={"lab"} element={<Lab />}/>
              </Route>
            </Routes>
      </BrowserRouter>
  )
}

export default App