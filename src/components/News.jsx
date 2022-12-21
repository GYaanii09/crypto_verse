import {React, useRef, useState} from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";

import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi.js";
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Link } from "react-router-dom";
const {Text, Title} = Typography;
const {Option} = Select;
const demoImageUrl = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News = ({simplified})=>{
    //const {newsCategory, setNewsCategory} = useState('Cryptocurrency');
    const {newsCategory, setNewsCategory} = useState("Cryptocurrency")
    const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory:'Cryptocurrency', count: simplified ? 6 : 12 });
    const { data } = useGetCryptosQuery(100);

    const newsArticles = cryptoNews?.value;

   /// console.log(Object.keys(newsArticles));
 
    const inputRef = useRef('noreferrer');

    return (
        
         <Row gutter={[24,24]}>
                {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory((value)=>{
                return value;
            })}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="Cryptocurency">Cryptocurrency</Option>
            {data?.data?.coins?.map((currency) => <Option value={currency.name}>{currency.name}</Option>)}
          </Select>
        </Col>
      )}
                {
                    newsArticles?.map((news,i)=>(
                        <Col xs={24} sm={12} lg={8} key={i}>
                            <Card hoverable className="news-card">
                                <a href={news?.url} target="blank" rel="nonreferrer">
                                    <div className="news-image-container">
                                        <Title className="news-title" level={4}> {news?.name}</Title>
                                        <img style={{maxWidth:'200px', maxHeight:'100px'}} src={news?.image?.thumbnail?.contentUrl || demoImageUrl} alt="news"/>
                                    </div>
                                    <p>
                                        {news.description>100 ? `${news.description.substring(0,100)}..0` : news.description}
                                    </p>
                                    <div className="provider-container">
                                        <div>
                                            <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImageUrl} alt="news" />
                                            <Text className="provider-name">{news.provider[0]?.name}</Text>
                                        </div>
                                        <Text>{moment(news.dataPublished).startOf('ss').fromNow()}</Text>
                                    </div>
                                </a>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
        
    )
}

export default News;