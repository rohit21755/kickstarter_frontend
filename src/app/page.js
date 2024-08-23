"use client";
import Image from "next/image";
import styles from "./page.module.css";
import instance from "../../factory";
import { useEffect, useState } from "react";
import { CardGroup } from 'semantic-ui-react'
import { Button, Icon,Header, Container } from 'semantic-ui-react'
export default function Home() {
  const [campaigns, setCampaigns] = useState([]);
  useEffect(() => {
    const getCampaigns = async () => {
      const campaigns = await instance.methods.getDeployedCampaigns().call();
      console.log(campaigns);
      setCampaigns(campaigns);
    };
    getCampaigns();
  }, []);
  function renderCampaigns() {
    const items = campaigns.map((address) => {
      return {
        header: address,
        description: <a href={`/createcamp/${address}`}>View Campaign</a>,
        fluid: true,
      };
    });
    return <CardGroup items={items} />;
  }

  return (
    <>
    <Container >
     <Header as='h3' block style={{marginTop: '10px'}}>
    Block Header
  </Header>
    <main style={{
      display: "flex",
      // justifyContent: "space-between",
      gap: "1rem",
      alignItems: "",
      
    }}>
    <div className={styles.main}>
      {renderCampaigns()}
    </div>
    <div style={{
      padding: '6rem',

    }}>

      <Button icon labelPosition='left' primary href="/createcamp">
      <Icon name='plus circle' />
      Add Campaign
    </Button>
    </div>
    </main>
    </Container>
    </>
  );
}
