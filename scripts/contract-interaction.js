var account;

// contract: https://pastebin.com/raw/8FUAkxGt
const contractAddress = "0x99f9184e6013acbb178ee8efe1800cb73f184ef2";

const contractAbi = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "_number",
                "type": "uint256"
            }
        ],
        "name": "setNumber",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getNumber",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];

var contract;

window.addEventListener('load', () => {

    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            // await ethereum.enable();
            // Accounts now exposed
            web3.eth.sendTransaction({/* ... */ });
        } catch (error) {
            // User denied account access...
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Accounts always exposed
        web3.eth.sendTransaction({/* ... */ });
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }

    // this is how we instantiate a contract
    contract = web3.eth.contract(contractAbi).at(contractAddress);

    // contract.number.call((error, result) => {
    //     if(error) {
    //         console.log(error);
    //     }
    //     $('#data').text(result);
    // });

    // getting address from MetaMask
    web3.eth.getAccounts(function (error, result) {
        if (error) {
            console.log(error);
        } else {
            account = result;
            $('#address').text(account);

            let acc = account + ''
            acc = acc.substring(2, acc.length)

            web3.eth.getBalance(acc, function(err, result) {
                var balance = result
                $('#balance').text( web3.fromWei(balance, 'ether').toFixed(4) + ' Ξ')
            })
        }
    });
});

$(document).ready('#getNumberBtn').click(function () {
    // getting value from a contract function call
    contract.getNumber(function(error, result) {
        $('#data').val(result);
    })
})

// make a state change transaction
function updateNumber() {
    let newNumber = $('#newNumber').val();
    if (!isNaN(newNumber)) {
        console.log('New number to be set: ' + newNumber)
        contract.setNumber(newNumber, function (error, result) {
            if (error) {
                console.log(error);
            } else {
                console.log(result);
                $('#txHash').val(result)
                let kovanEtherscanlink = 'https://kovan.etherscan.io/tx/' + result;
                document.getElementById('txLink').innerHTML =
                    '<a href=\'' + kovanEtherscanlink + '\' target=\"_blank\">See transaction on Etherscan</a><br />';
            }
        });
    } else {
        alert('Data provided is not a number');
    }
}

function showBalance() {
    let acc = $('#account').val();
    web3.eth.getBalance(acc, function (error, result) {
        if (error) {
            console.log(error);
        } else {
            $('#balance').text(web3.fromWei(result, 'ether').toFixed(4) + ' ETH');
            console.log('Balance: ' + result);
        }
    });
}

function getTxData() {
    let txHash = $('#txHash').val();
    console.log(txHash);
    // web3.eth.getTransactionReceipt(txHash, function(error, txData) {
    web3.eth.getTransaction(txHash, function (error, txData) {
        if (error) {
            console.error(error);
        } else {
            console.log(txData);
            // 0x7987a55e0d5d6d45e1854e215ceb8f794afb54e0a8e62977350d1b8edc426d3d
            let txObject = JSON.stringify(txData, null, '\t');
            $('#transactionData').text(txObject);
        }
    })
}