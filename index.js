const express = require('express');


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Test request Handlers
app.get("/api/test",function(req, res) {
    res.send("Test Request");
})

app.post('/ussd', (req, res) => {
    // Read the variables sent via POST from our API
    const {
        sessionId,
        serviceCode,
        phoneNumber,
        text,
        
    } = req.body;

    let response = '';

    if (text == '') {
        // This is the first request. Note how we start the response with CON
        response = `CON Ikaze kuri USSD Hafi yawe
        1. Konti Yanjye
        2. Nimero yanjye ibaruyeho`;
    } else if ( text == '1') {
        // Business logic for first level response
        response = `CON Hitamo konti 
        1. Nimero ya konti
        2. Kureba amafaranga asigaye`;
    } else if ( text == '2') {
        // Business logic for first level response
        // This is a terminal request. Note how we start the response with END
        response = `END Telephone yawe ni: ${phoneNumber}`;
    } else if ( text == '1*1') {
        // This is a second level response where the user selected 1 in the first instance
        const accountNumber = 'ACC100101';
        // This is a terminal request. Note how we start the response with END
        response = `END Nimero ya konti yawe ni: ${accountNumber}`;
    }
    else if (text == '1*2') {
        // This is to read a balance
        finalBalance = totalBalance;
        response = `END Ubu Ufite amafaranga : ${finalBalance}`;
    }
    else if (text == '1*3') {
        response = `CON onger amafaranga kuri konti`;
        currentBalance = 30000;
        addBalance;
        totalBalance = currentBalance + addBalance;
        response = `END amafaranga musigaranye ni ${totalBalance}`;
        
        
        
    }

    // Send the response back to the API
    res.set('Content-Type: text/plain');
    res.send(response);
});

// Creating listener port
const PORT = process.env.PORT || 3001

// APP listen
app.listen(PORT, console.log(`USSD ServerListen on http://localhost:${PORT}`)
);

