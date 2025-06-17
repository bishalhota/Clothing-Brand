import React from 'react'
import {PayPalButtons, PayPalScriptProvider} from "@paypal/react-paypal-js";


const PayPalButton = ({amount,onSuccess,onError}) => {
  return (
    <PayPalScriptProvider options={{"client-id":"AYI_CKfMsWPrn7kKPvmLszkSXVWg9dDI1MYmUqv2SPCkdtVMz72eO0wfzk8eI3wW8bpH_UFuwgfOOIhV"}}>
        <PayPalButtons style={{layout:"vertical"}}
            createOrder={(data,actions)=>{
                return actions.order.create({
                    purchase_units:[{amount:{value:amount}}]
                })
            }}
            onApprove={(data,actions)=>{
                return actions.order.capture().then(onSuccess)
            }}
            onError={onError}
        ></PayPalButtons>
    </PayPalScriptProvider>
  )
}

export default PayPalButton