import React, {useState} from 'react';

const AutoSuggestBox = ({itemSource, displayMember, defaultText = '', onChangeTech}) => {
    const [searchText, setSearchText] = useState(defaultText.trim())
    const [showSuggestBox, setShowSuggestBox] = useState(false)
    const [filterItemSource, setFilterItemSource] = useState([])

    const onChangeSearchText = (searchText) => {
        setSearchText(searchText)
        const filterArray = itemSource.filter(user => user.fullName.includes(searchText))
        setFilterItemSource(filterArray)

        if (searchText.length >= 3 && filterArray.length > 0) {
            setShowSuggestBox(true)
        } else {
            setShowSuggestBox(false)
        }
    }

    const onSelectedTech = (item) => {
        setSearchText(item[displayMember]);
        setShowSuggestBox(false)
        onChangeTech(item.id)
    }

    return (
        <div className='relative flex-1'>
            <input
                className={`text-sm sm:text-base w-full border border-gray-900 rounded-lg pl-1 focus:outline-none focus:border-Accent_light
                 ${showSuggestBox && 'rounded-b-none border-b-0'}`}
                placeholder='Не назначено'
                type='search'
                value={searchText}
                onChange={(e) => onChangeSearchText(e.target.value)}/>

            {showSuggestBox &&
                <ul
                    className={`absolute flex flex-col gap-1 w-full bg-gray-500 max-h-[130px] h-auto overflow-auto border border-gray-900 rounded-lg rounded-t-none -mt-0.5`}>
                    {filterItemSource.map((item) => (
                        <li className={'bg-white'} key={item.id}
                            onClick={() => onSelectedTech(item)}>
                            <p className='text-xs bg-Accent p-2'>{item[displayMember]}</p>
                        </li>
                    ))}
                </ul>}

        </div>
    );
};

export default AutoSuggestBox;