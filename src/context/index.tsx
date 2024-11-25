import {  createContext } from "react";
import { ContextType } from "../typescript/ContextType";

const Context = createContext<ContextType | any>(null)

export default Context