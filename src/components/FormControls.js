import React from 'react'

const FormElements = (props) => {
    const {
        currencies,
        amount,
        OnAmountChange,
        selectName,
        selectValue,
        OnCurrencyChange
    } = props

    return (
        <form className="form-inline mb-4">
            <input 
                className="form-control form-control-lg mx-3"
                type="number"
                value={amount}
                onChange={OnAmountChange}
            />
            <select 
                className="form-control form-control-lg" 
                name={selectName}
                value={selectValue}
                onChange={OnCurrencyChange}
            >
                {currencies.map((currency, index) => 
                    <option 
                        key={index} 
                        value={JSON.stringify(currency)}
                    >
                    {currency.label}
                    </option>
                )}
            </select>
        </form>
    )
}

export default FormElements
