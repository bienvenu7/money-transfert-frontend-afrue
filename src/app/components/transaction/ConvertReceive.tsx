import {
  selectCountries,
  selectCountry,
  selectCountryWhereToData,
  selectTransaction,
  selectTransactionType,
} from "@/redux/selector";
import { AppDispatch } from "@/redux/store";
import {
  getAmountFrom,
  getAmountTo,
  getCountryTo,
  getCountryToData,
} from "@/redux/transactionReducer";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Big from "big.js";

type Props = {
  isAuthUser: boolean;
  rate: string;
};

const ConvertReceive = ({ isAuthUser, rate }: Props) => {
  const userCountry = useSelector(selectCountry);
  const countryWhereToData = useSelector(selectCountryWhereToData);
  const transaction = useSelector(selectTransaction);
  const transactionType = useSelector(selectTransactionType);
  const countries = useSelector(selectCountries);

  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    // Big.DP = 10;
    const x = new Big(event.target.value === "" ? 0 : event.target.value);
    const y = new Big(rate);
    dispatch(getAmountTo(event.target.value));
    dispatch(getAmountFrom(x.times(y).toString()));
  };

  return (
    <div className="transfert__convert--list__input">
      <div className="transfert__convert--list__input--left">
        <label htmlFor="send">Montant à recevoir</label>
        <div className="block">
          <div>
            {isAuthUser
              ? (userCountry?.currency as string)
              : (countryWhereToData?.currency as string)}
          </div>
          <input
            type={"number"}
            placeholder="vous recevez"
            value={transaction.amountTo}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="transfert__convert--list__input--right">
        <select
          disabled={isAuthUser ? true : false}
          className={`${transactionType}`}
          onChange={(event) => {
            event.preventDefault();
            dispatch(getCountryTo(event.target.value));
            dispatch(
              getCountryToData(
                countries?.filter((el) => el.id === event.target.value)[0]
              )
            );
          }}
          value={isAuthUser ? userCountry?.id : countryWhereToData?.id}
        >
          {countries
            .filter((el) =>
              !isAuthUser ? el.id !== userCountry?.id : el.id !== ""
            )
            .map((el) => (
              <option key={el.id} value={el.id}>
                {el.pubicName}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default ConvertReceive;
