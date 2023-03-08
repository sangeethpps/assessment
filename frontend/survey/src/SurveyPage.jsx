import './App.css'
import {useEffect, useState} from "react";
function SurveyPage() {
    let isLoaded=false
    const[questions,setQuestions]=useState([])
    const[sessionId,setSessionId]=useState('')
    const[currentQuestion,setCurrentQuestion]=useState('')
    const[questionComponent,setQuestionComponent]=useState('')
    const[enableNext,setEnableNext]=useState(false)
    const[enablePrevious,setEnablePrevious]=useState(false)
    const[enableSkip,setEnableSkip]=useState(true)
    const[checkboxValue,setCheckboxValue]=useState({})
    useEffect(()=>{
        if(!isLoaded)
        {
            isLoaded=true
            fetch("api/feedback/questions/",{method:"POST",
                headers: {
                    "Content-Type": "application/json",
                }})
                .then(res => res.json()).then((result)=>{
                    if(Object.keys(result).length>0)
                    {
                        setQuestions(result['questions'])
                        setSessionId(result['session_id'])
                        setCurrentQuestion(0)
                        setEnablePrevious(false)
                        initializeCheckBoxes()

                    }
            }).catch((exception)=>{
                console.log(exception)
            })


        }

        },[])

    useEffect(()=>{
        if(questions.length>0)
        {
                generateQuestionComponent(currentQuestion)
        }
    },[currentQuestion,enableNext,enablePrevious,checkboxValue])




    const onValueChange=(session_id,question_id,value)=>{
        let jsonBody={
            'session_id':session_id,
            'question_id':question_id,
            'value':value
        }

    fetch('api/feedback/questions/',{method:"PUT",headers: {
            "Content-Type": "application/json",
        },body:JSON.stringify(jsonBody)}).then(res=>res.json()).then((result=>{
        setQuestions(result['questions'])
        setSessionId(result['session_id'])
        setEnableNext(true)

        if(currentQuestion>0)
        {
            setEnablePrevious(true)
        }
        else{
            setEnablePrevious(false)
        }

        if(currentQuestion===questions.length-2)
        {
            setEnableSkip(false)
        }


    }))

    }
    const initializeCheckBoxes=()=>{
        let tempCheckedDetails={...checkboxValue}

        for(const tempQuestion of questions)
        {
            for(let i=0; i<tempQuestion['rating_offset']; i++)
            {
                tempCheckedDetails[`${tempQuestion['question_id__question_id']}__${sessionId}__${i}`] = tempQuestion['rating'] !== "" && i === Number(tempQuestion['rating']) - 1;

            }

        }
        setCheckboxValue(tempCheckedDetails)
    }


    const generateCheckBoxes=(count,question_id)=>{
        let tempList=[]
        for(let i=0; i<count; i++)
        {
            tempList.push(<><div className="form-check form-check-inline"><input className={'form-check-input'}   name={'rating'} onChange={(e)=>{
                let tempValue={...checkboxValue}
                tempValue[`${question_id}__${sessionId}__${i}`]=true
                setCheckboxValue(tempValue)
                onValueChange(sessionId,e.target.getAttribute('data-question-id'),e.target.getAttribute('data-value'))
            }} value={""} data-question-id={question_id} data-value={i+1} checked={checkboxValue[`${question_id}__${sessionId}__${i}`]}  type={'radio'} />
                <label className="form-check-label" htmlFor="inlineRadio1">{i+1}</label></div></>)
        }
        return tempList
    }

    const generateQuestionComponent=(currentQuestionReceived=0)=>{
       let tempQuestion=''

           tempQuestion=questions[currentQuestionReceived]
           if(Object.keys(tempQuestion).length>0)
           {
               setQuestionComponent(<tbody><tr className={'text-end'}><span className={'fw-bold'}>{currentQuestion+1}</span>/{questions.length}</tr><tr><td><p>{tempQuestion['question__question']}</p></td></tr>
               <tr className={'text-center'}>
                   {tempQuestion['type'].toUpperCase()==='TEXT'?<input type={"text"} data-question-id={tempQuestion['id']} defaultValue={tempQuestion['rating']}  onChange={(e)=>{
                       onValueChange(sessionId,e.target.getAttribute('data-question-id'),e.target.value)
                   }} maxLength={50 } />:generateCheckBoxes(tempQuestion['rating_offset'],tempQuestion['id'],tempQuestion)}
               </tr>
               <tr className={'text-center'}>
                   <td>&nbsp;</td>
                   <td>&nbsp;</td>
                   <td>&nbsp;</td>
               </tr>
               <tr className={'text-center '}><><button className={'btn btn-danger'} onClick={(e)=>{
                   const tempCurrentQuestion=currentQuestion-1
                   setCurrentQuestion(tempCurrentQuestion)

                   generateQuestionComponent(tempCurrentQuestion)
                    if(tempCurrentQuestion>0)
                    {
                        setEnablePrevious(true)

                    }
                    else{
                        setEnablePrevious(false)
                    }

               }} disabled={!enablePrevious}>Previous</button>&nbsp;
                   <button className={'btn btn-dark'} disabled={!enableSkip} onClick={(e)=>{

                           const tempCurrentQuestion = currentQuestion + 1

                       if(questions.length>0&&questions.length!==Number(currentQuestion)+1) {
                           setCurrentQuestion(tempCurrentQuestion)
                           generateQuestionComponent(tempCurrentQuestion)
                           setEnableNext(false)
                           if (tempCurrentQuestion > 0) {
                               setEnablePrevious(true)
                           } else {
                               setEnablePrevious(false)
                           }
                       }

                   }}>Skip</button>&nbsp;
                   <button className={'btn btn-warning'} disabled={!enableNext} onClick={(e)=>{


                       if(questions.length>0&&questions.length===Number(currentQuestion)+1)
                       {
                           fetch("api/feedback/questions/",{method:"PATCH",
                               headers: {
                                   "Content-Type": "application/json",
                               },body:JSON.stringify({'session_id':sessionId})})
                               .then(res => res.json()).then((result)=>{
                                   window.open('/thanks','_self')

                           }).catch((exception)=>{
                               console.log(exception)
                           })
                       }
                       else{
                           const tempCurrentQuestion=currentQuestion+1
                           setCurrentQuestion(tempCurrentQuestion)
                           generateQuestionComponent(tempCurrentQuestion)
                           if(tempCurrentQuestion['rating']!="")
                           {
                               setEnableNext(true)
                           }
                           else{
                               setEnableNext(false)
                           }

                           if(tempCurrentQuestion>0)
                           {
                               setEnablePrevious(true)
                           }
                           else{
                               setEnablePrevious(false)
                           }
                       }


               }}>{questions.length>0&&questions.length===Number(currentQuestion)+1?"Submit":"Next"}</button></></tr>
               </tbody>)
           }

    }
    return(

        <div className={'row'}>

            <div className={'col-md-4 mx-auto'}>
                <table className={'text-center ms-5'}>
                    {questionComponent}
                </table>
            </div>
            </div>
        )

}

export default SurveyPage;
