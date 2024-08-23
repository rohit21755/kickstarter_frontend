"use client";
import { Container, FormField, Form, Button } from "semantic-ui-react"
import { useState } from "react"
import instance from "../../../factory";
import { useRouter } from "next/navigation";
import web3 from "../../../web";
export default function CreateCampaign() {
    const [value, setValue] = useState('')
    const [loading, setloading] = useState(false);
    const router = useRouter()
    async function handleSubmit(e){
        // console.log(value);
        e.preventDefault();
        const accounts = await web3.eth.getAccounts();
        console.log(accounts);
        setloading(true)
        try{

        await instance.methods.createCampaign(value).send({
            from: accounts[0]
        })
        setloading(false)
        alert("new campaign added")
        router.push('/')
        
      }
      catch (error) {
        console.log(error)
        setloading(false)
        alert("Error!!!!!!")
      }


    }
    if(loading){
      return(<>
      <Container>
        <div style={{
          textAlign: 'center',
          flex: '1',
          justifyContent: "center",
        }}>
          <p style={{
            fontWeight: 'bold',
            fontSize: '4rem'
          }}>Loading .....</p>
        </div>
      </Container>
      </>)
    }
    return(<>
    <Container>
        <h1 style={{
            fontWeight:'bold',
            fontSize: '20'
        }}>New Campaign!</h1>
        <p style={{
            fontWeight: 'bold'
        }}>Enter the amount in wie</p>
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
  }}>Submit</button>
  
    </Container>
    </>)
}