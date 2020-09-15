const core = require('@actions/core');
const got = require('got');

const key = process.env.INPUT_KEY;
const event = process.env.INPUT_EVENT;
const status = process.env.INPUT_STATUS;
const runId = process.env.GITHUB_RUN_ID;
const repo = process.env.GITHUB_REPOSITORY;
const workflow = process.env.GITHUB_WORKFLOW;

async function run() {
	if (key === undefined || event === undefined || status === undefined){
		return core.setFailed("No key, event or status specified")
	}

	let title;
	let message;

	if(status === "success"){
		title = `${workflow} succeeded`;
		message = `The Workflow ${workflow} on the Repo ${repo} finished without any errors.`
	}else if(status === "failure"){
		title = `${workflow} failed`;
		message = `The Workflow ${workflow} on the Repo ${repo} did not finish without any errors.`
	}else{
		return core.debug("Invalid status, not running workflow");
	}

	const url = `https://github.com/${repo}/actions/runs/${runId}`;
	
	try {
		const { body } = await got.post(`https://maker.ifttt.com/trigger/${event}/with/key/${key}`, {
			json: {
				value1: title,
				value2: message,
				value3: url
			}
		});

		core.debug(body)

	} catch (error) {
		core.debug(error)
		core.setFailed(error.response.body)
	}
}

run();