import { useContext } from "react"
import { projectContext, ProjetContextType } from "../projectContext"

export default function useProject (): ProjetContextType {
    const context = useContext(projectContext);
    if(context)
        return context
    throw new Error(" le context de projet n'as pas ete initialise");
}