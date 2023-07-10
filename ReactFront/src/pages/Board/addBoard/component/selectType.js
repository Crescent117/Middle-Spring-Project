import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function SelectType(props) {
    const { typeSelect, inputRef } = props;
    //const { titleValue, setTitleValue } = props;


    // useEffect(() => {
    //     console.log(titleValue.)
    // }, [titleValue]);

    const selectType = [
        { name: "선택", id: "option", value: "0" },
        { name: "국내", id: "option", value: "국내" },
        { name: "해외", id: "option", value: "해외" },
        { name: "질문", id: "option", value: "질문" },
        { name: "자유", id: "option", value: "자유" }

    ];

    const changeSelectValue = (event) => {
        typeSelect.current = event.target.value;
        console.log(typeSelect);
    };

    const changeTitleValue = (titleEvent) => {
        inputRef.current = titleEvent.target.value;
        console.log(inputRef.current);
    };

    return (
        <div>
            <div className='create-window'>
                <div className='top-wrap'>
                    <select
                        className='form-select'
                        name='b_type'
                        aria-label='Default select example'
                        onChange={changeSelectValue}
                        value={typeSelect.currnt}>

                        {selectType.map((sl) => (
                            <option
                                key={sl.value}
                                id={sl.id}
                                value={sl.value}
                            >
                                {sl.name}
                            </option>
                        ))}

                    </select>
                    <br />
                </div>
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
        </div>
    );
}

export default SelectType;