import React, { Component } from 'react';

const Payment = () => {
    return (
        <div className='container'>

        <h1>HELLO</h1>
 

            <form action="/charge" method="POST">
                <script
                    src="https://checkout.stripe.com/checkout.js" 
                    class="stripe-button"
                    data-key="pk_test_D1D8LFDjmtjEVNfAodELIrYA"
                    data-amount="2500"
                    data-name="Demo Site"
                    data-description="Class by a Teacher"
                    data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
                    data-locale="auto">
                </script>
            </form>
        </div>
    )
}


export default Payment;