import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function SelectType(props) {
    const { inputRef } = props;
    //const { titleValue, setTitleValue } = props;


    // useEffect(() => {
    //     console.log(titleValue.)
    // }, [titleValue]);


    const changeTitleValue = (titleEvent) => {
        inputRef.current = titleEvent.target.value;
        console.log(inputRef.current);
    };

    return (
        <>
            <div className='create-window'>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="flootingInput"
                        name="b_title"
                        onChange={changeTitleValue} />
                    <label htmlFor="flootingInput">제목</label>
                </div>
            </div>
        </>
    );
}

export default SelectType;