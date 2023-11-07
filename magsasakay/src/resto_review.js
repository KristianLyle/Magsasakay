import { useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import NavBar from "./navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import resto_bg from "./img/resto_bg.jpg";
import user from "./img/user.jpg";

const RestoReviews = () => {
  const backgroundStyle = {
    backgroundImage: `url(${resto_bg})`,
  };
  const [showInput, setShowInput] = useState(false);
  const [inputText, setInputText] = useState("");
  const [postedText, setPostedText] = useState([]);

  const handleButtonClick = () => {
    setShowInput(true);
  };

  const handlePostText = () => {
    if (inputText.trim() !== "") {
      setPostedText([...postedText, inputText]);
      setInputText("");
      setShowInput(false);
    }
  };
  return (
    <>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" />
        </Switch>
      </Router>
      <div
        style={backgroundStyle}
        className="bg-contain bg-full bg-center min-h-screen"
      >
        <div className="mx-auto min-h-screen flex flex-col overflow-y-auto bg-no-repeat">
          <h1
            className="text-white font-Montserrat mt-4 text-left font-extrabold text-[40px]"
            style={{ margin: 0 }}
          >
            Molo Mansion Cafe
          </h1>{" "}
          <br />
          <button
            onClick={handleButtonClick}
            className="bg-[#EE7200] text-[15px] py-2 rounded-full 
                            font-bold text-white hover:bg-white hover:text-[#160E3D] 
                            drop-shadow-2xl ml-[20px] font-Montserrat px-[25px] max-w-[200px]"
          >
            Write Review
          </button>{" "}
          <br />
          <div>
            {showInput && (
              <div>
                <textarea
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="h-[100px] max-w-[100%] w-[1200px] border border-gray-300 rounded p-2 ml-[20px]"
                />{" "}
                <br />
                <button
                  onClick={handlePostText}
                  className="bg-[#EE7200] text-[15px] py-2 rounded-full 
                                    font-bold text-white hover:bg-white hover:text-[#160E3D] 
                                    drop-shadow-2xl ml-[20px] font-Montserrat px-[25px] max-w-[200px]"
                >
                  Post Review
                </button>
              </div>
            )}
            {postedText.length > 0 && (
              <div>
                <br />
                <ul>
                  {postedText.map((text, index) => (
                    <li key={index}>
                      <div className="bg-white max-w-[1300px] ml-[20px] rounded-[20px] p-[10px] font-Montserrat border-[4px] border-black drop-shadow-2xl">
                        <div className="flex items-center  ">
                          <img
                            src={user}
                            width="100px"
                            height="96px"
                            className="border-[3px] rounded-full border-black"
                          />
                          <p className="ml-[10px] font-medium">{text}</p>
                        </div>
                        <p className=" max-w-[1300px] ml-[10px] text-[14px] font-bold">
                          User Name
                        </p>
                      </div>
                      <br />
                    </li>
                  ))}
                </ul>
                <br />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RestoReviews;
