import readline from 'node:readline/promises';
import {stdin as input, stdout as output} from 'node:process';

main().catch(console.error);

async function main() {
    const rl = readline.createInterface(input, output);
    try {
        let binaryInput: string;
        while (true) {
            binaryInput = await rl.question("Enter a binary number: ");
            if (isValid(binaryInput)) {
                break;
            } else {
                console.log("Invalid input! Please only enter up to 8 binary digits");
            }
        }
        const result = await convertToDecimal(binaryInput);
        console.log("Decimal result is ", result);
    } finally {
        rl.close();
    }
}


async function convertToDecimal(binaryInput: string) {
    const isInputBinary = isValid(binaryInput);
    if (!isInputBinary || binaryInput.length > 8) {
        throw new Error("Invalid input");
    }

    const binaryNumber = parseInt(binaryInput);
    const numberLength = binaryNumber.toString().length;
    let decimalBaseRemainder = Math.pow(10, numberLength - 1);
    const binaryBase = 2;
    let decimalResult = 0;

    for (let i = 0; i < numberLength; i++) {
        let digit = Math.floor(binaryNumber / decimalBaseRemainder) % 10;
        if (decimalBaseRemainder != 1) {
            decimalBaseRemainder = decimalBaseRemainder / 10;
        }

        if (digit === 1) {
            decimalResult += Math.pow(binaryBase, i);
        }
    }

    return decimalResult;
}

function isValid(str: string): boolean {
    if (str.length > 8 || str.length < 1) {
        return false;
    }
    return /^[01]+$/.test(str);
}