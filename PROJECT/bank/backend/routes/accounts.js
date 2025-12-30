import express from 'express'
import {getAllAccount, getByIdAccounts, createAccount, updateaccount, deleteaccount} from '../models/accounts.js'

const router = express.Router();

router.get('/', async(req, res)=>{
    try{
        const result = await getAllAccount()
        res.send(result)
    }catch(error){
        console.log('error fetching accounts')
    }
})

router.get('/:id', async (req, res)=>{
    try{
        const id = parseInt(req.params.id)
        if (isNaN(id)) res.status(400).send("id not yet")

        const result = await getByIdAccounts(id)
        res.send(result)
    }catch(error){
        console.error("Error fetching accounts:", error);
    }
})



router.get('/:customer_id', async (req, res) => {
  const { customer_id } = req.params;
  try {
    const accounts = await getAccountsByCustomerId(customer_id);
    res.json(accounts);
  } catch (error) {
    console.error("❌ Error in GET /customer/:id", error);
    res.status(500).json({ message: "Server error loading accounts" });
  }
});




router.post('/', async (req, res) => {
  const { customer_id, branch_id, type_id, account_number, balance, status, opened } = req.body;
  try {
    const result = await createAccount(customer_id, branch_id, type_id, account_number, balance, status, opened);
    res.status(201).json({ message: "Account created", account_id: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating account" });
  }
});



router.put('/:id', async (req, res)=>{
    try{
        const {id, column, value} = req.body
        const result = await updateaccount(id, column, value)
        res.send(result)
    }catch(error){
        console.error("Error fetching accounts:", error);
    }
})

router.delete('/:id', async (req, res)=>{
    try{
        const id = req.params.id
        const result = await deleteaccount(id)

        res.status(201).json({message: "account delete"})
    }catch(error){
        console.error("Error fetching accounts:", error);
    }

})

export default router;