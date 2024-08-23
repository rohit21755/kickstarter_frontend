"use client";
import { Container, FormField } from "semantic-ui-react"
import { useState, useEffect } from "react"
import { useRouter, useParams } from 'next/navigation';
import web3 from "../../../../../../web";
import Campaign from "../../../../../../Campaign.json"
export default function Page() {
  const [value, setValue] = useState('')
  const [desc, setDesc] = useState('')
  const [recipeint, setRecipeint] = useState('')
  const [loading, setLoading] = useState(false);
  const { campaign } = useParams();
  let instance;
  useEffect(()=>{
    getInstance()
    
  },[])
  function getInstance(){
    instance = new web3.eth.Contract(
      Campaign.abi,
      campaign
    )
    console.log(instance)
  }
  
  async function handleSubmit(e){
    e.preventDefault();
    console.log(value, desc, recipeint)
    getInstance();
    setLoading(true);
    try{
      const accounts = await web3.eth.getAccounts();
      console.log(accounts)
      await instance.methods.createRequest(desc,web3.utils.toWei(value, 'ether'),recipeint).send({
        from: accounts[0]
      })
      setLoading(false)

    } catch (err) {
      alert(err);
      setLoading(false)

    }
  }
  if(loading){
    return(<Container>
      <h1 style={{
        fontWeight: 'bold',
        fontSize: '2rem'
      }}>Loading....</h1>
    </Container>)
  }
    return <Container style={{
        paddingTop: '20px'
    }}>
        {/* <Form> */}
    {/* <FormField> */}
      {/* <label>First Name</label> */}
      <input placeholder='Description' onChange={(e)=>setDesc(e.target.value)}  style={{
        width: '40%',
        border: '1px solid',
        borderRadius: "10px",
        height: "15px",
        padding: '10px',
        background: 'white',
        color: 'black',
        borderColor: 'black'
      }}/>
      <input placeholder='value' onChange={(e)=>setValue(e.target.value)}  style={{
        width: '40%',
        border: '1px solid',
        borderRadius: "10px",
        height: "15px",
        padding: '10px',
        background: 'white',
        color: 'black',
        borderColor: 'black'
      }}/>
    {/* </FormField> */}
    {/* <FormField> */}
      {/* <label>Last Name</label> */}
      <input placeholder='Recipeint' onChange={(e)=>setRecipeint(e.target.value)} style={{
        width: '40%',
        border: '1px solid',
        borderRadius: "10px",
        height: "15px",
        padding: '10px',
        background: 'white',
        color: 'black',
        borderColor: 'black'
      }} />
    {/* </FormField> */}
    
    <button onClick={handleSubmit} type='submit'>Submit</button>
  {/* </Form> */}
    </Container>
}