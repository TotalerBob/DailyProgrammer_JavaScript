var challenge = {
	title: 'Nearest Lucky Numbers',
	description: 'A Lucky Number is a natural number in a set which is generated by a certain "sieve". This sieve is similar to the Sieve of Eratosthenes that generates the primes, but it eliminates numbers based on their position in the remaining set, instead of their value (or position in the initial set of natural numbers).',
	difficulty: 'easy',
	reddit: 'https://www.reddit.com/r/dailyprogrammer/comments/6wjscp/2017828_challenge_329_easy_nearest_lucky_numbers/',
	inputs: [{type: 'text', name: 'c1_number', title: 'Your number'}],
	outputs: [{ type: 'text', name: 'c1_output', title: 'Result' }, { type: 'text', name: 'c1_time', title: 'Time' }],
	run: function () {
		// Get start time
		var startTimer = new Date();

		// Read input
		var inputNumber = $('#' + this.inputs[0].name).val();

		// Placeholder for answer
		var answer = '';

		// Create array with all odd numbers up to input*2
		var numbers = new Array(0, inputNumber);
		for (var i = 1; i <= inputNumber; i++) {
			numbers[i-1] = i * 2 - 1;
		}

		// Start with luckyindex 3 as we already have an array with all odd numbers (luckyindex 2)
		var luckyIndex = 3;
		var nextLower = 0;
		var luckyNumbers = [];
		var numbersChecked = 0;

		while (true) {
			// Check if lucky number can be calculated
			answer = CheckNumbers();

			// If no lucky number found
			if (answer != '')
				break;

			// Loop over all remaining numbers and remove where needed
			for (var j = 0; j < numbers.length; j++) {
				if (j % (luckyIndex -1) == 0 && j != 0) {
					numbers.splice(j, 1);
				}
			}

			// Get all lucky numbers
			luckyNumbers = numbers.slice(0, luckyIndex - 1);

			// Calculate next lucky index
			for (var x = 0; true; x++) {
				if (numbers[x] > luckyIndex) {
					luckyIndex = numbers[x];
					break;
				}	
			}
		}

		// Get end time
		var endTimer = new Date();
		// Print answer
		$('#' + this.outputs[0].name).val(answer);
		// Print elapsed time
		$('#' + this.outputs[1].name).val(FormatMS(endTimer - startTimer));



		// Function to check if we have found the lucky numbers we are looking for
		function CheckNumbers() {
			for (var y = numbersChecked; y < luckyNumbers.length; y++) {
				// Search the highest lower possible number
				if (luckyNumbers[y] > nextLower && luckyNumbers[y] < inputNumber) {
					nextLower = luckyNumbers[y];
					// Remember which numbers we already checked for later use
					numbersChecked = y;

				// Check for a higher number, if we find one we can end the search
				} else if (luckyNumbers[y] > inputNumber) {
					return 'Next lower: ' + nextLower + ' - Next higher: ' + luckyNumbers[y] + '!';
					break;
				// Check for exact match, when we match we can end the search
				} else if (luckyNumbers[y] == inputNumber) {
					return inputNumber + ' is a lucky number!';
					break;
				}
			}

			return '';
		}
	}
}