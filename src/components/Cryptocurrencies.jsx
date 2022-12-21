import React, { useEffect } from "react";
import { useState } from "react";
import millify from "millify";
import { Link, useParams } from "react-router-dom";
import { Card,Row,Col,Input } from "antd";

import { useGetCryptosQuery } from "../services/cryptoApi";

const Cryptocurrencies = ({simplified})=>{
    const count = simplified? 10 : 100;
    const {data: cryptosList, isFetching} = useGetCryptosQuery(count);
    const cryptos = cryptosList?.data?.coins;

    const [cryptoState, setCryptos] = useState(cryptos);
    console.log(cryptoState);
    const [searchTerm ,setSearchTerm] = useState('');
    useEffect(()=>{

        let filteredData = cryptosList?.data?.coins.filter((coin)=> coin.name.toLowerCase().includes(searchTerm.toLowerCase()));

        setCryptos(filteredData);
         
    }, [cryptosList, searchTerm]);
    if(isFetching) return "Loading..."
    return (
        <div>
            {!simplified && 
            <div className="search-crypto">
                <Input placeholder="Search Cryptocurrency" onChange={(e)=> setSearchTerm(e.target.value)}/>
            </div>
            }
            <Row gutter={[32,32]} className="crypto-card-containers">
                {cryptoState?.map((currency)=>(
                    <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency?.uuid}>
                        <Link to={`/crypto/${currency.uuid}`}>
                            <Card 
                            title={`${currency.rank}.${currency.name}`} 
                            extra = {<img className="crypto-image" src={currency.iconUrl} />}
                            hoverable
                            >
                                <p>Price: {millify(currency.price)}</p>
                                <p>Market Cap: {millify(currency.marketCap)}</p>
                                <p>Daily Change: {millify(currency.change)}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </div>
    )
}
export default Cryptocurrencies;