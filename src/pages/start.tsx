import React, { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../store/redux-hooks'
import Card from '../ui/card'
import CircularProgressIndicator from '../ui/cpi'
import Select from 'react-select'

const Start: React.FC = () => {
    const [options, setOptions] = useState<any>([])

    const options1 = [
        { value: 1, label: 'краный' },
        { value: 2, label: 'зеленый' },
        { value: 3, label: 'синий' },
    ];
    const options2 = [
        { value: 4, label: 'раз' },
        { value: 5, label: 'два' },
        { value: 6, label: 'три' },
    ];
    const options3 = [
        { value: 7, label: 'камень' },
        { value: 8, label: 'ножницы' },
        { value: 9, label: 'бумага' },
    ];

    let arr = [
        { id: 1, options: options1 },
        { id: 2, options: options2 },
        { id: 3, options: options3 },
    ]

    const getOptions = (id: number, value: number | undefined) => {
        let arr: any = options.slice();
        let result = arr.find((o: any, i: number) => {
            if (o?.propertyId === id) {
                arr[i] = { propertyId: id, option: value};
                setOptions(arr);
                return true
            }
        });
        if (!result) setOptions((arr: any) => [...arr, {propertyId: id, option: value}])
    }

    return (
        <>
            <main className={'start'}> 
                {arr && arr.map((el) => {
                    options && console.log(options.map(o => o.option).filter(Number))
                    
                    return (
                        <Select
                            key={el.id}
                            onChange={e => getOptions(el.id, e?.value)}
                            isClearable={true}
                            options={el.options}
                        />
                    )
                })}
            </main>
        </>
    )
};

export default Start;