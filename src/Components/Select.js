import React, {useEffect, useRef, useState} from 'react';
import '../index.css'

const Select = ({
                    placeholder = 'Select',
                    options = {},
                    defaultValue = {value: '', label: ''},
                    isMulti = false,
                    isEnabled = true,
                    onChange = () => null,
                    ...props
                }) => {

    const [isDropdownEnabled, setIsDropdownEnabled] = useState(false)
    const [selectedItems, setSelectedItems] = useState(isMulti ? [defaultValue.value] : defaultValue.value)
    const [title, setTitle] = useState(placeholder)

    const dropdownPanel = useRef()

    useEffect(() => {
        const onClick = (e) => {
            if (e.target !== dropdownPanel.current)
                setIsDropdownEnabled(false)
        }

        document.addEventListener('click', onClick)

        return () => {
            document.removeEventListener('click', onClick)
        }

    }, [])

    useEffect(() => {
        onChange(selectedItems)
        if (isMulti ? selectedItems : selectedItems >= 0) {
            if (isMulti)
                if (selectedItems.length === 0)
                    setTitle(placeholder)
                else
                    setTitle(`${placeholder} (${selectedItems.length})`)
            else
                setTitle(options.find(item => item.value === selectedItems).label)
        }
    }, [selectedItems])

    const handleOnChangeInput = (value, status) => {
        if (isMulti) {
            if (status)
                setSelectedItems((prev) => [...prev, value])
            else {
                const newValue = selectedItems.filter(item => item !== value)
                setSelectedItems(newValue)
            }
        } else {
            if (status)
                setSelectedItems(value)
            setIsDropdownEnabled(false)
        }
    }

    const isActive = isDropdownEnabled && isEnabled

    return (
        <fieldset className={`relative border-none w-full z-10 ${!isEnabled && 'opacity-50'}`} disabled={!isEnabled}>
            <button
                className={`gradient-border w-full bg-white px-2 sm:h-[42px] h-[36px] flex justify-between items-center border rounded-lg ${isActive && `rounded-b-none border-b-0 pb-0.5`}`}
                onClick={(e) => {
                    e.stopPropagation()
                    setIsDropdownEnabled(!isDropdownEnabled)
                }}
                type='button'>
                <span className='text-black text-xs sm:text-base '>
                    {title}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1}
                     stroke="currentColor" opacity={0.1} className="w-5 h-5"
                     style={{
                         transform: `rotate(${isActive ? 180 : 0}deg)`,
                         transition: 'transform 0.15s ease-in-out'
                     }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                </svg>
            </button>
            {isActive &&
                (<div onClick={(e) => e.stopPropagation()}
                      ref={dropdownPanel}
                      className='gradient-border-panel border rounded-t-none text-black absolute bg-white w-full rounded-lg'>
                    {options.map((opt, index) => {
                        const isItemSelected = isMulti ? selectedItems.includes(opt.value) : selectedItems === opt.value
                        return (
                            <div key={index}
                                 className={`${isItemSelected ? 'bg-Accent_light' : 'hover:bg-Accent_light hover:bg-opacity-10'}
                             ${index === options.length - 1 && 'rounded-b-lg'}`}>
                                <div className="p-2 flex items-center">
                                    <input id={`input-${opt.value}`}
                                           className={`${isMulti ? 'rounded border-gray-300 text-purple-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50 mr-[5px]' : 'hidden'}`}
                                           type='checkbox'
                                           value={opt.label}
                                           checked={isItemSelected}
                                           onChange={(e) => handleOnChangeInput(opt.value, e.target.checked)}/>
                                    <label htmlFor={`input-${opt.value}`}
                                           className={`w-full cursor-pointer text-xs sm:text-base ${isItemSelected && 'text-white'}`}>{opt.label}</label>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>)}
        </fieldset>
    );
};

export default Select;