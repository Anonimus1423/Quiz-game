import { useParams } from "react-router-dom"

export function AnswerInfo(){
    const params = useParams()
    console.log(params)
    return(
        <div>
            {params.id}
        </div>

                
    )
}