import React, {SelectHTMLAttributes, DetailedHTMLProps, ChangeEvent} from 'react'
import s from './Select.module.css'

type DefaultSelectPropsType = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

type SuperSelectPropsType = DefaultSelectPropsType & {
    options: string[]
    onChangeOption?: (option: string) => void
}

const Select: React.FC<SuperSelectPropsType> = (
    {
        options,
        onChange, onChangeOption,
        ...restProps
    }
) => {
    const mappedOptions: any[] = options?options.map((m,i)=><option key={m+"-"+i} className={s.option} value={m}>{m}</option>):[]

    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange && onChange(e)
        onChangeOption && onChangeOption(e.currentTarget.value)
    }

    return (
        <select  className={s.superSelect} onChange={onChangeCallback} {...restProps}>
            {mappedOptions}
        </select>
    )
}

export default Select;