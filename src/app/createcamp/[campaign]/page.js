"use client";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
 import { Container } from 'semantic-ui-react';
 import web3 from '../../../../web';
 import Campaign from '../../../../Campaign.json'
 import {
  CardMeta,
  CardHeader,
  CardGroup,
  CardDescription,
  CardContent,
  Card,
} from 'semantic-ui-react'
export default function Page({params}) {
  const router = useRouter()
  const [camp, setCamp] = useState('');
  const [value, setValue] = useState('')
  const [details, setDetails] = useState({})
  let instance;
  useEffect(()=>{
    getInstance()
    getDetails();
    
// console.log(instance)
    // setCamp(params.campaign)
  },[])
  function getInstance(){
    instance = new web3.eth.Contract(
      Campaign.abi,
      params.campaign
    )
  }
  async function handleSubmit() {
    console.log(value)
    getInstance()
    let accounts = await web3.eth.getAccounts();
    console.log(accounts)
    console.log(instance)
    await instance.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei(value, "ether")
    })
    getDetails();
  }
  async function getDetails() {
    const temp = await instance.methods.getSummary().call()
    console.log()
    setDetails(temp)
  }
  // console.log(params)
  return (<>
  <Container>
    <p style={{
      fontWeight: 'bold',
      fontSize: '2rem'
    }}>Campaign Details</p>
  <p>{params.campaign}</p>
  <CardGroup>
    

   
  <Card
      header='Minimum Contribution'
      
      description={`${details[0]} Wie`}
    />
     <Card
      header='Campaign Balance'
      
      description={`${details[1]} Wie`}
    />
     <Card
      header='Requests'
      
      description={`${details[2]}`}
    />
    

    <Card
      header='Contributors'
      
      description={`${details[3]}`}
    />
  </CardGroup>
  <a href={`/createcamp/${params.campaign}/request`}>
  <button style={{
    padding: '5px',
    backgroundColor: '#0e70ad',
    color: 'white',
    borderRadius: '10px',
    marginTop: '15px',

  }}>View Requests</button>
  </a>
  <h1 style={{
            fontWeight:'bold',
            fontSize: '20'
        }}>Contribute</h1>
        <p style={{
            fontWeight: 'bold'
        }}>Enter the amount in wie </p>
  <input type="number"  style={{
    background: 'white',
    width : '30%',
    height: '30px',
    color: 'black',
    marginInline: '12px'
  }}
  onChange={(e)=>setValue(e.target.value)}/>
  <button primary onClick={handleSubmit} style={{
    height: '30px',
    padding: '5px'
  }}>Contribute</button>
  </Container></>)
}