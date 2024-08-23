"use client";
import { useRouter, useParams } from 'next/navigation';
import { Container } from 'semantic-ui-react';
import { useState, useEffect} from 'react'
import web3 from '../../../../../web';
import Campaign from "../../../../../Campaign.json"
import {
    TableRow,
    TableHeaderCell,
    TableHeader,
    TableFooter,
    TableCell,
    TableBody,
    MenuItem,
    Icon,
    Label,
    Menu,
    Table,
  } from 'semantic-ui-react'
export default function Page() {
    const { campaign } = useParams();
    const [requestArray, setRequestArray] = useState([])
    let instance;
    
    useEffect(()=>{
        getInstance()
        getRequest()
    },[])
    function getInstance(){
        instance = new web3.eth.Contract(
            Campaign.abi,
            campaign
        )
        console.log(instance)
    }
    async function getRequest(){
        if(!instance){
            getInstance()
        }
        let result = await instance.methods.getRequestCount().call()
        result = result.toString()
        result = Number(result)
        let allRequests = await Promise.all(
            Array.from({length:result}).map(async(elemnt,index)=> {
                console.log(index)
                return await instance.methods.requests(index).call()
            })
        )
        console.log(allRequests)
        setRequestArray(allRequests)

      }
    async function approveRequest(index) {
        if(!instance){
            getInstance()
        }
        const accounts = await web3.eth.getAccounts()
        await instance.methods.approveRequest(index).send({
            from: accounts[0]
        })
    }
    async function finalizeRequest(index) {
        if(!instance){
            getInstance()
        }
        const accounts = await web3.eth.getAccounts()
        console.log(accounts)
        await instance.methods.finalizeRequest(index).send({
            from: accounts[2]
        })
    }
    return<>
    <Container style={{
        paddingTop: '10px'
    }}>
        <h1 style={{
            fontWeight: 'bold',
            fontSize: '2rem'
        }}>Request lists</h1>
        <Table celled>
    <TableHeader>
      <TableRow>
        <TableHeaderCell>ID</TableHeaderCell>
        <TableHeaderCell>Description</TableHeaderCell>
        <TableHeaderCell>Amount</TableHeaderCell>
        <TableHeaderCell>Recipeint</TableHeaderCell>
        <TableHeaderCell>Approve Count</TableHeaderCell>
        <TableHeaderCell>Approve</TableHeaderCell>
        <TableHeaderCell>Finalize</TableHeaderCell>
      </TableRow>
    </TableHeader>
    <TableBody>
      {requestArray.map((request, index)=>{
        return(<>
        <TableRow key={index}>
        <TableCell>{index+1}</TableCell>
        <TableCell>{request.description}</TableCell>
        <TableCell>{web3.utils.fromWei(request.value, 'ether')} Wei</TableCell>
        <TableCell>{request.recipient}</TableCell>
        <TableCell>{request.approvalCount.toString()}</TableCell>
        <TableCell>
            <button onClick={() => approveRequest(index)} style={{
                background: '#00FF7F',
                textAlign: 'center',
                padding: '2px',
                color: 'black'
                
            }}>Approve</button>
        </TableCell>
        <TableCell>
        <button onClick={()=>finalizeRequest(index)} style={{
                background: '#FF7276',
                textAlign: 'center',
                padding: '2px',
                color: 'black'
                
            }}>Finalize</button>
        </TableCell>
      </TableRow>
        </>)
      })}
      
     
    </TableBody>
    </Table>
    {/* <p>{params.request}</p> */}
    <a href={`/createcamp/${campaign}/request/new`}>
    <button style={{
    padding: '5px',
    backgroundColor: '#0e70ad',
    color: 'white',
    borderRadius: '10px',
    marginTop: '15px',

  }}>Add Requests</button>
  </a>
    </Container>
    </>
}