import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function SelectType(props) {


    const { setTitleValue, b_title, typeSelect, setTypeSelect } = props;

    // useEffect(() => {
    //     console.log(titleValue.)
    // }, [titleValue]);
    useEffect(() => {

    }, []);


    const selectType = [
        { name: "선택", id: "option", value: "0" },
        { name: "국내", id: "option", value: "국내" },
        { name: "해외", id: "option", value: "해외" },
        { name: "질문", id: "option", value: "질문" },
        { name: "자유", id: "option", value: "자유" }
    ];

    const changeSelectValue = (event) => {
        const newSeletType = event.target.value;
        setTypeSelect(newSeletType);
    };

    const changeTitleValue = (titleEvent) => {
        const newTitle = titleEvent.target.value;
        //titleInputRef.current = TitleValue; // 삭제
        setTitleValue(newTitle); // 추가
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
                        value={typeSelect}
                    >

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
                        value={b_title}
                        onChange={changeTitleValue} />
                    <label htmlFor="flootingInput">제목</label>
                </div>
            </div>
        </div>
    );
}

export default SelectType;