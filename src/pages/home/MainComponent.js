import React from 'react';
import {DatePicker } from 'antd';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';

export const MainComponent = () => {
    // const [value, onChange] = useState(new Date());


    const onChangeT = (time, timeString) => {
        console.log(time, timeString);
    };

    const onChangeD = (date, dateString) => {
        console.log(date, dateString);
    };

    return (
        <div>
            <DatePicker placeholder="select date" onChange={onChangeD} />
            <TimePicker defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')} onChange={onChangeT} />
        </div>
    );
}