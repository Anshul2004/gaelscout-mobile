const axios = require("axios");
var fs = require("fs");
const brain = require("brain.js");

async function getMatchData() {
	let getData = await axios(
		"https://api.vexdb.io/v1/get_matches?season=Turning%20Point&limit_number=600"
	);
	let matchData = await getData;
	  
	let matchDataLength = Object.keys(matchData.data.result).length;

	var matchTeamData = [];

	for(i = 0; i < matchDataLength; i++){
		let red1Name = matchData.data.result[i]["red1"];
		let red2Name = matchData.data.result[i]["red2"];
		let blue1Name = matchData.data.result[i]["blue1"];
		let blue2Name = matchData.data.result[i]["blue2"];

		let output = 0;

		let red1 = await axios(
			`https://api.vexdb.io/v1/get_season_rankings?season=Turning%20Point&team=${red1Name}`
		);
		let red1Data = await red1;
		let red2 = await axios(
			`https://api.vexdb.io/v1/get_season_rankings?season=Turning%20Point&team=${red2Name}`
		);
		let red2Data = await red2;
		let blue1 = await axios(
			`https://api.vexdb.io/v1/get_season_rankings?season=Turning%20Point&team=${blue1Name}`
		);
		let blue1Data = await blue1;
		let blue2 = await axios(
			`https://api.vexdb.io/v1/get_season_rankings?season=Turning%20Point&team=${blue2Name}`
		);
		let blue2Data = await blue2;

		let red1Rating=0;
		let red2Rating=0;
		let blue1Rating=0;
		let blue2Rating=0;

		if (red1Data.data.result[0] != undefined) {
			red1Rating = red1Data.data.result[0].vrating;
		}
		if (red2Data.data.result[0] != undefined) {
			red2Rating = red2Data.data.result[0].vrating;
		}
		if (blue1Data.data.result[0] != undefined) {
			blue1Rating = blue1Data.data.result[0].vrating;
		}
		if (blue2Data.data.result[0] != undefined) {
			blue2Rating = blue2Data.data.result[0].vrating;
		}

		if(matchData.data.result[i]["redscore"] > matchData.data.result[i]["bluescore"]){
			output = 1;
		}
		else if(matchData.data.result[i]["redscore"] < matchData.data.result[i]["bluescore"]){
			output = 0;
		}
		else{
			output = 0.5;
		}

		matchTeamData.push({input: [red1Rating, red2Rating, blue1Rating, blue2Rating], output:[output]});
	}

	const net = new brain.NeuralNetwork({hiddenLayers:[3]});
	net.train(matchTeamData, {
		iterations: 100000,
		log: true,
		logPeriod: 10,
		learningRate: 0.001
	});

	//console.log(net.run([80, 80, 0, 0]));		Test
	
	fs.writeFileSync('./model.js', `export default ${ net.toFunction().toString() };`);
};

getMatchData()
    .then(data => console.log(data))
    .catch(reason => console.log(reason.message))