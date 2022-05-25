import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
    const [state, setState] = useState([
        {
          "_id": "6289ddd286441e3ad4d31faa",
          "user": "6288dc0c015808a9f764067e",
          "title": "daily routine",
          "description": "wae up early, study, go to sleep",
          "tag": "routine",
          "timeStamp": "1653202386278",
          "__v": 0
        },
        {
          "_id": "6289df7fc214140b6ba0ed71",
          "user": "6288dc0c015808a9f764067e",
          "title": "grocery",
          "description": "rice, wheat, dal, rajma, maggie, begtables, maida, chana",
          "tag": "general",
          "timeStamp": "1653202815592",
          "__v": 0
        },
        {
          "_id": "6289ddd286441e3ad4d31faa",
          "user": "6288dc0c015808a9f764067e",
          "title": "daily routine",
          "description": "wae up early, study, go to sleep",
          "tag": "routine",
          "timeStamp": "1653202386278",
          "__v": 0
        },
        {
          "_id": "6289df7fc214140b6ba0ed71",
          "user": "6288dc0c015808a9f764067e",
          "title": "grocery",
          "description": "rice, wheat, dal, rajma, maggie, begtables, maida, chana",
          "tag": "general",
          "timeStamp": "1653202815592",
          "__v": 0
        },
        {
          "_id": "6289ddd286441e3ad4d31faa",
          "user": "6288dc0c015808a9f764067e",
          "title": "daily routine",
          "description": "wae up early, study, go to sleep",
          "tag": "routine",
          "timeStamp": "1653202386278",
          "__v": 0
        },
        {
          "_id": "6289df7fc214140b6ba0ed71",
          "user": "6288dc0c015808a9f764067e",
          "title": "grocery",
          "description": "rice, wheat, dal, rajma, maggie, begtables, maida, chana",
          "tag": "general",
          "timeStamp": "1653202815592",
          "__v": 0
        }
      ]);
    
    return (
        <NoteContext.Provider value={{state, setState}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;