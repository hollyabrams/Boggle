const $checkForm = $('#checkForm');
const $checkWordField = $('#checkWordField');
const $totalScore = $('#total_score span');
const $totalGames = $('#total_games span');
const $timer = $('#timer span');
const $hintText = $('#hint p');
const $hintBtn = $('#hint button');
const $score = $('#score span');
const $result = $('#result span');
const $btn = $('#btn');

/* function will send word to the server using ajax request*/
let sendRequest = async (e) => {
	e.preventDefault();

	// if player wants to a new game the click will reload page
	if ($btn.text() == 'New game?') {
		location.reload();
	}

	let word = $checkWordField.val().trim();
	$checkWordField.val('');
	disableElementsForm();

	/*check if string is empty or has a white space or number*/
	if (
		word.length == 0 ||
		[ ...word ].some((l) => l == ' ') ||
		[ ...word ].some((l) => [ ...'0123456789' ].includes(l))
	) {
		$result.text('Not a word');
		releaseElementsForm();
		return;
	}

	/*call ajax request and process response*/
	let resultResponse = await sendToServer.checkWord(word);

	if (resultResponse.data.result == 'ok') {
		let sc = parseInt($score.text());
		$score.text(sc + word.length);
	}

	releaseElementsForm();
	$result.text(resultResponse.data.result);
};

$btn.on('click', sendRequest);

/* set timer for 60 sec after 60 sec it will disable form applies new scores*/
let setTimer = setInterval(async () => {
	let current = parseInt($timer.text());
	if (current == 0) {
		clearInterval(setTimer);
		let response = await sendToServer.sendUserScore($score.text());
		totalScoreGames(response);
		$checkWordField.hide();
		$btn.text('New game?');
		return;
	}
	current--;
	$timer.text(current);
}, 1000);

setTimer;

/* disable elements on the form */
let disableElementsForm = () => {
	$btn.attr('disabled', true);
	$checkWordField.attr('disabled', true);
};

/* release elements on the form */
let releaseElementsForm = () => {
	$btn.removeAttr('disabled');
	$checkWordField.removeAttr('disabled');
};

/* apply total score */
let totalScoreGames = (response) => {
	$totalScore.text(response.data.score);
};

/*send request to the server to get a hint*/
let hintTrigger = async () => {
	$hintText.text('Searching...');
	let hint = await sendToServer.getHint();
	$hintText.text(hint.data.hint_word);
};

$hintBtn.on('click', hintTrigger);
