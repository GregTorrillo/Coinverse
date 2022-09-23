import React, { useState } from "react";
import { Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
// import { useGetCryptosQuery } from '../config/cryptoApi';
import { useGetCryptoNewsQuery } from "../config/cryptoNewsApi";
import { LinearProgress } from "@material-ui/core";

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const { Text } = Typography;
// const { Option } = Select;

const News = ({ simplified }) => {
  const [newsCategory] = useState("Cryptocurrency");
  // const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });

  const useStyles = makeStyles((theme) => ({
    container: {
      margin: 40,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      paddingBottom: 40,
      [theme.breakpoints.down("xs")]: {
        margin: 10,
        marginTop: -20,
      },
    },
    newsPageHeading: {
      width: "100%",
      marginLeft: 20,
      marginTop: 40,
      fontSize: 34,
      fontWeight: "bold",
      fontfamily: "Montserrat",
      color: "white",
      [theme.breakpoints.down("xs")]: {
        fontSize: 30,
      },
    },
    newsPageHeadingDesc: {
      width: "100%",
      margin: "0px 20px 40px 20px",
      fontSize: 16,
      fontfamily: "Montserrat",
      color: "darkgrey",
      [theme.breakpoints.down("xs")]: {
        fontSize: 12,
        margin: "0px 0px 20px 20px",
        paddingRight: 20,
      },
    },
    row: {
      width: "100%",
    },
    newsCard: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "#222741",
      border: "2px solid rgba(155,155,155,0)",
      borderRadius: 10,
      "&:hover": {
        border: "2px solid #4DB9F6",
      },
    },
    newsImageContainer: {
      display: "flex",
      justifyContent: "space-between",
      paddingBottom: 20,
    },
    newsTitle: {
      paddingRight: 20,
      color: "white", 
      fontSize: 20, 
      fontWeight: "bold",
      lineHeight: 1.3,
      [theme.breakpoints.down("xs")]: {
        paddingRight: 10,
        fontSize: 16, 
      },
    },
    newsDesc: {
      color: "darkgrey", 
      fontSize: 16, 
      paddingBottom: 20,
      [theme.breakpoints.down("xs")]: {
        fontSize: 14,
      },
    },
    providerContainer: {
      display: "flex",
      justifyContent: "space-between",
    },
    providerName: {
      paddingLeft: 10,
      color: "white",
    },
  }));

  const classes = useStyles();

  if (!cryptoNews?.value)
    return <LinearProgress style={{ backgroundColor: "#4DB9F6" }} />;

  return (
    <div className={classes.container}>
      <Typography className={classes.newsPageHeading}>
        Latest Crypto News
      </Typography>
      <Typography className={classes.newsPageHeadingDesc}>
        Find the latest cryptocurrency news, updates, values, prices, and more
        with Coinverse’s crypto topic page.
      </Typography>
      <Row className={classes.row} gutter={[24, 24]}>
        {/* {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="Cryptocurency">Cryptocurrency</Option>
            {data?.data?.coins?.map((coin) => <Option value={coin.name}>{coin.name}</Option>)}
          </Select>
        </Col>
      )} */}
        {cryptoNews.value.map((news, i) => (
          <Col xs={24} sm={24} m={12} lg={12} xl={8} key={i}>
            <Card className={classes.newsCard}>
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className={classes.newsImageContainer}>
                  <div className={classes.newsTitle} >
                    {news.name}
                  </div>
                  <img
                    src={news?.image?.thumbnail?.contentUrl || demoImage}
                    alt=""
                  />
                </div>
                <p className={classes.newsDesc}>
                  {news.description.length > 100
                    ? `${news.description.substring(0, 100)}...`
                    : news.description}
                </p>
                <div className={classes.providerContainer}>
                  <div>
                    <Avatar
                      src={
                        news.provider[0]?.image?.thumbnail?.contentUrl ||
                        demoImage
                      }
                      alt=""
                    />
                    <Text className={classes.providerName}>
                      {news.provider[0]?.name}
                    </Text>
                  </div>
                  <Text style={{ color: "darkgrey" }}>
                    {moment(news.datePublished).startOf("ss").fromNow()}
                  </Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default News;
