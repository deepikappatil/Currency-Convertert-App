import React, { Component } from 'react'
import axios from 'axios'
import './CurrencyConverter.css'
import FormControls from './FormControls'

const BASE_URL = "https://v6.exchangerate-api.com";
const KEY = "c4b8404fa4231b767d5f1dc9";

class CurrencyConverter extends Component {
    state = {
        currencies: [],
        base: "",
        convertTo: "",
        amount: "",
        amountIn: true,
        exchangeRate: "",
        date: ""
    }

    async componentDidMount() {
        const {data} =  await axios.get("http://localhost:8000/currencies");
        this.setState({currencies: data})
        this.setState({base: data[0]})
        this.setState({convertTo: data[1]})
    }

    OnCurrencyChange = (e) => {
        this.setState({
            [e.target.name]: JSON.parse(e.target.value)
        }, this.fetchExchangeRate) 
    }

    OnFromAmountChange = (e) => {
        this.setState({
            amount: e.target.value,
            amountIn: true,
        }, this.fetchExchangeRate)
    }

    OnToAmountChange = (e) => {
        this.setState({
            amount: e.target.value,
            amountIn: false,
        }, this.fetchExchangeRate)
    }

    fetchExchangeRate = async () => {
        const {
            amount,
            base : { 
                value: baseValue 
            },
            convertTo : { 
                value: convertValue 
            },
        } = this.state;

        if(amount === isNaN) {
            return;
        } else {
            const {data} = await axios.get(`${BASE_URL}/v6/${KEY}/latest/${baseValue}`);
            const date = (data.time_last_update_utc).slice(0, 16);
            this.setState({
                exchangeRate: data.conversion_rates[convertValue],
                date
            }) 
        }
    }

    render() {
        const {currencies, base, convertTo, amount, amountIn, exchangeRate, date} = this.state;
        let fromAmount, toAmount;
    
        if (amountIn) {
          fromAmount = amount
          toAmount = (amount * exchangeRate).toFixed(2);
        } else {
          toAmount = amount
          fromAmount = ((amount / exchangeRate).toFixed(2));
        }

        return (
            <div className="container my-5">
                <div className="row">
                    <div className="col-lg-8 mx-auto">
                        <div className="card card-body">
                            <h4>{amount === "" ? "" : fromAmount === null ? "Calculating..." : fromAmount} {base.label} Equals</h4>
                            <h2>{amount === "" ? "" : toAmount === null ? "Calculating..." : toAmount} {convertTo.label}</h2>
                            <p>{date}</p>
                            <div className="row mt-2">
                                <div className="col-lg-12">
                                    <FormControls
                                        currencies={currencies}
                                        amount={amount === ""
                                        ? ""
                                        : fromAmount === null
                                        ? "Calculating..."
                                        : fromAmount}
                                        OnAmountChange={this.OnFromAmountChange}
                                        selectName="base"
                                        selectValue={JSON.stringify(base)}
                                        OnCurrencyChange={this.OnCurrencyChange}  
                                    />
                                    <FormControls
                                        currencies={currencies}
                                        amount={amount === ""
                                        ? ""
                                        : toAmount === null
                                        ? "Calculating..."
                                        : toAmount}
                                        OnAmountChange={this.OnToAmountChange}
                                        selectName="convertTo"
                                        selectValue={JSON.stringify(convertTo)}
                                        OnCurrencyChange={this.OnCurrencyChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>   
        )
    }
}

export default CurrencyConverter
