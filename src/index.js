import { react } from "@babel/types";
import { createRoot } from 'react-dom/client';
import React from "react";
import ReactDom from "react-dom"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"


import { App } from "./components"


const container = document.querySelector("#app");

const root = createRoot(container)
root.render(<App tab="home" />)