import {useState, createContext, useContext} from "react";

let QuestionnaireInstanceViewContext = createContext(null);

export default function QuestionnaireInstanceViewProvider({children}) {
    const [view, setView] = useState("chart");

    let value = {
        view,
        setView,
    };

    return (
        <QuestionnaireInstanceViewContext.Provider value={value}>
            {children}
        </QuestionnaireInstanceViewContext.Provider>
    );
}

function useQuestionnaireInstanceView() {
    return useContext(QuestionnaireInstanceViewContext);
}

export {useQuestionnaireInstanceView};
