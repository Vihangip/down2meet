import { AddEvent } from "./addEvent";

const SetAvailbility = ({onClose}) => {

    return (
        <>
        <div className="dialog-overlay">
            <div className="dialog-box">
            <span id="dialogClose" className="dialog-close" onClick={onClose}>&times;</span>

            <div><AddEvent /> 
            
          
          </div>
            </div> 
        </div> 

        </>

            );      

};
export default SetAvailbility;